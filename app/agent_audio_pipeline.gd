extends Node3D


func save_mp3(bytes: PackedByteArray, path: String = "./speech.mp3") -> bool:
	var f := FileAccess.open(path, FileAccess.WRITE)
	if f == null:
		push_error("Open error: %s" % FileAccess.get_open_error())
		return false
	f.store_buffer(bytes)
	f.flush()
	f.close()
	return true
	
	
func _ready():
	LLMClient.configure("http://localhost:11434", "", "llama3.2")
	
	TTSClient.set_api_url('http://0.0.0.0:8000')
	TTSClient.set_default_voice('en-GB-RyanNeural')
		
	var text = """
	You are my guide on a vr museum, be friendly and introduce yourself
	your name is Mars, you usually give short but introspective answers
	"""
	
	print("Creating an answer")
	var resp = await LLMClient.send_prompt(text)
	print("Creating audio")
	var audio_stream = await TTSClient.text_to_speech(resp)
	
	var player = AudioStreamPlayer.new()
	add_child(player)
	
	player.stream = audio_stream
	player.play()
	
	
