"use client";

import { useState, useCallback, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Link from "next/link";
import { ArrowLeft, Upload, X, ImagePlus } from "lucide-react";
import { TEMPLATE_PRESETS } from "@/lib/presets";
import { DEVICES } from "@/lib/devices";
import { TemplatePreviewCard } from "@/components/editor/template-preview-card";

export default function EditorPage() {
  const [screenshots, setScreenshots] = useState<string[]>([]);
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const [selectedSizes, setSelectedSizes] = useState<string[]>(["iphone-6.9"]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    for (const file of fileArray) {
      if (!file.type.startsWith("image/")) continue;
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        if (typeof result === "string") {
          setScreenshots((prev) => {
            if (prev.length >= 10) return prev;
            return [...prev, result];
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(e.target.files);
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleFiles],
  );

  const removeScreenshot = (index: number) => {
    setScreenshots((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleSize = (id: string) => {
    setSelectedSizes((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const iosDevices = DEVICES.filter((d) => d.store === "apple");
  const androidDevices = DEVICES.filter((d) => d.store === "google");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#0d0d12",
        color: "white",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top nav */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "rgba(255,255,255,0.06)",
          px: 3,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexShrink: 0,
        }}
      >
        <Link href="/">
          <IconButton size="small" sx={{ color: "rgba(255,255,255,0.6)" }}>
            <ArrowLeft size={18} />
          </IconButton>
        </Link>
        <Typography variant="subtitle1" fontWeight={700}>
          Screenshop
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Left sidebar */}
        <Box
          sx={{
            width: 240,
            flexShrink: 0,
            borderRight: 1,
            borderColor: "rgba(255,255,255,0.06)",
            p: 2.5,
            overflowY: "auto",
          }}
        >
          <Stack spacing={3}>
            {/* Screenshots upload */}
            <Box>
              <Typography
                variant="caption"
                fontWeight={600}
                color="rgba(255,255,255,0.4)"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 1.5,
                  display: "block",
                }}
              >
                Screenshots
              </Typography>

              {screenshots.length > 0 && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 0.75,
                    flexWrap: "wrap",
                    mb: 1.5,
                  }}
                >
                  {screenshots.map((src, i) => (
                    <Box
                      key={i}
                      sx={{
                        position: "relative",
                        width: 44,
                        height: 78,
                        borderRadius: 0.75,
                        overflow: "hidden",
                        border: 1,
                        borderColor: "rgba(255,255,255,0.1)",
                      }}
                    >
                      <Box
                        component="img"
                        src={src}
                        alt=""
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => removeScreenshot(i)}
                        sx={{
                          position: "absolute",
                          top: 1,
                          right: 1,
                          width: 14,
                          height: 14,
                          bgcolor: "rgba(0,0,0,0.7)",
                          color: "white",
                          "&:hover": { bgcolor: "error.main" },
                        }}
                      >
                        <X size={8} />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}

              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={
                  screenshots.length === 0 ? (
                    <Upload size={14} />
                  ) : (
                    <ImagePlus size={14} />
                  )
                }
                onClick={() => inputRef.current?.click()}
                sx={{ textTransform: "none", color: "rgba(255,255,255,0.7)" }}
              >
                {screenshots.length === 0 ? "Upload screenshots" : "Add more"}
              </Button>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleInputChange}
                hidden
              />
            </Box>

            {/* Platform */}
            <Box>
              <Typography
                variant="caption"
                fontWeight={600}
                color="rgba(255,255,255,0.4)"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 1.5,
                  display: "block",
                }}
              >
                Platform
              </Typography>
              <ToggleButtonGroup
                value={platform}
                exclusive
                onChange={(_, v: "ios" | "android" | null) => {
                  if (v) setPlatform(v);
                }}
                size="small"
                fullWidth
              >
                <ToggleButton
                  value="ios"
                  sx={{
                    textTransform: "none",
                    color: "rgba(255,255,255,0.7)",
                    flex: 1,
                  }}
                >
                  iOS
                </ToggleButton>
                <ToggleButton
                  value="android"
                  sx={{
                    textTransform: "none",
                    color: "rgba(255,255,255,0.7)",
                    flex: 1,
                  }}
                >
                  Android
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Export sizes */}
            <Box>
              <Typography
                variant="caption"
                fontWeight={600}
                color="rgba(255,255,255,0.4)"
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  mb: 1,
                  display: "block",
                }}
              >
                Export sizes
              </Typography>
              <Typography
                variant="caption"
                color="rgba(255,255,255,0.35)"
                sx={{ mb: 1.5, display: "block" }}
              >
                Select one or more sizes to export.
              </Typography>

              {/* iPhone sizes */}
              {iosDevices.length > 0 && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    color="rgba(255,255,255,0.3)"
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    iPhone
                  </Typography>
                  {iosDevices
                    .filter((d) => d.id.startsWith("iphone"))
                    .map((d) => (
                      <Box
                        key={d.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: -1,
                        }}
                      >
                        <Checkbox
                          size="small"
                          checked={selectedSizes.includes(d.id)}
                          onChange={() => toggleSize(d.id)}
                          sx={{
                            color: "rgba(255,255,255,0.3)",
                            "&.Mui-checked": { color: "primary.main" },
                          }}
                        />
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {d.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="rgba(255,255,255,0.3)"
                          fontFamily="monospace"
                          fontSize="0.65rem"
                        >
                          {d.canvasWidth}x{d.canvasHeight}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              )}

              {/* iPad sizes */}
              {iosDevices.filter((d) => d.id.startsWith("ipad")).length > 0 && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    color="rgba(255,255,255,0.3)"
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    iPad
                  </Typography>
                  {iosDevices
                    .filter((d) => d.id.startsWith("ipad"))
                    .map((d) => (
                      <Box
                        key={d.id}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          ml: -1,
                        }}
                      >
                        <Checkbox
                          size="small"
                          checked={selectedSizes.includes(d.id)}
                          onChange={() => toggleSize(d.id)}
                          sx={{
                            color: "rgba(255,255,255,0.3)",
                            "&.Mui-checked": { color: "primary.main" },
                          }}
                        />
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          {d.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="rgba(255,255,255,0.3)"
                          fontFamily="monospace"
                          fontSize="0.65rem"
                        >
                          {d.canvasWidth}x{d.canvasHeight}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              )}

              {/* Android sizes */}
              {androidDevices.length > 0 && (
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight={600}
                    color="rgba(255,255,255,0.3)"
                    sx={{
                      textTransform: "uppercase",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Android
                  </Typography>
                  {androidDevices.map((d) => (
                    <Box
                      key={d.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        ml: -1,
                      }}
                    >
                      <Checkbox
                        size="small"
                        checked={selectedSizes.includes(d.id)}
                        onChange={() => toggleSize(d.id)}
                        sx={{
                          color: "rgba(255,255,255,0.3)",
                          "&.Mui-checked": { color: "primary.main" },
                        }}
                      />
                      <Typography variant="body2" sx={{ flex: 1 }}>
                        {d.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="rgba(255,255,255,0.3)"
                        fontFamily="monospace"
                        fontSize="0.65rem"
                      >
                        {d.canvasWidth}x{d.canvasHeight}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Stack>
        </Box>

        {/* Main content */}
        <Box
          sx={{ flex: 1, overflowY: "auto", p: 4 }}
          onDrop={handleDrop}
          onDragOver={(e: React.DragEvent) => e.preventDefault()}
        >
          {/* Upload prompt when no screenshots */}
          {screenshots.length === 0 && (
            <Box
              onClick={() => inputRef.current?.click()}
              sx={{
                border: "2px dashed rgba(255,255,255,0.15)",
                borderRadius: 3,
                p: 4,
                mb: 4,
                textAlign: "center",
                cursor: "pointer",
                transition: "border-color 0.2s",
                "&:hover": { borderColor: "primary.main" },
              }}
            >
              <Upload size={32} color="rgba(255,255,255,0.4)" />
              <Typography variant="h6" fontWeight={600} sx={{ mt: 1 }}>
                Upload your screenshots
              </Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.5)">
                PNG or JPG, up to 10 files. Previews update live.
              </Typography>
            </Box>
          )}

          {/* Template gallery */}
          <Stack spacing={4}>
            {TEMPLATE_PRESETS.map((template) => (
              <TemplatePreviewCard
                key={template.id}
                template={template}
                screenshots={screenshots}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
