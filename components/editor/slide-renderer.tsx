"use client";

import {
  Stage,
  Layer,
  Rect,
  Text,
  Image as KonvaImage,
  Group,
  Shape,
} from "react-konva";
import type Konva from "konva";
import useImage from "use-image";
import type { DeviceConfig, DeviceFrame } from "@/lib/devices";
import type {
  BackgroundConfig,
  HeadlineText,
  SubtitleText,
  PhoneLayout,
  TextLayout,
} from "@/lib/editor-context";

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

function PhoneGroup({
  frame,
  frameSrc,
  screenshotDataUrl,
  phoneLayout,
  canvasWidth,
}: {
  frame: DeviceFrame;
  frameSrc: string;
  screenshotDataUrl: string | null;
  phoneLayout: PhoneLayout;
  canvasWidth: number;
}) {
  const centerX = canvasWidth / 2 + phoneLayout.offsetX;
  const centerY = frame.y + frame.height / 2 + phoneLayout.offsetY;

  return (
    <Group
      x={centerX}
      y={centerY}
      rotation={phoneLayout.rotation}
      scaleX={phoneLayout.scale}
      scaleY={phoneLayout.scale}
      offsetX={canvasWidth / 2}
      offsetY={frame.y + frame.height / 2}
    >
      {screenshotDataUrl && (
        <ScreenshotImage
          dataUrl={screenshotDataUrl}
          viewport={frame.viewport}
        />
      )}
      <DeviceFrameImage
        src={frameSrc}
        x={frame.x}
        y={frame.y}
        width={frame.width}
        height={frame.height}
      />
    </Group>
  );
}

function fontStyle(weight: number): string {
  if (weight >= 700) return "bold";
  if (weight >= 600) return "600";
  return "normal";
}

export interface SlideData {
  background: BackgroundConfig;
  headline: HeadlineText;
  subtitle: SubtitleText;
  screenshotDataUrl: string | null;
  phoneLayout: PhoneLayout;
  textLayout: TextLayout;
  showPhone: boolean;
}

interface SlideRendererProps {
  device: DeviceConfig;
  slide: SlideData;
  scale: number;
  stageRef?: React.RefObject<Konva.Stage | null>;
  interactive?: boolean;
  onHeadlineDragEnd?: (y: number) => void;
  onSubtitleDragEnd?: (y: number) => void;
}

export function SlideRenderer({
  device,
  slide,
  scale,
  stageRef,
  interactive = false,
  onHeadlineDragEnd,
  onSubtitleDragEnd,
}: SlideRendererProps) {
  const {
    background,
    headline,
    subtitle,
    screenshotDataUrl,
    phoneLayout,
    textLayout,
    showPhone,
  } = slide;
  const frameSrc = `/frames/${device.id}.svg`;
  const textWidth = device.canvasWidth * textLayout.widthRatio;
  const textX = textLayout.x;

  return (
    <Stage
      ref={stageRef}
      width={device.canvasWidth}
      height={device.canvasHeight}
      listening={interactive}
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

        {/* Phone (screenshot + frame) */}
        {showPhone && (
          <PhoneGroup
            frame={device.frame}
            frameSrc={frameSrc}
            screenshotDataUrl={screenshotDataUrl}
            phoneLayout={phoneLayout}
            canvasWidth={device.canvasWidth}
          />
        )}

        {/* Headline */}
        {headline.content.length > 0 && (
          <Text
            text={headline.content}
            fontSize={headline.fontSize}
            fontFamily={headline.fontFamily}
            fontStyle={fontStyle(headline.fontWeight)}
            fill={headline.color}
            width={textWidth}
            x={textX}
            y={headline.y}
            align={textLayout.align}
            draggable={interactive}
            onDragEnd={
              interactive && onHeadlineDragEnd
                ? (e) => onHeadlineDragEnd(Math.round(e.target.y()))
                : undefined
            }
          />
        )}

        {/* Subtitle */}
        {subtitle.content.length > 0 && (
          <Text
            text={subtitle.content}
            fontSize={subtitle.fontSize}
            fontFamily={subtitle.fontFamily}
            fontStyle={fontStyle(subtitle.fontWeight)}
            fill={subtitle.color}
            width={textWidth}
            x={textX}
            y={subtitle.y}
            align={textLayout.align}
            draggable={interactive}
            onDragEnd={
              interactive && onSubtitleDragEnd
                ? (e) => onSubtitleDragEnd(Math.round(e.target.y()))
                : undefined
            }
          />
        )}
      </Layer>
    </Stage>
  );
}
