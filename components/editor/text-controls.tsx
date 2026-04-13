"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {
  useEditorState,
  useEditorDispatch,
  getActiveSlide,
  type HeadlineText,
  type SubtitleText,
} from "@/lib/editor-context";
import { FONT_FAMILIES } from "@/lib/presets";

function TextSection({
  label,
  text,
  onChange,
}: {
  label: string;
  text: HeadlineText | SubtitleText;
  onChange: (values: Partial<HeadlineText>) => void;
}) {
  return (
    <Stack spacing={1.5}>
      <Typography
        variant="caption"
        fontWeight={600}
        color="text.secondary"
        sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        {label}
      </Typography>
      <TextField
        size="small"
        fullWidth
        value={text.content}
        onChange={(e) => onChange({ content: e.target.value })}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      <Stack direction="row" spacing={1} alignItems="center">
        <Select
          size="small"
          value={text.fontFamily}
          onChange={(e) => onChange({ fontFamily: e.target.value })}
          sx={{ flex: 1, fontSize: "0.8rem" }}
        >
          {FONT_FAMILIES.map((font) => (
            <MenuItem key={font} value={font} sx={{ fontSize: "0.85rem" }}>
              {font}
            </MenuItem>
          ))}
        </Select>
        <Box
          component="input"
          type="color"
          value={text.color.startsWith("rgba") ? "#ffffff" : text.color}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange({ color: e.target.value })
          }
          sx={{
            width: 32,
            height: 32,
            border: 1,
            borderColor: "divider",
            borderRadius: 0.5,
            cursor: "pointer",
            p: 0.25,
            flexShrink: 0,
          }}
        />
      </Stack>
      <Box>
        <Typography variant="caption" color="text.secondary">
          Size: {text.fontSize}px
        </Typography>
        <Slider
          value={text.fontSize}
          onChange={(_, v) => {
            if (typeof v === "number") onChange({ fontSize: v });
          }}
          min={20}
          max={180}
          step={2}
          size="small"
        />
      </Box>
      <ToggleButtonGroup
        value={text.fontWeight}
        exclusive
        onChange={(_, v: number | null) => {
          if (v !== null) onChange({ fontWeight: v });
        }}
        size="small"
        fullWidth
      >
        <ToggleButton value={400} sx={{ textTransform: "none", flex: 1 }}>
          Regular
        </ToggleButton>
        <ToggleButton value={600} sx={{ textTransform: "none", flex: 1 }}>
          Medium
        </ToggleButton>
        <ToggleButton value={700} sx={{ textTransform: "none", flex: 1 }}>
          Bold
        </ToggleButton>
        <ToggleButton value={800} sx={{ textTransform: "none", flex: 1 }}>
          Black
        </ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}

export function TextControls() {
  const state = useEditorState();
  const dispatch = useEditorDispatch();
  const slide = getActiveSlide(state);

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Text
      </Typography>
      <Stack spacing={3}>
        <TextSection
          label="Headline"
          text={slide.headline}
          onChange={(values) =>
            dispatch({ type: "UPDATE_HEADLINE", payload: values })
          }
        />
        <TextSection
          label="Subtitle"
          text={slide.subtitle}
          onChange={(values) =>
            dispatch({ type: "UPDATE_SUBTITLE", payload: values })
          }
        />
      </Stack>
    </Box>
  );
}
