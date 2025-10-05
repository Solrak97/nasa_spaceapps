# GenAI Audio Pipeline - Demo Scene
# 
# This demonstrates how to use the GenaiAudioPipeline autoload singleton
# 
# ⚠️ IMPORTANT: Before running, make sure GenaiAudioPipeline is set up as an autoload:
#   1. Go to Project > Project Settings > Autoload
#   2. Add: Name: "GenaiAudioPipeline" | Path: "res://custom_pluggins/genai_audio_pipeline.gd"
#   3. Click "Add"
#
# 🎯 This demo shows:
#   - Basic configuration
#   - Multi-turn conversations with context
#   - Using chat_and_play() for convenience
#   - Using signals for feedback

extends Node3D

# Audio player for all responses
@onready var audio_player: AudioStreamPlayer = AudioStreamPlayer.new()

func _ready():
	# Add audio player to scene
	add_child(audio_player)
	
	# Run demo
	await _run_demo()

func _run_demo():
	print("\n" + "=".repeat(60))
	print("  GenAI Audio Pipeline Demo")
	print("=".repeat(60) + "\n")
	
	# Configure the pipeline (singleton is already created as autoload)
	print("⚙️  Configuring GenaiAudioPipeline...")
	GenaiAudioPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
	GenaiAudioPipeline.configure_tts("http://0.0.0.0:8000", "en-GB-RyanNeural")
	
	# Set up the AI's personality
	GenaiAudioPipeline.set_system_prompt("""
	You are Mars, a friendly and knowledgeable guide in a VR museum about space.
	You give short but introspective answers (2-3 sentences maximum).
	You're passionate about space exploration, science, and helping people learn.
	Be warm, engaging, and occasionally use space-related metaphors.
	""")
	
	# Connect to signals for visual feedback
	_connect_signals()
	
	print("✅ Configuration complete!\n")
	
	# Demo 1: Introduction
	await _demo_conversation()
	
	# Demo 2: Show context management
	await _demo_context_management()
	
	# Demo 3: Different voices (optional)
	# await _demo_different_voices()
	
	print("\n" + "=".repeat(60))
	print("  Demo Complete!")
	print("=".repeat(60) + "\n")

# Demo: Multi-turn conversation with context
func _demo_conversation():
	print("\n📖 Demo 1: Conversation with Context\n")
	
	# Turn 1: Introduction
	print("👤 User: Hello! Who are you?\n")
	await GenaiAudioPipeline.chat_and_play("Hello! Who are you?", audio_player)
	await audio_player.finished
	await get_tree().create_timer(1.0).timeout  # Small pause between messages
	
	# Turn 2: Ask about Mars (the planet)
	print("\n👤 User: What can you tell me about the red planet?\n")
	await GenaiAudioPipeline.chat_and_play("What can you tell me about the red planet?", audio_player)
	await audio_player.finished
	await get_tree().create_timer(1.0).timeout
	
	# Turn 3: Follow-up question (AI remembers context)
	print("\n👤 User: Why are you named after it?\n")
	await GenaiAudioPipeline.chat_and_play("Why are you named after it?", audio_player)
	await audio_player.finished
	await get_tree().create_timer(1.0).timeout
	
	# Turn 4: Another contextual question
	print("\n👤 User: What's the most exciting thing about space exploration?\n")
	await GenaiAudioPipeline.chat_and_play("What's the most exciting thing about space exploration?", audio_player)
	await audio_player.finished
	
	print("\n📊 Conversation size: ", GenaiAudioPipeline.get_context_size(), " messages")

# Demo: Context management
func _demo_context_management():
	print("\n\n🧹 Demo 2: Context Management\n")
	
	print("Current context: ", GenaiAudioPipeline.get_context_size(), " messages")
	print("Last response was: \"", GenaiAudioPipeline.get_last_response().substr(0, 50), "...\"\n")
	
	# Show full context
	print("📜 Full conversation history:")
	var history = GenaiAudioPipeline.get_context()
	for i in range(history.size()):
		var msg = history[i]
		var role_icon = "🤖" if msg["role"] == "system" else ("👤" if msg["role"] == "user" else "💭")
		var preview = msg["content"].substr(0, 60).replace("\n", " ")
		if msg["content"].length() > 60:
			preview += "..."
		print("  %d. %s %s: %s" % [i + 1, role_icon, msg["role"].capitalize(), preview])
	
	print("\n🔄 Clearing context and starting fresh...\n")
	GenaiAudioPipeline.clear_context()
	GenaiAudioPipeline.set_system_prompt("You are a helpful AI assistant. Keep answers brief.")
	
	print("👤 User: What is 2+2?\n")
	await GenaiAudioPipeline.chat_and_play("What is 2+2?", audio_player)
	await audio_player.finished
	
	print("\n📊 New context size: ", GenaiAudioPipeline.get_context_size(), " messages")

# Demo: Using different voices (optional)
func _demo_different_voices():
	print("\n\n🎤 Demo 3: Different Voices\n")
	
	GenaiAudioPipeline.clear_context()
	GenaiAudioPipeline.set_system_prompt("You are a helpful assistant.")
	
	# British male
	print("🇬🇧 British Male Voice (en-GB-RyanNeural)")
	print("👤 User: Say hello\n")
	await GenaiAudioPipeline.chat_and_play("Say hello", audio_player, "en-GB-RyanNeural")
	await audio_player.finished
	await get_tree().create_timer(1.0).timeout
	
	# American female
	print("\n🇺🇸 American Female Voice (en-US-JennyNeural)")
	print("👤 User: Tell me something interesting\n")
	await GenaiAudioPipeline.chat_and_play("Tell me something interesting", audio_player, "en-US-JennyNeural")
	await audio_player.finished
	await get_tree().create_timer(1.0).timeout
	
	# British female
	print("\n🇬🇧 British Female Voice (en-GB-SoniaNeural)")
	print("👤 User: Thank you\n")
	await GenaiAudioPipeline.chat_and_play("Thank you", audio_player, "en-GB-SoniaNeural")
	await audio_player.finished

# Connect to pipeline signals for visual feedback
func _connect_signals():
	GenaiAudioPipeline.processing_started.connect(func(msg): 
		print("  🔄 Processing...")
	)
	
	GenaiAudioPipeline.llm_response_ready.connect(func(response): 
		print("  💭 Mars: ", response)
	)
	
	GenaiAudioPipeline.audio_ready.connect(func(_audio): 
		print("  🔊 Audio ready, playing...\n")
	)
	
	GenaiAudioPipeline.processing_failed.connect(func(error): 
		print("  ❌ ERROR: ", error, "\n")
		push_error("GenaiAudioPipeline error: " + error)
	)

# Example: Manual method using chat_to_audio() instead of chat_and_play()
func _example_manual_approach():
	print("\n📝 Example: Manual approach with chat_to_audio()\n")
	
	# Get the audio stream
	var audio_stream = await GenaiAudioPipeline.chat_to_audio("Tell me about the moon")
	
	# Check if successful
	if audio_stream == null:
		print("Failed to generate audio!")
		return
	
	# Manually play it
	audio_player.stream = audio_stream
	audio_player.play()
	
	# Wait for it to finish
	await audio_player.finished
	
	print("Finished playing!")

# Example: Error handling
func _example_error_handling():
	print("\n⚠️  Example: Error handling\n")
	
	# Connect to error signal
	var error_occurred = false
	GenaiAudioPipeline.processing_failed.connect(func(error):
		error_occurred = true
		print("Caught error: ", error)
	)
	
	# Try to get audio
	var audio = await GenaiAudioPipeline.chat_to_audio("Hello")
	
	if audio == null or error_occurred:
		print("Failed to get audio - showing user feedback...")
		# Show error UI, retry, etc.
	else:
		print("Success!")
		audio_player.stream = audio
		audio_player.play()

# Example: Interactive chat (e.g., from VR input)
func on_user_speech_detected(transcribed_text: String):
	"""
	This would be called when you detect user speech in VR
	(e.g., from speech recognition)
	"""
	print("\n👤 User said: ", transcribed_text)
	
	# Stop any current audio
	if audio_player.playing:
		audio_player.stop()
	
	# Process and respond
	await GenaiAudioPipeline.chat_and_play(transcribed_text, audio_player)

# Example: Button press triggers conversation
func _on_button_pressed():
	"""Example: Triggering conversation from UI button"""
	await GenaiAudioPipeline.chat_and_play("Tell me something interesting", audio_player)
