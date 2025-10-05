# RAGClient.gd - Client for Simple RAG microservice
# Better than keyword matching, easier than Elasticsearch!

extends Node
class_name RAGClient

@export var rag_url: String = "http://localhost:8001"

var _http: HTTPRequest

signal retrieval_started()
signal retrieval_finished(contexts: Array, scores: Array)
signal retrieval_failed(error: String)

func _ready() -> void:
	_http = HTTPRequest.new()
	add_child(_http)

# Retrieve relevant context using TF-IDF similarity
func retrieve_context(query: String, top_k: int = 2) -> Dictionary:
	"""
	Retrieve context from the RAG microservice.
	
	Returns Dictionary with:
	- success: bool
	- contexts: Array of {topic: String, content: String}
	- scores: Array of float (similarity scores)
	"""
	
	emit_signal("retrieval_started")
	
	var payload = {
		"query": query,
		"top_k": top_k
	}
	
	var url = rag_url.rstrip("/") + "/retrieve"
	var headers = PackedStringArray(["Content-Type: application/json"])
	
	var err = _http.request(url, headers, HTTPClient.METHOD_POST, JSON.stringify(payload))
	if err != OK:
		emit_signal("retrieval_failed", "Request failed: %s" % err)
		return {"success": false, "contexts": [], "scores": []}
	
	var result = await _http.request_completed
	var code: int = result[1]
	var body_bytes: PackedByteArray = result[3]
	var body_text = body_bytes.get_string_from_utf8()
	
	if code < 200 or code >= 300:
		emit_signal("retrieval_failed", "HTTP %d: %s" % [code, body_text])
		return {"success": false, "contexts": [], "scores": []}
	
	var parsed = JSON.parse_string(body_text)
	if typeof(parsed) != TYPE_DICTIONARY:
		emit_signal("retrieval_failed", "Invalid JSON response")
		return {"success": false, "contexts": [], "scores": []}
	
	var contexts = parsed.get("contexts", [])
	var scores = parsed.get("scores", [])
	
	emit_signal("retrieval_finished", contexts, scores)
	
	return {
		"success": true,
		"contexts": contexts,
		"scores": scores
	}

# Format contexts as string for LLM prompt
func format_contexts_for_llm(contexts: Array) -> String:
	if contexts.is_empty():
		return "No relevant context found."
	
	var formatted = ""
	for ctx in contexts:
		formatted += "### %s\n" % ctx.get("topic", "Unknown")
		formatted += "%s\n\n" % ctx.get("content", "")
	
	return formatted.strip_edges()

# Convenience method: retrieve and format in one call
func get_formatted_context(query: String, top_k: int = 2) -> String:
	var result = await retrieve_context(query, top_k)
	if result["success"]:
		return format_contexts_for_llm(result["contexts"])
	return "No relevant context found."

# Check if RAG service is running
func health_check() -> bool:
	var url = rag_url.rstrip("/") + "/"
	var headers = PackedStringArray(["Content-Type: application/json"])
	
	var err = _http.request(url, headers, HTTPClient.METHOD_GET, "")
	if err != OK:
		return false
	
	var result = await _http.request_completed
	var code: int = result[1]
	
	return code >= 200 and code < 300

# Add new knowledge to the RAG service
func add_knowledge(topic: String, content: String) -> bool:
	var url = rag_url.rstrip("/") + "/add_knowledge?topic=%s&content=%s" % [
		topic.uri_encode(),
		content.uri_encode()
	]
	var headers = PackedStringArray(["Content-Type: application/json"])
	
	var err = _http.request(url, headers, HTTPClient.METHOD_POST, "")
	if err != OK:
		return false
	
	var result = await _http.request_completed
	var code: int = result[1]
	
	return code >= 200 and code < 300

# Get all knowledge from service
func get_all_knowledge() -> Dictionary:
	var url = rag_url.rstrip("/") + "/knowledge"
	var headers = PackedStringArray(["Content-Type: application/json"])
	
	var err = _http.request(url, headers, HTTPClient.METHOD_GET, "")
	if err != OK:
		return {"success": false, "entries": []}
	
	var result = await _http.request_completed
	var code: int = result[1]
	var body_bytes: PackedByteArray = result[3]
	var body_text = body_bytes.get_string_from_utf8()
	
	if code < 200 or code >= 300:
		return {"success": false, "entries": []}
	
	var parsed = JSON.parse_string(body_text)
	if typeof(parsed) == TYPE_DICTIONARY:
		return {
			"success": true,
			"entries": parsed.get("entries", []),
			"count": parsed.get("documents", 0)
		}
	
	return {"success": false, "entries": []}
