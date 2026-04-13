"use client";

import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { DEFAULT_DEVICE, type DeviceConfig } from "./devices";
import { TEMPLATE_PRESETS, type TemplatePreset } from "./presets";

export interface HeadlineText {
  content: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  color: string;
  y: number;
}

export interface SubtitleText {
  content: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  color: string;
  y: number;
}

export interface BackgroundConfig {
  type: "solid" | "gradient";
  color: string;
  gradientStart: string;
  gradientEnd: string;
}

export interface Slide {
  id: string;
  screenshotDataUrl: string | null;
  headline: HeadlineText;
  subtitle: SubtitleText;
  background: BackgroundConfig;
}

export interface EditorState {
  device: DeviceConfig;
  slides: Slide[];
  activeSlideIndex: number;
  templateId: string;
}

function createSlideFromTemplate(
  template: TemplatePreset,
  index: number,
): Slide {
  const slidePreset = template.slides[index];
  return {
    id: crypto.randomUUID(),
    screenshotDataUrl: null,
    headline: {
      content: slidePreset?.headline ?? `Screenshot ${String(index + 1)}`,
      ...template.headlineStyle,
    },
    subtitle: {
      content: slidePreset?.subtitle ?? "",
      ...template.subtitleStyle,
    },
    background: { ...template.background },
  };
}

export type EditorAction =
  | { type: "SET_DEVICE"; payload: DeviceConfig }
  | { type: "SET_ACTIVE_SLIDE"; payload: number }
  | { type: "ADD_SLIDE" }
  | { type: "REMOVE_SLIDE"; payload: number }
  | { type: "DUPLICATE_SLIDE"; payload: number }
  | { type: "SET_SCREENSHOT"; payload: string | null }
  | { type: "UPDATE_HEADLINE"; payload: Partial<HeadlineText> }
  | { type: "UPDATE_SUBTITLE"; payload: Partial<SubtitleText> }
  | { type: "SET_BACKGROUND"; payload: Partial<BackgroundConfig> }
  | {
      type: "APPLY_TEMPLATE";
      payload: {
        background: BackgroundConfig;
        headline: Omit<HeadlineText, "content">;
        subtitle: Omit<SubtitleText, "content">;
      };
    };

function updateActiveSlide(
  state: EditorState,
  updater: (slide: Slide) => Slide,
): EditorState {
  return {
    ...state,
    slides: state.slides.map((slide, i) =>
      i === state.activeSlideIndex ? updater(slide) : slide,
    ),
  };
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "SET_DEVICE":
      return { ...state, device: action.payload };

    case "SET_ACTIVE_SLIDE":
      return { ...state, activeSlideIndex: action.payload };

    case "ADD_SLIDE": {
      const current = getActiveSlide(state);
      const newSlide: Slide = {
        id: crypto.randomUUID(),
        screenshotDataUrl: null,
        headline: {
          ...current.headline,
          content: `Screenshot ${String(state.slides.length + 1)}`,
        },
        subtitle: {
          ...current.subtitle,
          content: "",
        },
        background: {
          ...current.background,
        },
      };
      return {
        ...state,
        slides: [...state.slides, newSlide],
        activeSlideIndex: state.slides.length,
      };
    }

    case "REMOVE_SLIDE": {
      if (state.slides.length <= 1) return state;
      const newSlides = state.slides.filter((_, i) => i !== action.payload);
      return {
        ...state,
        slides: newSlides,
        activeSlideIndex: Math.min(
          state.activeSlideIndex,
          newSlides.length - 1,
        ),
      };
    }

    case "DUPLICATE_SLIDE": {
      const source = state.slides[action.payload];
      if (!source) return state;
      const dup: Slide = {
        ...source,
        id: crypto.randomUUID(),
        headline: { ...source.headline },
        subtitle: { ...source.subtitle },
        background: { ...source.background },
      };
      const slides = [...state.slides];
      slides.splice(action.payload + 1, 0, dup);
      return { ...state, slides, activeSlideIndex: action.payload + 1 };
    }

    case "SET_SCREENSHOT":
      return updateActiveSlide(state, (s) => ({
        ...s,
        screenshotDataUrl: action.payload,
      }));

    case "UPDATE_HEADLINE":
      return updateActiveSlide(state, (s) => ({
        ...s,
        headline: { ...s.headline, ...action.payload },
      }));

    case "UPDATE_SUBTITLE":
      return updateActiveSlide(state, (s) => ({
        ...s,
        subtitle: { ...s.subtitle, ...action.payload },
      }));

    case "SET_BACKGROUND":
      return updateActiveSlide(state, (s) => ({
        ...s,
        background: { ...s.background, ...action.payload },
      }));

    case "APPLY_TEMPLATE":
      return updateActiveSlide(state, (s) => ({
        ...s,
        background: action.payload.background,
        headline: { ...s.headline, ...action.payload.headline },
        subtitle: { ...s.subtitle, ...action.payload.subtitle },
      }));
  }
}

function buildInitialState(template: TemplatePreset): EditorState {
  return {
    device: DEFAULT_DEVICE,
    slides: template.slides.map((_, i) => createSlideFromTemplate(template, i)),
    activeSlideIndex: 0,
    templateId: template.id,
  };
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- static array
const fallbackTemplate = TEMPLATE_PRESETS[0]!;

export function getActiveSlide(state: EditorState): Slide {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- activeSlideIndex is always valid
  return state.slides[state.activeSlideIndex]!;
}

const EditorStateContext = createContext<EditorState | null>(null);
const EditorDispatchContext = createContext<Dispatch<EditorAction> | null>(
  null,
);

export function EditorProvider({
  children,
  template,
}: {
  children: ReactNode;
  template?: TemplatePreset;
}) {
  const [state, dispatch] = useReducer(
    editorReducer,
    template ?? fallbackTemplate,
    buildInitialState,
  );

  return (
    <EditorStateContext.Provider value={state}>
      <EditorDispatchContext.Provider value={dispatch}>
        {children}
      </EditorDispatchContext.Provider>
    </EditorStateContext.Provider>
  );
}

export function useEditorState(): EditorState {
  const ctx = useContext(EditorStateContext);
  if (!ctx)
    throw new Error("useEditorState must be used within EditorProvider");
  return ctx;
}

export function useEditorDispatch(): Dispatch<EditorAction> {
  const ctx = useContext(EditorDispatchContext);
  if (!ctx)
    throw new Error("useEditorDispatch must be used within EditorProvider");
  return ctx;
}
