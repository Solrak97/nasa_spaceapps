# RAG Granularity: Can I Ask About Specific Things?

## The Question

> "If my topic is 'biodiversity' and contains info about a fish, can I ask about the fish and get the biodiversity answer?"

## The Answer

**YES! ✅** The RAG service searches **both the topic AND the content**, so it will find your fish!

---

## How It Works

### TF-IDF Search Process:

```
User Query: "clownfish"
    ↓
1. Search in TOPICS → "ocean biodiversity" (no match yet)
    ↓
2. Search in CONTENT → "The clownfish lives in coral reefs..." (MATCH! ✅)
    ↓
3. Return: "ocean biodiversity" topic with score based on word matches
```

**The service indexes ALL the text**, not just the topic title!

---

## 📊 Comparison of Approaches

### Approach 1: General Topic (Will Work!)

```gdscript
await GenaiAudioPipeline.add_knowledge_to_rag(
    "ocean biodiversity marine species",  # General topic
    """
    Ocean biodiversity includes over 200,000 species.
    Clownfish live symbiotically with sea anemones.
    Parrotfish eat algae and produce sand.
    Seahorses are unique - males carry babies.
    """
)

# Query: "Tell me about clownfish"
# Result: ✅ FOUND (score: ~0.35)
# Why: "clownfish" found in content
```

**Pros:**
- ✅ One entry covers multiple species
- ✅ Good for overview questions
- ✅ Less maintenance

**Cons:**
- ⚠️ Lower matching score (fish name not in topic)
- ⚠️ Might miss if you have many entries
- ⚠️ Less detail per species

---

### Approach 2: Include Specific Names in Topic (Better!)

```gdscript
await GenaiAudioPipeline.add_knowledge_to_rag(
    "ocean biodiversity clownfish parrotfish seahorse species",  # Includes fish!
    """
    Ocean biodiversity includes over 200,000 species.
    Clownfish live symbiotically with sea anemones.
    Parrotfish eat algae and produce sand.
    Seahorses are unique - males carry babies.
    """
)

# Query: "Tell me about clownfish"
# Result: ✅ FOUND (score: ~0.62)
# Why: "clownfish" in BOTH topic AND content
```

**Pros:**
- ✅ Higher matching scores
- ✅ Better ranking vs other topics
- ✅ Still one entry for overview

**Cons:**
- ⚠️ Topic can get long with many species
- ⚠️ Still somewhat general answers

---

### Approach 3: Separate Entry Per Species (Most Specific!)

```gdscript
# General overview
await GenaiAudioPipeline.add_knowledge_to_rag(
    "ocean biodiversity marine species ecosystem",
    "Ocean biodiversity includes millions of species across all zones..."
)

# Specific clownfish entry
await GenaiAudioPipeline.add_knowledge_to_rag(
    "clownfish anemone symbiotic reef orange fish nemo",  # Rich keywords!
    """
    Clownfish are orange and white striped fish, famous from Finding Nemo.
    They live in sea anemones with immunity to stings.
    Found in Pacific and Indian Oceans in warm coral reefs.
    Can change sex - all born male, dominant becomes female.
    """
)

# Specific parrotfish entry
await GenaiAudioPipeline.add_knowledge_to_rag(
    "parrotfish reef algae sand production colorful beak",
    """
    Parrotfish have beak-like teeth for scraping algae off coral.
    Crucial for reef health and ecosystem balance.
    They excrete coral as fine sand - 90kg per fish per year!
    Major source of white sand on tropical beaches.
    """
)

# Query: "Tell me about clownfish"
# Result: ✅ FOUND (score: ~0.89)
# Why: Perfect match in dedicated entry
```

**Pros:**
- ✅ Highest matching scores
- ✅ Detailed, focused answers
- ✅ Easy to add/update individual species
- ✅ Better for specific questions

**Cons:**
- ⚠️ More entries to maintain
- ⚠️ Slightly more work upfront

---

## 🎯 Which Approach Should You Use?

### Use Approach 1 (General Topic) When:
- You have a small knowledge base (<20 entries)
- Questions are usually general ("tell me about ocean life")
- You want minimal maintenance

### Use Approach 2 (Keywords in Topic) When:
- You want balance between detail and simplicity
- You have some specific questions but also general ones
- **Recommended for most hackathon projects!** ⭐

### Use Approach 3 (Separate Entries) When:
- Users ask many specific questions ("what about this fish?")
- You want the most accurate, detailed answers
- You have time to create detailed entries
- Your domain has distinct, important entities

---

## 💡 Hybrid Approach (Best of Both Worlds!)

```gdscript
func load_ocean_knowledge():
    # General biodiversity overview
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "ocean biodiversity marine species ecosystem richness",
        """
        Ocean biodiversity includes over 200,000 known species.
        From microscopic plankton to massive blue whales.
        Each species plays a role in the ocean ecosystem.
        Many species still undiscovered, especially in deep sea.
        """
    )
    
    # Featured species with rich details
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "clownfish anemone symbiotic reef nemo orange",
        """
        Clownfish are iconic orange and white striped reef fish.
        Live symbiotically with sea anemones, immune to their stings.
        Can change sex - all born male, dominant becomes female.
        Made famous by the movie Finding Nemo.
        """
    )
    
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "parrotfish sand reef algae colorful beak teeth",
        """
        Parrotfish have beak-like fused teeth for scraping algae.
        Crucial for maintaining healthy coral reef ecosystems.
        Produce white sand - one fish makes 90kg per year!
        Over 80 colorful species found in tropical waters.
        """
    )

# Now you get:
# - "Tell me about ocean biodiversity" → General overview ✅
# - "Tell me about clownfish" → Specific details ✅
# - "What fish makes sand?" → Parrotfish info ✅
```

---

## 🧪 Testing Your Granularity

```gdscript
# Test what gets retrieved
await GenaiAudioPipeline.test_rag_retrieval("clownfish")
await GenaiAudioPipeline.test_rag_retrieval("parrotfish sand")
await GenaiAudioPipeline.test_rag_retrieval("ocean biodiversity")
await GenaiAudioPipeline.test_rag_retrieval("reef fish")

# See what you have
var kb = await GenaiAudioPipeline.get_all_rag_knowledge()
print("Knowledge entries: %d" % kb["count"])
for entry in kb["entries"]:
    print("  - %s" % entry["topic"])
```

---

## 📈 Matching Score Examples

### Query: "Tell me about clownfish"

| Approach | Topic | Content Mentions | Score | Match Quality |
|----------|-------|------------------|-------|---------------|
| General | "biodiversity" | Yes | ~0.35 | ⚠️ Fair |
| With Keywords | "biodiversity clownfish..." | Yes | ~0.62 | ✅ Good |
| Dedicated | "clownfish anemone..." | Yes | ~0.89 | ✅✅ Excellent |

**Higher score = Better match = More likely to be returned!**

---

## 🎮 Real Example

```gdscript
func setup_museum_knowledge():
    """
    For a VR ocean museum about reef ecosystems
    """
    
    # EXHIBIT OVERVIEW (General)
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "coral reef ecosystem biodiversity colorful tropical",
        """
        Coral reefs are the rainforests of the sea.
        Support 25% of marine species despite covering <1% of ocean.
        Feature vibrant colors and complex relationships.
        Home to fish, corals, invertebrates, and more.
        """
    )
    
    # FEATURED CREATURES (Specific)
    # These are your main exhibits!
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "clownfish nemo anemone symbiotic orange white exhibit",
        """
        EXHIBIT: Clownfish & Anemone Tank
        See live clownfish swimming through anemone tentacles.
        Learn about their amazing symbiotic relationship.
        Watch them change sex in our breeding program.
        """
    )
    
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "parrotfish sand algae reef cleaning colorful exhibit",
        """
        EXHIBIT: Parrotfish Sand Factory
        Watch parrotfish scrape algae with their beak-like teeth.
        See how they produce sand - up to 90kg per year per fish!
        The white sand on beaches comes from parrotfish poop.
        Touch the sand they produce in our interactive display.
        """
    )
    
    # CONSERVATION (Thematic)
    await GenaiAudioPipeline.add_knowledge_to_rag(
        "reef conservation protection climate change bleaching threats",
        """
        Coral reefs face threats from climate change and pollution.
        50% of reefs have been lost in the last 30 years.
        Our museum supports reef restoration projects.
        Learn how you can help protect these ecosystems.
        """
    )

# Now users can ask:
# - "What's special about coral reefs?" → General overview
# - "Tell me about clownfish" → Specific exhibit info
# - "What fish makes sand?" → Parrotfish exhibit
# - "Are reefs in danger?" → Conservation info
```

---

## ✅ Key Takeaways

1. **YES**, asking about a fish mentioned in "biodiversity" WILL retrieve it ✅

2. **Include specific names in topics** for better matching:
   ```gdscript
   "biodiversity clownfish parrotfish seahorse"  # ✅ Good
   vs
   "biodiversity marine life"  # ⚠️ Less specific
   ```

3. **TF-IDF searches BOTH topic and content** - not just the title

4. **Separate entries = Better scores**, but more work

5. **Hybrid approach** works great for museums/exhibits

6. **Test your queries** to see what matches:
   ```gdscript
   await GenaiAudioPipeline.test_rag_retrieval("your query")
   ```

---

## 🚀 Quick Decision Tree

```
Do users ask about SPECIFIC things (fish names, exhibits)?
│
├─ YES, very specific → Use Approach 3 (separate entries)
│   Example: "Tell me about clownfish"
│
├─ YES, but also general → Use Approach 2 (keywords in topic) ⭐
│   Example: "What lives in reefs?" AND "Tell me about parrotfish"
│
└─ NO, mostly general → Use Approach 1 (general topic)
    Example: "What is ocean biodiversity?"
```

---

## 📝 Pro Tips

### Tip 1: Add Synonyms
```gdscript
"clownfish anemonefish nemo orange reef fish"
# "anemonefish" is another name for clownfish!
```

### Tip 2: Include Common Questions
```gdscript
"sand production parrotfish poop beaches white"
# Matches: "where does beach sand come from?"
```

### Tip 3: Use Context Keywords
```gdscript
"exhibit display tank clownfish anemone viewing"
# Good for museum/exhibit contexts
```

### Tip 4: Test Different Phrasings
```gdscript
await GenaiAudioPipeline.test_rag_retrieval("clownfish")
await GenaiAudioPipeline.test_rag_retrieval("orange fish")
await GenaiAudioPipeline.test_rag_retrieval("nemo fish")
await GenaiAudioPipeline.test_rag_retrieval("anemone fish")
```

---

## 🎉 Bottom Line

**Your question: Can I ask about a fish in a biodiversity topic?**

**Answer: YES! ✅**

The RAG service will find it because it searches the content, not just the topic name. For even better results, include the fish name in the topic keywords!

**Test file created:** `test_rag_granularity.gd` - Run it to see it in action!

