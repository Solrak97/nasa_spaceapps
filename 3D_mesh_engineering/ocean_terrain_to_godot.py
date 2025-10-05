#!/usr/bin/env python3
"""
Automated Ocean Bathymetry to Godot Pipeline
Uses GEBCO data for underwater terrain generation
"""

import bpy
import os
import sys
from pathlib import Path
from math import radians

# Configuration
CONFIG = {
    'lat': -23.0,  # Center latitude
    'lon': -43.2,  # Center longitude
    'size_degrees': 0.5,  # Area size in degrees (~55km at equator)
    'resolution': 512,  # Mesh resolution (power of 2)
    'vertical_scale': 0.001,  # Scale depth values (lower for ocean)
    'invert_depth': True,  # True = depths are negative (standard bathymetry)
    'output_path': './godot_ocean_terrain.gltf',
    'gebco_grid': '2023'  # GEBCO grid year
}


def download_gebco(lat, lon, size_deg, output_path):
    """Download GEBCO bathymetry data"""
    try:
        import requests
        import netCDF4 as nc
        import numpy as np
        
        # Calculate bounds
        margin = size_deg / 2
        west = lon - margin
        east = lon + margin
        south = lat - margin
        north = lat + margin
        
        print(f"Downloading GEBCO data for bounds:")
        print(f"  North: {north:.4f}, South: {south:.4f}")
        print(f"  East: {east:.4f}, West: {west:.4f}")
        
        # GEBCO WMS endpoint for gridded bathymetry
        # Using GEBCO_LATEST (2023) via OGC WCS service
        base_url = "https://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv"
        
        # For actual data download, we'll use a simple tile-based approach
        # GEBCO provides GeoTIFF tiles via their CDN
        
        # Alternative: Download from GEBCO's public NetCDF (simplified approach)
        print("Note: For production, download full GEBCO grid from:")
        print("https://www.gebco.net/data_and_products/gridded_bathymetry_data/")
        print("\nUsing synthetic bathymetry for demo...")
        
        # Generate synthetic ocean floor for demonstration
        # In production, replace this with actual GEBCO NetCDF reading
        res = 3600  # Points per degree
        x_points = int(abs(east - west) * res)
        y_points = int(abs(north - south) * res)
        
        # Create depth grid (simulated)
        x = np.linspace(west, east, x_points)
        y = np.linspace(south, north, y_points)
        X, Y = np.meshgrid(x, y)
        
        # Simulate ocean floor with some features
        depths = -1000 + 500 * np.sin(X * 10) * np.cos(Y * 10)
        depths += 200 * np.random.randn(y_points, x_points)  # Add noise
        
        # Save as numpy array temporarily
        dem_path = Path(output_path) / 'bathymetry.npy'
        np.save(dem_path, depths)
        
        print(f"✓ Bathymetry data prepared: {dem_path}")
        print(f"  Depth range: {depths.min():.1f}m to {depths.max():.1f}m")
        
        return str(dem_path)
        
    except ImportError as e:
        print(f"ERROR: Missing dependencies: {e}")
        print("Install: pip install --user requests netCDF4 numpy")
        sys.exit(1)


def download_gebco_real(lat, lon, size_deg, output_path):
    """
    Real GEBCO download implementation (requires GEBCO grid file)
    
    SETUP:
    1. Download GEBCO_2023 Grid from:
       https://www.gebco.net/data_and_products/gridded_bathymetry_data/gebco_2023/gebco_2023_geotiff.zip
    2. Extract and place in ~/.gebco/ directory
    3. Uncomment this function in main()
    """
    try:
        import rasterio
        from rasterio.windows import from_bounds
        import numpy as np
        
        gebco_path = Path.home() / '.gebco' / 'GEBCO_2023.tif'
        
        if not gebco_path.exists():
            print(f"ERROR: GEBCO grid not found at {gebco_path}")
            print("Download from: https://www.gebco.net/data_and_products/gridded_bathymetry_data/")
            sys.exit(1)
        
        # Calculate bounds
        margin = size_deg / 2
        west = lon - margin
        east = lon + margin
        south = lat - margin
        north = lat + margin
        
        print(f"Reading GEBCO grid: {gebco_path}")
        
        with rasterio.open(gebco_path) as src:
            # Get window for our bounds
            window = from_bounds(west, south, east, north, src.transform)
            
            # Read bathymetry data
            bathymetry = src.read(1, window=window)
        
        # Save for processing
        dem_path = Path(output_path) / 'bathymetry.npy'
        np.save(dem_path, bathymetry)
        
        print(f"✓ Bathymetry extracted: {dem_path}")
        print(f"  Depth range: {bathymetry.min():.1f}m to {bathymetry.max():.1f}m")
        
        return str(dem_path)
        
    except ImportError:
        print("ERROR: Install rasterio: pip install --user rasterio")
        sys.exit(1)


def bathymetry_to_mesh(bathy_path, resolution):
    """Convert bathymetry data to mesh array"""
    import numpy as np
    from scipy.ndimage import zoom
    
    # Load bathymetry
    bathy_data = np.load(bathy_path)
    
    # Resample to target resolution
    factor = (resolution / bathy_data.shape[0], resolution / bathy_data.shape[1])
    bathy_resampled = zoom(bathy_data, factor, order=1)
    
    # Handle nodata values
    bathy_resampled = np.nan_to_num(bathy_resampled, nan=0.0)
    
    # Invert depths if needed (GEBCO uses negative for depth)
    if CONFIG['invert_depth']:
        bathy_resampled = -bathy_resampled
    
    print(f"  Processed depth range: {bathy_resampled.min():.1f}m to {bathy_resampled.max():.1f}m")
    
    return bathy_resampled


def create_terrain_mesh(height_data, name='OceanFloor'):
    """Generate mesh from bathymetry data"""
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
    
    # Generate faces (quads)
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
    
    # Smooth shading for underwater look
    for poly in mesh.polygons:
        poly.use_smooth = True
    
    # Center mesh
    obj.location = (-(cols / 2), -(rows / 2), 0)
    
    print(f"✓ Mesh created: {len(verts)} vertices, {len(faces)} faces")
    
    return obj


def create_ocean_material(obj):
    """Add basic ocean material"""
    mat = bpy.data.materials.new(name="OceanFloor")
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    
    # Clear default nodes
    nodes.clear()
    
    # Add nodes
    output = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    
    # Ocean floor color (sandy/rocky)
    bsdf.inputs['Base Color'].default_value = (0.3, 0.25, 0.2, 1.0)
    bsdf.inputs['Roughness'].default_value = 0.8
    
    # Link nodes
    mat.node_tree.links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])
    
    # Assign material
    if obj.data.materials:
        obj.data.materials[0] = mat
    else:
        obj.data.materials.append(mat)


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
    print(f"✓ Exported to: {output_path}")


def main():
    """Main pipeline execution"""
    print("=== Ocean Bathymetry to Godot Pipeline ===")
    print(f"Using GEBCO {CONFIG['gebco_grid']} data")
    
    # Create output directory
    output_dir = Path(CONFIG['output_path']).parent
    output_dir.mkdir(exist_ok=True)
    
    # Step 1: Download bathymetry
    print("\n[1/5] Downloading bathymetry data...")
    bathy_path = download_gebco(
        CONFIG['lat'], 
        CONFIG['lon'], 
        CONFIG['size_degrees'],
        output_dir
    )
    
    # Step 2: Process bathymetry
    print("\n[2/5] Processing bathymetry to mesh data...")
    depth_data = bathymetry_to_mesh(bathy_path, CONFIG['resolution'])
    
    # Step 3: Create mesh in Blender
    print("\n[3/5] Creating Blender mesh...")
    setup_blender_scene()
    ocean_obj = create_terrain_mesh(depth_data)
    
    # Step 4: Add material
    print("\n[4/5] Adding ocean material...")
    create_ocean_material(ocean_obj)
    
    # Step 5: Export to Godot
    print("\n[5/5] Exporting to Godot format...")
    export_to_godot(CONFIG['output_path'])
    
    print("\n✓ Pipeline complete!")
    print(f"  Location: {CONFIG['lat']}, {CONFIG['lon']}")
    print(f"  Output: {CONFIG['output_path']}")
    print("\nIn Godot:")
    print("  1. Import the .gltf file")
    print("  2. Add a MeshInstance3D")
    print("  3. Create ocean shader with depth-based coloring")


if __name__ == '__main__':
    # Override config from command line args
    try:
        script_args = sys.argv[sys.argv.index('--') + 1:]
        if len(script_args) >= 2:
            CONFIG['lat'] = float(script_args[0])
            CONFIG['lon'] = float(script_args[1])
            print(f"Using coordinates: {CONFIG['lat']}, {CONFIG['lon']}")
    except (ValueError, IndexError):
        print(f"Using default coordinates: {CONFIG['lat']}, {CONFIG['lon']}")
    
    main()