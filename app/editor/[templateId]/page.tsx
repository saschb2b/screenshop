"use client";

import { useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import type Konva from "konva";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { EditorProvider, useEditorDispatch } from "@/lib/editor-context";
import { getTemplateById } from "@/lib/presets";
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

function TemplateNotFound() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#0d0d12",
        color: "white",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Template not found
        </Typography>
        <Typography color="rgba(255,255,255,0.5)" sx={{ mb: 3 }}>
          This template does not exist. Go back to browse available templates.
        </Typography>
        <Link href="/editor" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            startIcon={<ArrowLeft size={16} />}
            sx={{ textTransform: "none" }}
          >
            Back to templates
          </Button>
        </Link>
      </Container>
    </Box>
  );
}

export default function TemplateEditorPage() {
  const params = useParams<{ templateId: string }>();
  const template = getTemplateById(params.templateId);

  if (!template) return <TemplateNotFound />;

  return (
    <EditorProvider template={template}>
      <EditorLayout />
    </EditorProvider>
  );
}
