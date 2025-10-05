# Ocean Species RAG System Guide

## 📚 Overview

The **Ocean Species RAG (Retrieval-Augmented Generation)** system provides access to a comprehensive knowledge base of **2,960+ ocean species entries** from the Osa region of Costa Rica. It enables your AI agent to answer questions with accurate, context-aware information about marine life.

## 🗄️ Data Structure

Each entry in the knowledge base contains:

```json
{
  "topic": "Species: Yellowfin surgeonfish (Acanthurus xanthopterus)",
  "data": "Habitat: nearshore sandy flats. Depth: midwater 0–100 m. Trophic role: invertivore. Notes: forms schools when foraging, occasionally enters turbid water. Region: Tropical Eastern Pacific; observed in Costa Rica waters including Osa."
}
```

### Data Fields:
- **Topic**: Common name and scientific name of the species
- **Data**: Structured information including:
  - **Habitat**: Where the species lives
  - **Depth**: Depth range in meters
  - **Trophic role**: Feeding behavior (herbivore, carnivore, planktivore, etc.)
  - **Notes**: Additional behavioral and ecological information
  - **Region**: Geographic location

## 🚀 Setup

The RAG system is automatically configured as an autoload in `project.godot`:

```gdscript
[autoload]
OceanSpeciesRAG="*res://custom_pluggins/ocean_species_rag.gd"
```

Data is loaded automatically on startup from:
```
res://data/ocean_species_minicards_osa_CR.json
```

## 📖 Basic Usage

### 1. Wait for Data to Load

```gdscript
func _ready():
    # Wait for ocean species data to load
    if OceanSpeciesRAG.species_data.is_empty():
        await OceanSpeciesRAG.data_loaded
    
    print("RAG system ready!")
```

### 2. Get Statistics

```gdscript
var stats = OceanSpeciesRAG.get_stats()
print("Total entries: ", stats["total_entries"])
print("Unique species: ", stats["unique_species"])
print("Species list: ", stats["species_names"])
```

## 🔍 Search Methods

### Main Search (Query-Based)

Search across all fields using any keywords - habitat, depth, trophic role, species name, etc.:

```gdscript
# Search by species name
var results = OceanSpeciesRAG.search_species("surgeonfish", 10)

# Search by habitat
var reef_species = OceanSpeciesRAG.search_species("coral reef", 5)

# Search by depth
var shallow = OceanSpeciesRAG.search_species("shallow", 5)
var mid_depth = OceanSpeciesRAG.search_species("30-60 m", 5)

# Search by trophic role
var herbivores = OceanSpeciesRAG.search_species("herbivore", 5)
var predators = OceanSpeciesRAG.search_species("apex predator", 5)

# Combine multiple keywords
var results = OceanSpeciesRAG.search_species("coral reef herbivore", 10)

# Print results
for entry in results:
    print(OceanSpeciesRAG.format_entry(entry))
```

### Get All Entries for a Species

If you know the exact species name:

```gdscript
var entries = OceanSpeciesRAG.get_species_by_name("Yellowfin surgeonfish")
print("Found ", entries.size(), " entries for this species")
```

## 🤖 RAG Integration with LLM

### Method 1: Query with Context (Recommended)

The simplest way to get context for a query:

```gdscript
var query = "What fish live in coral reefs?"
var rag_result = OceanSpeciesRAG.query_with_context(query, 5)

print("Found ", rag_result["count"], " relevant entries")
print("Context:\n", rag_result["context"])

# Use the context with your LLM
var prompt_with_context = query + "\n\nContext:\n" + rag_result["context"]
var response = await LLMClient.send_prompt(prompt_with_context)
```

### Method 2: Enhanced System Prompt

Add species knowledge to your system prompt:

```gdscript
var base_prompt = """
You are Mariana, a marine biologist guide.
You help visitors learn about ocean species.
"""

var query = "Tell me about reef predators"
var enhanced_prompt = OceanSpeciesRAG.get_enhanced_system_prompt(
    base_prompt, 
    query, 
    5  # max context entries
)

LLMClient.set_system_prompt(enhanced_prompt)
var response = await LLMClient.send_prompt(query)
```

### Method 3: Manual Context Building

For fine-grained control:

```gdscript
# Search for relevant species
var entries = OceanSpeciesRAG.search_species("mangrove fish", 3)

# Build context string
var context = OceanSpeciesRAG.build_context_string(entries, 2000)

# Create your own prompt structure
var full_prompt = """
User Question: What fish live in mangroves?

Relevant Species Information:
""" + context + """

Please answer the question using the species information provided.
"""

var response = await LLMClient.send_prompt(full_prompt)
```

## 🎯 Complete Example: Interactive Museum Guide

```gdscript
extends Node3D

@onready var audio_player = $AudioStreamPlayer

func _ready():
    # Wait for data
    if OceanSpeciesRAG.species_data.is_empty():
        await OceanSpeciesRAG.data_loaded
    
    # Configure LLM
    LLMClient.configure("http://localhost:11434", "", "llama3.2")
    
    # Set system prompt
    LLMClient.set_system_prompt("""
    You are Mariana, a friendly marine biologist guide at a VR ocean museum.
    You help visitors learn about ocean species in Costa Rica's Osa region.
    Give short, engaging answers (2-3 sentences).
    When asked about species, use the provided context to give accurate information.
    """)
    
    # Start with introduction
    await introduce_yourself()

func introduce_yourself():
    var query = "Introduce yourself and mention you know about ocean species"
    await ask_agent(query)

func ask_agent(user_question: String):
    print("\nUser: ", user_question)
    
    # Get relevant species context
    var rag_result = OceanSpeciesRAG.query_with_context(user_question, 5)
    
    # Build prompt with context
    var prompt = user_question
    if rag_result["count"] > 0:
        prompt += "\n\nRelevant Species Context:\n" + rag_result["context"]
    
    # Get LLM response
    var response = await LLMClient.send_prompt(prompt)
    print("Mariana: ", response)
    
    # Optional: Use text-to-speech
    var voices = DisplayServer.tts_get_voices_for_language("en")
    if voices.size() > 0:
        DisplayServer.tts_speak(response, voices[0])

# Example: User asks a question
func _on_user_question(question: String):
    await ask_agent(question)

# Example questions:
# - "What fish live in coral reefs?"
# - "Tell me about herbivores in the Osa region"
# - "What species live in shallow water?"
# - "What's a surgeonfish?"
```

## 🎮 VR Integration Example

```gdscript
extends Node3D

@onready var spatial_audio = $AudioStreamPlayer3D

func _ready():
    # Setup
    if OceanSpeciesRAG.species_data.is_empty():
        await OceanSpeciesRAG.data_loaded
    
    GenaiAudioPipeline.set_system_prompt("""
    You are Mariana, a VR museum guide specializing in ocean life.
    Keep responses very concise for VR (1-2 sentences).
    """)

func on_player_looks_at_fish(fish_name: String):
    # Get species information
    var entries = OceanSpeciesRAG.get_species_by_name(fish_name)
    
    if entries.is_empty():
        await speak("I don't have information about that species yet.")
        return
    
    # Use first entry for context
    var context = OceanSpeciesRAG.build_context_string([entries[0]], 500)
    
    # Generate natural description
    var prompt = "Briefly describe this fish: " + fish_name + "\n\nContext:\n" + context
    
    # Play audio response
    await GenaiAudioPipeline.chat_and_play(prompt, spatial_audio)

func speak(text: String):
    await GenaiAudioPipeline.chat_and_play(text, spatial_audio)
```

## 📊 Utility Functions

### Random Species

```gdscript
# Get one random species
var random_entry = OceanSpeciesRAG.get_random_species_entry()

# Get multiple random species
var random_entries = OceanSpeciesRAG.get_random_species_entries(5)
```

### List All Species

```gdscript
var all_species = OceanSpeciesRAG.list_all_species()
print("Available species: ", all_species)
```

### Format Entry for Display

```gdscript
var entry = OceanSpeciesRAG.get_random_species_entry()
var formatted = OceanSpeciesRAG.format_entry(entry)
print(formatted)
# Output:
# Species: Yellowfin surgeonfish (Acanthurus xanthopterus)
# Habitat: nearshore sandy flats. Depth: midwater 0–100 m...
```

## 🎨 Advanced Patterns

### Context-Aware Conversation

```gdscript
func start_conversation_about_habitat(habitat: String):
    # Get species from that habitat
    var species = OceanSpeciesRAG.search_species(habitat, 5)
    
    if species.is_empty():
        return "I don't have information about species in that habitat."
    
    # Build rich context
    var context = OceanSpeciesRAG.build_context_string(species)
    
    # Set up conversation
    LLMClient.clear_context()
    LLMClient.set_system_prompt("""
    You are discussing species found in """ + habitat + """.
    Use the provided context to give accurate, engaging information.
    
    """ + context)
    
    # Now user can ask multiple questions about this habitat
    var intro = await LLMClient.send_chat_message(
        "Tell me what's interesting about this habitat"
    )
    return intro
```

### Progressive Context Loading

```gdscript
func ask_with_progressive_context(question: String):
    # Start with small context
    var rag_result = OceanSpeciesRAG.query_with_context(question, 3)
    var prompt = question + "\n\n" + rag_result["context"]
    var response = await LLMClient.send_prompt(prompt)
    
    # If response seems incomplete, add more context
    if "don't know" in response.to_lower() or "not sure" in response.to_lower():
        rag_result = OceanSpeciesRAG.query_with_context(question, 10)
        prompt = question + "\n\n" + rag_result["context"]
        response = await LLMClient.send_prompt(prompt)
    
    return response
```

## 🔔 Signals

```gdscript
func _ready():
    OceanSpeciesRAG.data_loaded.connect(_on_data_loaded)
    OceanSpeciesRAG.data_load_failed.connect(_on_data_failed)

func _on_data_loaded(count: int):
    print("Loaded ", count, " ocean species entries")

func _on_data_failed(error: String):
    print("Failed to load data: ", error)
```

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `OceanSpeciesRAG` not found | Check autoload setup in `project.godot` |
| Data file not found | Ensure `ocean_species_minicards_osa_CR.json` is in `res://data/` |
| Empty search results | Try broader keywords or use different search methods |
| Context too long | Reduce `max_results` parameter or `max_length` in `build_context_string()` |
| Species name not found | Use `search_species()` instead of `get_species_by_name()` for fuzzy matching |

## 💡 Best Practices

1. **Always wait for data to load** before using RAG functions
2. **Limit context size** to avoid overwhelming the LLM (5-10 entries usually sufficient)
3. **Use specific keywords** in searches for better results
4. **Combine RAG with system prompts** for consistent behavior
5. **Clear LLM context** when switching topics for better performance
6. **Cache search results** if asking multiple related questions
7. **Use formatted output** for debugging and display

## 📈 Performance Tips

```gdscript
# Cache common searches
var cached_reef_species = null

func get_reef_species():
    if cached_reef_species == null:
        cached_reef_species = OceanSpeciesRAG.search_by_habitat("coral reef", 10)
    return cached_reef_species

# Limit context for faster responses
var quick_context = OceanSpeciesRAG.query_with_context(query, 3)  # Fast
var detailed_context = OceanSpeciesRAG.query_with_context(query, 20)  # Slower but more complete
```

## 📚 API Reference Summary

### Search Functions
- `search_species(query, max_results)` - Main search function (searches all fields)
- `get_species_by_name(name)` - Get all entries for exact species name

### RAG Integration
- `query_with_context(query, max_entries)` - Get context for query
- `build_context_string(entries, max_length)` - Format entries as string
- `get_enhanced_system_prompt(base, query, max_entries)` - Enhanced prompt

### Utility Functions
- `get_stats()` - Knowledge base statistics
- `list_all_species()` - All species names
- `get_random_species_entry()` - Random single entry
- `get_random_species_entries(count)` - Random multiple entries
- `format_entry(entry)` - Pretty print entry

### Signals
- `data_loaded(count)` - Emitted when data loads successfully
- `data_load_failed(error)` - Emitted on load failure

---

## 🌊 Example Questions to Test

Try these questions with your RAG-powered agent:

- "What fish live in coral reefs near Osa?"
- "Tell me about surgeonfish"
- "What species are herbivores?"
- "What lives in shallow water?"
- "Which fish are apex predators?"
- "Tell me about mangrove species"
- "What invertivores live in the Osa region?"
- "Describe a random ocean species"

All of these work with the single `search_species()` function - just pass the query!

---

**Happy Ocean Exploring! 🐠🌊**

