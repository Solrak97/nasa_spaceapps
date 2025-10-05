# Ocean VR Agent - Setup Guide

## 🎯 Quick Setup

### 1. Start Microservices

```bash
cd ../microservices
./install_all.sh    # First time only
./start_all.sh      # Start TTS + RAG services
```

### 2. Configure Autoloads in Godot

Go to **Project → Project Settings → Autoload** and add:

| Name | Path | Enabled |
|------|------|---------|
| `LLMClient` | `res://custom_pluggins/llm_client.gd` | ✅ |
| `TTSClient` | `res://custom_pluggins/tts_client.gd` | ✅ |
| `GenaiAudioPipeline` | `res://custom_pluggins/genai_audio_pipeline.gd` | ✅ |

### 3. Use the Example

Open `ocean_vr_agent_example.gd` - it shows everything you need!

---

## 📁 Core Files (Don't Delete!)

```
app/
├── custom_pluggins/
│   ├── llm_client.gd              ← LLM connection (Ollama)
│   ├── tts_client.gd              ← Text-to-speech
│   ├── genai_audio_pipeline.gd   ← Main pipeline (RAG-enabled!)
│   └── rag_client.gd              ← RAG service connection
│
├── ocean_vr_agent_example.gd      ← 🌟 YOUR STARTING POINT
├── knowledge_base.json            ← Optional: preload knowledge
└── SETUP.md                       ← This file
```

---

## 🚀 Usage

### Basic Chat

```gdscript
extends Node3D

@onready var audio = $AudioPlayer

func _ready():
    # Configure
    GenaiAudioPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
    GenaiAudioPipeline.configure_tts("http://localhost:8000", "en-GB-RyanNeural")
    await GenaiAudioPipeline.enable_rag()
    
    # Set personality
    GenaiAudioPipeline.set_system_prompt("You are Mariana, an ocean guide...")
    
    # Add knowledge
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "topic with keywords",
        "Your information here..."
    )
    
    # Chat!
    await GenaiAudioPipeline.chat_and_play("Hello!", audio)
```

### VR Voice Input

```gdscript
func on_user_speech(text: String):
    await GenaiAudioPipeline.chat_and_play(text, audio_player)
```

---

## 🎨 Customization

### Change Voice

```gdscript
GenaiAudioPipeline.configure_tts("http://localhost:8000", "en-US-JennyNeural")
# Available: en-GB-RyanNeural, en-US-JennyNeural, en-GB-SoniaNeural, etc.
```

### Add Knowledge

```gdscript
await GenaiAudioPipeline.add_knowledge_to_rag(
    "clownfish nemo reef orange fish",
    "Clownfish live in sea anemones..."
)
```

### Change Personality

```gdscript
GenaiAudioPipeline.set_system_prompt("""
Your new personality here...
""")
```

---

## 🐛 Troubleshooting

### No audio?
- Check microservices are running: `curl localhost:8000 && curl localhost:8001`
- Check Ollama is running: `curl localhost:11434`

### RAG not working?
- Start services: `cd microservices && ./start_all.sh`
- Check in Godot: `await GenaiAudioPipeline.enable_rag()` returns true

### Voice sounds wrong?
- Change voice: `configure_tts("http://localhost:8000", "different-voice")`
- See available voices in TTS docs

---

## 📚 More Info

- **Complete example**: `ocean_vr_agent_example.gd`
- **Project quickstart**: `../QUICKSTART.md`
- **Microservices**: `../microservices/README.md`

---

**That's it! Everything you need is in `ocean_vr_agent_example.gd`** 🌊🤖

