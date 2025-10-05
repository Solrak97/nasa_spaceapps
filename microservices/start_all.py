#!/usr/bin/env python3
"""
Start all microservices for NASA Space Apps VR Ocean Museum
Cross-platform Python version
Usage: python start_all.py
"""

import subprocess
import sys
import os
import time
import socket
from pathlib import Path

def check_port(port):
    """Check if a port is in use"""
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result = sock.connect_ex(('localhost', port))
    sock.close()
    return result != 0  # True if port is free

def print_header(text):
    """Print a formatted header"""
    print(f"\n{text}")
    print("=" * len(text))

def print_service(name, status, details=""):
    """Print service status"""
    icon = "✅" if status == "ok" else "⚠️" if status == "skip" else "❌"
    print(f"{icon} {name}: {details}")

def main():
    print_header("🚀 Starting NASA Space Apps Microservices")
    
    # Check if dependencies are installed
    try:
        import fastapi
        import uvicorn
    except ImportError:
        print("\n❌ Dependencies not installed!")
        print("\nPlease install first:")
        print("  ./install_all.sh   (Mac/Linux)")
        print("  install_all.bat    (Windows)")
        print("  OR: uv pip install -e .")
        sys.exit(1)
    
    # Get script directory
    script_dir = Path(__file__).parent.absolute()
    
    # Service configurations
    services = [
        {
            "name": "TTS Service",
            "port": 8000,
            "dir": script_dir / "tts",
            "file": "app.py",
            "log": "/tmp/tts_service.log" if os.name != 'nt' else "tts_service.log"
        },
        {
            "name": "RAG Service",
            "port": 8001,
            "dir": script_dir / "simple_rag",
            "file": "app.py",
            "log": "/tmp/rag_service.log" if os.name != 'nt' else "rag_service.log"
        }
    ]
    
    started = []
    
    # Start each service
    for service in services:
        print(f"\n📢 Starting {service['name']} (port {service['port']})...")
        
        # Check if port is already in use
        if not check_port(service['port']):
            print_service(service['name'], "skip", f"Port {service['port']} already in use")
            continue
        
        # Check if directory exists
        if not service['dir'].exists():
            print_service(service['name'], "error", f"Directory not found: {service['dir']}")
            continue
        
        # Check if app file exists
        app_file = service['dir'] / service['file']
        if not app_file.exists():
            print_service(service['name'], "error", f"App file not found: {app_file}")
            continue
        
        # Start the service
        try:
            # Open log file
            log_file = open(service['log'], 'w')
            
            # Start process
            process = subprocess.Popen(
                [sys.executable, service['file']],
                cwd=service['dir'],
                stdout=log_file,
                stderr=subprocess.STDOUT,
                # On Windows, create new process group to avoid Ctrl+C propagation
                creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if os.name == 'nt' else 0
            )
            
            # Wait a moment to see if it crashes immediately
            time.sleep(0.5)
            if process.poll() is not None:
                print_service(service['name'], "error", f"Failed to start (check {service['log']})")
                log_file.close()
            else:
                print_service(service['name'], "ok", f"Started (PID: {process.pid})")
                print(f"   📝 Logs: {service['log']}")
                started.append({
                    'name': service['name'],
                    'pid': process.pid,
                    'port': service['port'],
                    'log': service['log']
                })
            
        except Exception as e:
            print_service(service['name'], "error", str(e))
    
    # Summary
    print_header("✅ Startup Complete!")
    print("\nServices running:")
    for s in started:
        print(f"  - {s['name']}: http://localhost:{s['port']} (PID: {s['pid']})")
    
    if started:
        print("\nTo view logs:")
        for s in started:
            print(f"  tail -f {s['log']}")
        
        print("\nTo stop services:")
        if os.name == 'nt':
            print("  - Windows: Run stop_all.bat")
        else:
            print("  - Run: ./stop_all.sh")
        print("  - Or kill processes:")
        for s in started:
            print(f"    kill {s['pid']}")
    else:
        print("\n⚠️  No services were started")
    
    print("\n🎮 Ready to run your Godot project!")
    print("=" * 50)

if __name__ == "__main__":
    main()

