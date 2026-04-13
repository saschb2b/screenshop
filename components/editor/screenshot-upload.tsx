"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Upload, X, ImagePlus } from "lucide-react";
import {
  useEditorState,
  useEditorDispatch,
  getActiveSlide,
} from "@/lib/editor-context";

interface ScreenshotUploadProps {
  onFile: (file: File) => void;
}

export function ScreenshotUpload({ onFile }: ScreenshotUploadProps) {
  const state = useEditorState();
  const dispatch = useEditorDispatch();
  const slide = getActiveSlide(state);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Screenshot
      </Typography>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
      {slide.screenshotDataUrl ? (
        <Stack spacing={1}>
          <Box
            sx={{
              position: "relative",
              borderRadius: 1,
              overflow: "hidden",
              border: 1,
              borderColor: "divider",
            }}
          >
            <Box
              component="img"
              src={slide.screenshotDataUrl}
              alt="Uploaded screenshot"
              sx={{
                width: "100%",
                height: 120,
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ImagePlus size={14} />}
              onClick={() => inputRef.current?.click()}
              sx={{ flex: 1, textTransform: "none" }}
            >
              Replace
            </Button>
            <Button
              size="small"
              color="error"
              variant="outlined"
              startIcon={<X size={14} />}
              onClick={() =>
                dispatch({ type: "SET_SCREENSHOT", payload: null })
              }
              sx={{ textTransform: "none" }}
            >
              Remove
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Box
          onClick={() => inputRef.current?.click()}
          sx={{
            border: "2px dashed",
            borderColor: "divider",
            borderRadius: 1,
            p: 3,
            textAlign: "center",
            cursor: "pointer",
            transition: "border-color 0.2s, background 0.2s",
            "&:hover": {
              borderColor: "primary.main",
              bgcolor: "action.hover",
            },
          }}
        >
          <Upload size={24} />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Click to upload or drag onto canvas
          </Typography>
          <Typography variant="caption" color="text.secondary">
            PNG, JPG, or WebP
          </Typography>
        </Box>
      )}
    </Box>
  );
}
