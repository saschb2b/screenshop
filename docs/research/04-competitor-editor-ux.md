# Competitor Editor UX Research

## Editor-by-Editor Breakdown

### AppMockUp Studio (app-mockup.com)

- **Layout:** Template-first. Browse horizontal template carousel, pick one, enter editor. Central canvas with controls for device/text/background.
- **Workflow:** Select template -> upload screenshots -> customize -> dual preview (App Store + Play Store) -> export
- **Backgrounds:** Solid, gradients, custom image upload, panoramic images that auto-adjust across slides
- **Text:** Title/subtitle in a properties panel, not inline
- **Device frames:** Three styles: realistic, clay/solid, custom tint. Freely resizable, rotatable, positionable.
- **Save:** Projects as `.mockup` files locally
- **UX verdict:** "You upload, you pick a device frame, you export." Simple and genuinely free, but minimal customization limits polish.

### LaunchMatic

- **Layout:** Sidebar-based. Template tab in sidebar, main editor area, Export button top-right.
- **Workflow:** Pick template from sidebar -> customize text/background/devices -> Export -> select target devices -> pay $5/device -> download
- **Key feature:** Auto-applies design across all iOS/Android device sizes as you work
- **Translation:** One-click to all supported languages
- **UX verdict:** Templates designed by ASO experts. Auto-apply-across-devices is great. $5/device export model creates friction.

### AppScreens (appscreens.com)

- **Layout:** Layer-based, NO drag-and-drop. Dropdown menus and nested settings panels for properties.
- **Workflow:** Create one responsive layout -> engine auto-generates across all device sizes and 81 languages including RTL
- **Text:** Panel-based, nested menus to change color/font. AI captions available.
- **UX verdict:** Most powerful automation (one layout generates everything) but steepest learning curve. Sluggish performance. "Using a factory machine to bake one loaf of bread."

### Previewed.app

- **Layout:** Minimalist drag-and-drop editor. For 3D: timeline at bottom with keyframes, camera/environment controls.
- **3D:** ~30 devices. 2D images, 3D snapshots, and 3D animations with keyframes.
- **Backgrounds:** Limited. No built-in graphics library.
- **Text:** Limited formatting, standard fonts only.
- **UX verdict:** 3D capabilities are unique. But only ~10 templates, minimal text/background customization. User reviews overwhelmingly negative.

### Hotpot.ai

- **Layout:** Drag-and-drop editor. Click "Edit" to customize. Controls: width/size, font, background color, text shadow/spacing.
- **Workflow:** Browse templates -> select -> click device frames to load screenshots -> customize -> Resize menu generates all sizes -> download
- **Text:** Click to edit. Controls for font, line height, letter spacing, shadow.
- **Device frames:** iPhone 12 Pro Max, XS Max, 8 Plus, iPad Pro, MacBook Pro, Samsung S10 (outdated)
- **Key pattern:** "Create once, resize everywhere" via Resize menu
- **UX verdict:** Accessible but basic. Free tier plagued by ads and popups.

### Placeit by Envato

- **Layout:** Single-page editor. Controls appear on left when template selected. Preview on right.
- **Workflow:** Browse templates -> click -> upload screenshot (drag-and-drop onto button) -> customize background/text/fonts -> download
- **Text:** Panel-based: title + up to 3 body text lines. Font and color per line.
- **UX verdict:** "Less than 3 minutes to professional results." Extremely easy. But everyone's output looks the same. Limited customization beyond template.

### Screenshot Otter

- **Layout:** Two modes: (1) template-based quick flow, (2) blank canvas (Pro) with full control.
- **Workflow:** Drop screenshots -> select template -> customize captions per slide -> export ZIP or push to App Store Connect / Google Play
- **Backgrounds:** Custom, Unsplash stock photos, gradients, textures (Pro)
- **Text:** Rich styling with gradients, text shadows, font selection, positioning. AI Caption Assistant (Claude-powered)
- **Device frames:** Standard + 3D iPhone (Pro). Magnifier zoom overlays for UI details.
- **Key pattern:** Zero-friction: no signup, no paywall for basic use
- **UX verdict:** Best onboarding. "Drag in screenshots, pick template, export." Local browser rendering (privacy). Direct store upload.

### Nakxi

- **Layout:** Three-panel: left sidebar (420px, templates/layers), central canvas (drag-and-drop + snap lines), fixed top toolbar
- **Controls:** Color picker with hex + swatch, range sliders with gradients, font dropdowns, grouped dimension inputs
- **Canvas features:** Snap alignment guides (red lines), 8-point resize handles (4 corners + 4 edges + rotation), right-click context menus
- **Layers:** Panel with thumbnail previews, visibility toggles
- **UX verdict:** Most Figma-like. Maximum design control with professional-grade interaction patterns.

### Figma (community templates)

- **Layout:** Standard Figma: layers sidebar, canvas, properties panel
- **Workflow:** Install template -> replace screenshots via mockup plugin -> edit text inline -> localize via ASO.dev plugin -> export -> bulk upload
- **UX verdict:** Maximum creative freedom but maximum manual effort. Every device/language is a separate frame. Best for teams already in Figma.

---

## Key UX Patterns (What the Best Tools Have in Common)

### 1. Template-first, not blank canvas

Every successful tool starts users with a template. Blank canvas is advanced/Pro. Eliminates "blank page" paralysis.

### 2. Three common layouts

- **Sidebar + Canvas** (most common): sidebar for templates/controls, central canvas. LaunchMatic, Nakxi, AppLaunchpad.
- **Single-page editor** (simpler): preview and controls on same page. Placeit, Hotpot.
- **Automation-first** (no visual canvas): define one layout, generate all. AppScreens.

### 3. "Design once, generate everywhere"

Auto-generate all device sizes from a single design. The single most valued feature. AppScreens, Screenshot Otter, AppDrift, LaunchMatic.

### 4. Zero-friction onboarding

No signup, no paywall for basic use. Screenshot Otter, AppMockUp praised for this. Tools requiring signup before evaluation get criticized.

### 5. Drag-and-drop is expected

AppScreens' lack of drag-and-drop is its most criticized UX decision. Nested dropdown menus for basic properties like text color are unacceptable.

### 6. Panoramic/continuous backgrounds

96% of top apps use narrative flow across screenshots. Continuous backgrounds that span multiple slides.

### 7. Instant feedback loop

Fastest tools (Screenshot Otter, AppMockUp) are praised for instant preview. Slowest (AppScreens) are criticized even with more features. Fewer features + instant feedback > more features + lag.

### 8. Layer management for power users

Layer panel with thumbnails, visibility toggles, snap alignment (Nakxi/Figma). Simpler tools hide layers and use template constraints.

---

## What Makes UX Bad

- Paywalled templates blocking evaluation
- No drag-and-drop
- Sluggish performance
- Ads/popups in free tier
- Limited templates (<10)
- Confusing onboarding ("where do I upload?")
- Template-locked designs that all look the same

## What Makes UX Good

- Immediate value without signup or payment
- Instant visual feedback on every change
- One design generates all sizes automatically
- Direct store integration
- Snap alignment and resize handles
- Per-slide customization within consistent template
- Pre-built gradient/background presets, not just raw color pickers
