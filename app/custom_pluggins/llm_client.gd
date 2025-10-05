# LLMConnection.gd — configurable node wrapper for LLMClient
# This node can be dropped into any scene to hold runtime config (URL, key, model, etc.)
# and expose high-level methods to interact with an LLM (e.g., chat, completion).
#
# Attach this script to a Node (e.g., Node2D, Control, or Node) named "LLMConnection".
#
# Example usage (simple prompt):
#   var reply = await $LLMConnection.send_prompt("Say hi!")
#   print(reply)
#
# Example usage (chat with context):
#   $LLMConnection.set_system_prompt("You are a helpful museum guide named Mars")
#   var reply1 = await $LLMConnection.send_chat_message("Hello!")
#   var reply2 = await $LLMConnection.send_chat_message("Tell me about Mars")
#   # The second message will have context from the first exchange

extends Node
class_name LLMConnection

# ----------------- Exported Config -----------------
@export var api_url: String = "https://api.openai.com"
@export var api_key: String = ""
@export var model: String = "gpt-4o-mini"
@export var temperature: float = 0.7
@export var max_tokens: int = 256

# (optional) if using a local mock server
@export var use_mock: bool = false
@export var mock_url: String = "http://127.0.0.1:8000"

# Reference to HTTPRequest (created at runtime)
var _http: HTTPRequest

# Conversation history for chat context
# Array of dictionaries with "role" and "content" keys
var _conversation_history: Array = []

signal llm_request_started(req_id: String)
signal llm_request_finished(req_id: String, text: String)
signal llm_request_failed(req_id: String, status_code: int, body: String)

func _ready() -> void:
	_http = HTTPRequest.new()
	add_child(_http)

# -------------- Helpers ----------------
func _headers() -> PackedStringArray:
	var h = PackedStringArray(["Content-Type: application/json"])
	if api_key.strip_edges() != "":
		h.append("Authorization: Bearer %s" % api_key)
	return h

func _resolve_base_url() -> String:
	return mock_url if use_mock else api_url

# -------------- Core Call ----------------
func send_prompt(prompt: String) -> String:
	# Ollama API format
	var payload = {
		"model": model,
		"prompt": prompt,
		"stream": false
	}

	var req_id = "llm-" + str(Time.get_unix_time_from_system()) + "-" + str(randi())
	emit_signal("llm_request_started", req_id)

	var url = _resolve_base_url().rstrip("/") + "/api/generate"
	var err = _http.request(url, _headers(), HTTPClient.METHOD_POST, JSON.stringify(payload))
	if err != OK:
		emit_signal("llm_request_failed", req_id, -1, "Request failed: %s" % err)
		return ""

	var result = await _http.request_completed
	var code: int = result[1]
	var body_bytes: PackedByteArray = result[3]
	var body_text = body_bytes.get_string_from_utf8()

	if code < 200 or code >= 300:
		emit_signal("llm_request_failed", req_id, code, body_text)
		return ""

	var parsed = JSON.parse_string(body_text)
	if typeof(parsed) != TYPE_DICTIONARY:
		emit_signal("llm_request_failed", req_id, code, "Invalid JSON")
		return ""

	var content = ""
	if parsed.has("response"):
		content = parsed["response"]

	emit_signal("llm_request_finished", req_id, content)
	return content

# -------------- Chat with Context ----------------
# Send a chat message with conversation context
func send_chat_message(message: String) -> String:
	# Add user message to history
	_conversation_history.append({
		"role": "user",
		"content": message
	})
	
	var payload = {
		"model": model,
		"messages": _conversation_history,
		"stream": false
	}
	
	# Add options if set
	if temperature != 0.7:
		payload["temperature"] = temperature
	if max_tokens > 0:
		payload["max_tokens"] = max_tokens
	
	var req_id = "llm-chat-" + str(Time.get_unix_time_from_system()) + "-" + str(randi())
	emit_signal("llm_request_started", req_id)
	
	var url = _resolve_base_url().rstrip("/") + "/api/chat"
	var err = _http.request(url, _headers(), HTTPClient.METHOD_POST, JSON.stringify(payload))
	if err != OK:
		emit_signal("llm_request_failed", req_id, -1, "Request failed: %s" % err)
		return ""
	
	var result = await _http.request_completed
	var code: int = result[1]
	var body_bytes: PackedByteArray = result[3]
	var body_text = body_bytes.get_string_from_utf8()
	
	if code < 200 or code >= 300:
		emit_signal("llm_request_failed", req_id, code, body_text)
		# Remove the user message we added since request failed
		_conversation_history.pop_back()
		return ""
	
	var parsed = JSON.parse_string(body_text)
	if typeof(parsed) != TYPE_DICTIONARY:
		emit_signal("llm_request_failed", req_id, code, "Invalid JSON")
		_conversation_history.pop_back()
		return ""
	
	var content = ""
	if parsed.has("message") and typeof(parsed["message"]) == TYPE_DICTIONARY:
		if parsed["message"].has("content"):
			content = parsed["message"]["content"]
	
	# Add assistant's response to history
	if content != "":
		_conversation_history.append({
			"role": "assistant",
			"content": content
		})
	
	emit_signal("llm_request_finished", req_id, content)
	return content

# Set the system prompt (usually called once at the start)
func set_system_prompt(prompt: String) -> void:
	# Remove existing system message if any
	for i in range(_conversation_history.size() - 1, -1, -1):
		if _conversation_history[i]["role"] == "system":
			_conversation_history.remove_at(i)
	
	# Add new system message at the beginning
	_conversation_history.insert(0, {
		"role": "system",
		"content": prompt
	})
	print("[LLMClient] System prompt set: ", prompt.substr(0, 50), "...")

# Manually add a user message to context (without sending)
func add_user_message(content: String) -> void:
	_conversation_history.append({
		"role": "user",
		"content": content
	})

# Manually add an assistant message to context (without sending)
func add_assistant_message(content: String) -> void:
	_conversation_history.append({
		"role": "assistant",
		"content": content
	})

# Clear all conversation history
func clear_context() -> void:
	_conversation_history.clear()
	print("[LLMClient] Conversation context cleared")

# Get the current conversation history
func get_context() -> Array:
	return _conversation_history.duplicate()

# Get the size of the conversation history
func get_context_size() -> int:
	return _conversation_history.size()

# -------------- Optional setters ----------------
func set_api(url: String, key: String) -> void:
	api_url = url
	api_key = key

func set_model(model_name: String) -> void:
	model = model_name

func set_options(temp: float, max_toks: int) -> void:
	temperature = temp
	max_tokens = max_toks

# -------------- Debug helpers ----------------
func print_config() -> void:
	print("[LLMClient] URL:", _resolve_base_url())
	print("Model:", model, "Temp:", temperature, "Max tokens:", max_tokens)

# -------------- Singleton API Methods ----------------
# Configure the LLM client with URL, API key, and model
func configure(url: String, key: String, model_name: String = "") -> void:
	api_url = url
	api_key = key
	if model_name != "":
		model = model_name
	print("[LLMClient] Configured with URL:", url, "Model:", model, "Key:", "***" if key != "" else "none")
