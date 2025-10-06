class_name STTRecognizer extends Node

# == Parameters
@export var websocket_url: String

@export var record_bus: String = "Record"
@export var resample_bus: String = "Resample"

@export var record_capture_effect_idx: int = 0
@export var resample_capture_effect_idx: int = 0

@export var resample_stream_player : AudioStreamPlayer

# == Dependencies
@onready var record_capture_effect : AudioEffectCapture = (
	AudioServer.get_bus_effect(AudioServer.get_bus_index(record_bus), record_capture_effect_idx) 
	as AudioEffectCapture
)

@onready var resample_capture_effect : AudioEffectCapture = (
	AudioServer.get_bus_effect(AudioServer.get_bus_index(resample_bus), resample_capture_effect_idx) 
	as AudioEffectCapture
)

var client_socket: WebSocketPeer
var should_transcribe: bool = false

# === Threads
var resampler: Thread
var connection_handler: Thread
var transcript_getter: Thread

# === Tasks
# Manage initial client connection
func connect_client():
	print("Managing initial client connection...")
	
	# Connect websocket
	var init_sock_conn_state = client_socket.connect_to_url(websocket_url)
	if init_sock_conn_state != OK:
		push_error("Unable to connect to connect to web socket URL: ", init_sock_conn_state)
		return

	# Wait for websocket to connect
	print("Polling socket for TTS initial configuration...")
	
	client_socket.poll()
	var conf_sock_conn_state: WebSocketPeer.State = client_socket.get_ready_state()
	
	while conf_sock_conn_state == WebSocketPeer.STATE_CONNECTING:
		await get_tree().create_timer(1).timeout
		client_socket.poll()
		conf_sock_conn_state = client_socket.get_ready_state()
	
	# Read initial configuration data
	if conf_sock_conn_state != WebSocketPeer.STATE_OPEN:
		push_error("Unexpected socket connection state: ", conf_sock_conn_state)
		return

	if client_socket.get_available_packet_count() == 0:
		push_error("Missing initial configuration data from server")
		return
	
	# Assert proper initial configuration data
	var packet = client_socket.get_packet()

	if not client_socket.was_string_packet():
		push_error("Unexpected binary data from server: %d bytes" % packet.size())
		return

	var init_conf_str: String = packet.get_string_from_utf8()
	print("Received STT initial configuration from server: ", init_conf_str)
	
	# Parse intial configuration data
	var json = JSON.new()
	var conf_str_parse_state:= json.parse(init_conf_str)
	
	if conf_str_parse_state != OK:
		push_error("Unabled to parse STT config JSON: ", json.get_error_message(), " in ", conf_str_parse_state, " at line ", json.get_error_line())
		return
		
	var conf_server = json.data as Dictionary
	print("Server configuration: ", conf_server)
	
	# Warn if server doesn't receive raw PCM
	var conf_server_raw_pcm: bool = conf_server["useAudioWorklet"] as bool
	if not conf_server_raw_pcm:
		push_warning("Server doesn't use raw PCM as input")

func resample_speech():
	print("Entering resample thread")
	
	# Collect resampler playback
	var resampling_playback : AudioStreamGeneratorPlayback = resample_stream_player.get_stream_playback()
	
	# Begin resampling
	while (should_transcribe):
		# Resample samples if available from microphone
		var available_frames := record_capture_effect.get_frames_available()
		
		# Push each frame into the playback
		if (available_frames > 0):
			# Capture frames from microphone
			var frames := record_capture_effect.get_buffer(available_frames)

			# Push them to resampling stream
			for i in range(available_frames):
				resampling_playback.push_frame(frames[i])
				
	print("Exiting resample thread")

func get_transcript():
	print("Entering transcript-getter thread")
	
	# Keep requesting for transcriptions as long as specified
	var stored_frames := PackedByteArray()
	var should_collect_frames := true
	
	while (should_transcribe):
		if should_collect_frames:
			# Sleep if no connection has been established
			client_socket.poll()
			if client_socket.get_ready_state() != WebSocketPeer.STATE_OPEN:
				continue
				
			# Push each mic sample into the playback
			var available_frames := resample_capture_effect.get_frames_available()
			if (available_frames == 0):
				continue
		
			# Capture samples from microphone
			var frames := resample_capture_effect.get_buffer(available_frames)

			# Convert samples for endpoint
			#NOTE: We are assuming s16le encoding
			for i in range(available_frames):
				var frame := frames[i]
				
				# Average both stereo channels to one mono channel
				var left: float = clamp(frame.x, -1.0, 1.0) * 32767
				var right: float = clamp(frame.y, -1.0, 1.0) * 32767
				var avg := int((left + right) / 2)

				# Add frames
				stored_frames.append(avg & 0xFF)
				stored_frames.append((avg >> 8) & 0xFF)
			
			# Once enough frames have been acquired, stop collecting
			# and flush them to the endpoint
			if stored_frames.size() > 16000:
				print("Flushing ", stored_frames.size(), " frames")
				client_socket.send(stored_frames)
				stored_frames.clear()
				
				should_collect_frames = false
				continue
		else:
			# Collect the response from the server
			var available_packets := client_socket.get_available_packet_count()			
			if available_packets == 0:
				continue

			# Query all transcription's data
			for i in range(available_packets):
				var packet := client_socket.get_packet()

				if not client_socket.was_string_packet():
					push_warning("Unexpected binary data when polling TTS transcript: %d bytes" % packet.size())
					continue

				# Collect the transcript's packet
				var packet_str := packet.get_string_from_utf8()
				print("Received transcript packet: ", packet_str)
			
			# Go back to collecting samples
			should_collect_frames = true

	print("Exiting transcript-getter thread")
	return

func handle_connection():
	print("Entering connection-handling thread")
	
	# Begin transcription
	while (should_transcribe):
		# Check the client's connection
		client_socket.poll()
		var conf_sock_conn_state: WebSocketPeer.State = client_socket.get_ready_state()

		# If the client is disconnected, reconnect it
		if conf_sock_conn_state == WebSocketPeer.STATE_CLOSED:
			connect_client()
		
		await get_tree().create_timer(1).timeout

	print("Returning from connection-handling thread")

# On game start, create transcription thread
func _ready() -> void:
	# Ensure logic is running within the game only, and not the editor
	if Engine.is_editor_hint():
		return
	
	# Kill transcription thread if already running
	print("Cleaning up threads (if running)")
	should_transcribe = false

	if transcript_getter and transcript_getter.is_alive():
		transcript_getter.wait_to_finish()

	if connection_handler and connection_handler.is_alive():
		connection_handler.wait_to_finish()
		
	if resampler and resampler.is_alive():
		resampler.wait_to_finish()
		
	print("All threads cleaned!")
		
	# Assert parameters
	assert(resample_stream_player != null, "Missing resample stream player")
	
	# Create new transcription thread with a cleared workspace
	print("Recreating dependencies")
	record_capture_effect.clear_buffer()
	client_socket = WebSocketPeer.new()
	
	print("Creating threads")
	should_transcribe = true
	
	print("> Speech resampler")
	resampler = Thread.new()
	resampler.start(resample_speech)
	
	print("> Connection handler")
	connection_handler = Thread.new()
	connection_handler.start(handle_connection)
	
	# TODO: Actually handle race conditions
	await get_tree().create_timer(5).timeout

	print("> Transcript getter")
	transcript_getter = Thread.new()
	transcript_getter.start(get_transcript)
	
	print("Done!")
