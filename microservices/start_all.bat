@echo off
REM Start all microservices for NASA Space Apps VR Ocean Museum (Windows)
REM Usage: start_all.bat

echo ================================
echo Starting Microservices...
echo ================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python not found!
    echo Please install Python 3.9+ first
    pause
    exit /b 1
)

REM Get script directory
set SCRIPT_DIR=%~dp0

echo Starting TTS Service (port 8000)...
cd "%SCRIPT_DIR%tts"
start "TTS Service" cmd /k python app.py
timeout /t 2 /nobreak >nul

echo.
echo Starting RAG Service (port 8001)...
cd "%SCRIPT_DIR%simple_rag"
start "RAG Service" cmd /k python app.py
timeout /t 2 /nobreak >nul

echo.
echo ================================
echo All services started!
echo ================================
echo.
echo Services running:
echo   - TTS:  http://localhost:8000
echo   - RAG:  http://localhost:8001
echo.
echo Each service is running in its own window.
echo Close the windows to stop the services.
echo.
echo Ready to run your Godot project!
echo ================================
pause

