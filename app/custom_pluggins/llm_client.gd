# LLMConnection.gd — configurable node wrapper for LLMClient
# This node can be dropped into any scene to hold runtime config (URL, key, model, etc.)
# and expose high-level methods to interact with an LLM (e.g., chat, completion).
#
# Attach this script to a Node (e.g., Node2D, Control, or Node) named "LLMConnection".
#
# Example usage:
#   var reply = await $LLMConnection.send_prompt("Say hi!")
#   print(reply)

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
