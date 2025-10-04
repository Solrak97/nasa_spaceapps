extends Node3D

var xr_interfaces: XRInterface

func _ready():
	print("Loading autoloader")
	
	xr_interfaces = XRServer.find_interface("OpenXR")
	
	if xr_interfaces and xr_interfaces.is_initialized():
		print("OpenXR intialised successfully")
		
		DisplayServer.window_set_vsync_mode(DisplayServer.VSYNC_DISABLED)
		
		get_viewport().use_xr = true
		
	else:
		print("Check VR connection")
		
	print("checking LLM connection")
	LLMClient.configure("http://localhost:11434", "", "llama3.2")
	var resp = await LLMClient.send_prompt("Have I called you from godot before?")
	print(resp)

	# One-time steps.
	# Pick a voice. Here, we arbitrarily pick the first English voice.
	var voices = DisplayServer.tts_get_voices_for_language("en")
	var voice_id = voices[0]
	
	DisplayServer.tts_speak(resp, voice_id)
	DisplayServer.tts_stop()
	
