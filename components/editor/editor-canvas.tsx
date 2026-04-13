"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Box from "@mui/material/Box";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Image as KonvaImage,
  Shape,
} from "react-konva";
import type Konva from "konva";
import useImage from "use-image";
import {
  useEditorState,
  useEditorDispatch,
  getActiveSlide,
} from "@/lib/editor-context";

interface CanvasProps {
  stageRef: React.RefObject<Konva.Stage | null>;
  onDropFile: (file: File) => void;
}

function DeviceFrameImage({
  src,
  x,
  y,
  width,
  height,
}: {
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
}) {
  const [image] = useImage(src, "anonymous");
  if (!image) return null;
  return <KonvaImage image={image} x={x} y={y} width={width} height={height} />;
}

function ScreenshotImage({
  dataUrl,
  viewport,
}: {
  dataUrl: string;
  viewport: {
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
  };
}) {
  const [image] = useImage(dataUrl);
  if (!image) return null;

  const imgAspect = image.width / image.height;
  const vpAspect = viewport.width / viewport.height;

  let drawWidth: number;
  let drawHeight: number;
  let drawX: number;
  let drawY: number;

  if (imgAspect > vpAspect) {
    drawHeight = viewport.height;
    drawWidth = viewport.height * imgAspect;
    drawX = viewport.x - (drawWidth - viewport.width) / 2;
    drawY = viewport.y;
  } else {
    drawWidth = viewport.width;
    drawHeight = viewport.width / imgAspect;
    drawX = viewport.x;
    drawY = viewport.y - (drawHeight - viewport.height) / 2;
  }

  const { x, y, width, height, radius } = viewport;

  return (
    <Shape
      sceneFunc={(context, shape) => {
        const ctx = context._context;
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.clip();
        ctx.drawImage(image, drawX, drawY, drawWidth, drawHeight);
        ctx.restore();
        context.fillStrokeShape(shape);
      }}
    />
  );
}

export function EditorCanvas({ stageRef, onDropFile }: CanvasProps) {
  const state = useEditorState();
  const dispatch = useEditorDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);
  const { device } = state;
  const slide = getActiveSlide(state);
  const { background, headline, subtitle, screenshotDataUrl } = slide;

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

  const frameSrc = `/frames/${device.id}.svg`;
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
        <Stage
          ref={stageRef}
          width={device.canvasWidth}
          height={device.canvasHeight}
          style={{
            transform: `scale(${String(scale)})`,
            transformOrigin: "top left",
          }}
        >
          <Layer>
            {/* Background */}
            {background.type === "solid" ? (
              <Rect
                width={device.canvasWidth}
                height={device.canvasHeight}
                fill={background.color}
              />
            ) : (
              <Rect
                width={device.canvasWidth}
                height={device.canvasHeight}
                fillLinearGradientStartPoint={{
                  x: device.canvasWidth / 2,
                  y: 0,
                }}
                fillLinearGradientEndPoint={{
                  x: device.canvasWidth / 2,
                  y: device.canvasHeight,
                }}
                fillLinearGradientColorStops={[
                  0,
                  background.gradientStart,
                  1,
                  background.gradientEnd,
                ]}
              />
            )}

            {/* Screenshot inside device frame */}
            {screenshotDataUrl && (
              <ScreenshotImage
                dataUrl={screenshotDataUrl}
                viewport={device.frame.viewport}
              />
            )}

            {/* Device frame overlay */}
            <DeviceFrameImage
              src={frameSrc}
              x={device.frame.x}
              y={device.frame.y}
              width={device.frame.width}
              height={device.frame.height}
            />

            {/* Headline text */}
            <Text
              text={headline.content}
              fontSize={headline.fontSize}
              fontFamily={headline.fontFamily}
              fontStyle={
                headline.fontWeight >= 700
                  ? "bold"
                  : headline.fontWeight >= 600
                    ? "600"
                    : "normal"
              }
              fill={headline.color}
              width={device.canvasWidth - 120}
              x={60}
              y={headline.y}
              align="center"
              draggable
              onDragEnd={(e) => {
                dispatch({
                  type: "UPDATE_HEADLINE",
                  payload: { y: Math.round(e.target.y()) },
                });
              }}
            />

            {/* Subtitle text */}
            {subtitle.content.length > 0 && (
              <Text
                text={subtitle.content}
                fontSize={subtitle.fontSize}
                fontFamily={subtitle.fontFamily}
                fontStyle={
                  subtitle.fontWeight >= 700
                    ? "bold"
                    : subtitle.fontWeight >= 600
                      ? "600"
                      : "normal"
                }
                fill={subtitle.color}
                width={device.canvasWidth - 160}
                x={80}
                y={subtitle.y}
                align="center"
                draggable
                onDragEnd={(e) => {
                  dispatch({
                    type: "UPDATE_SUBTITLE",
                    payload: { y: Math.round(e.target.y()) },
                  });
                }}
              />
            )}
          </Layer>
        </Stage>
      </Box>
    </Box>
  );
}
