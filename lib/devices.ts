export interface DeviceViewport {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface DeviceFrame {
  width: number;
  height: number;
  x: number;
  y: number;
  viewport: DeviceViewport;
}

export interface DeviceConfig {
  id: string;
  name: string;
  store: "apple" | "google";
  canvasWidth: number;
  canvasHeight: number;
  frame: DeviceFrame;
}

export const DEVICES: DeviceConfig[] = [
  {
    id: "iphone-6.9",
    name: 'iPhone 6.9"',
    store: "apple",
    canvasWidth: 1290,
    canvasHeight: 2796,
    frame: {
      width: 900,
      height: 1840,
      x: 195,
      y: 700,
      viewport: {
        x: 220,
        y: 724,
        width: 850,
        height: 1792,
      },
    },
  },
  {
    id: "ipad-13",
    name: 'iPad 13"',
    store: "apple",
    canvasWidth: 2064,
    canvasHeight: 2752,
    frame: {
      width: 1600,
      height: 2100,
      x: 232,
      y: 420,
      viewport: {
        x: 272,
        y: 460,
        width: 1520,
        height: 2020,
      },
    },
  },
  {
    id: "android-phone",
    name: "Android Phone",
    store: "google",
    canvasWidth: 1080,
    canvasHeight: 1920,
    frame: {
      width: 740,
      height: 1520,
      x: 170,
      y: 260,
      viewport: {
        x: 192,
        y: 282,
        width: 696,
        height: 1476,
      },
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- DEVICES is a static array, index 0 always exists
export const DEFAULT_DEVICE = DEVICES[0]!;
