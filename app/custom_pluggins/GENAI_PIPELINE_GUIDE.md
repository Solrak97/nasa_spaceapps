# GenAI Audio Pipeline - Quick Start Guide

## Overview

`GenAIAudioPipeline` is a high-level wrapper that combines LLM chat (with context) and Text-to-Speech into a single, easy-to-use pipeline. Just send a message and get back an `AudioStream` ready to play!

## Features

✅ **One-line chat to audio**: `await pipeline.chat_to_audio("Hello")`  
✅ **Automatic context management**: Conversation history handled automatically  
✅ **Auto-configuration**: Works out of the box with sensible defaults  
✅ **Signals**: Track processing progress with built-in signals  
✅ **Convenience methods**: `chat_and_play()` handles everything for you  

---

## Quick Start

### Minimal Example

```gdscript
extends Node3D

func _ready():
    # Create the pipeline
    var pipeline = GenAIAudioPipeline.new()
    add_child(pipeline)
    
    # Set AI personality
    pipeline.set_system_prompt("You are a friendly museum guide named Mars")
    
    # Get audio response
    var audio = await pipeline.chat_to_audio("Hello! Who are you?")
    
    # Play it
    var player = AudioStreamPlayer.new()
    add_child(player)
    player.stream = audio
    player.play()
```

### Recommended: Using chat_and_play()

```gdscript
func _ready():
    var pipeline = GenAIAudioPipeline.new()
    add_child(pipeline)
    
    pipeline.set_system_prompt("You are a friendly assistant")
    
    var player = AudioStreamPlayer.new()
    add_child(player)
    
    # One line: LLM + TTS + Play!
    await pipeline.chat_and_play("Tell me about Mars", player)
```

---

## Configuration

### Auto-Configuration (Default)

By default, the pipeline auto-configures with these values:
- **LLM**: `http://localhost:11434` with model `llama3.2`
- **TTS**: `http://0.0.0.0:8000` with voice `en-GB-RyanNeural`

```gdscript
var pipeline = GenAIAudioPipeline.new()
add_child(pipeline)
# Ready to use!
```

### Custom Configuration

```gdscript
var pipeline = GenAIAudioPipeline.new()
add_child(pipeline)

# Configure LLM
pipeline.configure_llm("http://localhost:11434", "", "llama3.2")

# Configure TTS
pipeline.configure_tts("http://0.0.0.0:8000", "en-US-JennyNeural")

# Set AI personality
pipeline.set_system_prompt("You are a helpful assistant")
```

### Disable Auto-Configuration

```gdscript
var pipeline = GenAIAudioPipeline.new()
pipeline.auto_configure = false
add_child(pipeline)

# Now you must configure manually
pipeline.configure_llm("http://localhost:11434", "", "llama3.2")
pipeline.configure_tts("http://0.0.0.0:8000", "en-GB-RyanNeural")
```

---

## Main Methods

### `chat_to_audio(message: String, voice: String = "") -> AudioStream`

Process a message through LLM with context, convert to audio, and return AudioStream.

```gdscript
var audio = await pipeline.chat_to_audio("What is Mars?")
$AudioPlayer.stream = audio
$AudioPlayer.play()

# With custom voice
var audio2 = await pipeline.chat_to_audio("Tell me more", "en-US-GuyNeural")
```

### `chat_and_play(message: String, audio_player: AudioStreamPlayer, voice: String = "") -> String`

All-in-one: Process message and automatically play on the given player. Returns the LLM response text.

```gdscript
var response_text = await pipeline.chat_and_play("Hello!", $AudioPlayer)
print("AI said: ", response_text)
```

### `simple_prompt_to_audio(prompt: String, voice: String = "") -> AudioStream`

Like `chat_to_audio()` but **without context** (one-off prompt).

```gdscript
var audio = await pipeline.simple_prompt_to_audio("Say hello in Spanish")
```

### `simple_prompt_and_play(prompt: String, audio_player: AudioStreamPlayer, voice: String = "") -> String`

Like `chat_and_play()` but without context.

```gdscript
await pipeline.simple_prompt_and_play("Tell me a joke", $AudioPlayer)
```

---

## Context Management

### Set System Prompt

```gdscript
pipeline.set_system_prompt("""
You are Mars, a museum guide.
Keep answers short (2-3 sentences).
""")
```

### Clear Context

```gdscript
pipeline.clear_context()
```

### Get Context Info

```gdscript
var history = pipeline.get_context()
var size = pipeline.get_context_size()
print("Conversation has ", size, " messages")
```

### Manual Context Manipulation

```gdscript
# Add messages without sending
pipeline.add_user_message("What's your name?")
pipeline.add_assistant_message("I'm Mars, your guide!")

# Get last response
var last = pipeline.get_last_response()
```

---

## Signals

Connect to these signals to track processing:

```gdscript
func _ready():
    var pipeline = GenAIAudioPipeline.new()
    add_child(pipeline)
    
    pipeline.processing_started.connect(_on_processing_started)
    pipeline.llm_response_ready.connect(_on_llm_ready)
    pipeline.audio_ready.connect(_on_audio_ready)
    pipeline.processing_complete.connect(_on_complete)
    pipeline.processing_failed.connect(_on_failed)

func _on_processing_started(message: String):
    print("Processing: ", message)

func _on_llm_ready(response: String):
    print("LLM response: ", response)

func _on_audio_ready(audio: AudioStream):
    print("Audio is ready!")

func _on_complete(message: String, response: String, audio: AudioStream):
    print("Complete! User: ", message, " | AI: ", response)

func _on_failed(error: String):
    print("Error: ", error)
```

---

## Complete Examples

### Interactive VR Museum Guide

```gdscript
extends Node3D

var pipeline: GenAIAudioPipeline
var player: AudioStreamPlayer

func _ready():
    # Setup
    pipeline = GenAIAudioPipeline.new()
    add_child(pipeline)
    
    player = AudioStreamPlayer.new()
    add_child(player)
    
    pipeline.set_system_prompt("""
    You are Mars, a friendly VR museum guide.
    Give short, engaging answers about space and science.
    """)
    
    # Welcome message
    await pipeline.chat_and_play("Hello! Introduce yourself", player)
    await player.finished

func on_user_speaks(transcribed_text: String):
    """Called when user says something in VR"""
    if player.playing:
        player.stop()
    
    # Process and respond
    await pipeline.chat_and_play(transcribed_text, player)
```

### Multi-Turn Conversation

```gdscript
func _ready():
    var pipeline = GenAIAudioPipeline.new()
    add_child(pipeline)
    
    var player = AudioStreamPlayer.new()
    add_child(player)
    
    pipeline.set_system_prompt("You are a helpful space expert")
    
    # Turn 1
    await pipeline.chat_and_play("What's your favorite planet?", player)
    await player.finished
    
    # Turn 2 - remembers context
    await pipeline.chat_and_play("Why do you like it?", player)
    await player.finished
    
    # Turn 3 - full context retained
    await pipeline.chat_and_play("Tell me more interesting facts", player)
    await player.finished
    
    print("Conversation history: ", pipeline.get_context_size(), " messages")
```

### Using Different Voices

```gdscript
func _ready():
    var pipeline = GenAIAudioPipeline.new()
    add_child(pipeline)
    
    pipeline.set_system_prompt("You are a tour guide")
    
    var player = AudioStreamPlayer.new()
    add_child(player)
    
    # British male voice
    await pipeline.chat_and_play("Hello", player, "en-GB-RyanNeural")
    await player.finished
    
    # American female voice
    await pipeline.chat_and_play("Tell me about Mars", player, "en-US-JennyNeural")
    await player.finished
    
    # Australian male voice
    await pipeline.chat_and_play("That's interesting!", player, "en-AU-WilliamNeural")
```

### Error Handling

```gdscript
func _ready():
    var pipeline = GenAIAudioPipeline.new()
    add_child(pipeline)
    
    pipeline.processing_failed.connect(func(error): 
        print("ERROR: ", error)
        # Handle error - maybe retry or show user a message
    )
    
    var audio = await pipeline.chat_to_audio("Hello")
    
    if audio == null:
        print("Failed to generate audio")
        return
    
    # Success!
    var player = AudioStreamPlayer.new()
    add_child(player)
    player.stream = audio
    player.play()
```

---

## Best Practices

### 1. Reuse the Pipeline Instance

```gdscript
# ✅ GOOD: Create once, use many times
var pipeline = GenAIAudioPipeline.new()

func _ready():
    add_child(pipeline)

func handle_message(msg):
    await pipeline.chat_and_play(msg, $AudioPlayer)

# ❌ BAD: Creating new pipeline each time
func handle_message(msg):
    var pipeline = GenAIAudioPipeline.new()  # wasteful!
    add_child(pipeline)
    await pipeline.chat_and_play(msg, $AudioPlayer)
```

### 2. Clear Context When Appropriate

```gdscript
func start_new_topic():
    pipeline.clear_context()
    pipeline.set_system_prompt("New personality for new topic")

func on_new_user_session():
    pipeline.clear_context()
```

### 3. Monitor Context Size

```gdscript
func chat(message):
    # Clear if context gets too large
    if pipeline.get_context_size() > 20:
        pipeline.clear_context()
        pipeline.set_system_prompt("You are a helpful assistant")
    
    await pipeline.chat_and_play(message, $AudioPlayer)
```

### 4. Use Signals for UI Feedback

```gdscript
func _ready():
    pipeline.processing_started.connect(func(_msg): 
        $LoadingSpinner.visible = true
    )
    
    pipeline.audio_ready.connect(func(_audio):
        $LoadingSpinner.visible = false
    )
```

---

## API Summary

| Method | Description | Returns |
|--------|-------------|---------|
| `chat_to_audio(message, voice?)` | LLM + TTS with context | AudioStream |
| `chat_and_play(message, player, voice?)` | LLM + TTS + Play | String (response) |
| `simple_prompt_to_audio(prompt, voice?)` | LLM + TTS, no context | AudioStream |
| `simple_prompt_and_play(prompt, player, voice?)` | LLM + TTS + Play, no context | String (response) |
| `set_system_prompt(prompt)` | Set AI personality | void |
| `clear_context()` | Clear conversation | void |
| `get_context()` | Get message history | Array |
| `get_context_size()` | Get message count | int |
| `get_last_response()` | Get last AI response | String |
| `configure_llm(url, key, model)` | Configure LLM | void |
| `configure_tts(url, voice)` | Configure TTS | void |

---

## Troubleshooting

**Audio is null**
- Check that Ollama is running at `http://localhost:11434`
- Check that TTS server is running at `http://0.0.0.0:8000`
- Listen to `processing_failed` signal for error details

**AI doesn't remember context**
- Make sure you're using `chat_to_audio()` not `simple_prompt_to_audio()`
- Check context size with `get_context_size()`
- Verify you haven't called `clear_context()` accidentally

**Slow responses**
- Reduce context size by clearing old messages
- Check Ollama server performance
- Consider using smaller model

**Wrong voice**
- Check voice name spelling: `"en-GB-RyanNeural"`
- Make sure TTS server supports the voice
- Use `configure_tts()` to set default voice

