# Simple RAG microservice - No Elasticsearch needed!
# Uses sklearn's TfidfVectorizer for quick similarity matching
# Better than keywords, faster than full Elasticsearch setup

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from typing import List, Dict
import json
import os

app = FastAPI()

# Knowledge base
knowledge_base = [
    {
        "topic": "Mariana Trench",
        "content": "The Mariana Trench is the deepest oceanic trench on Earth, reaching depths of about 36,000 feet (11,000 meters). Located in the western Pacific Ocean, it's deeper than Mount Everest is tall. The pressure at the bottom is over 1,000 times atmospheric pressure at sea level. Only three people have ever reached the bottom: Jacques Piccard, Don Walsh (1960), and James Cameron (2012)."
    },
    {
        "topic": "Ocean Depth Zones",
        "content": "The average depth of the ocean is about 12,100 feet (3,688 meters). The deepest point is Challenger Deep in the Mariana Trench at 36,000 feet. Ocean zones by depth: Sunlight Zone (0-660ft), Twilight Zone (660-3,300ft), Midnight Zone (3,300-13,000ft), Abyssal Zone (13,000-20,000ft), Hadal Zone (20,000ft+)."
    },
    {
        "topic": "Ocean Exploration",
        "content": "Approximately 80% of the ocean remains unmapped and unexplored. We have better maps of Mars than of our ocean floor. Deep sea exploration is challenging due to extreme pressure, darkness, and cold. Modern tools include ROVs (Remotely Operated Vehicles), AUVs (Autonomous Underwater Vehicles), and deep-sea submersibles."
    },
    {
        "topic": "Marine Life Diversity",
        "content": "The ocean contains an estimated 2.2 million marine species, with 91% yet to be discovered. Deep sea creatures have unique adaptations like bioluminescence, large eyes, and soft bodies. The deepest fish ever recorded was a snailfish at 26,200 feet in the Mariana Trench. Giant squids can grow up to 43 feet long."
    },
    {
        "topic": "Ocean and Climate",
        "content": "The ocean absorbs about 30% of human-produced CO2 from the atmosphere. Ocean currents like the Gulf Stream regulate global climate and weather patterns. The ocean has absorbed 90% of the warming from climate change. Rising temperatures cause coral bleaching, sea level rise, and altered marine ecosystems."
    },
    {
        "topic": "Ocean Coverage",
        "content": "The ocean covers approximately 71% of Earth's surface. The Pacific Ocean is the largest, covering more area than all land combined. If Earth's history were a 24-hour day, the ocean would have appeared around 4am. The ocean holds about 97% of Earth's water."
    },
    {
        "topic": "Bioluminescence",
        "content": "About 90% of deep sea creatures produce their own light through bioluminescence. This ability serves multiple purposes: attracting prey, deterring predators, and communicating with others. The light is produced through chemical reactions involving luciferin and luciferase. Different species produce different colors, though blue and green are most common."
    },
    {
        "topic": "Hydrothermal Vents",
        "content": "Hydrothermal vents are underwater geysers found along mid-ocean ridges. Water heated by magma beneath the ocean floor shoots up through cracks, reaching temperatures of 750°F (400°C). These vents support unique ecosystems that don't rely on sunlight, instead using chemosynthesis. Tube worms, giant clams, and specialized bacteria thrive in these extreme environments."
    },
    {
        "topic": "Ocean Trenches",
        "content": "Ocean trenches are the deepest parts of the ocean, formed where tectonic plates converge. The Mariana Trench is the deepest, but there are others like the Tonga Trench, Philippine Trench, and Puerto Rico Trench. These environments experience crushing pressure, near-freezing temperatures, and complete darkness. Despite these conditions, life exists even at the deepest points."
    },
    {
        "topic": "Ocean Plastic Pollution",
        "content": "An estimated 8 million metric tons of plastic enter the ocean each year. The Great Pacific Garbage Patch is a massive collection of marine debris in the North Pacific Ocean. Microplastics have been found in the deepest ocean trenches and in marine life at all depths. This pollution affects over 800 marine species through entanglement or ingestion."
    }
]

# TF-IDF Vectorizer and document vectors
vectorizer = None
doc_vectors = None
docs_content = []

class QueryRequest(BaseModel):
    query: str
    top_k: int = 2

class ContextResponse(BaseModel):
    contexts: List[Dict[str, str]]
    scores: List[float]

@app.on_event("startup")
async def startup_event():
    """Initialize vectorizer on startup"""
    global vectorizer, doc_vectors, docs_content
    
    # Combine topic and content for better matching
    docs_content = [
        f"{doc['topic']} {doc['content']}" 
        for doc in knowledge_base
    ]
    
    # Create TF-IDF vectors
    vectorizer = TfidfVectorizer(
        max_features=1000,
        stop_words='english',
        ngram_range=(1, 2)  # Use unigrams and bigrams
    )
    doc_vectors = vectorizer.fit_transform(docs_content)
    
    print(f"✅ Vectorizer initialized with {len(knowledge_base)} documents")

@app.get("/")
async def root():
    return {
        "service": "Simple RAG",
        "status": "running",
        "documents": len(knowledge_base),
        "method": "TF-IDF similarity"
    }

@app.post("/retrieve", response_model=ContextResponse)
async def retrieve_context(request: QueryRequest):
    """
    Retrieve relevant context using TF-IDF similarity.
    Better than keyword matching, no heavy ML models needed!
    """
    try:
        # Vectorize the query
        query_vector = vectorizer.transform([request.query])
        
        # Calculate cosine similarity
        similarities = cosine_similarity(query_vector, doc_vectors)[0]
        
        # Get top-k indices
        top_indices = np.argsort(similarities)[::-1][:request.top_k]
        
        # Filter out very low scores (< 0.1)
        filtered_results = [
            (idx, similarities[idx]) 
            for idx in top_indices 
            if similarities[idx] > 0.1
        ]
        
        if not filtered_results:
            return ContextResponse(
                contexts=[],
                scores=[]
            )
        
        # Build response
        contexts = [
            {
                "topic": knowledge_base[idx]["topic"],
                "content": knowledge_base[idx]["content"]
            }
            for idx, score in filtered_results
        ]
        scores = [float(score) for idx, score in filtered_results]
        
        return ContextResponse(
            contexts=contexts,
            scores=scores
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/add_knowledge")
async def add_knowledge(topic: str, content: str):
    """Add new knowledge dynamically and re-index"""
    global vectorizer, doc_vectors, docs_content
    
    knowledge_base.append({
        "topic": topic,
        "content": content
    })
    
    # Re-index
    docs_content = [
        f"{doc['topic']} {doc['content']}" 
        for doc in knowledge_base
    ]
    doc_vectors = vectorizer.fit_transform(docs_content)
    
    return {
        "message": "Knowledge added",
        "total_documents": len(knowledge_base)
    }

@app.get("/knowledge")
async def get_knowledge():
    """Get all knowledge entries"""
    return {
        "documents": len(knowledge_base),
        "entries": knowledge_base
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

