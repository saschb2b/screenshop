import type Konva from "konva";
import type { DeviceConfig } from "./devices";

export function exportCanvas(
  stage: Konva.Stage | null,
  device: DeviceConfig,
): void {
  if (!stage) return;

  const dataUrl = stage.toDataURL({
    pixelRatio: 1,
    mimeType: "image/png",
  });

  const link = document.createElement("a");
  link.download = `screenshot-${device.id}.png`;
  link.href = dataUrl;
  link.click();
}
