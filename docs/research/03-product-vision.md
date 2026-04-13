# Screenshop — Product Vision

## Tagline

"The Photoshop for App Store Screenshots"

## Problem

Putting an app on the App Store or Google Play requires polished, conversion-optimized screenshots. But:

- Simply screenshotting your app and uploading it looks unprofessional
- Existing tools are either too basic (template-only) or too expensive (subscription fatigue)
- The market is fragmented — 15+ tools, none dominant, none comprehensive
- Developers lose entire days creating screenshots across device sizes and languages
- AI tools exist but sacrifice control for speed — quality gap remains

## Vision

Screenshop is a **developer-friendly, AI-assisted screenshot studio** that bridges the gap between quick-and-dirty template tools and expensive design agencies. It gives developers full creative control while automating the tedious parts (resizing, localization, device frames).

## Target Users

### Primary: Indie Developers & Small Teams

- Ship 1-5 apps
- Price-sensitive (prefer one-time or freemium over subscriptions)
- Want speed + quality without hiring a designer
- Comfortable with code/CLI but shouldn't need to be

### Secondary: Marketing/Growth Teams

- Manage multiple apps with frequent updates
- Need localization at scale (10+ languages)
- Want A/B testing integration
- Need brand consistency across products

---

## Key Differentiators

### 1. Hybrid Editor: Visual + Code

- Rich visual WYSIWYG editor for designing screenshots
- Export/import templates as JSON/code for version control and CI/CD
- CLI tool for automated generation in release pipelines (`screenshop generate --config ./screenshots.json`)

### 2. AI-Assisted, Human-Controlled

- AI suggests layouts, headlines, and color palettes based on your app category
- AI generates localized captions with context-awareness (not just Google Translate)
- AI auto-crops and repositions elements across device sizes
- Human always has final say — AI assists, never overrides

### 3. Full Platform Coverage

- All Apple devices: iPhone, iPad, Mac, Apple Watch, Apple TV
- All Android devices: Phone, Tablet, Wear OS, Android TV
- Auto-generates all required sizes from a single design
- Correct dimensions guaranteed — no more rejection for being off by 1 pixel

### 4. Smart Localization

- Context-aware AI translation (understands UI terminology)
- RTL language support (Arabic, Hebrew)
- Cultural adaptation (not just word translation)
- Preview in all languages simultaneously

### 5. Conversion-Optimized Templates

- Templates based on actual conversion data, not just aesthetics
- Built-in checklist: value proposition, text readability, keyword optimization
- Apple OCR keyword suggestions for caption text
- Story flow templates (Problem → Solution → Trust)

---

## Feature Roadmap (Proposed Phases)

### Phase 1: Core Editor (MVP)

- [ ] Canvas editor with device frame overlays
- [ ] Import app screenshots (drag & drop or paste)
- [ ] Text overlays with typography controls
- [ ] Background options (solid, gradient, image)
- [ ] Device frame library (latest iPhone, Android models)
- [ ] Export at all required App Store / Play Store dimensions
- [ ] Template system (save/load designs)
- [ ] 10-20 starter templates covering popular styles

### Phase 2: Productivity & Polish

- [ ] Panoramic/connected screenshot support
- [ ] Batch export (all devices + all screenshots in one click)
- [ ] Project system (group screenshots by app)
- [ ] Before/after and split-screen layouts
- [ ] Custom device frame colors/styles (Real, Clay, Matte, Flat)
- [ ] Undo/redo with full history
- [ ] Keyboard shortcuts for power users

### Phase 3: AI & Localization

- [ ] AI headline suggestions based on app category
- [ ] AI layout recommendations
- [ ] AI-powered localization (context-aware, not literal)
- [ ] Auto-resize intelligence (smart cropping across device sizes)
- [ ] Apple OCR keyword optimization assistant

### Phase 4: Developer Workflow

- [ ] CLI tool for CI/CD integration
- [ ] JSON/YAML template format for version control
- [ ] GitHub Actions / fastlane integration
- [ ] Direct upload to App Store Connect and Google Play Console
- [ ] REST API for automation

### Phase 5: Optimization & Analytics

- [ ] A/B test variant generation
- [ ] Integration with store analytics (PPO, Play Experiments)
- [ ] Conversion prediction scoring
- [ ] Competitor screenshot analysis

---

## Technology Considerations

### Desktop App vs. Web App vs. Both

| Approach                     | Pros                                            | Cons                                    |
| ---------------------------- | ----------------------------------------------- | --------------------------------------- |
| **Web App**                  | Cross-platform, no install, easy updates        | Canvas performance, offline limitations |
| **Desktop (Electron/Tauri)** | Native performance, offline, file system access | Platform-specific builds                |
| **Hybrid**                   | Best of both worlds                             | More engineering effort                 |

### Recommended Stack (TBD)

- **Frontend**: React + Canvas API (or WebGL for performance) or a framework like Fabric.js / Konva.js
- **Desktop wrapper**: Tauri (lightweight, Rust-based) or Electron
- **AI**: Claude API for text generation, localization
- **Export**: Sharp/Canvas for image generation, PDF support
- **CLI**: Node.js or Go binary

---

## Pricing Model Ideas

| Model                 | Description                                           | Target            |
| --------------------- | ----------------------------------------------------- | ----------------- |
| **Free tier**         | 3 screenshots/month, watermark-free, basic templates  | Hobbyists         |
| **One-time purchase** | $29-49, all features, free updates for 1 year         | Indie devs        |
| **Pro subscription**  | $9-15/month, AI features, unlimited, priority support | Power users/teams |
| **Team/Enterprise**   | Custom pricing, collaboration, API access             | Agencies          |

---

## Success Metrics

- Time to first screenshot export < 5 minutes for new users
- Screenshot creation time reduced by 80% vs. manual Figma/Photoshop workflow
- Support all mandatory App Store and Play Store dimensions out of the box
- Positive conversion impact measurable through A/B testing
