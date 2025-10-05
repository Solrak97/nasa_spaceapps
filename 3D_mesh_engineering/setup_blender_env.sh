#!/bin/bash
# Setup script for Blender Python environment with ocean bathymetry dependencies

set -e  # Exit on error

echo "🌊 Ocean Bathymetry Pipeline - Environment Setup"
echo "================================================"

# Find Blender's Python
echo -e "\n[1/4] Finding Blender Python..."

# Create temp Python script to get the path
cat > /tmp/get_python_path.py << 'EOF'
import sys
print(sys.executable)
EOF

BLENDER_PYTHON=$(blender --background --python /tmp/get_python_path.py 2>&1 | grep -E "^/.*python" | head -n 1)
rm /tmp/get_python_path.py

if [ -z "$BLENDER_PYTHON" ]; then
    echo "❌ ERROR: Could not find Blender Python"
    echo "Make sure Blender is installed and in PATH"
    exit 1
fi

echo "✓ Found Blender Python: $BLENDER_PYTHON"

# Verify it's a valid Python executable
if [ ! -x "$BLENDER_PYTHON" ]; then
    echo "❌ ERROR: $BLENDER_PYTHON is not executable"
    exit 1
fi

# Get Python version
PYTHON_VERSION=$($BLENDER_PYTHON --version 2>&1 | grep -oP 'Python \K[0-9]+\.[0-9]+')
echo "  Python version: $PYTHON_VERSION"

# Create venv directory
VENV_DIR="./blender_venv"
echo -e "\n[2/4] Creating virtual environment..."

if [ -d "$VENV_DIR" ]; then
    echo "⚠️  Virtual environment already exists at $VENV_DIR"
    read -p "Delete and recreate? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf "$VENV_DIR"
    else
        echo "Using existing environment..."
    fi
fi

if [ ! -d "$VENV_DIR" ]; then
    echo "Creating venv with: $BLENDER_PYTHON -m venv $VENV_DIR"
    $BLENDER_PYTHON -m venv "$VENV_DIR"
    echo "✓ Virtual environment created at $VENV_DIR"
fi

# Activate venv
source "$VENV_DIR/bin/activate"

# Verify activation
if [ "$VIRTUAL_ENV" != "" ]; then
    echo "✓ Virtual environment activated: $VIRTUAL_ENV"
else
    echo "⚠️  Warning: Virtual environment may not be activated properly"
fi

# Upgrade pip
echo -e "\n[3/4] Upgrading pip..."
python -m pip install --upgrade pip --quiet

# Install dependencies
echo -e "\n[4/4] Installing ocean bathymetry dependencies..."
echo "  This may take a few minutes..."

echo "  Installing: numpy scipy requests..."
pip install numpy scipy requests

# Try to install optional dependencies
echo -e "\n  Installing optional dependencies..."
pip install netCDF4 2>/dev/null && echo "  ✓ netCDF4" || echo "  ⚠️  netCDF4 failed (optional)"
pip install rasterio 2>/dev/null && echo "  ✓ rasterio" || echo "  ⚠️  rasterio failed (optional)"

echo -e "\n✅ Setup complete!"
echo ""
echo "📝 Usage:"
echo "  1. Activate environment:"
echo "     source $VENV_DIR/bin/activate"
echo ""
echo "  2. Run Blender with this Python:"
echo "     blender --background --python-use-system-env --python ocean_terrain_to_godot.py -- 9.93 -84.08"
echo ""
echo "  Or use the run script:"
echo "     ./run_ocean_terrain.sh 9.93 -84.08"
echo ""

# Create convenience run script
cat > run_ocean_terrain.sh << 'RUNSCRIPT'
#!/bin/bash
# Convenience script to run ocean terrain generation

VENV_DIR="./blender_venv"

if [ ! -d "$VENV_DIR" ]; then
    echo "❌ Virtual environment not found. Run ./setup_blender_env.sh first"
    exit 1
fi

# Activate venv
source "$VENV_DIR/bin/activate"

# Check for coordinates
if [ $# -lt 2 ]; then
    echo "Usage: $0 <latitude> <longitude>"
    echo "Example: $0 9.93 -84.08"
    echo ""
    echo "Using default coordinates from CONFIG..."
    blender --background --python-use-system-env --python ocean_terrain_to_godot.py
    exit 0
fi

LAT=$1
LON=$2

echo "🌊 Generating ocean terrain for: $LAT, $LON"
blender --background --python-use-system-env --python ocean_terrain_to_godot.py -- $LAT $LON

echo ""
echo "✅ Done! Check godot_ocean_terrain.gltf"
RUNSCRIPT

chmod +x run_ocean_terrain.sh

echo "Created convenience script: ./run_ocean_terrain.sh"
echo ""
echo "🎉 All set! Try running:"
echo "   ./run_ocean_terrain.sh -18.28 147.69  # Great Barrier Reef"