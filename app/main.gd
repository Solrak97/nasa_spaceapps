extends Node3D

# Simple test scene for the Ocean VR Agent
# For a complete example, see: ocean_vr_agent_example.gd

@onready var audio_player: AudioStreamPlayer = AudioStreamPlayer.new()

func _ready():
	add_child(audio_player)
	
	print("\n🌊 Ocean VR Agent - Test Scene")
	print("=" * 50)
	print("For a complete example, open: ocean_vr_agent_example.gd")
	print("=" * 50 + "\n")
	
	# Quick test
	await quick_test()

func quick_test():
	"""Quick test to verify everything works"""
	
	# Configure
	GenaiAudioPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
	GenaiAudioPipeline.configure_tts("http://localhost:8000", "en-GB-RyanNeural")
	
	# Enable RAG (optional)
	var rag_ok = await GenaiAudioPipeline.enable_rag()
	if not rag_ok:
		print("⚠️  RAG service not running (optional)")
	
	# Set personality
	GenaiAudioPipeline.set_system_prompt("""
	You are Mariana, a friendly VR museum guide about oceans.
	Give short, friendly answers.
	""")
	
	# Add sample knowledge if RAG available
	if rag_ok:
		await GenaiAudioPipeline.add_knowledge_to_rag(
			"mariana trench depth",
			"The Mariana Trench is 11,000 meters deep, the deepest point on Earth."
		)
	
	# Test
	print("👤 Testing: 'Hello, who are you?'\n")
	await GenaiAudioPipeline.chat_and_play(
		"Hello! Please introduce yourself briefly.",
		audio_player
	)
	
	await audio_player.finished
	
	print("\n✅ Test complete!")
	print("📖 See ocean_vr_agent_example.gd for full features")
