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
