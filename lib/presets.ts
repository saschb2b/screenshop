import type {
  BackgroundConfig,
  HeadlineText,
  SubtitleText,
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
}

export interface TemplatePreset {
  id: string;
  name: string;
  background: BackgroundConfig;
  headlineStyle: Omit<HeadlineText, "content">;
  subtitleStyle: Omit<SubtitleText, "content">;
  slides: SlidePreset[];
}

const DEFAULT_SLIDES: SlidePreset[] = [
  { headline: "Track your progress effortlessly", subtitle: "" },
  { headline: "Beautiful analytics at a glance", subtitle: "" },
  { headline: "Stay organized, stay ahead", subtitle: "" },
];

export const TEMPLATE_PRESETS: TemplatePreset[] = [
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
    slides: DEFAULT_SLIDES,
  },
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
    slides: DEFAULT_SLIDES,
  },
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
    slides: DEFAULT_SLIDES,
  },
  {
    id: "sunset-glow",
    name: "Sunset Glow",
    background: {
      type: "gradient",
      color: "#FF6B35",
      gradientStart: "#FF512F",
      gradientEnd: "#F09819",
    },
    headlineStyle: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 800,
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
    slides: DEFAULT_SLIDES,
  },
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
    slides: DEFAULT_SLIDES,
  },
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
    slides: DEFAULT_SLIDES,
  },
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
    slides: DEFAULT_SLIDES,
  },
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
    slides: DEFAULT_SLIDES,
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
