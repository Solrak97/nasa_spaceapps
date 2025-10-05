# 🚀 NASA Space Apps - VR Ocean Museum Quickstart

Get your RAG-powered VR ocean museum running in 3 steps!

---

## Prerequisites

- Python 3.9+
- Godot 4.x
- Ollama (for LLM) running locally

---

## Step 1: Install Microservices (2 minutes)

```bash
cd microservices

# Using uv (recommended - faster!)
./install_all.sh              # Mac/Linux
install_all.bat               # Windows

# OR using pip
pip install -e .
```

**Don't have uv?** Install it first:
```bash
# Mac/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows PowerShell
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

---

## Step 2: Start All Services (1 command)

```bash
cd microservices

# Mac/Linux
./start_all.sh

# Windows
start_all.bat

# OR cross-platform
python start_all.py
```

**Verify services are running:**
```bash
curl http://localhost:8000/  # TTS Service
curl http://localhost:8001/  # RAG Service
```

---

## Step 3: Configure & Run Godot

### In your Godot script:

```gdscript
extends Node3D

@onready var audio_player = $AudioPlayer

func _ready():
    # Configure all services
    GenaiAudioPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
    GenaiAudioPipeline.configure_tts("http://localhost:8000", "en-GB-RyanNeural")
    
    # Enable RAG for contextual knowledge!
    await GenaiAudioPipeline.enable_rag()
    
    # Set your AI's personality
    GenaiAudioPipeline.set_system_prompt("""
    You are Mariana, a friendly VR ocean museum guide.
    Give short, introspective answers using facts from your knowledge base.
    """)
    
    # Add your custom knowledge
    await add_ocean_knowledge()
    
    # Test it!
    await GenaiAudioPipeline.chat_and_play(
        "Tell me about the Mariana Trench",
        audio_player
    )

func add_ocean_knowledge():
    """Add your custom facts here!"""
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "mariana trench depth ocean deepest",
        "The Mariana Trench is 11,000 meters deep, the deepest point on Earth."
    )
    
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "bioluminescence deep sea creatures light",
        "90% of deep sea creatures produce their own light for hunting and defense."
    )
```

---

## That's It! 🎉

Your RAG-powered audio pipeline is ready!

---

## 📚 Next Steps

1. **Add More Knowledge**: See `RAG_QUICK_REFERENCE.md`
2. **Customize Agent**: See `RAG_AUDIO_PIPELINE_GUIDE.md`
3. **Examples**: Check `app/agent_audio_pipeline_with_rag.gd`

---

## 🛑 Stopping Services

```bash
cd microservices

# Mac/Linux
./stop_all.sh

# Windows
# Close the service windows
```

---

## 🐛 Troubleshooting

### Services won't start?
```bash
# Check if ports are free
lsof -i :8000  # TTS
lsof -i :8001  # RAG

# Check logs
tail -f /tmp/tts_service.log
tail -f /tmp/rag_service.log
```

### RAG not working?
```bash
# Make sure RAG service is running
curl http://localhost:8001/

# Test in Godot
await GenaiAudioPipeline.test_rag_retrieval("ocean")
```

### Dependencies missing?
```bash
cd microservices
./install_all.sh  # Re-run installation
```

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| `RAG_QUICK_REFERENCE.md` | Quick copy-paste guide |
| `INTEGRATION_COMPLETE.md` | Full feature overview |
| `RAG_AUDIO_PIPELINE_GUIDE.md` | Complete API docs |
| `microservices/README.md` | Service management |
| `RAG_GRANULARITY_GUIDE.md` | Knowledge structure tips |

---

## 🎮 File Structure

```
nasa_spaceapps/
├── QUICKSTART.md                    ← You are here!
├── RAG_QUICK_REFERENCE.md          ← Start here for RAG
├── microservices/
│   ├── install_all.sh              ← Install dependencies
│   ├── start_all.sh                ← Start services
│   ├── stop_all.sh                 ← Stop services
│   ├── pyproject.toml              ← All dependencies (uv)
│   ├── tts/                        ← TTS service
│   └── simple_rag/                 ← RAG service
└── app/
    ├── custom_pluggins/
    │   ├── genai_audio_pipeline.gd ← Main pipeline (RAG-enabled!)
    │   ├── rag_client.gd           ← RAG client
    │   └── llm_client.gd           ← LLM client
    └── agent_audio_pipeline_with_rag.gd ← Complete example
```

---

## ⚡ Quick Commands

```bash
# Install
cd microservices && ./install_all.sh

# Start
cd microservices && ./start_all.sh

# Check
curl localhost:8000 && curl localhost:8001

# Stop
cd microservices && ./stop_all.sh

# Logs
tail -f /tmp/tts_service.log /tmp/rag_service.log
```

---

**You're all set! Good luck with your NASA Space Apps project!** 🌊🚀🤖

