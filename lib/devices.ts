export interface DeviceViewport {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
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
      // SVG viewBox: -10 -10 920 1860
      // Screen cutout in SVG: x=25 y=24 w=850 h=1792
      width: 900,
      height: 1840,
      x: 195,
      y: 700,
      viewport: {
        x: 195 + ((25 + 10) / 920) * 900, // ~229
        y: 700 + ((24 + 10) / 1860) * 1840, // ~734
        width: (850 / 920) * 900, // ~832
        height: (1792 / 1860) * 1840, // ~1773
        radius: (52 / 920) * 900, // ~51
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
      // SVG viewBox: -10 -10 1620 2120
      // Screen cutout in SVG: x=40 y=40 w=1520 h=2020
      width: 1600,
      height: 2100,
      x: 232,
      y: 420,
      viewport: {
        x: 232 + ((40 + 10) / 1620) * 1600, // ~281
        y: 420 + ((40 + 10) / 2120) * 2100, // ~470
        width: (1520 / 1620) * 1600, // ~1502
        height: (2020 / 2120) * 2100, // ~2001
        radius: (12 / 1620) * 1600, // ~12
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
      // SVG viewBox: -10 -10 760 1540
      // Screen cutout in SVG: x=22 y=22 w=696 h=1476
      width: 740,
      height: 1520,
      x: 170,
      y: 260,
      viewport: {
        x: 170 + ((22 + 10) / 760) * 740, // ~201
        y: 260 + ((22 + 10) / 1540) * 1520, // ~292
        width: (696 / 760) * 740, // ~678
        height: (1476 / 1540) * 1520, // ~1457
        radius: (28 / 760) * 740, // ~27
      },
    },
  },
];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- DEVICES is a static array, index 0 always exists
export const DEFAULT_DEVICE = DEVICES[0]!;
