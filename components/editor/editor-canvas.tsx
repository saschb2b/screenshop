"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import type Konva from "konva";
import {
  useEditorState,
  useEditorDispatch,
  getActiveSlide,
} from "@/lib/editor-context";
import { SlideRenderer } from "./slide-renderer";

interface CanvasProps {
  stageRef: React.RefObject<Konva.Stage | null>;
  onDropFile: (file: File) => void;
}

export function EditorCanvas({ stageRef, onDropFile }: CanvasProps) {
  const state = useEditorState();
  const dispatch = useEditorDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  const { device } = state;
  const slide = getActiveSlide(state);

  const calculateScale = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const padding = 60;
    const availableWidth = container.clientWidth - padding * 2;
    const availableHeight = container.clientHeight - padding * 2;
    const scaleX = availableWidth / device.canvasWidth;
    const scaleY = availableHeight / device.canvasHeight;
    setScale(Math.min(scaleX, scaleY, 1));
  }, [device.canvasWidth, device.canvasHeight]);

  useEffect(() => {
    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [calculateScale]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file?.type.startsWith("image/")) {
        onDropFile(file);
      }
    },
    [onDropFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const zoomPercent = Math.round(scale * 100);

  return (
    <Box
      ref={containerRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#1a1a1e",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Zoom indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          bgcolor: "rgba(255,255,255,0.1)",
          color: "rgba(255,255,255,0.5)",
          fontSize: "0.75rem",
          fontFamily: "monospace",
          zIndex: 10,
        }}
      >
        {zoomPercent}%
      </Box>

      {/* Canvas */}
      <Box
        sx={{
          width: device.canvasWidth * scale,
          height: device.canvasHeight * scale,
          boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <SlideRenderer
          device={device}
          slide={slide}
          scale={scale}
          stageRef={stageRef}
          interactive
          onHeadlineDragEnd={(y) =>
            dispatch({ type: "UPDATE_HEADLINE", payload: { y } })
          }
          onSubtitleDragEnd={(y) =>
            dispatch({ type: "UPDATE_SUBTITLE", payload: { y } })
          }
        />
      </Box>
    </Box>
  );
}
