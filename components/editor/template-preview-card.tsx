"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { Pencil, Download, Plus } from "lucide-react";
import Link from "next/link";
import type { TemplatePreset } from "@/lib/presets";
import { DEFAULT_DEVICE } from "@/lib/devices";

interface TemplatePreviewCardProps {
  template: TemplatePreset;
  screenshots: string[];
}

/**
 * Renders a miniature screenshot slide using the same SVG device frame
 * as the Konva canvas editor. The frame SVG is layered on top of the
 * screenshot image, both positioned to match the device viewport ratios.
 */
function MiniSlide({
  template,
  headline,
  screenshot,
}: {
  template: TemplatePreset;
  headline: string;
  screenshot: string | null;
}) {
  const bg =
    template.background.type === "gradient"
      ? `linear-gradient(180deg, ${template.background.gradientStart}, ${template.background.gradientEnd})`
      : template.background.color;

  const device = DEFAULT_DEVICE;
  const cw = device.canvasWidth;
  const ch = device.canvasHeight;
  const vp = device.frame.viewport;
  const fr = device.frame;

  // Convert device pixel coords to percentages of the canvas
  const vpLeft = (vp.x / cw) * 100;
  const vpTop = (vp.y / ch) * 100;
  const vpWidth = (vp.width / cw) * 100;
  const vpHeight = (vp.height / ch) * 100;

  const frLeft = (fr.x / cw) * 100;
  const frTop = (fr.y / ch) * 100;
  const frWidth = (fr.width / cw) * 100;
  const frHeight = (fr.height / ch) * 100;

  // Headline area is above the device frame
  const headlineTop = ((device.frame.y * 0.1) / ch) * 100;

  return (
    <Box
      sx={{
        flex: "0 0 auto",
        width: { xs: 200, sm: 240, md: 280 },
        aspectRatio: `${String(cw)} / ${String(ch)}`,
        borderRadius: 2.5,
        background: bg,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Headline */}
      <Typography
        sx={{
          position: "absolute",
          top: `${String(headlineTop)}%`,
          left: "8%",
          right: "8%",
          color: template.headlineStyle.color,
          fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.95rem" },
          fontWeight: template.headlineStyle.fontWeight,
          textAlign: "center",
          lineHeight: 1.25,
          zIndex: 1,
        }}
      >
        {headline}
      </Typography>

      {/* Screenshot image clipped to viewport area */}
      {screenshot && (
        <Box
          component="img"
          src={screenshot}
          alt=""
          sx={{
            position: "absolute",
            left: `${String(vpLeft)}%`,
            top: `${String(vpTop)}%`,
            width: `${String(vpWidth)}%`,
            height: `${String(vpHeight)}%`,
            objectFit: "cover",
            zIndex: 1,
          }}
        />
      )}

      {/* SVG device frame overlay - same file as canvas editor */}
      <Box
        component="img"
        src={`/frames/${device.id}.svg`}
        alt=""
        sx={{
          position: "absolute",
          left: `${String(frLeft)}%`,
          top: `${String(frTop)}%`,
          width: `${String(frWidth)}%`,
          height: `${String(frHeight)}%`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}

function AddSlotPlaceholder() {
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        width: { xs: 200, sm: 240, md: 280 },
        aspectRatio: `${String(DEFAULT_DEVICE.canvasWidth)} / ${String(DEFAULT_DEVICE.canvasHeight)}`,
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
          {slidesToShow.map((slide, i) => (
            <MiniSlide
              key={i}
              template={template}
              headline={slide.headline}
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
