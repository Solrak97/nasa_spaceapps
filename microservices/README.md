# Microservices for NASA Space Apps VR Ocean Museum

This directory contains all the microservices needed for the VR Ocean Museum project.

## Services

1. **TTS Service** (`tts/`) - Text-to-Speech conversion
   - Port: 8000
   - Converts text to audio for the VR agent

2. **RAG Service** (`simple_rag/`) - Retrieval Augmented Generation
   - Port: 8001
   - Provides contextual knowledge retrieval for the AI agent

---

## 🚀 Quick Start - Run All Services

### Option 1: Bash Script (Mac/Linux) ⭐ Recommended

```bash
cd microservices
./start_all.sh
```

**Stop services:**
```bash
./stop_all.sh
```

### Option 2: Python Script (Cross-platform)

```bash
cd microservices
python start_all.py
```

**Stop services:**
```bash
./stop_all.sh   # Mac/Linux
# or manually kill the processes
```

### Option 3: Windows Batch Script

```cmd
cd microservices
start_all.bat
```

Services will open in separate windows. Close the windows to stop them.

### Option 4: Manual Start (Individual Services)

```bash
# Terminal 1: TTS
cd microservices/tts
python app.py

# Terminal 2: RAG
cd microservices/simple_rag
python app.py
```

---

## ✅ Verify Services Are Running

### Check TTS Service
```bash
curl http://localhost:8000/
# Should return: {"service":"TTS","status":"running"}
```

### Check RAG Service
```bash
curl http://localhost:8001/
# Should return: {"service":"Simple RAG","status":"running",...}
```

### Or visit in browser:
- TTS: http://localhost:8000/docs (FastAPI docs)
- RAG: http://localhost:8001/docs (FastAPI docs)

---

## 📝 Logs

### With startup scripts:

**Mac/Linux:**
```bash
tail -f /tmp/tts_service.log
tail -f /tmp/rag_service.log
```

**Windows:**
Check the console windows that open with `start_all.bat`

### Manual start:
Logs appear in the terminal where you started the service.

---

## 🛑 Stopping Services

### Mac/Linux:
```bash
./stop_all.sh
```

Or find and kill processes:
```bash
# Find processes
lsof -i :8000
lsof -i :8001

# Kill them
kill <PID>
```

### Windows:
- Close the command windows
- Or use Task Manager to end Python processes

### Cross-platform:
```bash
# Kill by port (Mac/Linux)
lsof -ti:8000 | xargs kill
lsof -ti:8001 | xargs kill

# Kill by name (any OS)
pkill -f "python.*app.py"
```

---

## 🔧 First-Time Setup

### Install Dependencies

#### Option 1: Using uv (Recommended - Fast!) ⚡

**Install everything at once:**
```bash
cd microservices
./install_all.sh         # Mac/Linux
install_all.bat          # Windows
```

This installs all dependencies for both TTS and RAG services from `pyproject.toml`.

**Or manually with uv:**
```bash
cd microservices
uv pip install -e .
```

**Don't have uv?** Install it:
```bash
# Mac/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows (PowerShell)
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
```

#### Option 2: Using pip (Traditional)

**Install from pyproject.toml:**
```bash
cd microservices
pip install -e .
```

**Or install individual services:**
```bash
# TTS Service
cd tts
pip install -r requirements.txt

# RAG Service
cd simple_rag
pip install -r requirements.txt
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Find what's using the port:**
```bash
# Mac/Linux
lsof -i :8000
lsof -i :8001

# Windows
netstat -ano | findstr :8000
netstat -ano | findstr :8001
```

**Kill the process:**
```bash
# Mac/Linux
kill <PID>

# Windows
taskkill /PID <PID> /F
```

### Service Won't Start

1. **Check Python version:** `python --version` (need 3.9+)
2. **Check dependencies:** Run `pip install -r requirements.txt` in each service directory
3. **Check logs:** Look at the log files or console output
4. **Check ports:** Make sure 8000 and 8001 are free

### Service Crashes Immediately

1. **Check logs:** `/tmp/*_service.log` or console output
2. **Missing dependencies:** Re-run `pip install -r requirements.txt`
3. **Wrong directory:** Make sure you're in the right directory
4. **Python path issues:** Try `python3` instead of `python`

---

## 📊 Service Status

Check if services are running:

```bash
# Quick check
curl -s http://localhost:8000/ && echo "✅ TTS OK" || echo "❌ TTS Down"
curl -s http://localhost:8001/ && echo "✅ RAG OK" || echo "❌ RAG Down"
```

---

## 🎮 Integration with Godot

Once services are running, your Godot project can use them:

```gdscript
# In Godot
GenaiAudioPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
GenaiAudioPipeline.configure_tts("http://localhost:8000", "en-GB-RyanNeural")
await GenaiAudioPipeline.enable_rag()  # Connects to port 8001

# Now everything works!
await GenaiAudioPipeline.chat_and_play("Hello!", $AudioPlayer)
```

---

## 📁 Directory Structure

```
microservices/
├── start_all.sh          # Mac/Linux startup script
├── start_all.py          # Cross-platform Python startup script  
├── start_all.bat         # Windows startup script
├── stop_all.sh           # Mac/Linux stop script
├── README.md             # This file
├── tts/                  # TTS Service
│   ├── app.py
│   └── requirements.txt
└── simple_rag/           # RAG Service
    ├── app.py
    └── requirements.txt
```

---

## 🚀 Quick Commands Cheat Sheet

```bash
# Start everything
./start_all.sh              # Mac/Linux
python start_all.py         # Any OS
start_all.bat               # Windows

# Stop everything  
./stop_all.sh               # Mac/Linux
# Close windows              # Windows

# Check status
curl localhost:8000
curl localhost:8001

# View logs
tail -f /tmp/tts_service.log
tail -f /tmp/rag_service.log

# Kill by port
lsof -ti:8000 | xargs kill
lsof -ti:8001 | xargs kill
```

---

## 💡 Tips

1. **Start services before Godot:** Make sure both services are running before you start your Godot project

2. **Check logs if issues:** Always check the log files if something isn't working

3. **Keep services running:** You can leave them running while you develop - they'll persist across Godot restarts

4. **Use separate terminal:** Run services in a separate terminal so you can see their output

5. **Automated startup:** Add `./start_all.sh` to your development workflow

---

## 📚 More Information

- **TTS Service:** See `tts/app.py` for API details
- **RAG Service:** See `simple_rag/README.md` for full documentation
- **Integration:** See main project `RAG_QUICK_REFERENCE.md`

---

**Ready to go! Start your services and launch Godot!** 🚀🌊

