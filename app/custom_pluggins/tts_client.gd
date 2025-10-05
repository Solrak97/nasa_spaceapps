# TTSClient.gd — configurable node wrapper for TTS API
# This node can be dropped into any scene to communicate with the FastAPI TTS service.
# It fetches audio from the TTS endpoint and returns it as an AudioStreamMP3 that can
# be played in Godot's AudioStreamPlayer.
#
# Example usage:
#   var audio_stream = await $TTSClient.text_to_speech("Hello world!", "en-GB-RyanNeural")
#   if audio_stream:
#       $AudioStreamPlayer.stream = audio_stream
#       $AudioStreamPlayer.play()

extends Node
class_name TTSConnection

# ----------------- Exported Config -----------------
@export var api_url: String = "http://localhost:8000"
@export var default_voice: String = "en-GB-RyanNeural"
@export var default_rate: String = ""  # e.g. "+10%" or "-5%", empty = default speed
@export var default_pitch: String = ""  # e.g. "+5Hz" or "-10Hz", empty = default pitch

# Reference to HTTPRequest (created at runtime)
var _http: HTTPRequest

signal tts_request_started(text: String)
signal tts_request_finished(audio_stream: AudioStreamMP3)
signal tts_request_failed(status_code: int, error_msg: String)

func _ready() -> void:
	_http = HTTPRequest.new()
	add_child(_http)

# -------------- Core TTS Call ----------------
## Main method to convert text to speech
## Returns an AudioStreamMP3 that can be assigned to an AudioStreamPlayer
## Parameters:
##   text: The text to synthesize
##   voice: Voice name (optional, uses default_voice if empty)
##   rate: Speech rate (optional, uses default_rate if empty)
##   pitch: Speech pitch (optional, uses default_pitch if empty)
func text_to_speech(
	text: String, 
	voice: String = "", 
	rate: String = "", 
	pitch: String = ""
) -> AudioStreamMP3:
	if text.strip_edges().is_empty():
		push_error("[TTSClient] Cannot synthesize empty text")
		emit_signal("tts_request_failed", -1, "Empty text")
		return null
	
	# Use provided values or fall back to defaults
	var final_voice = voice if voice != "" else default_voice
	var final_rate = rate if rate != "" else default_rate
	var final_pitch = pitch if pitch != "" else default_pitch
	
	emit_signal("tts_request_started", text)
	
	# Build URL with query parameters
	var url = api_url.rstrip("/") + "/tts"
	var params = []
	params.append("text=" + text.uri_encode())
	params.append("voice=" + final_voice.uri_encode())
	if final_rate != "":
		params.append("rate=" + final_rate.uri_encode())
	if final_pitch != "":
		params.append("pitch=" + final_pitch.uri_encode())
	
	url += "?" + "&".join(params)
	
	print("[TTSClient] Requesting: ", url)
	
	# Make GET request
	var err = _http.request(url, PackedStringArray(), HTTPClient.METHOD_GET)
	if err != OK:
		var error_msg = "HTTP request failed with error code: %s" % err
		push_error("[TTSClient] " + error_msg)
		emit_signal("tts_request_failed", -1, error_msg)
		return null
	
	# Wait for response
	var result = await _http.request_completed
	var status_code: int = result[1]
	var body_bytes: PackedByteArray = result[3]
	
	if status_code < 200 or status_code >= 300:
		var error_msg = "Server returned status %d" % status_code
		push_error("[TTSClient] " + error_msg)
		emit_signal("tts_request_failed", status_code, error_msg)
		return null
	
	# Check if we got audio data
	if body_bytes.size() == 0:
		var error_msg = "Received empty audio data"
		push_error("[TTSClient] " + error_msg)
		emit_signal("tts_request_failed", status_code, error_msg)
		return null
	
	# Create AudioStreamMP3 from the bytes
	var audio_stream = AudioStreamMP3.new()
	audio_stream.data = body_bytes
	
	print("[TTSClient] Successfully received %d bytes of audio" % body_bytes.size())
	emit_signal("tts_request_finished", audio_stream)
	return audio_stream

# -------------- Convenience Methods ----------------

## Quick synthesis with just text (uses all defaults)
func speak(text: String) -> AudioStreamMP3:
	return await text_to_speech(text)

## Synthesis with custom voice
func speak_with_voice(text: String, voice: String) -> AudioStreamMP3:
	return await text_to_speech(text, voice)

# -------------- Configuration Setters ----------------

func set_api_url(url: String) -> void:
	api_url = url
	print("[TTSClient] API URL set to: ", url)

func set_default_voice(voice: String) -> void:
	default_voice = voice
	print("[TTSClient] Default voice set to: ", voice)

func set_voice_params(rate: String, pitch: String) -> void:
	default_rate = rate
	default_pitch = pitch
	print("[TTSClient] Voice params set - Rate: ", rate, " Pitch: ", pitch)

# -------------- Debug helpers ----------------

func print_config() -> void:
	print("[TTSClient] Configuration:")
	print("  API URL: ", api_url)
	print("  Default Voice: ", default_voice)
	print("  Default Rate: ", default_rate if default_rate != "" else "(default)")
	print("  Default Pitch: ", default_pitch if default_pitch != "" else "(default)")
