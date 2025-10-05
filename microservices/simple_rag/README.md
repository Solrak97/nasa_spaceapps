# Simple RAG Microservice

## What Is This?

A **lightweight alternative to Elasticsearch** for semantic retrieval using **TF-IDF** (Term Frequency-Inverse Document Frequency) similarity matching.

**Better than**: Keyword matching  
**Easier than**: Elasticsearch + embeddings  
**Perfect for**: Hackathons, prototypes, demos

## Why Not Elasticsearch?

| Feature | This Service | Elasticsearch |
|---------|-------------|---------------|
| Setup time | 5 minutes | 1-2 hours |
| Dependencies | Python + sklearn | ES cluster + vectorizer |
| Memory usage | ~50 MB | ~500 MB+ |
| Semantic search | ✅ (TF-IDF) | ✅ (Full embeddings) |
| Scale | <1000 docs | Millions of docs |
| Hackathon-ready | ✅ | ❌ |

## Quick Start

### 1. Install Dependencies

```bash
cd microservices/simple_rag
pip install -r requirements.txt
```

Or using `uv` (faster):

```bash
uv pip install -r requirements.txt
```

### 2. Start the Service

```bash
python app.py
```

Service runs on: `http://localhost:8001`

### 3. Test It

```bash
# Health check
curl http://localhost:8001/

# Retrieve context
curl -X POST http://localhost:8001/retrieve \
  -H "Content-Type: application/json" \
  -d '{"query": "How deep is the ocean?", "top_k": 2}'
```

## Usage in Godot

### Basic Usage

```gdscript
extends Node3D

var rag_client: RAGClient

func _ready():
    rag_client = RAGClient.new()
    add_child(rag_client)
    
    # Retrieve context
    var result = await rag_client.retrieve_context("ocean depth", 2)
    
    if result["success"]:
        print("Found contexts:")
        for ctx in result["contexts"]:
            print("- ", ctx["topic"])
```

### Integration with LLMClient

```gdscript
func chat_with_context(user_message: String) -> String:
    # Get relevant context
    var context = await rag_client.get_formatted_context(user_message, 2)
    
    # Build enhanced prompt
    var prompt = "CONTEXT:\n%s\n\nQUESTION:\n%s" % [context, user_message]
    
    # Send to LLM
    return await LLMClient.send_chat_message(prompt)
```

## API Endpoints

### `GET /`
Health check

**Response:**
```json
{
    "service": "Simple RAG",
    "status": "running",
    "documents": 10,
    "method": "TF-IDF similarity"
}
```

### `POST /retrieve`
Retrieve relevant contexts

**Request:**
```json
{
    "query": "How deep is the ocean?",
    "top_k": 2
}
```

**Response:**
```json
{
    "contexts": [
        {
            "topic": "Ocean Depth Zones",
            "content": "The average depth of the ocean..."
        },
        {
            "topic": "Mariana Trench",
            "content": "The Mariana Trench is the deepest..."
        }
    ],
    "scores": [0.654, 0.432]
}
```

### `POST /add_knowledge`
Add new knowledge dynamically

**Request:**
```
POST /add_knowledge?topic=New%20Topic&content=New%20information
```

**Response:**
```json
{
    "message": "Knowledge added",
    "total_documents": 11
}
```

### `GET /knowledge`
Get all knowledge entries

**Response:**
```json
{
    "documents": 10,
    "entries": [...]
}
```

## How TF-IDF Works

**TF-IDF** measures word importance across documents:

1. **Term Frequency (TF)**: How often a word appears in a document
2. **Inverse Document Frequency (IDF)**: How unique the word is across all documents
3. **Score**: TF × IDF = importance score

**Example:**
- Query: "deep ocean exploration"
- High scores for docs with: "deep", "ocean", "exploration"
- Low scores for docs with only common words like "the", "is"

**Better than keywords** because it:
- ✅ Understands related terms
- ✅ Ranks by relevance
- ✅ Handles synonyms (somewhat)

**Limitations:**
- ❌ Not true semantic (no embeddings)
- ❌ Doesn't understand context deeply
- ❌ Best for < 1000 documents

## Comparison: Keyword vs TF-IDF vs Elasticsearch

| Query | Keyword Match | TF-IDF | Elasticsearch + Embeddings |
|-------|---------------|--------|---------------------------|
| "ocean depth" | ✅ Good | ✅ Good | ✅ Excellent |
| "how deep is the sea" | ❌ Poor | ✅ Good | ✅ Excellent |
| "underwater pressure" | ❌ Poor | ✅ Fair | ✅ Excellent |
| "life in the abyss" | ❌ Poor | ✅ Good | ✅ Excellent |

## Performance

- **Startup**: ~0.5 seconds (vectorize 10 docs)
- **Query**: ~10-20ms per query
- **Memory**: ~50 MB
- **Scale**: Good up to ~1000 documents

## When to Use Each Method

### Use Keyword Matching (SimpleRetrieval) If:
- ✅ Need instant setup (0 setup time)
- ✅ Very small knowledge base (<20 items)
- ✅ Keywords match queries well
- ✅ Pure offline solution needed

### Use This (TF-IDF RAG) If:
- ✅ Need better than keywords
- ✅ Willing to run a microservice
- ✅ Medium knowledge base (20-1000 items)
- ✅ Queries vary in wording
- ✅ 5-minute setup is acceptable

### Use Elasticsearch + Embeddings If:
- ✅ Large knowledge base (>1000 items)
- ✅ Need true semantic understanding
- ✅ Have time for proper setup (2+ hours)
- ✅ Production application
- ✅ Need advanced features (filtering, aggregations)

## Customizing Knowledge Base

### Option 1: Edit `app.py`

Modify the `knowledge_base` array directly:

```python
knowledge_base = [
    {
        "topic": "Your Topic",
        "content": "Your detailed content here..."
    },
    # Add more...
]
```

### Option 2: Load from JSON

Add to `app.py`:

```python
import json

@app.on_event("startup")
async def startup_event():
    global knowledge_base
    
    # Load from file
    with open("knowledge.json", "r") as f:
        knowledge_base = json.load(f)
    
    # ... rest of vectorization code
```

### Option 3: API (Dynamic)

Use the `/add_knowledge` endpoint to add at runtime.

## Troubleshooting

### Service won't start
- Check Python version (3.9+)
- Install dependencies: `pip install -r requirements.txt`
- Check port 8001 is free: `lsof -i :8001`

### No contexts returned
- Lower the similarity threshold (currently 0.1)
- Try more general queries
- Check knowledge base has relevant content

### Poor matching quality
- Add more documents to knowledge base
- Use more descriptive content
- Consider upgrading to embeddings

### Godot connection fails
- Check service is running: `curl http://localhost:8001`
- Verify URL in `RAGClient` is correct
- Check firewall/network settings

## Development

### Run with auto-reload

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8001
```

### Run tests

```bash
# Manual test
curl -X POST http://localhost:8001/retrieve \
  -H "Content-Type: application/json" \
  -d '{"query": "bioluminescence in deep sea", "top_k": 3}'
```

## Docker (Optional)

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY app.py .

CMD ["python", "app.py"]
```

Build and run:
```bash
docker build -t simple-rag .
docker run -p 8001:8001 simple-rag
```

## Next Steps

1. **Start the service** - Run `python app.py`
2. **Test in Godot** - Use `RAGClient` in your scene
3. **Add your knowledge** - Edit `knowledge_base` array
4. **Iterate** - Add more content as needed

## Credits

Built for NASA Space Apps Hackathon 🚀  
A pragmatic middle-ground between keywords and full RAG!

