#!/bin/bash
# Start all microservices for NASA Space Apps VR Ocean Museum
# Usage: ./start_all.sh

echo "🚀 Starting NASA Space Apps Microservices..."
echo "============================================"

# Get the directory of this script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Check if Python is available
if ! command -v python &> /dev/null && ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python not found!"
    echo "Please install Python 3.9+ first"
    exit 1
fi

# Use python3 if available, otherwise python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

echo "Using Python: $PYTHON_CMD"

# Check if dependencies are installed
if ! $PYTHON_CMD -c "import fastapi" &> /dev/null; then
    echo ""
    echo "⚠️  Dependencies not installed!"
    echo "Run: ./install_all.sh"
    echo "(or: uv pip install -e .)"
    exit 1
fi

echo ""

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    fi
    return 0
}

# Start TTS Service
echo "📢 Starting TTS Service (port 8000)..."
if ! check_port 8000; then
    echo "   Skipping TTS - already running or port in use"
else
    cd "$SCRIPT_DIR/tts"
    $PYTHON_CMD app.py > /tmp/tts_service.log 2>&1 &
    TTS_PID=$!
    echo "   ✅ TTS Service started (PID: $TTS_PID)"
    echo "   📝 Logs: /tmp/tts_service.log"
fi

# Wait a moment
sleep 1

# Start RAG Service  
echo ""
echo "🧠 Starting RAG Service (port 8001)..."
if ! check_port 8001; then
    echo "   Skipping RAG - already running or port in use"
else
    cd "$SCRIPT_DIR/simple_rag"
    $PYTHON_CMD app.py > /tmp/rag_service.log 2>&1 &
    RAG_PID=$!
    echo "   ✅ RAG Service started (PID: $RAG_PID)"
    echo "   📝 Logs: /tmp/rag_service.log"
fi

echo ""
echo "============================================"
echo "✅ All services started!"
echo ""
echo "Services running:"
echo "  - TTS:  http://localhost:8000"
echo "  - RAG:  http://localhost:8001"
echo ""
echo "To view logs:"
echo "  tail -f /tmp/tts_service.log"
echo "  tail -f /tmp/rag_service.log"
echo ""
echo "To stop all services:"
echo "  ./stop_all.sh"
echo "  (or kill the processes manually)"
echo ""
echo "🎮 Ready to run your Godot project!"
echo "============================================"

