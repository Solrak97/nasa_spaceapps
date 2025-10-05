# GenAI Audio Pipeline (Autoload Singleton)
# Combines LLM chat (with context) and TTS into a single, easy-to-use pipeline
# NOW WITH RAG SUPPORT for contextual knowledge retrieval!
#
# ⚙️ SETUP: Add this to Project Settings > Autoload
#   Name: GenAIPipeline
#   Path: res://custom_pluggins/genai_audio_pipeline.gd
#
# Usage as autoload singleton:
#   GenAIPipeline.set_system_prompt("You are a friendly museum guide named Mars")
#   GenAIPipeline.enable_rag()  # Enable RAG for factual questions!
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

# RAG Configuration
var rag_enabled: bool = false
var rag_url: String = "http://localhost:8001"
var rag_client: RAGClient = null
var rag_top_k: int = 2  # Number of context chunks to retrieve

# Auto-configure on ready
var auto_configure: bool = true

# Signals
signal processing_started(message: String)
signal llm_response_ready(response: String)
signal audio_ready(audio_stream: AudioStream)
signal processing_complete(message: String, response: String, audio_stream: AudioStream)
signal processing_failed(error: String)
signal rag_context_retrieved(contexts: Array, scores: Array)

func _ready() -> void:
	if auto_configure:
		_auto_configure()

func _auto_configure() -> void:
	"""Auto-configure with default values"""
	LLMClient.configure(llm_url, llm_api_key, llm_model)
	TTSClient.set_api_url(tts_url)
	TTSClient.set_default_voice(tts_voice)
	print("[GenAIAudioPipeline] Auto-configured with defaults")

func _ensure_rag_client() -> void:
	"""Create RAG client if it doesn't exist"""
	if rag_client == null:
		rag_client = RAGClient.new()
		rag_client.rag_url = rag_url
		add_child(rag_client)
		print("[GenAIAudioPipeline] RAG client created")

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

func configure_rag(url: String = "http://localhost:8001", top_k: int = 2) -> void:
	"""Configure the RAG service"""
	rag_url = url
	rag_top_k = top_k
	_ensure_rag_client()
	rag_client.rag_url = url
	print("[GenAIAudioPipeline] RAG configured: ", url, " | Top K: ", top_k)

func enable_rag() -> bool:
	"""Enable RAG for context retrieval. Returns true if service is available."""
	_ensure_rag_client()
	var is_available = await rag_client.health_check()
	
	if is_available:
		rag_enabled = true
		print("[GenAIAudioPipeline] ✅ RAG enabled and service is available")
	else:
		rag_enabled = false
		print("[GenAIAudioPipeline] ⚠️ RAG service not available at ", rag_url)
		print("  Start it with: cd microservices/simple_rag && python app.py")
	
	return is_available

func disable_rag() -> void:
	"""Disable RAG context retrieval"""
	rag_enabled = false
	print("[GenAIAudioPipeline] RAG disabled")

func set_system_prompt(prompt: String) -> void:
	"""Set the AI's personality and behavior"""
	LLMClient.set_system_prompt(prompt)

# -------------- Core Pipeline Methods ----------------

func chat_to_audio(message: String, voice: String = "") -> AudioStream:
	"""
	Complete pipeline: Send message to LLM (with context) and convert response to audio
	NOW WITH RAG SUPPORT! If enabled, retrieves relevant context before sending to LLM.
	
	Args:
		message: The user's message
		voice: Optional voice override (uses default if empty)
	
	Returns:
		AudioStream ready to be played
	"""
	emit_signal("processing_started", message)
	
	# Step 1: Retrieve context if RAG is enabled
	var enhanced_message = message
	if rag_enabled and rag_client != null:
		var result = await rag_client.retrieve_context(message, rag_top_k)
		
		if result["success"] and not result["contexts"].is_empty():
			var contexts = result["contexts"]
			var scores = result["scores"]
			
			print("[GenAIAudioPipeline] RAG retrieved %d contexts" % contexts.size())
			for i in range(contexts.size()):
				print("  - %s (score: %.3f)" % [contexts[i]["topic"], scores[i]])
			
			emit_signal("rag_context_retrieved", contexts, scores)
			
			# Format context for LLM
			var context_text = rag_client.format_contexts_for_llm(contexts)
			
			# Enhance message with context
			enhanced_message = """[KNOWLEDGE BASE CONTEXT]:
%s

[USER QUESTION]:
%s

Answer based on the context provided, keeping your personality and tone.""" % [context_text, message]
		else:
			print("[GenAIAudioPipeline] RAG: No relevant context found")
	
	# Step 2: Get LLM response with (enhanced) message
	var llm_response = await LLMClient.send_chat_message(enhanced_message)
	
	if llm_response == "":
		emit_signal("processing_failed", "LLM returned empty response")
		return null
	
	emit_signal("llm_response_ready", llm_response)
	print("[GenAIAudioPipeline] LLM Response: ", llm_response)
	
	# Step 3: Convert to audio
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

# -------------- RAG Management Methods ----------------

func add_knowledge_to_rag(topic: String, content: String) -> bool:
	"""
	Add custom knowledge to the RAG service dynamically
	
	Args:
		topic: The topic/title for this knowledge (use keywords!)
		content: The detailed information about this topic
	
	Returns:
		True if successfully added, False otherwise
	"""
	if not rag_enabled:
		print("[GenAIAudioPipeline] ⚠️ RAG is not enabled. Call enable_rag() first.")
		return false
	
	_ensure_rag_client()
	var success = await rag_client.add_knowledge(topic, content)
	
	if success:
		print("[GenAIAudioPipeline] ✅ Added knowledge: ", topic)
	else:
		print("[GenAIAudioPipeline] ❌ Failed to add knowledge: ", topic)
	
	return success

func get_all_rag_knowledge() -> Dictionary:
	"""
	Get all knowledge entries from the RAG service
	
	Returns:
		Dictionary with {success: bool, entries: Array, count: int}
	"""
	if not rag_enabled:
		print("[GenAIAudioPipeline] ⚠️ RAG is not enabled")
		return {"success": false, "entries": [], "count": 0}
	
	_ensure_rag_client()
	return await rag_client.get_all_knowledge()

func test_rag_retrieval(query: String) -> void:
	"""
	Test RAG retrieval and print results (for debugging)
	
	Args:
		query: Test query to search for
	"""
	if not rag_enabled:
		print("[GenAIAudioPipeline] ⚠️ RAG is not enabled")
		return
	
	_ensure_rag_client()
	var result = await rag_client.retrieve_context(query, rag_top_k)
	
	if result["success"]:
		print("\n[RAG TEST] Query: ", query)
		print("Found %d contexts:" % result["contexts"].size())
		for i in range(result["contexts"].size()):
			var ctx = result["contexts"][i]
			print("  %d. %s (score: %.3f)" % [i+1, ctx["topic"], result["scores"][i]])
			print("     %s" % ctx["content"].substr(0, 100), "...")
	else:
		print("[RAG TEST] Failed to retrieve context")

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
