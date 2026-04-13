"use client";

import { useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import type Konva from "konva";
import { EditorProvider, useEditorDispatch } from "@/lib/editor-context";
import { EditorCanvas } from "@/components/editor/editor-canvas";
import { EditorSidebar } from "@/components/editor/editor-sidebar";
import { SlideBar } from "@/components/editor/slide-bar";

function EditorLayout() {
  const stageRef = useRef<Konva.Stage>(null);
  const dispatch = useEditorDispatch();

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          dispatch({ type: "SET_SCREENSHOT", payload: result });
        }
      };
      reader.readAsDataURL(file);
    },
    [dispatch],
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <EditorSidebar stageRef={stageRef} onFile={handleFile} />
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <EditorCanvas stageRef={stageRef} onDropFile={handleFile} />
        <SlideBar />
      </Box>
    </Box>
  );
}

export default function EditorPage() {
  return (
    <EditorProvider>
      <EditorLayout />
    </EditorProvider>
  );
}
