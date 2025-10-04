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
	var resp = await LLMClient.send_prompt("Hey llama, you are being called from godot!")
	print(resp)
