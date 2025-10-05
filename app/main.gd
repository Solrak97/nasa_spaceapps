extends Node3D

func _ready():
	
	var text = """
	You are my guide on a vr museum, be friendly and introduce yourself
	your name is Mariana, as the Mariana trench, you usually give short but introspective answers
	"""
	
	
	print("checking LLM connection")
	LLMClient.configure("http://localhost:11434", "", "llama3.2")
	var resp = await LLMClient.send_prompt(text)
	print(resp)

	# One-time steps.
	# Pick a voice. Here, we arbitrarily pick the first English voice.
	var voices = DisplayServer.tts_get_voices_for_language("en")
	const robo_voice_id = 38
	var robo_voice = voices[robo_voice_id]
	
	DisplayServer.tts_speak(resp, robo_voice)
	#DisplayServer.tts_stop()
	
	
		
	
