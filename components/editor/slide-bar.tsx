"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Plus, Copy, Trash2 } from "lucide-react";
import { useEditorState, useEditorDispatch } from "@/lib/editor-context";

export function SlideBar() {
  const state = useEditorState();
  const dispatch = useEditorDispatch();
  const { slides, activeSlideIndex } = state;

  return (
    <Box
      sx={{
        height: 100,
        bgcolor: "#111114",
        borderTop: 1,
        borderColor: "rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        px: 2,
        gap: 1.5,
        overflowX: "auto",
        flexShrink: 0,
      }}
    >
      {slides.map((slide, index) => {
        const isActive = index === activeSlideIndex;
        const bg =
          slide.background.type === "gradient"
            ? `linear-gradient(180deg, ${slide.background.gradientStart}, ${slide.background.gradientEnd})`
            : slide.background.color;

        return (
          <Box
            key={slide.id}
            onClick={() =>
              dispatch({ type: "SET_ACTIVE_SLIDE", payload: index })
            }
            sx={{
              position: "relative",
              width: 56,
              height: 72,
              borderRadius: 1,
              background: bg,
              border: 2,
              borderColor: isActive ? "primary.main" : "rgba(255,255,255,0.12)",
              cursor: "pointer",
              flexShrink: 0,
              transition: "border-color 0.15s",
              "&:hover": {
                borderColor: isActive
                  ? "primary.main"
                  : "rgba(255,255,255,0.3)",
              },
              "&:hover .slide-actions": {
                opacity: 1,
              },
            }}
          >
            {/* Slide number */}
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: 2,
                left: 0,
                right: 0,
                textAlign: "center",
                color: "rgba(255,255,255,0.7)",
                fontSize: "0.6rem",
                fontWeight: 600,
              }}
            >
              {index + 1}
            </Typography>

            {/* Hover actions */}
            {slides.length > 1 && (
              <Box
                className="slide-actions"
                sx={{
                  position: "absolute",
                  top: -8,
                  right: -8,
                  display: "flex",
                  gap: 0.25,
                  opacity: 0,
                  transition: "opacity 0.15s",
                }}
              >
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "DUPLICATE_SLIDE", payload: index });
                  }}
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                    "&:hover": { bgcolor: "primary.main" },
                  }}
                >
                  <Copy size={10} />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch({ type: "REMOVE_SLIDE", payload: index });
                  }}
                  sx={{
                    width: 20,
                    height: 20,
                    bgcolor: "rgba(0,0,0,0.7)",
                    color: "white",
                    "&:hover": { bgcolor: "error.main" },
                  }}
                >
                  <Trash2 size={10} />
                </IconButton>
              </Box>
            )}
          </Box>
        );
      })}

      {/* Add slide button */}
      <Tooltip title="Add screenshot">
        <IconButton
          onClick={() => dispatch({ type: "ADD_SLIDE" })}
          sx={{
            width: 56,
            height: 72,
            borderRadius: 1,
            border: "2px dashed rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.4)",
            flexShrink: 0,
            "&:hover": {
              borderColor: "primary.main",
              color: "primary.main",
            },
          }}
        >
          <Plus size={20} />
        </IconButton>
      </Tooltip>

      {/* Slide count */}
      <Typography
        variant="caption"
        sx={{
          color: "rgba(255,255,255,0.35)",
          ml: "auto",
          flexShrink: 0,
          fontSize: "0.7rem",
        }}
      >
        {slides.length} / 10
      </Typography>
    </Box>
  );
}
