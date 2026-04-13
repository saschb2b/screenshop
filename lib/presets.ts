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

export interface TemplatePreset {
  id: string;
  name: string;
  background: BackgroundConfig;
  headline: Omit<HeadlineText, "content">;
  subtitle: Omit<SubtitleText, "content">;
}

export const TEMPLATE_PRESETS: TemplatePreset[] = [
  {
    id: "bold-gradient",
    name: "Bold Gradient",
    background: {
      type: "gradient",
      color: "#6C3CE0",
      gradientStart: "#6C3CE0",
      gradientEnd: "#E040FB",
    },
    headline: {
      fontSize: 88,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 100,
    },
    subtitle: {
      fontSize: 44,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.8)",
      y: 220,
    },
  },
  {
    id: "dark-minimal",
    name: "Dark Minimal",
    background: {
      type: "solid",
      color: "#111111",
      gradientStart: "#111111",
      gradientEnd: "#333333",
    },
    headline: {
      fontSize: 80,
      fontFamily: "Inter",
      fontWeight: 800,
      color: "#FFFFFF",
      y: 120,
    },
    subtitle: {
      fontSize: 40,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.6)",
      y: 230,
    },
  },
  {
    id: "ocean-breeze",
    name: "Ocean Breeze",
    background: {
      type: "gradient",
      color: "#1A73E8",
      gradientStart: "#1A73E8",
      gradientEnd: "#00BCD4",
    },
    headline: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 110,
    },
    subtitle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.85)",
      y: 225,
    },
  },
  {
    id: "sunset-warm",
    name: "Sunset Warm",
    background: {
      type: "gradient",
      color: "#FF6B35",
      gradientStart: "#FF6B35",
      gradientEnd: "#F7C948",
    },
    headline: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 110,
    },
    subtitle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.9)",
      y: 225,
    },
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
    headline: {
      fontSize: 80,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#1D1D1F",
      y: 120,
    },
    subtitle: {
      fontSize: 40,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "#6E6E73",
      y: 230,
    },
  },
  {
    id: "neon-night",
    name: "Neon Night",
    background: {
      type: "gradient",
      color: "#0F0C29",
      gradientStart: "#0F0C29",
      gradientEnd: "#302B63",
    },
    headline: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 800,
      color: "#00F0FF",
      y: 110,
    },
    subtitle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(0,240,255,0.7)",
      y: 225,
    },
  },
  {
    id: "rose-soft",
    name: "Rose Soft",
    background: {
      type: "gradient",
      color: "#ED4264",
      gradientStart: "#ED4264",
      gradientEnd: "#FFEDBC",
    },
    headline: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 110,
    },
    subtitle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.85)",
      y: 225,
    },
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
    headline: {
      fontSize: 84,
      fontFamily: "Inter",
      fontWeight: 700,
      color: "#FFFFFF",
      y: 110,
    },
    subtitle: {
      fontSize: 42,
      fontFamily: "Inter",
      fontWeight: 400,
      color: "rgba(255,255,255,0.85)",
      y: 225,
    },
  },
];

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
