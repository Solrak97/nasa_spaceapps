# 🎯 Microservices - Single Command Setup

## ✅ What You Got

I've set up your microservices so you can **install and run everything with single commands**!

---

## 🚀 Quick Start (2 Commands)

### 1. Install Dependencies (One Time)

```bash
cd microservices
./install_all.sh         # Mac/Linux
install_all.bat          # Windows
```

**This installs EVERYTHING:**
- FastAPI (web framework)
- Uvicorn (server)
- edge-tts (text-to-speech)
- scikit-learn (RAG/TF-IDF)
- numpy (math operations)
- All other dependencies

**Using uv** (faster package manager):
- Auto-installs from `pyproject.toml`
- ~10x faster than pip
- Better dependency resolution

### 2. Start All Services (Every Time)

```bash
cd microservices
./start_all.sh           # Mac/Linux
start_all.bat            # Windows
python start_all.py      # Cross-platform
```

**This starts:**
- ✅ TTS Service (port 8000)
- ✅ RAG Service (port 8001)

**Both run in background!**

---

## 📦 Unified Dependencies with uv

All dependencies are now in **one place**: `microservices/pyproject.toml`

```toml
[project]
name = "nasa-spaceapps-microservices"
version = "0.1.0"
requires-python = ">=3.9"
dependencies = [
    # Web framework
    "fastapi>=0.115.0",
    "uvicorn[standard]>=0.30.6",
    "pydantic>=2.9.2",
    
    # TTS Service
    "edge-tts>=6.1.0",
    
    # RAG Service
    "scikit-learn>=1.5.2",
    "numpy>=1.26.4",
]
```

### Why uv?

| Feature | pip | uv |
|---------|-----|-----|
| **Speed** | ~30s | ~3s ⚡ |
| **Reliability** | Good | Better 🎯 |
| **Dependency resolution** | Sometimes fails | Always works ✅ |
| **Written in** | Python | Rust 🦀 |

---

## 🛠️ Available Scripts

All scripts are in `microservices/`:

| Script | Purpose | Platform |
|--------|---------|----------|
| `install_all.sh` | Install dependencies | Mac/Linux |
| `install_all.bat` | Install dependencies | Windows |
| `start_all.sh` | Start all services | Mac/Linux |
| `start_all.py` | Start all services | Cross-platform |
| `start_all.bat` | Start all services | Windows |
| `stop_all.sh` | Stop all services | Mac/Linux |

---

## 📋 Complete Workflow

### First Time Setup:

```bash
# 1. Install uv (if you don't have it)
curl -LsSf https://astral.sh/uv/install.sh | sh    # Mac/Linux
# OR
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"    # Windows

# 2. Install dependencies
cd microservices
./install_all.sh

# 3. Start services
./start_all.sh

# ✅ Done! Services running on:
#    - TTS: http://localhost:8000
#    - RAG: http://localhost:8001
```

### Daily Development:

```bash
# Start services
cd microservices && ./start_all.sh

# ... work on your project ...

# Stop services (when done)
./stop_all.sh
```

---

## ✅ Verify Everything Works

```bash
# Check TTS Service
curl http://localhost:8000/
# Expected: {"service":"TTS","status":"running"}

# Check RAG Service  
curl http://localhost:8001/
# Expected: {"service":"Simple RAG","status":"running",...}
```

Or visit in browser:
- http://localhost:8000/docs (TTS API docs)
- http://localhost:8001/docs (RAG API docs)

---

## 🐛 Troubleshooting

### "uv not found"

**Install uv:**
```bash
# Mac/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows PowerShell (as Administrator)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Reload shell
source ~/.bashrc   # or restart terminal
```

### "Dependencies not installed"

```bash
cd microservices
./install_all.sh
```

### "Port already in use"

```bash
# Find what's using the port
lsof -i :8000    # TTS
lsof -i :8001    # RAG

# Kill it
kill <PID>

# Or use stop script
./stop_all.sh
```

### Services crash immediately

```bash
# Check logs
tail -f /tmp/tts_service.log
tail -f /tmp/rag_service.log

# Re-install dependencies
cd microservices
./install_all.sh

# Try again
./start_all.sh
```

---

## 📊 What Gets Installed

```
Installing NASA Space Apps Microservices Dependencies
══════════════════════════════════════════════════════

✅ Core Web Framework
   - fastapi (0.115.0+)
   - uvicorn (0.30.6+)
   - pydantic (2.9.2+)

✅ TTS Service
   - edge-tts (6.1.0+)

✅ RAG Service  
   - scikit-learn (1.5.2+)
   - numpy (1.26.4+)

Total size: ~100 MB
Install time: ~10 seconds with uv
```

---

## 🔄 Managing Services

### Start
```bash
./start_all.sh    # Starts both TTS and RAG
```

### Stop
```bash
./stop_all.sh     # Stops both services
```

### Restart
```bash
./stop_all.sh && ./start_all.sh
```

### Check Status
```bash
curl localhost:8000 && echo "✅ TTS OK" || echo "❌ TTS Down"
curl localhost:8001 && echo "✅ RAG OK" || echo "❌ RAG Down"
```

### View Logs
```bash
tail -f /tmp/tts_service.log
tail -f /tmp/rag_service.log
```

---

## 🎮 Integration with Godot

Once services are running:

```gdscript
func _ready():
    # Services auto-discovered!
    GenaiAudioPipeline.configure_tts("http://localhost:8000")
    await GenaiAudioPipeline.enable_rag()  # Auto finds :8001
    
    # Just use it!
    await GenaiAudioPipeline.chat_and_play("Hello!", $AudioPlayer)
```

---

## 📁 File Structure

```
microservices/
├── pyproject.toml          ← All dependencies (uv)
├── uv.lock                 ← Lock file (auto-generated)
│
├── install_all.sh          ← Install everything (Mac/Linux)
├── install_all.bat         ← Install everything (Windows)
│
├── start_all.sh            ← Start all services (Mac/Linux)
├── start_all.py            ← Start all services (cross-platform)
├── start_all.bat           ← Start all services (Windows)
├── stop_all.sh             ← Stop all services
│
├── README.md               ← Detailed docs
│
├── tts/                    ← TTS Service
│   ├── app.py
│   └── requirements.txt    ← Also works with pip
│
└── simple_rag/             ← RAG Service
    ├── app.py
    └── requirements.txt    ← Also works with pip
```

---

## 💡 Pro Tips

### Tip 1: Keep Services Running
Leave services running while you develop - they persist across Godot restarts!

### Tip 2: Use uv for Speed
Installing with `uv` is ~10x faster than `pip`

### Tip 3: Check Logs for Errors
If something doesn't work, always check the logs:
```bash
tail -f /tmp/tts_service.log /tmp/rag_service.log
```

### Tip 4: One Terminal for Services
Run services in a dedicated terminal so you can see output

### Tip 5: Auto-start on Boot (Optional)
Add to your shell profile:
```bash
# ~/.bashrc or ~/.zshrc
alias start-nasa="cd ~/path/to/nasa_spaceapps/microservices && ./start_all.sh"
```

---

## 🎯 Summary

| What | Command |
|------|---------|
| **Install once** | `./install_all.sh` |
| **Start daily** | `./start_all.sh` |
| **Stop when done** | `./stop_all.sh` |
| **Check status** | `curl localhost:8000 && curl localhost:8001` |

**That's it!** Two commands and you're ready to develop! 🚀

---

## 📚 More Information

- **Service docs**: `microservices/README.md`
- **Quick start**: `QUICKSTART.md`
- **RAG usage**: `RAG_QUICK_REFERENCE.md`
- **Complete guide**: `INTEGRATION_COMPLETE.md`

---

**You can now start all your microservices with a single command!** 🎉

