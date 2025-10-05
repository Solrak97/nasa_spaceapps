# OceanSpeciesRAG.gd — RAG system for ocean species knowledge
# Loads ocean species minicard data and provides retrieval functions
# for augmenting LLM prompts with relevant species information

extends Node

# Storage for all species data
var species_data: Array = []
var species_by_name: Dictionary = {}  # Quick lookup by species name
var all_species_names: Array = []  # List of unique species names

signal data_loaded(count: int)
signal data_load_failed(error: String)

# Path to the JSON data file
const DATA_PATH = "res://data/ocean_species_minicards_osa_CR.json"

func _ready() -> void:
	# Load data on startup
	load_species_data()

# Load the ocean species JSON data
func load_species_data() -> bool:
	print("[OceanSpeciesRAG] Loading species data from: ", DATA_PATH)
	
	var file = FileAccess.open(DATA_PATH, FileAccess.READ)
	if file == null:
		var error = "Failed to open file: " + DATA_PATH
		print("[OceanSpeciesRAG] ERROR: ", error)
		emit_signal("data_load_failed", error)
		return false
	
	var json_text = file.get_as_text()
	file.close()
	
	var json = JSON.new()
	var parse_result = json.parse(json_text)
	
	if parse_result != OK:
		var error = "Failed to parse JSON: " + str(parse_result)
		print("[OceanSpeciesRAG] ERROR: ", error)
		emit_signal("data_load_failed", error)
		return false
	
	species_data = json.data
	
	# Index species by name for quick lookup
	_build_species_index()
	
	print("[OceanSpeciesRAG] Successfully loaded ", species_data.size(), " species entries")
	print("[OceanSpeciesRAG] Unique species: ", all_species_names.size())
	emit_signal("data_loaded", species_data.size())
	return true

# Build an index of species names for efficient lookup
func _build_species_index() -> void:
	species_by_name.clear()
	var unique_names = {}
	
	for entry in species_data:
		if entry.has("topic"):
			var topic = entry["topic"]
			# Extract species name from topic (e.g., "Species: Yellowfin surgeonfish (Acanthurus xanthopterus)")
			var species_name = _extract_species_name(topic)
			
			if species_name != "":
				unique_names[species_name.to_lower()] = species_name
				
				# Add to species_by_name dictionary
				if not species_by_name.has(species_name.to_lower()):
					species_by_name[species_name.to_lower()] = []
				
				species_by_name[species_name.to_lower()].append(entry)
	
	all_species_names = unique_names.values()

# Extract species name from topic string
func _extract_species_name(topic: String) -> String:
	# Topic format: "Species: Common Name (Scientific Name)"
	if topic.begins_with("Species: "):
		var name_part = topic.substr(9)  # Remove "Species: "
		# Extract just the common name (before parenthesis)
		var paren_pos = name_part.find(" (")
		if paren_pos > 0:
			return name_part.substr(0, paren_pos).strip_edges()
		return name_part.strip_edges()
	return ""

# Search for species entries by keyword
func search_species(query: String, max_results: int = 10) -> Array:
	query = query.to_lower()
	var results = []
	var keywords = query.split(" ")
	
	for entry in species_data:
		var score = 0
		var entry_text = (entry.get("topic", "") + " " + entry.get("data", "")).to_lower()
		
		# Score based on keyword matches
		for keyword in keywords:
			if keyword.length() < 3:  # Skip very short keywords
				continue
			if entry_text.contains(keyword):
				score += 1
		
		if score > 0:
			results.append({
				"entry": entry,
				"score": score
			})
	
	# Sort by score (highest first)
	results.sort_custom(func(a, b): return a["score"] > b["score"])
	
	# Return only the entries, limited by max_results
	var final_results = []
	for i in range(min(max_results, results.size())):
		final_results.append(results[i]["entry"])
	
	return final_results

# Get all entries for a specific species by name
func get_species_by_name(species_name: String) -> Array:
	var key = species_name.to_lower()
	if species_by_name.has(key):
		return species_by_name[key]
	return []

# Get a random species entry (useful for demonstrations)
func get_random_species_entry() -> Dictionary:
	if species_data.is_empty():
		return {}
	var idx = randi() % species_data.size()
	return species_data[idx]

# Get random species entries
func get_random_species_entries(count: int) -> Array:
	if species_data.is_empty():
		return []
	
	var results = []
	var indices = range(species_data.size())
	indices.shuffle()
	
	for i in range(min(count, indices.size())):
		results.append(species_data[indices[i]])
	
	return results

# Build context string from entries for RAG
func build_context_string(entries: Array, max_length: int = 2000) -> String:
	var context = "# Ocean Species Knowledge Base\n\n"
	var current_length = context.length()
	
	for entry in entries:
		var entry_text = "## " + entry.get("topic", "Unknown") + "\n"
		entry_text += entry.get("data", "") + "\n\n"
		
		# Check if adding this would exceed max_length
		if current_length + entry_text.length() > max_length:
			break
		
		context += entry_text
		current_length += entry_text.length()
	
	return context

# Build an enhanced system prompt with species context
func get_enhanced_system_prompt(base_prompt: String, query: String, max_context_entries: int = 5) -> String:
	# Search for relevant species
	var relevant_entries = search_species(query, max_context_entries)
	
	if relevant_entries.is_empty():
		return base_prompt
	
	# Build context from relevant entries
	var context = build_context_string(relevant_entries)
	
	# Combine base prompt with context
	var enhanced_prompt = base_prompt + "\n\n" + context
	enhanced_prompt += "\nUse the above species information to answer questions accurately."
	
	return enhanced_prompt

# Query with RAG: combines search with LLM response
# This integrates with LLMClient to provide context-aware responses
func query_with_context(user_query: String, max_context_entries: int = 5) -> Dictionary:
	# Search for relevant species
	var relevant_entries = search_species(user_query, max_context_entries)
	
	# Build context string
	var context = ""
	if not relevant_entries.is_empty():
		context = build_context_string(relevant_entries)
	
	return {
		"context": context,
		"entries": relevant_entries,
		"count": relevant_entries.size()
	}

# Get statistics about the knowledge base
func get_stats() -> Dictionary:
	return {
		"total_entries": species_data.size(),
		"unique_species": all_species_names.size(),
		"species_names": all_species_names
	}

# List all unique species names
func list_all_species() -> Array:
	return all_species_names.duplicate()

# Helper function to format entry for display/logging
func format_entry(entry: Dictionary) -> String:
	return entry.get("topic", "Unknown") + "\n" + entry.get("data", "No data")

