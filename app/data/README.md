# Ocean Species Data

## Overview

This directory contains the ocean species minicard data for the RAG (Retrieval-Augmented Generation) system.

## Data File

**`ocean_species_minicards_osa_CR.json`**
- **Total Entries**: 2,960 species observations
- **Unique Species**: ~100+ different species
- **Region**: Osa region, Costa Rica (Tropical Eastern Pacific)

## Data Structure

Each entry follows this JSON structure:

```json
{
  "topic": "Species: Common Name (Scientific Name)",
  "data": "Habitat: [habitat type]. Depth: [depth range]. Trophic role: [feeding behavior]. Notes: [behavioral/ecological notes]. Region: [geographic info]"
}
```

### Example Entry

```json
{
  "topic": "Species: Yellowfin surgeonfish (Acanthurus xanthopterus)",
  "data": "Habitat: nearshore sandy flats. Depth: midwater 0–100 m. Trophic role: invertivore. Notes: forms schools when foraging, occasionally enters turbid water. Region: Tropical Eastern Pacific; observed in Costa Rica waters including Osa."
}
```

## Data Fields

### Topic
- Format: `Species: [Common Name] ([Scientific Name])`
- Example: `Species: Yellowfin surgeonfish (Acanthurus xanthopterus)`

### Data (Structured Information)

#### Habitat Types
- nearshore sandy flats
- coral reef
- coastal rocky reef
- open water near shelf
- seamount/pinnacle drop-off
- submerged pinnacle
- mangrove fringe
- outer reef slope

#### Depth Ranges
- shallow (<10 m)
- 10–30 m
- 20–50 m
- 30–60 m
- midwater 0–100 m
- epipelagic (0–200 m)

#### Trophic Roles
- herbivore
- invertivore
- planktivore
- omnivore
- generalist predator
- apex/pelagic predator

#### Notes (Behavioral/Ecological)
- forms schools when foraging
- nocturnal foraging reported
- associated with cleaning stations
- prefers clear water
- tolerates moderate surge
- seasonal presence varies with currents
- regularly seen around Osa/Isla del Caño
- occasionally enters turbid water
- often near high-relief structure
- detected in BRUVS surveys

## Usage

This data is automatically loaded by the `OceanSpeciesRAG` autoload system. See:
- `/app/custom_pluggins/OCEAN_SPECIES_RAG_GUIDE.md` - Complete guide
- `/app/custom_pluggins/OCEAN_SPECIES_RAG_QUICKREF.md` - Quick reference

## Statistics

```
Total Entries:     2,960
Unique Species:    ~100+
Data Source:       Osa region, Costa Rica
Coverage:          Multiple habitat types, depths, and trophic levels
```

## Integration

The data is integrated into the Godot VR museum application through:
1. **OceanSpeciesRAG** - RAG system (autoload)
2. **LLMClient** - Language model integration
3. **GenaiAudioPipeline** - Audio response system

Example usage:
```gdscript
var results = OceanSpeciesRAG.search_species("coral reef herbivore", 5)
```

