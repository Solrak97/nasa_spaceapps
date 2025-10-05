# Media Organization Structure

## 📁 Organized File Structure

The media assets are now properly organized for better project management.

---

## 🗂️ Directory Structure

```
/web/public/
├── game_screenshots/          # VR game content and original captures
│   ├── demo-showcase.mp4      # VR demo video (6.1 MB)
│   ├── marine-biodiversity.jpg
│   ├── ocean_floor.jpeg
│   └── oceanic_image.jpeg
│
├── hero-ocean-depths.jpg      # Hero/banner images
├── vr-diving-underwater.jpg   # Feature images
├── coral-reef-colorful.jpg
├── jellyfish-bioluminescent.jpg
├── sea-turtle-swimming.jpg
├── ocean-exploration-icon.jpg
├── ai-ocean-guide.jpg
│
├── team-logo.jpeg             # Branding
├── deep-ocean.png
├── deepocean.ico
│
└── manifest.json              # PWA manifest
```

---

## 📂 Folder Purposes

### `/game_screenshots/`
**Purpose**: Original VR game content and screenshots

**Contains**:
- `demo-showcase.mp4` - VR demo video showcase
- `marine-biodiversity.jpg` - In-game capture
- `ocean_floor.jpeg` - Ocean floor texture/screenshot
- `oceanic_image.jpeg` - Ocean surface view

**Usage**: Game-related media, video content, original captures

**Why Organized**:
- Keeps game assets separate from generic images
- Easy to identify VR-specific content
- Better for version control (can add more game captures)
- Cleaner public folder structure

### `/public/` (root)
**Purpose**: General website assets

**Contains**:
- Downloaded Unsplash images (hero, features)
- Branding assets (logo, favicon)
- Configuration files (manifest)

**Usage**: Website imagery, branding, configuration

---

## 🔗 Updated Code References

All references have been updated to use the new paths:

### Video References
```tsx
// Homepage
<source src="/game_screenshots/demo-showcase.mp4" type="video/mp4" />

// World Page
<source src="/game_screenshots/demo-showcase.mp4" type="video/mp4" />
```

### Image References
```tsx
// Seas Page Hero
<Image src="/game_screenshots/marine-biodiversity.jpg" alt="..." />

// Homepage "Our Seas" Card
<Image src="/game_screenshots/marine-biodiversity.jpg" alt="..." />

// Example in documentation
<FeatureCard image="/game_screenshots/ocean_floor.jpeg" ... />
```

---

## 📋 File Inventory

### Game Screenshots Folder (4 files)
| File | Size | Type | Usage |
|------|------|------|-------|
| `demo-showcase.mp4` | 6.1 MB | Video | VR demo showcase |
| `marine-biodiversity.jpg` | ~118 KB | Image | Hero/features |
| `ocean_floor.jpeg` | - | Image | Original capture |
| `oceanic_image.jpeg` | - | Image | Original capture |

### Root Public Folder (8 images + assets)
| File | Size | Type | Source |
|------|------|------|--------|
| `hero-ocean-depths.jpg` | 346 KB | Image | Unsplash |
| `vr-diving-underwater.jpg` | 542 KB | Image | Unsplash |
| `coral-reef-colorful.jpg` | 995 KB | Image | Unsplash |
| `jellyfish-bioluminescent.jpg` | 681 KB | Image | Unsplash |
| `sea-turtle-swimming.jpg` | 112 KB | Image | Unsplash |
| `ocean-exploration-icon.jpg` | 66 KB | Image | Unsplash |
| `ai-ocean-guide.jpg` | 37 KB | Image | Unsplash |
| `team-logo.jpeg` | - | Image | Team |

---

## 🎯 Benefits of Organization

### 1. **Clear Separation**
- Game assets vs. website assets
- Easy to identify content source
- Better mental model of project structure

### 2. **Scalability**
- Can add more game screenshots easily
- Room for additional folders (e.g., `/icons/`, `/backgrounds/`)
- Won't clutter root public folder

### 3. **Version Control**
- Game assets tracked separately
- Can `.gitignore` specific folders if needed
- Easier to see what changed

### 4. **Maintenance**
- Know where to put new game captures
- Easy to find and update video
- Clear location for demo content

### 5. **Professional Structure**
- Industry-standard organization
- Easy for team members to navigate
- Better for documentation

---

## 🔄 Migration Notes

### What Changed
✅ Moved `demo-showcase.mp4` → `game_screenshots/`  
✅ Moved `marine-biodiversity.jpg` → `game_screenshots/`  
✅ Kept existing `ocean_floor.jpeg` and `oceanic_image.jpeg` in `game_screenshots/`  
✅ Updated all code references to new paths  
✅ Updated all documentation with new paths  

### Code Files Updated
- ✅ `/web/app/page.tsx` - Homepage video & image
- ✅ `/web/app/world/page.tsx` - World page video
- ✅ `/web/app/seas/page.tsx` - Seas page hero
- ✅ `/web/app/components/VideoShowcase.tsx` - Examples
- ✅ `/web/app/components/Card.tsx` - Examples
- ✅ `/web/app/components/README_COMPONENTS.md` - Documentation

### No Breaking Changes
- All paths updated automatically
- No 404 errors
- No missing assets
- Fully functional

---

## 📱 Usage in Code

### Accessing Game Screenshots
```tsx
// Video
<video src="/game_screenshots/demo-showcase.mp4" controls />

// Images
<Image src="/game_screenshots/marine-biodiversity.jpg" alt="..." />
<Image src="/game_screenshots/ocean_floor.jpeg" alt="..." />
<Image src="/game_screenshots/oceanic_image.jpeg" alt="..." />
```

### Accessing Root Assets
```tsx
// Downloaded Unsplash images
<Image src="/hero-ocean-depths.jpg" alt="..." />
<Image src="/coral-reef-colorful.jpg" alt="..." />

// Branding
<Image src="/team-logo.jpeg" alt="..." />
<link rel="icon" href="/deepocean.ico" />
```

---

## 🎨 Best Practices

### Adding New Game Screenshots
1. Save to `/web/public/game_screenshots/`
2. Use descriptive names (e.g., `vr-gameplay-coral-reef.jpg`)
3. Keep original quality for archival
4. Create optimized versions if needed
5. Update this documentation

### Adding New Website Images
1. Download to `/web/public/` root
2. Follow naming convention (lowercase, hyphens)
3. Optimize for web (use Next.js Image)
4. Document source and license
5. Update IMAGE_LICENSES.md

### Folder Naming
- Use lowercase
- Use underscores for multi-word folders
- Be descriptive (`game_screenshots` not just `screenshots`)
- Consider future expansion

---

## 🔮 Future Expansion Ideas

### Potential Additional Folders
```
/web/public/
├── game_screenshots/      # ✅ Implemented
├── ui_elements/           # UI components, buttons, icons
├── backgrounds/           # Background images
├── thumbnails/            # Video/article thumbnails
├── team_photos/          # Team member photos
└── nasa_data_viz/        # NASA data visualizations
```

### Naming Conventions
- Folders: `lowercase_with_underscores`
- Files: `lowercase-with-hyphens.ext`
- Descriptive names: `vr-coral-reef-scene.jpg` not `img1.jpg`

---

## ✅ Checklist for New Media

When adding new media files:
- [ ] Choose appropriate folder
- [ ] Use consistent naming
- [ ] Optimize file size
- [ ] Update code references
- [ ] Document in appropriate MD file
- [ ] Verify license/source
- [ ] Test in browser
- [ ] Commit with descriptive message

---

## 📊 Summary

### Current Organization
```
Total Files: 16
├── game_screenshots/: 4 files (1 video, 3 images)
└── public root: 12 files (8 images, 4 other)
```

### Status
✅ **Organized and functional**  
✅ **All paths updated**  
✅ **No broken links**  
✅ **Well documented**  
✅ **Ready for expansion**  

---

## 🔍 Quick Reference

### Game Content
📁 `/game_screenshots/` → VR game videos and original captures

### Website Images  
📁 `/public/` root → General website imagery and assets

### Branding
📁 `/public/` root → Logo, favicon, manifest

### Access Pattern
```tsx
// Root: /filename.ext
// Subfolder: /folder_name/filename.ext
```

---

**Organization Complete!** 🎉

Your media assets are now properly structured for a professional, scalable project.

