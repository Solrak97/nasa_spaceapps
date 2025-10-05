#!/usr/bin/env python3
"""
Automated Earth Terrain to Godot Pipeline
Extracts real-world DEM data and generates Godot-ready terrain mesh
"""

import bpy
import os
import sys
from pathlib import Path
from math import radians

# Configuration
CONFIG = {
    'lat': -23.0,  # Example: Rio de Janeiro beach
    'lon': -43.2,
    'size_km': 5,  # Area size in kilometers
    'resolution': 512,  # Mesh resolution (power of 2)
    'vertical_scale': 0.01,  # Scale height values
    'output_path': './godot_terrain.gltf',
    'dem_source': 'SRTM1'  # SRTM1 (30m), SRTM3 (90m)
}


def download_dem(lat, lon, size_km, output_path):
    """Download DEM data from USGS/NASA SRTM"""
    try:
        import elevation
        import rasterio
        from rasterio.warp import calculate_default_transform, reproject, Resampling
        
        # Calculate bounds
        km_to_deg = 0.009  # Approximate at equator
        margin = (size_km / 2) * km_to_deg
        bounds = (lon - margin, lat - margin, lon + margin, lat + margin)
        
        print(f"Downloading DEM for bounds: {bounds}")
        dem_path = Path(output_path) / 'dem.tif'
        elevation.clip(bounds=bounds, output=str(dem_path), product=CONFIG['dem_source'])
        
        return str(dem_path)
    except ImportError:
        print("ERROR: Missing dependencies. Install: pip install elevation rasterio")
        sys.exit(1)


def dem_to_mesh(dem_path, resolution):
    """Convert DEM raster to Blender mesh"""
    import rasterio
    import numpy as np
    
    with rasterio.open(dem_path) as src:
        dem_data = src.read(1)
        
        # Resample to target resolution
        from scipy.ndimage import zoom
        factor = (resolution / dem_data.shape[0], resolution / dem_data.shape[1])
        dem_resampled = zoom(dem_data, factor, order=1)
        
        # Replace nodata values
        dem_resampled = np.nan_to_num(dem_resampled, nan=0.0)
        
    return dem_resampled


def create_terrain_mesh(height_data, name='Terrain'):
    """Generate mesh from height data array"""
    rows, cols = height_data.shape
    
    # Create mesh
    mesh = bpy.data.meshes.new(name)
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    
    # Generate vertices
    verts = []
    for y in range(rows):
        for x in range(cols):
            z = height_data[y, x] * CONFIG['vertical_scale']
            verts.append((x, y, z))
    
    # Generate faces
    faces = []
    for y in range(rows - 1):
        for x in range(cols - 1):
            v1 = y * cols + x
            v2 = v1 + 1
            v3 = v1 + cols
            v4 = v3 + 1
            faces.append([v1, v2, v4, v3])
    
    # Build mesh
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    
    # Center and scale
    obj.location = (-(cols / 2), -(rows / 2), 0)
    
    return obj


def setup_blender_scene():
    """Clean scene and setup for export"""
    # Delete default objects
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.object.delete()
    
    # Scene settings
    bpy.context.scene.unit_settings.system = 'METRIC'


def export_to_godot(output_path):
    """Export mesh as GLTF for Godot"""
    bpy.ops.export_scene.gltf(
        filepath=output_path,
        export_format='GLTF_SEPARATE',
        export_texcoords=True,
        export_normals=True,
        export_materials='EXPORT',
        export_apply=True
    )
    print(f"Exported to: {output_path}")


def main():
    """Main pipeline execution"""
    print("=== Earth Terrain to Godot Pipeline ===")
    
    # Create output directory
    output_dir = Path(CONFIG['output_path']).parent
    output_dir.mkdir(exist_ok=True)
    
    # Step 1: Download DEM
    print("\n[1/4] Downloading DEM data...")
    dem_path = download_dem(
        CONFIG['lat'], 
        CONFIG['lon'], 
        CONFIG['size_km'],
        output_dir
    )
    
    # Step 2: Process DEM
    print("\n[2/4] Processing DEM to mesh data...")
    height_data = dem_to_mesh(dem_path, CONFIG['resolution'])
    
    # Step 3: Create mesh in Blender
    print("\n[3/4] Creating Blender mesh...")
    setup_blender_scene()
    terrain_obj = create_terrain_mesh(height_data)
    
    # Step 4: Export to Godot
    print("\n[4/4] Exporting to Godot format...")
    export_to_godot(CONFIG['output_path'])
    
    print("\n✓ Pipeline complete!")
    print(f"  Location: {CONFIG['lat']}, {CONFIG['lon']}")
    print(f"  Output: {CONFIG['output_path']}")


if __name__ == '__main__':
    # Override config from command line args if provided
    if len(sys.argv) > 1:
        try:
            CONFIG['lat'] = float(sys.argv[1])
            CONFIG['lon'] = float(sys.argv[2])
        except (IndexError, ValueError):
            print("Usage: blender --background --python terrain_to_godot.py -- [lat] [lon]")
            sys.exit(1)
    
    main()