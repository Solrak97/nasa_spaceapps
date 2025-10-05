# GenAI Audio Pipeline - Quick Reference Card

## 🚀 Setup (One-Time)

### In Godot Editor:
```
Project → Project Settings → Autoload
Name: GenAIPipeline
Path: res://custom_pluggins/genai_audio_pipeline.gd
[Add]
```

### Start Services:
```bash
# Terminal 1: Ollama
ollama serve

# Terminal 2: TTS
cd microservices && uv run fastapi dev tts/app.py
```

---

## 📝 Basic Usage

```gdscript
# Configure once (in main scene)
func _ready():
    GenAIPipeline.set_system_prompt("You are a helpful guide")

# Use anywhere
func talk():
    var player = AudioStreamPlayer.new()
    add_child(player)
    await GenAIPipeline.chat_and_play("Hello!", player)
```

---

## 🎯 Common Patterns

### Simple One-Shot
```gdscript
var audio = await GenAIPipeline.chat_to_audio("Tell me about Mars")
$AudioPlayer.stream = audio
$AudioPlayer.play()
```

### Multi-Turn Conversation
```gdscript
await GenAIPipeline.chat_and_play("Hello!", $Audio)
await $Audio.finished

await GenAIPipeline.chat_and_play("Tell me more", $Audio)
await $Audio.finished
# AI remembers previous message!
```

### Custom Voice
```gdscript
await GenAIPipeline.chat_and_play(
    "Hello!",
    $Audio,
    "en-US-JennyNeural"  # Female American voice
)
```

### Without Context (One-Off)
```gdscript
var audio = await GenAIPipeline.simple_prompt_to_audio(
    "Say hello in Spanish"
)
```

---

## 🧹 Context Management

```gdscript
# Clear conversation
GenAIPipeline.clear_context()

# Get conversation size
var count = GenAIPipeline.get_context_size()

# Get full history
var history = GenAIPipeline.get_context()

# Get last AI response
var last = GenAIPipeline.get_last_response()
```

---

## 🎤 Available Voices

```gdscript
"en-GB-RyanNeural"      # British Male (default)
"en-GB-SoniaNeural"     # British Female
"en-US-GuyNeural"       # American Male
"en-US-JennyNeural"     # American Female
"en-AU-WilliamNeural"   # Australian Male
"en-AU-NatashaNeural"   # Australian Female
```

---

## 📡 Signals

```gdscript
func _ready():
    GenAIPipeline.processing_started.connect(
        func(msg): print("Processing:", msg)
    )
    GenAIPipeline.llm_response_ready.connect(
        func(resp): print("Response:", resp)
    )
    GenAIPipeline.audio_ready.connect(
        func(audio): print("Audio ready!")
    )
    GenAIPipeline.processing_complete.connect(
        func(msg, resp, audio): print("Complete!")
    )
    GenAIPipeline.processing_failed.connect(
        func(error): print("Error:", error)
    )
```

---

## ⚙️ Configuration

```gdscript
# Change LLM settings
GenAIPipeline.configure_llm(
    "http://localhost:11434",  # URL
    "",                        # API key (empty for Ollama)
    "llama3.2"                 # Model
)

# Change TTS settings
GenAIPipeline.configure_tts(
    "http://0.0.0.0:8000",     # URL
    "en-GB-RyanNeural"         # Default voice
)

# Set AI personality
GenAIPipeline.set_system_prompt("""
You are a friendly museum guide.
Keep answers short (2-3 sentences).
""")
```

---

## 🎮 Complete Example

```gdscript
extends Node3D

@onready var player = $AudioStreamPlayer

func _ready():
    # Configure AI personality
    GenAIPipeline.set_system_prompt("""
    You are Mars, a VR museum guide.
    Be friendly and concise.
    """)
    
    # Start conversation
    await _intro()

func _intro():
    await GenAIPipeline.chat_and_play(
        "Introduce yourself to the visitor",
        player
    )
    await player.finished

func on_user_question(question: String):
    # Stop current audio
    if player.playing:
        player.stop()
    
    # Respond to question
    await GenAIPipeline.chat_and_play(question, player)
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| `GenAIPipeline` not found | Check autoload setup in Project Settings |
| Audio is `null` | Check Ollama (`:11434`) and TTS (`:8000`) are running |
| No context | Use `chat_to_audio()` not `simple_prompt_to_audio()` |
| Slow responses | Clear context: `GenAIPipeline.clear_context()` |
| Wrong voice | Pass voice as 3rd param: `chat_and_play(msg, player, "en-US-JennyNeural")` |

---

## 📚 Full Documentation

- `GENAI_PIPELINE_GUIDE.md` - Complete API reference
- `AUTOLOAD_SETUP.md` - Detailed setup and patterns
- `LLM_CHAT_GUIDE.md` - LLM client details
- `agent_audio_pipeline.gd` - Working demo

---

## 🎯 Quick Commands

```bash
# Test Ollama
curl http://localhost:11434/api/generate \
  -d '{"model":"llama3.2","prompt":"hi","stream":false}'

# Test TTS
curl http://0.0.0.0:8000/health

# Pull Ollama model
ollama pull llama3.2

# List available models
ollama list
```

---

## 💡 Pro Tips

1. **Configure once** in main scene
2. **Clear context** when changing topics
3. **Use signals** for loading indicators
4. **Monitor context size** to avoid slowdowns
5. **Handle errors** gracefully
6. **Use 3D audio** players for spatial sound

```gdscript
# Use AudioStreamPlayer3D for spatial audio in VR
@onready var spatial_audio = AudioStreamPlayer3D.new()

func _ready():
    add_child(spatial_audio)
    spatial_audio.max_distance = 10.0
    await GenAIPipeline.chat_and_play("Hello!", spatial_audio)
```

---

**Happy Coding! 🚀**

