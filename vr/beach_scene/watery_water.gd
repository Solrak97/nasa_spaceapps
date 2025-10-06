extends MeshInstance3D

# how high to rise (in meters)
@export var rise_amount: float = 1.0
# how fast to rise
@export var rise_speed: float = 2.0

# internal control
var _target_y: float
var _rising: bool = falsebtw

func _ready():
	_target_y = global_position.y

func _process(delta):
	if _rising:
		# move toward target height
		var new_y = move_toward(global_position.y, _target_y, rise_speed * delta)
		global_position.y = new_y
		if is_equal_approx(global_position.y, _target_y):
			_rising = false

func rise():
	# trigger rise
	_target_y = global_position.y + rise_amount
	_rising = true
