extends Node3D

var xr_interfaces: XRInterface

func _ready():
	xr_interfaces = XRServer.find_interface("OpenXR")
	
	if xr_interfaces and xr_interfaces.is_initialized():
		print("OpenXR intialised successfully")
		
		DisplayServer.window_set_vsync_mode(DisplayServer.VSYNC_DISABLED)
		
		get_viewport().use_xr = true
		
	else:
		print("Check VR connection")
