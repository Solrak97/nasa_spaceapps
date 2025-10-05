# ⚡ RAG Audio Pipeline - Quick Reference

## 🚀 Setup (5 Minutes)

### Terminal 1: Start RAG Service
```bash
cd microservices/simple_rag
pip install -r requirements.txt  # One-time
python app.py                    # Runs on :8001
```

### Terminal 2: Start Godot Project
Your audio pipeline is now RAG-enabled!

---

## 💻 Code (3 Steps)

### Step 1: Enable RAG
```gdscript
func _ready():
    GenaiAudioPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
    GenaiAudioPipeline.configure_tts("http://0.0.0.0:8000", "en-GB-RyanNeural")
    
    # Enable RAG!
    await GenaiAudioPipeline.enable_rag()
    
    GenaiAudioPipeline.set_system_prompt("""
    You are Mariana, an ocean VR guide.
    Use context from the knowledge base to answer accurately.
    """)
```

### Step 2: Add Your Custom Data
```gdscript
# Add facts about YOUR domain!
await GenaiAudioPipeline.add_knowledge_to_rag(
    "topic with keywords here",  # Use keywords users might say
    """
    Your detailed information here.
    Keep it focused - 2-5 sentences.
    Include relevant facts and numbers.
    """
)
```

### Step 3: Use It (Same as Before!)
```gdscript
# Just chat - RAG works automatically!
await GenaiAudioPipeline.chat_and_play(
    "How deep is the ocean?",
    $AudioPlayer
)
# Agent automatically retrieves and uses relevant facts!
```

---

## 📚 Adding Custom Data - Quick Examples

### Example 1: Single Fact
```gdscript
await GenaiAudioPipeline.add_knowledge_to_rag(
    "mariana trench depth record",
    "The Mariana Trench is 11,000 meters deep, the deepest point on Earth."
)
```

### Example 2: Multiple Facts
```gdscript
func load_ocean_facts():
    await GenaiAudioPipeline.enable_rag()
    
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "coral reefs biodiversity ecosystem",
        "Coral reefs support 25% of marine species despite covering <1% of ocean floor."
    )
    
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "bioluminescence deep sea creatures",
        "90% of deep sea creatures produce their own light for hunting and communication."
    )
    
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "ocean temperature warming climate",
        "Ocean temperatures have risen 0.6°C since 1900, accelerating since the 1980s."
    )
```

### Example 3: Load from JSON
```gdscript
# Create res://ocean_knowledge.json:
{
    "topic 1": "Information about topic 1...",
    "topic 2": "Information about topic 2..."
}

# Load it:
func load_from_json():
    var file = FileAccess.open("res://ocean_knowledge.json", FileAccess.READ)
    if file:
        var data = JSON.parse_string(file.get_as_text())
        file.close()
        
        for topic in data.keys():
            await GenaiAudioPipeline.add_knowledge_to_rag(topic, data[topic])
```

### Example 4: Context-Aware (Dynamic)
```gdscript
# Update knowledge based on where user is
func on_entered_exhibit(exhibit_name: String):
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "current exhibit location",
        "Visitor is at the %s exhibit, featuring..." % exhibit_name
    )
```

---

## 🎯 How It Works

```
User: "How deep can submarines go?"
         ↓
RAG: Searches knowledge base
     → Finds "submarine depth technology"
         ↓
LLM: Gets question + relevant context
     → Generates accurate answer
         ↓
TTS: Converts to speech
         ↓
VR: Plays audio to user
```

**You get accurate, factual answers automatically!**

---

## 🔧 Useful Methods

```gdscript
# Enable/Disable
await GenaiAudioPipeline.enable_rag()
GenaiAudioPipeline.disable_rag()

# Add knowledge
await GenaiAudioPipeline.add_knowledge_to_rag(topic, content)

# Test retrieval (debugging)
await GenaiAudioPipeline.test_rag_retrieval("test query")

# See all knowledge
var kb = await GenaiAudioPipeline.get_all_rag_knowledge()
print("Has %d entries" % kb["count"])

# Chat (RAG automatic!)
await GenaiAudioPipeline.chat_and_play(message, audio_player)
```

---

## 📊 Signals for UI Feedback

```gdscript
# When RAG finds context
GenaiAudioPipeline.rag_context_retrieved.connect(
    func(contexts, scores):
        # Show "Accessing knowledge..." in VR
        print("Found %d facts" % contexts.size())
)

# When processing starts
GenaiAudioPipeline.processing_started.connect(
    func(msg):
        # Show thinking animation
        agent.play("thinking")
)

# When speaking
GenaiAudioPipeline.audio_ready.connect(
    func(_audio):
        # Show speaking animation
        agent.play("speaking")
)
```

---

## ✅ Best Practices

### Topic Names (Important!)
✅ **Good**: `"deep sea submersibles vehicles diving"`  
❌ **Bad**: `"info1"` or `"data"`

Use keywords users might actually say!

### Content Length
✅ **Good**: 2-5 focused sentences  
❌ **Bad**: Long rambling paragraphs

### Keywords Matter
Include synonyms and related terms in topics:
- "submarine submersible vessel underwater"
- "temperature warming heat climate"
- "depth deep pressure trench"

---

## 🐛 Troubleshooting

### RAG Service Not Available?
```bash
# Start it:
cd microservices/simple_rag
python app.py

# Check it:
curl http://localhost:8001/
```

### No Context Retrieved?
- Add more keywords to topic names
- Check: `await GenaiAudioPipeline.test_rag_retrieval("your query")`
- Add more knowledge entries

### Wrong Context?
- Improve topic keywords
- Make content more specific
- Increase chunks: `configure_rag("...", 3)`

---

## 📁 Files to Check

- **Example**: `app/agent_audio_pipeline_with_rag.gd`
- **Full Guide**: `app/custom_pluggins/RAG_AUDIO_PIPELINE_GUIDE.md`
- **Service**: `microservices/simple_rag/app.py`
- **Data**: Edit `knowledge_base` in `app.py` or add via code

---

## 🎓 Complete Working Example

```gdscript
extends Node3D

@onready var audio = $AudioPlayer

func _ready():
    # Configure
    GenaiAudioPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
    GenaiAudioPipeline.configure_tts("http://0.0.0.0:8000", "en-GB-RyanNeural")
    
    # Enable RAG
    await GenaiAudioPipeline.enable_rag()
    
    # Set personality
    GenaiAudioPipeline.set_system_prompt("""
    You are Mariana, a friendly ocean guide.
    Use knowledge base facts. Keep answers short.
    """)
    
    # Add your knowledge
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "submersible depth technology",
        "Modern submersibles can reach 6,000-11,000 meter depths using titanium hulls."
    )
    
    # Test it!
    await GenaiAudioPipeline.chat_and_play(
        "How deep can submersibles go?",
        audio
    )
    # Agent will use the fact you just added!

# For voice input
func on_user_speech(text: String):
    await GenaiAudioPipeline.chat_and_play(text, audio)
```

---

## ⚡ That's It!

Three steps to RAG-powered voice agent:
1. ✅ `await GenaiAudioPipeline.enable_rag()`
2. ✅ `add_knowledge_to_rag(topic, content)` 
3. ✅ `chat_and_play(message, audio_player)`

**Your agent now has contextual knowledge!** 🚀

---

**Need More Help?**
- Full docs: `app/custom_pluggins/RAG_AUDIO_PIPELINE_GUIDE.md`
- Examples: `app/agent_audio_pipeline_with_rag.gd`
- RAG info: `microservices/simple_rag/README.md`

