# 🌊 NASA Space Apps - VR Ocean Museum

RAG-powered voice agent for an immersive VR ocean museum experience.

## 🚀 Quick Start

```bash
# 1. Install dependencies
cd microservices
./install_all.sh

# 2. Start services
./start_all.sh

# 3. Open Godot project
cd ../app
# Open in Godot 4.x

# 4. Check ocean_vr_agent_example.gd for complete example!
```

## 📁 Project Structure

```
nasa_spaceapps/
├── microservices/           ← TTS & RAG services
│   ├── start_all.sh        ← Start everything
│   ├── install_all.sh      ← Install dependencies
│   └── pyproject.toml      ← All dependencies (uv)
│
├── app/                     ← Godot project
│   ├── ocean_vr_agent_example.gd  ← 🌟 START HERE!
│   ├── SETUP.md            ← Setup guide
│   └── custom_pluggins/    ← Core scripts
│
├── QUICKSTART.md            ← Full quickstart guide
└── README.md                ← This file
```

## ✨ Features

- 🤖 **RAG-Powered Agent**: Context-aware responses using TF-IDF retrieval
- 🎤 **Text-to-Speech**: Natural voice synthesis
- 🧠 **LLM Integration**: Ollama (llama3.2)
- 📚 **Custom Knowledge**: Easy-to-add domain facts
- 🎮 **VR-Ready**: Audio playback, voice interaction

## 📚 Documentation

| File | Purpose |
|------|---------|
| `QUICKSTART.md` | Complete setup walkthrough |
| `app/SETUP.md` | Godot configuration |
| `app/ocean_vr_agent_example.gd` | Complete working example |
| `microservices/README.md` | Service management |

## 🎯 Key Components

### Microservices
- **TTS** (port 8000): Text-to-speech conversion
- **RAG** (port 8001): Knowledge retrieval (TF-IDF)

### Godot Autoloads
- `LLMClient`: Ollama connection
- `TTSClient`: TTS connection
- `GenaiAudioPipeline`: Main pipeline (RAG-enabled)

## 💡 Usage Example

```gdscript
func _ready():
    # Configure services
    GenaiAudioPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
    GenaiAudioPipeline.configure_tts("http://localhost:8000", "en-GB-RyanNeural")
    await GenaiAudioPipeline.enable_rag()
    
    # Set personality
    GenaiAudioPipeline.set_system_prompt("You are Mariana, an ocean guide...")
    
    # Add knowledge
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "mariana trench depth ocean",
        "The Mariana Trench is 11,000 meters deep..."
    )
    
    # Chat!
    await GenaiAudioPipeline.chat_and_play("Tell me about the ocean", $AudioPlayer)
```

## 🛠️ Prerequisites

- Python 3.9+
- Godot 4.x
- Ollama (running locally)
- uv (optional, for faster installs)

## 🚦 Getting Started

1. **Read**: `QUICKSTART.md`
2. **Check**: `app/ocean_vr_agent_example.gd`
3. **Build**: Your amazing VR experience!

## 🤝 Contributing

This is a NASA Space Apps Challenge project. Feel free to fork and adapt!

## 📝 License

See LICENSE file.

---

**Built for NASA Space Apps 2025** 🚀
**Theme: Ocean Exploration & VR Education** 🌊

