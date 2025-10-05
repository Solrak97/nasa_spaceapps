extends Node3D

func _ready():
	# Configure LLM
	print("checking LLM connection")
	LLMClient.configure("http://localhost:11434", "", "llama3.2")
	
	# Wait for ocean species data to load
	if OceanSpeciesRAG.species_data.is_empty():
		await OceanSpeciesRAG.data_loaded
	
	# Print RAG stats
	var stats = OceanSpeciesRAG.get_stats()
	print("Ocean Species RAG loaded: ", stats["total_entries"], " entries, ", stats["unique_species"], " unique species")
	
	# Set up base system prompt
	var base_prompt = """
	You are my guide on a vr museum, be friendly and introduce yourself
	your name is Mariana, as the Mariana trench, you usually give short but introspective answers
	You have access to detailed information about ocean species in the Osa region of Costa Rica.
	"""
	
	LLMClient.set_system_prompt(base_prompt)
	
	# Example: Get a random species to talk about
	var random_entry = OceanSpeciesRAG.get_random_species_entry()
	print("\nRandom species: ", OceanSpeciesRAG.format_entry(random_entry))
	
	# Example: Search for specific species information
	var query = "Tell me about surgeonfish"
	var rag_result = OceanSpeciesRAG.query_with_context(query, 3)
	
	print("\nRAG Search Results for '", query, "':")
	print("Found ", rag_result["count"], " relevant entries")
	
	# Build prompt with RAG context
	var prompt_with_context = query + "\n\nContext:\n" + rag_result["context"]
	
	# Send to LLM with context
	var resp = await LLMClient.send_prompt(prompt_with_context)
	print("\nLLM Response:\n", resp)
	
	# Text-to-speech
	var voices = DisplayServer.tts_get_voices_for_language("en")
	const robo_voice_id = 38
	var robo_voice = voices[robo_voice_id]
	
	DisplayServer.tts_speak(resp, robo_voice)
	#DisplayServer.tts_stop()
	
	
		
	
