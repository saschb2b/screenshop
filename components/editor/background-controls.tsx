"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {
  useEditorState,
  useEditorDispatch,
  getActiveSlide,
} from "@/lib/editor-context";
import { GRADIENT_PRESETS } from "@/lib/presets";

function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary">
        {label}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
        <Box
          component="input"
          type="color"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(e.target.value)
          }
          sx={{
            width: 36,
            height: 28,
            border: 1,
            borderColor: "divider",
            borderRadius: 0.5,
            cursor: "pointer",
            p: 0.25,
          }}
        />
        <Typography
          variant="caption"
          fontFamily="monospace"
          color="text.secondary"
        >
          {value.toUpperCase()}
        </Typography>
      </Box>
    </Box>
  );
}

export function BackgroundControls() {
  const state = useEditorState();
  const dispatch = useEditorDispatch();
  const slide = getActiveSlide(state);
  const { background } = slide;

  const update = (values: Partial<typeof background>) => {
    dispatch({ type: "SET_BACKGROUND", payload: values });
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Background
      </Typography>
      <Stack spacing={2}>
        <ToggleButtonGroup
          value={background.type}
          exclusive
          onChange={(_, v: "solid" | "gradient" | null) => {
            if (v) update({ type: v });
          }}
          size="small"
          fullWidth
        >
          <ToggleButton value="solid" sx={{ textTransform: "none", flex: 1 }}>
            Solid
          </ToggleButton>
          <ToggleButton
            value="gradient"
            sx={{ textTransform: "none", flex: 1 }}
          >
            Gradient
          </ToggleButton>
        </ToggleButtonGroup>

        {/* Gradient presets */}
        {background.type === "gradient" && (
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mb: 0.5, display: "block" }}
            >
              Presets
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(6, 1fr)",
                gap: 0.75,
              }}
            >
              {GRADIENT_PRESETS.map((preset) => (
                <Box
                  key={preset.id}
                  onClick={() =>
                    update({
                      gradientStart: preset.start,
                      gradientEnd: preset.end,
                    })
                  }
                  title={preset.name}
                  sx={{
                    width: "100%",
                    aspectRatio: "1",
                    borderRadius: 0.75,
                    background: `linear-gradient(135deg, ${preset.start}, ${preset.end})`,
                    cursor: "pointer",
                    border: 2,
                    borderColor:
                      background.gradientStart === preset.start &&
                      background.gradientEnd === preset.end
                        ? "primary.main"
                        : "transparent",
                    transition: "border-color 0.15s, transform 0.15s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {background.type === "solid" ? (
          <ColorInput
            label="Color"
            value={background.color}
            onChange={(color) => update({ color })}
          />
        ) : (
          <Stack direction="row" spacing={2}>
            <ColorInput
              label="Start"
              value={background.gradientStart}
              onChange={(gradientStart) => update({ gradientStart })}
            />
            <ColorInput
              label="End"
              value={background.gradientEnd}
              onChange={(gradientEnd) => update({ gradientEnd })}
            />
          </Stack>
        )}
      </Stack>
    </Box>
  );
}
