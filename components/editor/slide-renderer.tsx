"use client";

import { useEffect, useRef, useMemo } from "react";
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
import { drawPerspective, computePerspectiveCorners } from "@/lib/perspective";

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

/**
 * Flat phone: standard 2D group with offset, rotation, scale.
 */
function FlatPhoneGroup({
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

/**
 * Perspective phone: renders the phone (frame + screenshot) onto an offscreen
 * canvas, then draws it with a perspective warp via triangle subdivision.
 */
function PerspectivePhoneGroup({
  frame,
  frameSrc,
  screenshotDataUrl,
  phoneLayout,
}: {
  frame: DeviceFrame;
  frameSrc: string;
  screenshotDataUrl: string | null;
  phoneLayout: PhoneLayout;
}) {
  const [frameImage] = useImage(frameSrc, "anonymous");
  const [screenshotImg] = useImage(screenshotDataUrl ?? "", "anonymous");
  const offscreenRef = useRef<HTMLCanvasElement | null>(null);

  // Create offscreen canvas on mount
  useEffect(() => {
    offscreenRef.current ??= document.createElement("canvas");
  }, []);

  // The offscreen canvas is sized to just the phone area.
  // Everything is drawn shifted so the phone frame starts at (0, 0).
  const ox = frame.x;
  const oy = frame.y;
  const ow = frame.width;
  const oh = frame.height;

  const offscreenReady = useMemo(() => {
    const canvas = offscreenRef.current;
    if (!canvas || !frameImage) return false;

    canvas.width = ow;
    canvas.height = oh;
    const ctx = canvas.getContext("2d");
    if (!ctx) return false;

    ctx.clearRect(0, 0, ow, oh);

    // Draw screenshot clipped to viewport (shifted to phone-local coords)
    if (
      screenshotImg &&
      screenshotImg.complete &&
      screenshotImg.naturalWidth > 0
    ) {
      const vp = frame.viewport;
      const localVp = {
        x: vp.x - ox,
        y: vp.y - oy,
        width: vp.width,
        height: vp.height,
        radius: vp.radius,
      };
      const imgAspect =
        screenshotImg.naturalWidth / screenshotImg.naturalHeight;
      const vpAspect = localVp.width / localVp.height;

      let dw: number, dh: number, dx: number, dy: number;
      if (imgAspect > vpAspect) {
        dh = localVp.height;
        dw = localVp.height * imgAspect;
        dx = localVp.x - (dw - localVp.width) / 2;
        dy = localVp.y;
      } else {
        dw = localVp.width;
        dh = localVp.width / imgAspect;
        dx = localVp.x;
        dy = localVp.y - (dh - localVp.height) / 2;
      }

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(
        localVp.x,
        localVp.y,
        localVp.width,
        localVp.height,
        localVp.radius,
      );
      ctx.clip();
      ctx.drawImage(screenshotImg, dx, dy, dw, dh);
      ctx.restore();
    }

    // Draw device frame at (0, 0) on the offscreen canvas
    ctx.drawImage(frameImage, 0, 0, ow, oh);

    return true;
  }, [frameImage, screenshotImg, frame, ow, oh, ox, oy]);

  if (!offscreenReady || !offscreenRef.current) return null;

  const offscreen = offscreenRef.current;

  // Compute perspective corners for the phone in its final canvas position
  const phoneRect = { x: ox, y: oy, width: ow, height: oh };
  const corners = computePerspectiveCorners(
    phoneRect,
    phoneLayout.perspectiveAngleY,
    1200,
  );

  // Apply offset
  const offsetCorners = corners.map(
    ([cx, cy]) =>
      [cx + phoneLayout.offsetX, cy + phoneLayout.offsetY] as [number, number],
  ) as [[number, number], [number, number], [number, number], [number, number]];

  return (
    <Shape
      sceneFunc={(context, shape) => {
        const ctx = context._context;
        ctx.save();

        // Draw the phone-sized offscreen canvas warped into the perspective quad
        drawPerspective(ctx, offscreen, ow, oh, offsetCorners, 12);

        ctx.restore();
        context.fillStrokeShape(shape);
      }}
    />
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

  const usePerspective = phoneLayout.perspectiveAngleY !== 0;

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
        {showPhone && !usePerspective && (
          <FlatPhoneGroup
            frame={device.frame}
            frameSrc={frameSrc}
            screenshotDataUrl={screenshotDataUrl}
            phoneLayout={phoneLayout}
            canvasWidth={device.canvasWidth}
          />
        )}
        {showPhone && usePerspective && (
          <PerspectivePhoneGroup
            frame={device.frame}
            frameSrc={frameSrc}
            screenshotDataUrl={screenshotDataUrl}
            phoneLayout={phoneLayout}
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
