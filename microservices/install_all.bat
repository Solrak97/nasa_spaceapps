@echo off
REM Install all dependencies for microservices using uv (Windows)
REM Usage: install_all.bat

echo ========================================================
echo Installing NASA Space Apps Microservices Dependencies
echo ========================================================
echo.

REM Check if uv is installed
uv --version >nul 2>&1
if errorlevel 1 (
    echo uv not found. Please install uv first:
    echo.
    echo   PowerShell:
    echo   powershell -c "irm https://astral.sh/uv/install.ps1 | iex"
    echo.
    echo   Or download from: https://github.com/astral-sh/uv
    pause
    exit /b 1
)

echo Using uv version:
uv --version
echo.

REM Get script directory
set SCRIPT_DIR=%~dp0

REM Install from pyproject.toml
echo Installing dependencies from pyproject.toml...
cd "%SCRIPT_DIR%"

uv pip install -e .

if errorlevel 1 (
    echo.
    echo ========================================================
    echo Installation failed. Please check errors above.
    echo ========================================================
    pause
    exit /b 1
)

echo.
echo ========================================================
echo All dependencies installed successfully!
echo ========================================================
echo.
echo Installed packages:
echo   - fastapi (web framework)
echo   - uvicorn (ASGI server)
echo   - pydantic (data validation)
echo   - edge-tts (text-to-speech)
echo   - scikit-learn (TF-IDF for RAG)
echo   - numpy (numerical operations)
echo.
echo Ready to start services!
echo Run: start_all.bat
echo.
pause

