"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { Pencil, Download, Plus } from "lucide-react";
import Link from "next/link";
import { DEFAULT_DEVICE } from "@/lib/devices";
import type { TemplatePreset } from "@/lib/presets";
import type { SlideData } from "./slide-renderer";
import { SlideRenderer } from "./slide-renderer";

interface TemplatePreviewCardProps {
  template: TemplatePreset;
  screenshots: string[];
}

const PREVIEW_SCALE = 0.2;
const device = DEFAULT_DEVICE;

function buildSlideData(
  template: TemplatePreset,
  slideIndex: number,
  screenshot: string | null,
): SlideData {
  const slidePreset = template.slides[slideIndex];
  return {
    background: template.background,
    headline: {
      content: slidePreset?.headline ?? "",
      ...template.headlineStyle,
    },
    subtitle: {
      content: slidePreset?.subtitle ?? "",
      ...template.subtitleStyle,
    },
    screenshotDataUrl: screenshot,
    phoneLayout: {
      ...template.phoneLayout,
      ...slidePreset?.phoneLayout,
    },
    textLayout: {
      ...template.textLayout,
      ...slidePreset?.textLayout,
    },
    showPhone: slidePreset?.showPhone ?? true,
  };
}

function MiniSlide({
  template,
  slideIndex,
  screenshot,
}: {
  template: TemplatePreset;
  slideIndex: number;
  screenshot: string | null;
}) {
  const slideData = buildSlideData(template, slideIndex, screenshot);

  return (
    <Box
      sx={{
        flex: "0 0 auto",
        width: device.canvasWidth * PREVIEW_SCALE,
        height: device.canvasHeight * PREVIEW_SCALE,
        borderRadius: 2.5,
        overflow: "hidden",
      }}
    >
      <SlideRenderer device={device} slide={slideData} scale={PREVIEW_SCALE} />
    </Box>
  );
}

function AddSlotPlaceholder() {
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        width: device.canvasWidth * PREVIEW_SCALE,
        height: device.canvasHeight * PREVIEW_SCALE,
        borderRadius: 2.5,
        border: "2px dashed rgba(255,255,255,0.12)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        color: "rgba(255,255,255,0.25)",
      }}
    >
      <Plus size={24} />
      <Typography variant="caption" color="inherit">
        Add Slide
      </Typography>
    </Box>
  );
}

export function TemplatePreviewCard({
  template,
  screenshots,
}: TemplatePreviewCardProps) {
  const filledCount = Math.max(screenshots.length, 1);
  const slidesToShow = template.slides.slice(0, filledCount);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "rgba(255,255,255,0.08)",
        borderRadius: 3,
        overflow: "hidden",
        bgcolor: "rgba(255,255,255,0.02)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Typography variant="h6" fontWeight={700}>
            {template.name}
          </Typography>
          <Chip
            label="FREE"
            size="small"
            color="success"
            sx={{ fontWeight: 700, fontSize: "0.65rem", height: 22 }}
          />
        </Box>
        <Button
          variant="outlined"
          size="small"
          startIcon={<Download size={14} />}
          sx={{ textTransform: "none" }}
        >
          Export
        </Button>
      </Box>

      {/* Preview area */}
      <Box
        sx={{
          mx: 3,
          mb: 3,
          border: 1,
          borderColor: "rgba(255,255,255,0.06)",
          borderRadius: 2,
          p: { xs: 2, md: 3 },
          bgcolor: "rgba(0,0,0,0.2)",
        }}
      >
        {/* Top row: app info + edit button */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                bgcolor: "rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1rem",
                fontWeight: 700,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              A
            </Box>
            <Box>
              <Typography variant="body2" fontWeight={600}>
                Your App
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.4)">
                {template.name} Template
              </Typography>
            </Box>
          </Box>
          <Link
            href={`/editor/${template.id}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              variant="outlined"
              size="small"
              startIcon={<Pencil size={14} />}
              sx={{ textTransform: "none" }}
            >
              Edit Template
            </Button>
          </Link>
        </Box>

        {/* Slides row */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            "&::-webkit-scrollbar": { height: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(255,255,255,0.1)",
              borderRadius: 3,
            },
          }}
        >
          {slidesToShow.map((_, i) => (
            <MiniSlide
              key={i}
              template={template}
              slideIndex={i}
              screenshot={screenshots[i] ?? null}
            />
          ))}
          <AddSlotPlaceholder />
        </Box>

        {/* App Store metadata preview */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            mt: 2,
            pt: 2,
            borderTop: 1,
            borderColor: "rgba(255,255,255,0.06)",
          }}
        >
          {[
            { label: "4.8", sub: "4k reviews" },
            { label: "Age", sub: "4+" },
            { label: "Category", sub: "Productivity" },
          ].map((item) => (
            <Box key={item.label} sx={{ textAlign: "center" }}>
              <Typography variant="body2" fontWeight={600}>
                {item.label}
              </Typography>
              <Typography variant="caption" color="rgba(255,255,255,0.4)">
                {item.sub}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
