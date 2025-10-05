# Ocean VR Museum Agent - Complete Example
# This is your starting point! Shows everything you need:
# - Audio pipeline with RAG
# - Custom knowledge
# - Voice interaction ready
# - VR-ready audio playback

extends Node3D

@onready var audio_player: AudioStreamPlayer = AudioStreamPlayer.new()

func _ready():
	add_child(audio_player)
	await setup_agent()

func setup_agent():
	"""Configure the RAG-powered audio agent"""
	print("\n🌊 Setting up Ocean VR Museum Agent...")
	
	# ========== 1. CONFIGURE SERVICES ==========
	print("⚙️  Configuring services...")
	
	# LLM (Ollama)
	GenaiAudioPipeline.configure_llm(
		"http://localhost:11434",  # Ollama URL
		"",                         # No API key needed for Ollama
		"llama3.2"                 # Model name
	)
	
	# TTS
	GenaiAudioPipeline.configure_tts(
		"http://localhost:8000",   # TTS service
		"en-GB-RyanNeural"         # Voice (change as needed)
	)
	
	# RAG (optional but recommended!)
	var rag_available = await GenaiAudioPipeline.enable_rag()
	if not rag_available:
		print("⚠️  RAG service not running (optional)")
		print("   Start it: cd microservices && ./start_all.sh")
	
	# ========== 2. SET PERSONALITY ==========
	GenaiAudioPipeline.set_system_prompt("""
	You are Mars, a friendly and knowledgeable VR museum guide.
	You're inspired by the planet mars - named after the roman god of war.
	
	Your personality:
	- Warm and welcoming
	- Passionate about ocean exploration
	- Give short but thoughtful answers (2-3 sentences)
	- Use facts from your knowledge base when available
	
	Remember: Keep responses brief for VR - users are standing and listening!
	""")
	
	# ========== 3. ADD KNOWLEDGE (if RAG available) ==========
	if rag_available:
		print("📚 Loading ocean knowledge...")
		await load_ocean_knowledge()
	
	# ========== 4. TEST IT ==========
	print("\n✅ Agent ready! Testing...\n")
	await test_agent()
	
	print("\n🎮 Ready for VR interaction!")
	print("   Call: on_user_speech(\"your question\")")

func load_ocean_knowledge():
	"""Add your custom knowledge here"""
	
	# Example 1: Mariana Trench
	await GenaiAudioPipeline.add_knowledge_to_rag(
		"mariana trench depth ocean deepest pressure",
		"""
		The Mariana Trench is the deepest part of the ocean at 11,000 meters (36,000 feet).
		Located in the western Pacific Ocean, it's deeper than Mount Everest is tall.
		The pressure at the bottom is over 1,000 times atmospheric pressure.
		Only three people have ever reached the bottom: Jacques Piccard, Don Walsh (1960), and James Cameron (2012).
		"""
	)
	
	# Example 2: Bioluminescence
	await GenaiAudioPipeline.add_knowledge_to_rag(
		"bioluminescence deep sea creatures light glowing",
		"""
		About 90% of deep sea creatures produce their own light through bioluminescence.
		This light is created through chemical reactions involving luciferin and luciferase enzymes.
		Creatures use it for multiple purposes: attracting prey, finding mates, and deterring predators.
		Colors range from blue and green (most common) to red, depending on the species.
		"""
	)
	
	# Example 3: Ocean Exploration
	await GenaiAudioPipeline.add_knowledge_to_rag(
		"ocean exploration unmapped unknown deep sea technology",
		"""
		Approximately 80% of the ocean remains unmapped and unexplored.
		We have better maps of Mars than of our own ocean floor.
		Modern exploration uses ROVs (Remotely Operated Vehicles) and AUVs (Autonomous Underwater Vehicles).
		Deep sea exploration faces challenges: extreme pressure, complete darkness, and near-freezing temperatures.
		"""
	)
	
	# Example 4: Hydrothermal Vents
	await GenaiAudioPipeline.add_knowledge_to_rag(
		"hydrothermal vents deep sea ecosystem chemosynthesis",
		"""
		Hydrothermal vents are underwater geysers found along mid-ocean ridges.
		Water heated by magma beneath the ocean floor shoots up through cracks, reaching 750°F (400°C).
		They support unique ecosystems based on chemosynthesis rather than photosynthesis.
		Tube worms, giant clams, and specialized bacteria thrive in these extreme environments.
		"""
	)
	
	print("✅ Loaded 4 knowledge topics")

func test_agent():
	"""Test the agent with a sample question"""
	print("👤 User: Hello! Who are you?\n")
	await GenaiAudioPipeline.chat_and_play(
		"Hello! Please introduce yourself briefly.",
		audio_player
	)
	await audio_player.finished
	
	await GenaiAudioPipeline.chat_and_play(
		"Whats the most interesting fact you have about the Mariana Trench",
		audio_player
	)
	await audio_player.finished
	
	
	await GenaiAudioPipeline.chat_and_play(
		"tell me about hydrotermal vents",
		audio_player
	)
	await audio_player.finished

# ========== VR INTEGRATION EXAMPLE ==========

func on_user_speech(text: String):
	"""
	Call this when user speaks in VR
	(Connect to your speech recognition system)
	"""
	print("\n👤 User: ", text)
	
	# Stop any current audio
	if audio_player.playing:
		audio_player.stop()
	
	# Process and respond with RAG context automatically!
	await GenaiAudioPipeline.chat_and_play(text, audio_player)
	
	# Audio plays automatically
	# Add animations here if needed:
	# avatar.play("speaking")

func on_button_pressed(question: String):
	"""
	Call this when user presses a button/trigger in VR
	"""
	await on_user_speech(question)

func on_exhibit_entered(exhibit_name: String, exhibit_info: String):
	"""
	Call this when user enters an exhibit area
	Add contextual knowledge dynamically!
	"""
	if GenaiAudioPipeline.rag_enabled:
		await GenaiAudioPipeline.add_knowledge_to_rag(
			"current exhibit location " + exhibit_name,
			"The visitor is currently at the %s exhibit. %s" % [exhibit_name, exhibit_info]
		)
	
	# Greet them
	await on_user_speech("Tell me about this exhibit")

# ========== UTILITY FUNCTIONS ==========

func change_voice(voice_name: String):
	"""Change TTS voice on the fly"""
	GenaiAudioPipeline.configure_tts("http://localhost:8000", voice_name)
	# Available voices: en-GB-RyanNeural, en-US-JennyNeural, en-GB-SoniaNeural, etc.

func clear_conversation():
	"""Reset conversation context"""
	GenaiAudioPipeline.clear_context()
	GenaiAudioPipeline.set_system_prompt("You are Mariana, an ocean guide...")

func get_conversation_length() -> int:
	"""Check how long the conversation is"""
	return GenaiAudioPipeline.get_context_size()

# ========== SIGNALS (Optional) ==========

func _connect_signals():
	"""Connect to pipeline signals for UI feedback"""
	
	GenaiAudioPipeline.processing_started.connect(
		func(msg):
			# Show thinking animation
			print("🔄 Processing...")
	)
	
	GenaiAudioPipeline.rag_context_retrieved.connect(
		func(contexts, scores):
			# Show "accessing knowledge" indicator
			print("📚 Found %d relevant facts" % contexts.size())
	)
	
	GenaiAudioPipeline.audio_ready.connect(
		func(_audio):
			# Show speaking animation
			print("🔊 Speaking...")
	)
	
	GenaiAudioPipeline.processing_failed.connect(
		func(error):
			# Show error message
			print("❌ Error: ", error)
	)
