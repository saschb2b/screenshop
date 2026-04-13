"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEditorDispatch } from "@/lib/editor-context";
import { TEMPLATE_PRESETS } from "@/lib/presets";

export function TemplatePicker() {
  const dispatch = useEditorDispatch();

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Templates
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
        {TEMPLATE_PRESETS.map((template) => {
          const bg =
            template.background.type === "gradient"
              ? `linear-gradient(180deg, ${template.background.gradientStart}, ${template.background.gradientEnd})`
              : template.background.color;

          return (
            <Box
              key={template.id}
              onClick={() =>
                dispatch({
                  type: "APPLY_TEMPLATE",
                  payload: {
                    background: template.background,
                    headline: template.headline,
                    subtitle: template.subtitle,
                  },
                })
              }
              sx={{
                height: 72,
                borderRadius: 1,
                background: bg,
                cursor: "pointer",
                border: 2,
                borderColor: "transparent",
                display: "flex",
                alignItems: "flex-end",
                p: 0.75,
                transition: "border-color 0.15s, transform 0.15s",
                "&:hover": {
                  borderColor: "primary.main",
                  transform: "scale(1.03)",
                },
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: template.headline.color,
                  fontWeight: 600,
                  fontSize: "0.65rem",
                  textShadow: "0 1px 3px rgba(0,0,0,0.3)",
                }}
              >
                {template.name}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
