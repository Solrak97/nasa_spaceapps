# LLM Client - Chat with Context Guide

## Overview

The enhanced `LLMConnection` class now supports **conversational chat with context** using Ollama's `/api/chat` endpoint. This allows the AI to remember previous messages in the conversation and provide contextually aware responses.

## Key Features

### 1. **Conversation History**
- Automatically maintains chat history with roles: `system`, `user`, and `assistant`
- Each message in the conversation is preserved for context
- Context persists across multiple calls to `send_chat_message()`

### 2. **System Prompts**
- Define the AI's personality, role, and behavior
- Set once at the beginning of a conversation
- Can be updated at any time

### 3. **Backward Compatibility**
- Old `send_prompt()` method still works for simple, context-free completions
- No breaking changes to existing code

---

## API Reference

### Chat Methods

#### `send_chat_message(message: String) -> String`
Send a message with conversation context. The message and response are automatically added to the conversation history.

```gdscript
var response = await LLMClient.send_chat_message("What is Mars?")
print(response)
```

#### `set_system_prompt(prompt: String) -> void`
Set the system prompt that defines the AI's behavior. This should be called before starting the conversation.

```gdscript
LLMClient.set_system_prompt("You are a helpful museum guide named Mars.")
```

#### `clear_context() -> void`
Clear all conversation history. Useful when starting a new conversation or resetting the context.

```gdscript
LLMClient.clear_context()
```

#### `get_context() -> Array`
Get a copy of the current conversation history as an array of dictionaries.

```gdscript
var history = LLMClient.get_context()
for msg in history:
    print(msg["role"], ": ", msg["content"])
```

#### `get_context_size() -> int`
Get the number of messages in the conversation history.

```gdscript
print("Messages in context: ", LLMClient.get_context_size())
```

### Manual Context Management

#### `add_user_message(content: String) -> void`
Manually add a user message to the context without sending a request.

```gdscript
LLMClient.add_user_message("Hello")
```

#### `add_assistant_message(content: String) -> void`
Manually add an assistant message to the context without sending a request.

```gdscript
LLMClient.add_assistant_message("Hi! How can I help?")
```

---

## Usage Examples

### Basic Chat Conversation

```gdscript
func start_conversation():
    # Configure the LLM
    LLMClient.configure("http://localhost:11434", "", "llama3.2")
    
    # Set the AI's personality
    LLMClient.set_system_prompt("""
    You are Mars, a friendly museum guide.
    Give short, engaging answers about space and science.
    """)
    
    # First message
    var response1 = await LLMClient.send_chat_message("Hello! Who are you?")
    print("AI: ", response1)
    
    # Second message - AI remembers the first exchange
    var response2 = await LLMClient.send_chat_message("Tell me about Mars the planet")
    print("AI: ", response2)
    
    # Third message - AI has full context
    var response3 = await LLMClient.send_chat_message("Why are you named after it?")
    print("AI: ", response3)
```

### Interactive Chat Loop

```gdscript
func interactive_chat():
    LLMClient.configure("http://localhost:11434", "", "llama3.2")
    LLMClient.set_system_prompt("You are a helpful assistant.")
    
    while true:
        var user_input = await get_user_input() # Your input method
        
        if user_input == "quit":
            break
        elif user_input == "reset":
            LLMClient.clear_context()
            print("Conversation reset!")
            continue
        
        var response = await LLMClient.send_chat_message(user_input)
        print("AI: ", response)
        
        # Show context size
        print("(", LLMClient.get_context_size(), " messages in context)")
```

### Pre-populating Context

```gdscript
func preset_conversation():
    LLMClient.configure("http://localhost:11434", "", "llama3.2")
    
    # Set up a scenario
    LLMClient.set_system_prompt("You are a space expert.")
    LLMClient.add_user_message("What's the most interesting planet?")
    LLMClient.add_assistant_message("Mars! It's the most explored planet beyond Earth.")
    
    # Now ask a follow-up that builds on the preset context
    var response = await LLMClient.send_chat_message("Why is it red?")
    print("AI: ", response)
```

### Managing Context Size

```gdscript
func manage_context():
    # Check context size periodically
    if LLMClient.get_context_size() > 20:
        # Option 1: Clear everything and start fresh
        LLMClient.clear_context()
        LLMClient.set_system_prompt("You are a helpful assistant.")
        
        # Option 2: Keep only recent messages (manual approach)
        var history = LLMClient.get_context()
        LLMClient.clear_context()
        
        # Re-add system prompt
        if history.size() > 0 and history[0]["role"] == "system":
            LLMClient.set_system_prompt(history[0]["content"])
        
        # Re-add last 10 messages
        for i in range(max(1, history.size() - 10), history.size()):
            if history[i]["role"] == "user":
                LLMClient.add_user_message(history[i]["content"])
            elif history[i]["role"] == "assistant":
                LLMClient.add_assistant_message(history[i]["content"])
```

---

## Best Practices

1. **Set System Prompt First**: Always call `set_system_prompt()` before starting a conversation to define the AI's behavior.

2. **Monitor Context Size**: Large contexts can slow down responses. Consider clearing or trimming the context periodically.

3. **Clear Context Between Topics**: When switching to a completely different topic or user, call `clear_context()` to avoid confusion.

4. **Error Handling**: If a request fails, the user message is automatically removed from history to keep the context clean.

5. **Use Simple Prompts for One-offs**: For quick, context-free queries, use the old `send_prompt()` method instead of chat.

---

## Signals

The same signals work for both chat and simple prompts:

- `llm_request_started(req_id: String)` - Emitted when a request starts
- `llm_request_finished(req_id: String, text: String)` - Emitted on success
- `llm_request_failed(req_id: String, status_code: int, body: String)` - Emitted on failure

```gdscript
func _ready():
    LLMClient.llm_request_started.connect(_on_request_started)
    LLMClient.llm_request_finished.connect(_on_request_finished)
    LLMClient.llm_request_failed.connect(_on_request_failed)

func _on_request_started(req_id):
    print("Request ", req_id, " started...")

func _on_request_finished(req_id, text):
    print("Request ", req_id, " finished!")

func _on_request_failed(req_id, code, body):
    print("Request ", req_id, " failed: ", code, " - ", body)
```

---

## Technical Details

### Message Format

Messages in the conversation history are stored as dictionaries:

```gdscript
{
    "role": "user",      # or "assistant" or "system"
    "content": "Hello!"  # the actual message text
}
```

### API Endpoint

- **Chat**: `POST /api/chat` (with context)
- **Simple**: `POST /api/generate` (no context)

### Payload Structure (Chat)

```json
{
    "model": "llama3.2",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant"},
        {"role": "user", "content": "Hello"},
        {"role": "assistant", "content": "Hi!"},
        {"role": "user", "content": "Tell me about Mars"}
    ],
    "stream": false,
    "temperature": 0.7,
    "max_tokens": 256
}
```

---

## Troubleshooting

### AI doesn't remember previous messages
- Make sure you're using `send_chat_message()` not `send_prompt()`
- Check that you haven't called `clear_context()` accidentally
- Verify context size with `get_context_size()`

### Responses are slow or timing out
- Context might be too large - consider clearing old messages
- Check Ollama server performance
- Reduce `max_tokens` setting

### AI behaves unexpectedly
- Review your system prompt
- Check the conversation history with `get_context()`
- Try clearing context and starting fresh

### API errors
- Verify Ollama is running: `http://localhost:11434`
- Check that the model is loaded: `ollama list`
- Review error messages from the `llm_request_failed` signal

