#!/bin/bash
# Install all dependencies for microservices using uv
# Usage: ./install_all.sh

echo "📦 Installing NASA Space Apps Microservices Dependencies"
echo "=========================================================="
echo ""

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "⚠️  uv not found. Installing uv..."
    curl -LsSf https://astral.sh/uv/install.sh | sh
    
    # Reload PATH
    export PATH="$HOME/.cargo/bin:$PATH"
    
    if ! command -v uv &> /dev/null; then
        echo "❌ Failed to install uv. Please install manually:"
        echo "   curl -LsSf https://astral.sh/uv/install.sh | sh"
        exit 1
    fi
    
    echo "✅ uv installed successfully!"
    echo ""
fi

echo "Using uv version: $(uv --version)"
echo ""

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Install from pyproject.toml
echo "📦 Installing dependencies from pyproject.toml..."
cd "$SCRIPT_DIR"

# Sync dependencies with uv
uv pip install -e .

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================================="
    echo "✅ All dependencies installed successfully!"
    echo "=========================================================="
    echo ""
    echo "Installed packages:"
    echo "  - fastapi (web framework)"
    echo "  - uvicorn (ASGI server)"
    echo "  - pydantic (data validation)"
    echo "  - edge-tts (text-to-speech)"
    echo "  - scikit-learn (TF-IDF for RAG)"
    echo "  - numpy (numerical operations)"
    echo ""
    echo "Ready to start services!"
    echo "Run: ./start_all.sh"
else
    echo ""
    echo "❌ Installation failed. Please check errors above."
    exit 1
fi

