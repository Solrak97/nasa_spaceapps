# Ocean Species RAG - Quick Reference

## 🚀 Setup (One-Time)

Data loads automatically on startup. Wait for it:
```gdscript
func _ready():
    if OceanSpeciesRAG.species_data.is_empty():
        await OceanSpeciesRAG.data_loaded
```

---

## 🔍 Quick Search Examples

Just use `search_species()` with any query - it searches across all fields:

```gdscript
# Search by species name
var results = OceanSpeciesRAG.search_species("surgeonfish", 5)

# Search by habitat
var reef_fish = OceanSpeciesRAG.search_species("coral reef", 5)

# Search by depth
var shallow = OceanSpeciesRAG.search_species("shallow", 5)

# Search by trophic role
var herbivores = OceanSpeciesRAG.search_species("herbivore", 5)

# Combine keywords
var results = OceanSpeciesRAG.search_species("coral reef predator", 5)

# Get all entries for specific species (exact name)
var entries = OceanSpeciesRAG.get_species_by_name("Yellowfin surgeonfish")

# Random species
var random = OceanSpeciesRAG.get_random_species_entry()
```

---

## 🤖 RAG + LLM Integration

### Simple RAG Query (Recommended)

```gdscript
var question = "What fish live in coral reefs?"

# Get context
var rag = OceanSpeciesRAG.query_with_context(question, 5)

# Add context to prompt
var prompt = question + "\n\nContext:\n" + rag["context"]

# Ask LLM
var response = await LLMClient.send_prompt(prompt)
```

### With Chat Context

```gdscript
LLMClient.set_system_prompt("""
You are Mariana, an ocean guide.
Use provided context to answer accurately.
""")

var question = "Tell me about surgeonfish"
var rag = OceanSpeciesRAG.query_with_context(question, 3)
var prompt = question + "\n\n" + rag["context"]

var response = await LLMClient.send_chat_message(prompt)
```

### With Audio Pipeline

```gdscript
GenaiAudioPipeline.set_system_prompt("You are an ocean expert.")

var question = "What are herbivores?"
var rag = OceanSpeciesRAG.query_with_context(question, 5)
var prompt = question + "\n\nContext:\n" + rag["context"]

await GenaiAudioPipeline.chat_and_play(prompt, $AudioPlayer)
```

---

## 📊 Utility Functions

```gdscript
# Statistics
var stats = OceanSpeciesRAG.get_stats()
print(stats["total_entries"])      # 2960
print(stats["unique_species"])     # Number of unique species
print(stats["species_names"])      # Array of names

# List all species
var all = OceanSpeciesRAG.list_all_species()

# Format for display
var entry = OceanSpeciesRAG.get_random_species_entry()
print(OceanSpeciesRAG.format_entry(entry))
```

---

## 🎯 Complete Example

```gdscript
extends Node3D

func _ready():
    # Wait for RAG
    if OceanSpeciesRAG.species_data.is_empty():
        await OceanSpeciesRAG.data_loaded
    
    # Configure
    LLMClient.configure("http://localhost:11434", "", "llama3.2")
    LLMClient.set_system_prompt("""
    You are Mariana, an ocean museum guide.
    Answer concisely using provided species context.
    """)
    
    # Ask question with RAG
    await ask_with_rag("What fish live in mangroves?")

func ask_with_rag(question: String):
    # Get relevant species
    var rag = OceanSpeciesRAG.query_with_context(question, 5)
    
    print("Found ", rag["count"], " relevant species")
    
    # Build prompt
    var prompt = question + "\n\nSpecies Context:\n" + rag["context"]
    
    # Get response
    var response = await LLMClient.send_prompt(prompt)
    print(response)
```

---

## 🔔 Signals

```gdscript
OceanSpeciesRAG.data_loaded.connect(func(count): 
    print("Loaded ", count, " entries"))

OceanSpeciesRAG.data_load_failed.connect(func(error): 
    print("Error: ", error))
```

---

## 🎨 Advanced Patterns

### Progressive Context
```gdscript
# Start with few entries
var rag = OceanSpeciesRAG.query_with_context(question, 3)
var response = await LLMClient.send_prompt(question + "\n" + rag["context"])

# If incomplete, add more context
if "don't know" in response.to_lower():
    rag = OceanSpeciesRAG.query_with_context(question, 10)
    response = await LLMClient.send_prompt(question + "\n" + rag["context"])
```

### Cached Searches
```gdscript
var reef_species_cache = null

func get_reef_species():
    if reef_species_cache == null:
        reef_species_cache = OceanSpeciesRAG.search_species("reef", 10)
    return reef_species_cache
```

### Context Size Control
```gdscript
# Build context with length limit
var entries = OceanSpeciesRAG.search_species("predator", 10)
var context = OceanSpeciesRAG.build_context_string(entries, 1500)  # max 1500 chars
```

---

## 💡 Tips

1. **Wait for data** before using any RAG functions
2. **Use 5-10 entries** for context (good balance)
3. **Limit context length** to avoid overwhelming LLM
4. **Cache common searches** for performance
5. **Clear LLM context** when changing topics
6. **Use specific keywords** for better search results

---

## 📈 Data Structure

```json
{
  "topic": "Species: Common Name (Scientific Name)",
  "data": "Habitat: X. Depth: Y. Trophic role: Z. Notes: ... Region: ..."
}
```

**2,960 entries** covering ocean species in Costa Rica's Osa region.

---

## 🐛 Common Issues

| Problem | Solution |
|---------|----------|
| Empty results | Use broader keywords |
| Context too long | Reduce max_results or max_length |
| Species not found | Use `search_species()` instead of `get_species_by_name()` |
| Slow responses | Limit context entries (3-5) |

---

## 📚 Full Documentation

See `OCEAN_SPECIES_RAG_GUIDE.md` for complete API reference and detailed examples.

---

**Quick Start: Add RAG to any question!**

```gdscript
var rag = OceanSpeciesRAG.query_with_context("your question", 5)
var response = await LLMClient.send_prompt("your question\n\n" + rag["context"])
```

🌊 **That's it!** Your agent now has ocean species knowledge.

