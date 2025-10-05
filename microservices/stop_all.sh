#!/bin/bash
# Stop all microservices
# Usage: ./stop_all.sh

echo "🛑 Stopping all microservices..."
echo "================================"

# Function to kill process on port
kill_port() {
    local PORT=$1
    local NAME=$2
    
    PID=$(lsof -ti:$PORT)
    if [ -z "$PID" ]; then
        echo "⚠️  $NAME: No process found on port $PORT"
    else
        kill $PID 2>/dev/null
        if [ $? -eq 0 ]; then
            echo "✅ $NAME: Stopped (PID: $PID)"
        else
            echo "⚠️  $NAME: Failed to stop (PID: $PID)"
        fi
    fi
}

# Stop TTS Service (port 8000)
kill_port 8000 "TTS Service"

# Stop RAG Service (port 8001)
kill_port 8001 "RAG Service"

# Clean up log files (optional)
# rm -f /tmp/tts_service.log /tmp/rag_service.log

echo ""
echo "================================"
echo "✅ All services stopped!"
echo "================================"

