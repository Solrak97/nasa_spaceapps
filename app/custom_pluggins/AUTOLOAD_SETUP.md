# GenAI Audio Pipeline - Autoload Setup Guide

## Quick Setup (3 Steps)

### 1. Add as Autoload Singleton

In Godot Editor:

1. Go to **Project → Project Settings**
2. Select the **Autoload** tab
3. Click the folder icon and select: `res://custom_pluggins/genai_audio_pipeline.gd`
4. Set **Name**: `GenAIPipeline`
5. Click **Add**
6. Click **Close**

That's it! The pipeline is now globally accessible from any script.

### 2. Start Your Servers

Make sure both services are running:

```bash
# Terminal 1: Start Ollama
ollama serve
# Make sure llama3.2 is pulled: ollama pull llama3.2

# Terminal 2: Start TTS microservice
cd microservices
uv run fastapi dev tts/app.py
```

### 3. Use It In Your Code

```gdscript
extends Node3D

func _ready():
    # Configure (do once at app start)
    GenAIPipeline.set_system_prompt("You are a friendly guide")
    
    # Use anywhere!
    var player = AudioStreamPlayer.new()
    add_child(player)
    await GenAIPipeline.chat_and_play("Hello!", player)
```

---

## Autoload Benefits

### Before (Manual Instance)

```gdscript
# Every scene needs to create and configure
var pipeline = GenAIAudioPipeline.new()
add_child(pipeline)
pipeline.configure_llm("http://localhost:11434", "", "llama3.2")
pipeline.configure_tts("http://0.0.0.0:8000", "en-GB-RyanNeural")
pipeline.set_system_prompt("You are...")
```

### After (Autoload Singleton)

```gdscript
# Configure once at app start
func _ready():
    GenAIPipeline.set_system_prompt("You are...")

# Use anywhere in any scene
func talk():
    await GenAIPipeline.chat_and_play("Hello!", $AudioPlayer)
```

---

## Usage Patterns

### Pattern 1: Global Configuration

Configure once in your main scene:

```gdscript
# main.gd
extends Node

func _ready():
    # This runs once when app starts
    GenAIPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
    GenAIPipeline.configure_tts("http://0.0.0.0:8000", "en-GB-RyanNeural")
    GenAIPipeline.set_system_prompt("""
    You are Mars, a VR museum guide.
    Keep answers short (2-3 sentences).
    """)
    
    # Now every scene can use it without reconfiguring
```

Then in any other scene:

```gdscript
# vr_exhibit.gd
extends Node3D

func on_user_asks_question(question: String):
    await GenAIPipeline.chat_and_play(question, $AudioPlayer)
```

### Pattern 2: Context Per Scene

Different scenes can have different contexts:

```gdscript
# mars_exhibit.gd
extends Node3D

func _ready():
    GenAIPipeline.clear_context()
    GenAIPipeline.set_system_prompt("You are a Mars expert")

func on_interact():
    await GenAIPipeline.chat_and_play("Tell me about Mars", $Audio)
```

```gdscript
# moon_exhibit.gd
extends Node3D

func _ready():
    GenAIPipeline.clear_context()
    GenAIPipeline.set_system_prompt("You are a Moon expert")

func on_interact():
    await GenAIPipeline.chat_and_play("Tell me about the Moon", $Audio)
```

### Pattern 3: Shared Context Across Scenes

Keep conversation context when switching scenes:

```gdscript
# scene1.gd
func _ready():
    if GenAIPipeline.get_context_size() == 0:
        GenAIPipeline.set_system_prompt("You are a tour guide")
    
    await GenAIPipeline.chat_and_play("Hello!", $Audio)
    # Context is preserved

func go_to_next_scene():
    get_tree().change_scene_to_file("res://scene2.tscn")
```

```gdscript
# scene2.gd
func _ready():
    # Context from scene1 is still here!
    # AI remembers previous conversation
    await GenAIPipeline.chat_and_play("What did we talk about?", $Audio)
```

---

## Real-World Examples

### VR Museum Exhibit

```gdscript
# vr_exhibit_controller.gd
extends Node3D

@onready var audio_player = $AudioStreamPlayer3D

func _ready():
    # Set exhibit personality
    GenAIPipeline.set_system_prompt("""
    You are an exhibit AI for the Mars section.
    Speak with enthusiasm about Mars exploration.
    Keep answers under 3 sentences.
    """)
    
    # Greet visitor
    await GenAIPipeline.chat_and_play(
        "Greet the visitor and introduce yourself",
        audio_player
    )

func _on_visitor_asks_question(question: String):
    # Process visitor question
    await GenAIPipeline.chat_and_play(question, audio_player)

func _on_visitor_leaves():
    # Say goodbye
    await GenAIPipeline.chat_and_play(
        "Say a brief goodbye to the visitor",
        audio_player
    )
```

### Interactive NPC

```gdscript
# npc.gd
extends CharacterBody3D

@onready var voice = $Voice3D
var is_talking = false

func _ready():
    GenAIPipeline.set_system_prompt("""
    You are a scientist NPC in a space museum.
    You're friendly but busy with research.
    Keep responses brief and to the point.
    """)

func interact(player_message: String):
    if is_talking:
        return
    
    is_talking = true
    await GenAIPipeline.chat_and_play(player_message, voice)
    is_talking = false

func _on_player_entered_area():
    if not is_talking:
        await GenAIPipeline.chat_and_play(
            "The player approached you, greet them briefly",
            voice
        )
```

### Voice Command System

```gdscript
# voice_command_handler.gd
extends Node

signal command_processed(result: String)

func _ready():
    GenAIPipeline.set_system_prompt("""
    You are a voice assistant for a VR space museum.
    Help users navigate and answer their questions.
    Be concise and helpful.
    """)
    
    # Connect to speech recognition (pseudo-code)
    SpeechRecognition.speech_detected.connect(_on_speech)

func _on_speech(transcribed_text: String):
    print("User said: ", transcribed_text)
    
    # Get AI response and play it
    var response = await GenAIPipeline.chat_and_play(
        transcribed_text,
        $GlobalVoicePlayer
    )
    
    emit_signal("command_processed", response)
```

### Multi-Voice Characters

```gdscript
# character_manager.gd
extends Node

const VOICES = {
    "mars": "en-GB-RyanNeural",
    "luna": "en-US-JennyNeural",
    "sol": "en-AU-WilliamNeural"
}

func mars_speaks(message: String):
    GenAIPipeline.set_system_prompt("You are Mars, a male guide")
    await GenAIPipeline.chat_and_play(
        message,
        $MarsAudio,
        VOICES["mars"]
    )

func luna_speaks(message: String):
    GenAIPipeline.set_system_prompt("You are Luna, a female scientist")
    await GenAIPipeline.chat_and_play(
        message,
        $LunaAudio,
        VOICES["luna"]
    )
```

---

## Advanced: Configuration Manager

Create a configuration manager for complex setups:

```gdscript
# autoload: config_manager.gd
extends Node

const PERSONAS = {
    "mars_guide": {
        "prompt": "You are Mars, a friendly VR museum guide about space.",
        "voice": "en-GB-RyanNeural"
    },
    "scientist": {
        "prompt": "You are a busy but helpful space scientist.",
        "voice": "en-US-GuyNeural"
    },
    "child_educator": {
        "prompt": "You explain space topics simply for children.",
        "voice": "en-US-JennyNeural"
    }
}

func _ready():
    # Initial setup
    GenAIPipeline.configure_llm("http://localhost:11434", "", "llama3.2")
    GenAIPipeline.configure_tts("http://0.0.0.0:8000")

func set_persona(persona_name: String):
    if persona_name not in PERSONAS:
        push_error("Unknown persona: " + persona_name)
        return
    
    var persona = PERSONAS[persona_name]
    GenAIPipeline.clear_context()
    GenAIPipeline.set_system_prompt(persona["prompt"])
    print("Switched to persona: ", persona_name)
    return persona["voice"]

# Usage in scenes:
func _ready():
    var voice = ConfigManager.set_persona("mars_guide")
    await GenAIPipeline.chat_and_play("Hello!", $Audio, voice)
```

---

## Troubleshooting

### "GenAIPipeline" is not recognized

**Solution**: Make sure the autoload is set up correctly
1. Check Project → Project Settings → Autoload
2. Verify the name is exactly `GenAIPipeline` (case-sensitive)
3. Verify the path is correct: `res://custom_pluggins/genai_audio_pipeline.gd`
4. Restart Godot editor

### Audio returns null

**Solution**: Check your services
```bash
# Test Ollama
curl http://localhost:11434/api/generate -d '{"model":"llama3.2","prompt":"hi","stream":false}'

# Test TTS
curl http://0.0.0.0:8000/health
```

### Context gets too large

**Solution**: Clear periodically
```gdscript
func _on_context_large():
    if GenAIPipeline.get_context_size() > 20:
        # Save last response if needed
        var last = GenAIPipeline.get_last_response()
        
        # Clear and reset
        GenAIPipeline.clear_context()
        GenAIPipeline.set_system_prompt("You are...")
```

### Multiple scenes fighting over config

**Solution**: Use a manager pattern
```gdscript
# Create a manager that coordinates who's talking
# autoload: conversation_manager.gd
extends Node

var current_speaker = null
var queue = []

func request_speech(scene_name: String, message: String, player: AudioStreamPlayer):
    if current_speaker != null:
        queue.append({"scene": scene_name, "msg": message, "player": player})
        return
    
    current_speaker = scene_name
    await GenAIPipeline.chat_and_play(message, player)
    current_speaker = null
    
    # Process queue
    if queue.size() > 0:
        var next = queue.pop_front()
        await request_speech(next["scene"], next["msg"], next["player"])
```

---

## Best Practices

1. ✅ **Configure once** in main scene `_ready()`
2. ✅ **Clear context** when switching topics/exhibits
3. ✅ **Monitor context size** to avoid slowdowns
4. ✅ **Use signals** for UI feedback
5. ✅ **Handle errors** gracefully
6. ✅ **Test services** before deploying

---

## Demo Scene

Run `agent_audio_pipeline.tscn` to see a complete working demo with:
- Multi-turn conversations
- Context management
- Different voices
- Error handling
- Signal usage

The demo will guide you through all features!

