import type {
  BackgroundConfig,
  HeadlineText,
  SubtitleText,
  PhoneLayout,
  TextLayout,
} from "./editor-context";

export interface GradientPreset {
  id: string;
  name: string;
  start: string;
  end: string;
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  { id: "purple-pink", name: "Purple Pink", start: "#6C3CE0", end: "#E040FB" },
  { id: "blue-cyan", name: "Ocean", start: "#1A73E8", end: "#00BCD4" },
  { id: "sunset", name: "Sunset", start: "#FF6B35", end: "#F7C948" },
  { id: "midnight", name: "Midnight", start: "#0F0C29", end: "#302B63" },
  { id: "emerald", name: "Emerald", start: "#11998E", end: "#38EF7D" },
  { id: "rose", name: "Rose", start: "#ED4264", end: "#FFEDBC" },
  { id: "neon", name: "Neon", start: "#00F0FF", end: "#7B2FF7" },
  { id: "charcoal", name: "Charcoal", start: "#232526", end: "#414345" },
  { id: "peach", name: "Peach", start: "#FFB88C", end: "#DE6262" },
  { id: "sky", name: "Sky", start: "#89F7FE", end: "#66A6FF" },
  { id: "forest", name: "Forest", start: "#134E5E", end: "#71B280" },
  { id: "candy", name: "Candy", start: "#D585FF", end: "#00FFEE" },
];

export interface SlidePreset {
  headline: string;
  subtitle: string;
  phoneLayout?: Partial<PhoneLayout>;
  textLayout?: Partial<TextLayout>;
  showPhone?: boolean;
}

export interface TemplatePreset {
  id: string;
  name: string;
  background: BackgroundConfig;
  headlineStyle: Omit<HeadlineText, "content">;
  subtitleStyle: Omit<SubtitleText, "content">;
  phoneLayout: PhoneLayout;
  textLayout: TextLayout;
  slides: SlidePreset[];
}

// Default phone: centered, no rotation, full scale
const PHONE_CENTER: PhoneLayout = {
  offsetX: 0,
  offsetY: 0,
  rotation: 0,
  scale: 1,
};

const PHONE_LEFT: PhoneLayout = {
  offsetX: -120,
  offsetY: 30,
  rotation: 0,
  scale: 0.95,
};

const PHONE_RIGHT: PhoneLayout = {
  offsetX: 120,
  offsetY: 30,
  rotation: 0,
  scale: 0.95,
};

const PHONE_TILT_LEFT: PhoneLayout = {
  offsetX: 60,
  offsetY: 20,
  rotation: -8,
  scale: 0.92,
};

const PHONE_TILT_RIGHT: PhoneLayout = {
  offsetX: -60,
  offsetY: 20,
  rotation: 8,
  scale: 0.92,
};

const TEXT_CENTER: TextLayout = {
  x: 60,
  align: "center",
  widthRatio: 0.9,
};

const TEXT_LEFT: TextLayout = {
  x: 80,
  align: "left",
  widthRatio: 0.55,
};

const SLIDES_DEFAULT: SlidePreset[] = [
  { headline: "Track your progress effortlessly", subtitle: "" },
  { headline: "Beautiful analytics at a glance", subtitle: "" },
  { headline: "Stay organized, stay ahead", subtitle: "" },
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  // 1. Gradient Float - centered phone, bold gradient
  {
    id: "gradient-float",
    name: "Gradient Float",
    background: {
      type: "gradient",
      color: "#6C3CE0",
      gradientStart: "#6C3CE0",
      gradientEnd: "#00BCD4",
    },
    headlineStyle: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 100,
    },
    subtitleStyle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.8)",
      y: 220,
    },
    phoneLayout: PHONE_CENTER,
    textLayout: TEXT_CENTER,
    slides: SLIDES_DEFAULT,
  },

  // 2. Clean White - centered phone, light minimal
  {
    id: "clean-white",
    name: "Clean White",
    background: {
      type: "solid",
      color: "#F5F5F7",
      gradientStart: "#F5F5F7",
      gradientEnd: "#E8E8ED",
    },
    headlineStyle: {
      fontSize: 80,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#1D1D1F",
      y: 110,
    },
    subtitleStyle: {
      fontSize: 40,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "#6E6E73",
      y: 225,
    },
    phoneLayout: PHONE_CENTER,
    textLayout: TEXT_CENTER,
    slides: SLIDES_DEFAULT,
  },

  // 3. Dark Elegance - centered, deep purple
  {
    id: "dark-elegance",
    name: "Dark Elegance",
    background: {
      type: "gradient",
      color: "#1a1a3e",
      gradientStart: "#1a1a3e",
      gradientEnd: "#2d1b69",
    },
    headlineStyle: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 100,
    },
    subtitleStyle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.7)",
      y: 220,
    },
    phoneLayout: PHONE_CENTER,
    textLayout: TEXT_CENTER,
    slides: SLIDES_DEFAULT,
  },

  // 4. Vivid Tilt - tilted phone, hot pink
  {
    id: "vivid-tilt",
    name: "Vivid Tilt",
    background: {
      type: "gradient",
      color: "#FF0080",
      gradientStart: "#FF0080",
      gradientEnd: "#FF6B9D",
    },
    headlineStyle: {
      fontSize: 88,
      fontFamily: "Inter",
      fontWeight: 800,
      color: "#FFFFFF",
      y: 80,
    },
    subtitleStyle: {
      fontSize: 40,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.85)",
      y: 210,
    },
    phoneLayout: PHONE_TILT_LEFT,
    textLayout: TEXT_LEFT,
    slides: [
      { headline: "Your next favorite app", subtitle: "" },
      {
        headline: "Swipe through your day",
        subtitle: "",
        phoneLayout: PHONE_TILT_RIGHT,
      },
      { headline: "Everything in one place", subtitle: "" },
    ],
  },

  // 5. Cobalt Edge - left-aligned text, phone right
  {
    id: "cobalt-edge",
    name: "Cobalt Edge",
    background: {
      type: "gradient",
      color: "#2546BD",
      gradientStart: "#2546BD",
      gradientEnd: "#4B7BF5",
    },
    headlineStyle: {
      fontSize: 90,
      fontFamily: "Inter",
      fontWeight: 800,
      color: "#FFFFFF",
      y: 200,
    },
    subtitleStyle: {
      fontSize: 40,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.7)",
      y: 500,
    },
    phoneLayout: PHONE_RIGHT,
    textLayout: TEXT_LEFT,
    slides: [
      {
        headline: "Built for speed",
        subtitle: "Lightning fast performance",
      },
      { headline: "Smart and simple", subtitle: "No learning curve" },
      { headline: "Always in sync", subtitle: "Across all your devices" },
    ],
  },

  // 6. Charcoal Studio - dark minimal, smaller phone
  {
    id: "charcoal-studio",
    name: "Charcoal Studio",
    background: {
      type: "gradient",
      color: "#1a2a3a",
      gradientStart: "#1a2a3a",
      gradientEnd: "#2a4a5a",
    },
    headlineStyle: {
      fontSize: 80,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 100,
    },
    subtitleStyle: {
      fontSize: 38,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.5)",
      y: 210,
    },
    phoneLayout: { ...PHONE_CENTER, scale: 0.88, offsetY: 50 },
    textLayout: TEXT_CENTER,
    slides: [
      {
        headline: "Designed for focus",
        subtitle: "Simple, fast, and intuitive",
      },
      {
        headline: "Your workflow, refined",
        subtitle: "Everything you need in one place",
      },
      { headline: "Dark mode native", subtitle: "Easy on the eyes" },
    ],
  },

  // 7. Sunset Left - warm gradient, phone left, text right-ish
  {
    id: "sunset-left",
    name: "Sunset Horizon",
    background: {
      type: "gradient",
      color: "#FF512F",
      gradientStart: "#FF512F",
      gradientEnd: "#F09819",
    },
    headlineStyle: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 100,
    },
    subtitleStyle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.9)",
      y: 220,
    },
    phoneLayout: PHONE_LEFT,
    textLayout: TEXT_CENTER,
    slides: [
      { headline: "Rise and shine", subtitle: "" },
      { headline: "Plan your perfect day", subtitle: "" },
      { headline: "Achieve more, stress less", subtitle: "" },
    ],
  },

  // 8. Neon Pulse - dark with cyan, tilted
  {
    id: "neon-pulse",
    name: "Neon Pulse",
    background: {
      type: "gradient",
      color: "#0F0C29",
      gradientStart: "#0F0C29",
      gradientEnd: "#302B63",
    },
    headlineStyle: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 800,
      color: "#00F0FF",
      y: 100,
    },
    subtitleStyle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(0,240,255,0.6)",
      y: 220,
    },
    phoneLayout: PHONE_TILT_RIGHT,
    textLayout: TEXT_LEFT,
    slides: [
      { headline: "Next level productivity", subtitle: "" },
      { headline: "Powered by intelligence", subtitle: "" },
      { headline: "The future is now", subtitle: "" },
    ],
  },

  // 9. Emerald Fresh - centered, green
  {
    id: "emerald-fresh",
    name: "Emerald Fresh",
    background: {
      type: "gradient",
      color: "#11998E",
      gradientStart: "#11998E",
      gradientEnd: "#38EF7D",
    },
    headlineStyle: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 100,
    },
    subtitleStyle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.85)",
      y: 220,
    },
    phoneLayout: PHONE_CENTER,
    textLayout: TEXT_CENTER,
    slides: SLIDES_DEFAULT,
  },

  // 10. Coral Breeze - mixed slides, first text-only
  {
    id: "coral-breeze",
    name: "Coral Breeze",
    background: {
      type: "gradient",
      color: "#F4845F",
      gradientStart: "#F4845F",
      gradientEnd: "#F7B267",
    },
    headlineStyle: {
      fontSize: 88,
      fontFamily: "Inter",
      fontWeight: 800,
      color: "#FFFFFF",
      y: 200,
    },
    subtitleStyle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.85)",
      y: 420,
    },
    phoneLayout: PHONE_CENTER,
    textLayout: TEXT_LEFT,
    slides: [
      {
        headline: "All your ideas",
        subtitle:
          "Fast, intuitive note-taking that keeps pace with your thoughts",
        showPhone: false,
      },
      {
        headline: "",
        subtitle: "",
        showPhone: true,
      },
      {
        headline: "Share instantly",
        subtitle: "",
        showPhone: true,
      },
    ],
  },

  // 11. Midnight Shift - very dark, phone tilted right
  {
    id: "midnight-shift",
    name: "Midnight Shift",
    background: {
      type: "gradient",
      color: "#0a0a1a",
      gradientStart: "#0a0a1a",
      gradientEnd: "#1a1a3a",
    },
    headlineStyle: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#E0E0FF",
      y: 120,
    },
    subtitleStyle: {
      fontSize: 40,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(224,224,255,0.5)",
      y: 240,
    },
    phoneLayout: PHONE_TILT_LEFT,
    textLayout: TEXT_LEFT,
    slides: [
      {
        headline: "Work smarter after dark",
        subtitle: "Built for night owls",
      },
      { headline: "Zero distractions", subtitle: "Pure focus mode" },
      { headline: "Sleep better", subtitle: "Smart wind-down reminders" },
    ],
  },

  // 12. Rose Quartz - soft pink, centered
  {
    id: "rose-quartz",
    name: "Rose Quartz",
    background: {
      type: "gradient",
      color: "#ee9ca7",
      gradientStart: "#ee9ca7",
      gradientEnd: "#ffdde1",
    },
    headlineStyle: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 100,
    },
    subtitleStyle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.85)",
      y: 220,
    },
    phoneLayout: PHONE_CENTER,
    textLayout: TEXT_CENTER,
    slides: SLIDES_DEFAULT,
  },

  // 13. Ocean Deep - blue, phone right tilted
  {
    id: "ocean-deep",
    name: "Ocean Deep",
    background: {
      type: "gradient",
      color: "#0052D4",
      gradientStart: "#0052D4",
      gradientEnd: "#6FB1FC",
    },
    headlineStyle: {
      fontSize: 86,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 180,
    },
    subtitleStyle: {
      fontSize: 40,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.8)",
      y: 400,
    },
    phoneLayout: PHONE_TILT_RIGHT,
    textLayout: TEXT_LEFT,
    slides: [
      { headline: "Dive deeper", subtitle: "Discover what matters" },
      { headline: "Surf your feed", subtitle: "" },
      { headline: "Make waves", subtitle: "Share with the world" },
    ],
  },

  // 14. Botanical - warm cream, left text, phone right
  {
    id: "botanical",
    name: "Botanical",
    background: {
      type: "solid",
      color: "#F5F0E8",
      gradientStart: "#F5F0E8",
      gradientEnd: "#E8E0D0",
    },
    headlineStyle: {
      fontSize: 82,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#2D4A3E",
      y: 120,
    },
    subtitleStyle: {
      fontSize: 38,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "#5A7A6A",
      y: 250,
    },
    phoneLayout: PHONE_RIGHT,
    textLayout: TEXT_LEFT,
    slides: [
      {
        headline: "Grow your habits",
        subtitle: "One day at a time",
      },
      { headline: "Nurture your goals", subtitle: "Watch them bloom" },
      { headline: "Stay rooted", subtitle: "Build lasting routines" },
    ],
  },
];

export function getTemplateById(id: string): TemplatePreset | undefined {
  return TEMPLATE_PRESETS.find((t) => t.id === id);
}

export const FONT_FAMILIES = [
  "Inter",
  "Montserrat",
  "Roboto",
  "Open Sans",
  "Poppins",
  "DM Sans",
  "Space Grotesk",
  "Plus Jakarta Sans",
] as const;

export type FontFamily = (typeof FONT_FAMILIES)[number];
