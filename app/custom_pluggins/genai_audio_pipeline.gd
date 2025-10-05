# GenAI Audio Pipeline (Autoload Singleton)
# Combines LLM chat (with context) and TTS into a single, easy-to-use pipeline
#
# ⚙️ SETUP: Add this to Project Settings > Autoload
#   Name: GenAIPipeline
#   Path: res://custom_pluggins/genai_audio_pipeline.gd
#
# Usage as autoload singleton:
#   GenAIPipeline.set_system_prompt("You are a friendly museum guide named Mars")
#   var audio = await GenAIPipeline.chat_to_audio("Hello! Who are you?")
#   $AudioPlayer.stream = audio
#   $AudioPlayer.play()
#
# Or use the convenience method:
#   await GenAIPipeline.chat_and_play("Hello!", $AudioPlayer)

extends Node
class_name GenAIAudioPipeline

# Configuration
var llm_url: String = "http://localhost:11434"
var llm_api_key: String = ""
var llm_model: String = "llama3.2"
var tts_url: String = "http://0.0.0.0:8000"
var tts_voice: String = "en-GB-RyanNeural"

# Auto-configure on ready
var auto_configure: bool = true

# Signals
signal processing_started(message: String)
signal llm_response_ready(response: String)
signal audio_ready(audio_stream: AudioStream)
signal processing_complete(message: String, response: String, audio_stream: AudioStream)
signal processing_failed(error: String)

func _ready() -> void:
	if auto_configure:
		_auto_configure()

func _auto_configure() -> void:
	"""Auto-configure with default values"""
	LLMClient.configure(llm_url, llm_api_key, llm_model)
	TTSClient.set_api_url(tts_url)
	TTSClient.set_default_voice(tts_voice)
	print("[GenAIAudioPipeline] Auto-configured with defaults")

# -------------- Configuration Methods ----------------

func configure_llm(url: String, api_key: String = "", model: String = "llama3.2") -> void:
	"""Configure the LLM client"""
	llm_url = url
	llm_api_key = api_key
	llm_model = model
	LLMClient.configure(url, api_key, model)
	print("[GenAIAudioPipeline] LLM configured: ", url, " | Model: ", model)

func configure_tts(url: String, voice: String = "en-GB-RyanNeural") -> void:
	"""Configure the TTS client"""
	tts_url = url
	tts_voice = voice
	TTSClient.set_api_url(url)
	TTSClient.set_default_voice(voice)
	print("[GenAIAudioPipeline] TTS configured: ", url, " | Voice: ", voice)

func set_system_prompt(prompt: String) -> void:
	"""Set the AI's personality and behavior"""
	LLMClient.set_system_prompt(prompt)

# -------------- Core Pipeline Methods ----------------

func chat_to_audio(message: String, voice: String = "") -> AudioStream:
	"""
	Complete pipeline: Send message to LLM (with context) and convert response to audio
	
	Args:
		message: The user's message
		voice: Optional voice override (uses default if empty)
	
	Returns:
		AudioStream ready to be played
	"""
	emit_signal("processing_started", message)
	
	# Step 1: Get LLM response with context
	var llm_response = await LLMClient.send_chat_message(message)
	
	if llm_response == "":
		emit_signal("processing_failed", "LLM returned empty response")
		return null
	
	emit_signal("llm_response_ready", llm_response)
	print("[GenAIAudioPipeline] LLM Response: ", llm_response)
	
	# Step 2: Convert to audio
	var audio_stream = null
	if voice != "":
		audio_stream = await TTSClient.text_to_speech(llm_response, voice)
	else:
		audio_stream = await TTSClient.text_to_speech(llm_response)
	
	if audio_stream == null:
		emit_signal("processing_failed", "TTS failed to generate audio")
		return null
	
	emit_signal("audio_ready", audio_stream)
	emit_signal("processing_complete", message, llm_response, audio_stream)
	print("[GenAIAudioPipeline] Audio stream ready")
	
	return audio_stream

func simple_prompt_to_audio(prompt: String, voice: String = "") -> AudioStream:
	"""
	Simple pipeline: Send prompt to LLM (no context) and convert response to audio
	
	Args:
		prompt: The prompt to send
		voice: Optional voice override (uses default if empty)
	
	Returns:
		AudioStream ready to be played
	"""
	emit_signal("processing_started", prompt)
	
	# Step 1: Get LLM response (no context)
	var llm_response = await LLMClient.send_prompt(prompt)
	
	if llm_response == "":
		emit_signal("processing_failed", "LLM returned empty response")
		return null
	
	emit_signal("llm_response_ready", llm_response)
	print("[GenAIAudioPipeline] LLM Response: ", llm_response)
	
	# Step 2: Convert to audio
	var audio_stream = null
	if voice != "":
		audio_stream = await TTSClient.text_to_speech(llm_response, voice)
	else:
		audio_stream = await TTSClient.text_to_speech(llm_response)
	
	if audio_stream == null:
		emit_signal("processing_failed", "TTS failed to generate audio")
		return null
	
	emit_signal("audio_ready", audio_stream)
	emit_signal("processing_complete", prompt, llm_response, audio_stream)
	print("[GenAIAudioPipeline] Audio stream ready")
	
	return audio_stream

# -------------- Context Management ----------------

func clear_context() -> void:
	"""Clear the conversation context"""
	LLMClient.clear_context()

func get_context() -> Array:
	"""Get the current conversation history"""
	return LLMClient.get_context()

func get_context_size() -> int:
	"""Get the number of messages in the conversation"""
	return LLMClient.get_context_size()

# -------------- Utility Methods ----------------

func get_last_response() -> String:
	"""Get the last assistant response from context"""
	var context = LLMClient.get_context()
	for i in range(context.size() - 1, -1, -1):
		if context[i]["role"] == "assistant":
			return context[i]["content"]
	return ""

func add_user_message(message: String) -> void:
	"""Manually add a user message to context (without sending)"""
	LLMClient.add_user_message(message)

func add_assistant_message(message: String) -> void:
	"""Manually add an assistant message to context (without sending)"""
	LLMClient.add_assistant_message(message)

# -------------- Helper for playing audio directly ----------------

func chat_and_play(message: String, audio_player: AudioStreamPlayer, voice: String = "") -> String:
	"""
	Convenience method: Process message and automatically play on the given AudioStreamPlayer
	
	Args:
		message: The user's message
		audio_player: The AudioStreamPlayer node to play on
		voice: Optional voice override
	
	Returns:
		The LLM response text
	"""
	var audio_stream = await chat_to_audio(message, voice)
	
	if audio_stream != null and audio_player != null:
		audio_player.stream = audio_stream
		audio_player.play()
		return get_last_response()
	
	return ""

func simple_prompt_and_play(prompt: String, audio_player: AudioStreamPlayer, voice: String = "") -> String:
	"""
	Convenience method: Process prompt (no context) and automatically play on the given AudioStreamPlayer
	
	Args:
		prompt: The prompt to send
		audio_player: The AudioStreamPlayer node to play on
		voice: Optional voice override
	
	Returns:
		The LLM response text
	"""
	var audio_stream = await simple_prompt_to_audio(prompt, voice)
	
	if audio_stream != null and audio_player != null:
		audio_player.stream = audio_stream
		audio_player.play()
		return get_last_response()
	
	return ""
