"use client";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import type Konva from "konva";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { TemplatePicker } from "./template-picker";
import { DeviceSelector } from "./device-selector";
import { ScreenshotUpload } from "./screenshot-upload";
import { TextControls } from "./text-controls";
import { BackgroundControls } from "./background-controls";
import { ExportButton } from "./export-button";

interface EditorSidebarProps {
  stageRef: React.RefObject<Konva.Stage | null>;
  onFile: (file: File) => void;
}

export function EditorSidebar({ stageRef, onFile }: EditorSidebarProps) {
  return (
    <Box
      sx={{
        width: 340,
        flexShrink: 0,
        borderRight: 1,
        borderColor: "divider",
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 1,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Link href="/">
          <IconButton size="small">
            <ArrowLeft size={18} />
          </IconButton>
        </Link>
        <Typography variant="subtitle1" fontWeight={700} sx={{ flex: 1 }}>
          Screenshop
        </Typography>
      </Box>

      {/* Export bar */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: "flex",
          gap: 0.5,
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <ExportButton stageRef={stageRef} />
      </Box>

      {/* Controls */}
      <Box sx={{ flex: 1, overflow: "auto", p: 2 }}>
        <Stack spacing={2.5}>
          <TemplatePicker />
          <Divider />
          <DeviceSelector />
          <Divider />
          <ScreenshotUpload onFile={onFile} />
          <Divider />
          <BackgroundControls />
          <Divider />
          <TextControls />
        </Stack>
      </Box>
    </Box>
  );
}
