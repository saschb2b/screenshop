/**
 * Draws an image onto a canvas context with a perspective transform.
 *
 * Takes a source image and maps it from a rectangle onto an arbitrary
 * quadrilateral (4 destination corners), creating a 3D perspective effect.
 * Uses triangle subdivision for smooth results.
 *
 * @param ctx - Canvas 2D rendering context to draw onto
 * @param image - Source image to warp
 * @param srcWidth - Width of the source region to use
 * @param srcHeight - Height of the source region to use
 * @param dst - Four destination corners [topLeft, topRight, bottomRight, bottomLeft],
 *              each as [x, y] in canvas coordinates
 * @param subdivisions - Grid subdivisions for quality (higher = smoother, slower)
 */
export function drawPerspective(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  srcWidth: number,
  srcHeight: number,
  dst: [[number, number], [number, number], [number, number], [number, number]],
  subdivisions = 8,
): void {
  const [tl, tr, br, bl] = dst;

  ctx.save();

  for (let row = 0; row < subdivisions; row++) {
    for (let col = 0; col < subdivisions; col++) {
      const u0 = col / subdivisions;
      const u1 = (col + 1) / subdivisions;
      const v0 = row / subdivisions;
      const v1 = (row + 1) / subdivisions;

      // Bilinear interpolation of destination corners for this cell
      const p00 = lerp2d(tl, tr, bl, br, u0, v0);
      const p10 = lerp2d(tl, tr, bl, br, u1, v0);
      const p01 = lerp2d(tl, tr, bl, br, u0, v1);
      const p11 = lerp2d(tl, tr, bl, br, u1, v1);

      // Source coordinates for this cell
      const sx0 = u0 * srcWidth;
      const sx1 = u1 * srcWidth;
      const sy0 = v0 * srcHeight;
      const sy1 = v1 * srcHeight;

      // Draw two triangles per cell
      drawTriangle(
        ctx,
        image,
        sx0,
        sy0,
        sx1,
        sy0,
        sx0,
        sy1,
        p00[0],
        p00[1],
        p10[0],
        p10[1],
        p01[0],
        p01[1],
      );
      drawTriangle(
        ctx,
        image,
        sx1,
        sy0,
        sx1,
        sy1,
        sx0,
        sy1,
        p10[0],
        p10[1],
        p11[0],
        p11[1],
        p01[0],
        p01[1],
      );
    }
  }

  ctx.restore();
}

function lerp2d(
  tl: [number, number],
  tr: [number, number],
  bl: [number, number],
  br: [number, number],
  u: number,
  v: number,
): [number, number] {
  return [
    (1 - u) * (1 - v) * tl[0] +
      u * (1 - v) * tr[0] +
      (1 - u) * v * bl[0] +
      u * v * br[0],
    (1 - u) * (1 - v) * tl[1] +
      u * (1 - v) * tr[1] +
      (1 - u) * v * bl[1] +
      u * v * br[1],
  ];
}

/**
 * Draws a textured triangle using an affine transform.
 * Maps source triangle (sx0,sy0)-(sx1,sy1)-(sx2,sy2) in the image
 * to destination triangle (dx0,dy0)-(dx1,dy1)-(dx2,dy2) on the canvas.
 */
function drawTriangle(
  ctx: CanvasRenderingContext2D,
  image: CanvasImageSource,
  sx0: number,
  sy0: number,
  sx1: number,
  sy1: number,
  sx2: number,
  sy2: number,
  dx0: number,
  dy0: number,
  dx1: number,
  dy1: number,
  dx2: number,
  dy2: number,
): void {
  ctx.save();

  // Clip to destination triangle
  ctx.beginPath();
  ctx.moveTo(dx0, dy0);
  ctx.lineTo(dx1, dy1);
  ctx.lineTo(dx2, dy2);
  ctx.closePath();
  ctx.clip();

  // Solve affine transform: source -> destination
  // [dx0] = [a c e] [sx0]
  // [dy0]   [b d f] [sy0]
  //                  [ 1 ]
  const denom = sx0 * (sy1 - sy2) - sx1 * (sy0 - sy2) + sx2 * (sy0 - sy1);
  if (Math.abs(denom) < 1e-10) {
    ctx.restore();
    return;
  }

  const a = (dx0 * (sy1 - sy2) - dx1 * (sy0 - sy2) + dx2 * (sy0 - sy1)) / denom;
  const b = (dy0 * (sy1 - sy2) - dy1 * (sy0 - sy2) + dy2 * (sy0 - sy1)) / denom;
  const c = (dx0 * (sx2 - sx1) + dx1 * (sx0 - sx2) + dx2 * (sx1 - sx0)) / denom;
  const d = (dy0 * (sx2 - sx1) + dy1 * (sx0 - sx2) + dy2 * (sx1 - sx0)) / denom;
  const e =
    (dx0 * (sx1 * sy2 - sx2 * sy1) +
      dx1 * (sx2 * sy0 - sx0 * sy2) +
      dx2 * (sx0 * sy1 - sx1 * sy0)) /
    denom;
  const f =
    (dy0 * (sx1 * sy2 - sx2 * sy1) +
      dy1 * (sx2 * sy0 - sx0 * sy2) +
      dy2 * (sx0 * sy1 - sx1 * sy0)) /
    denom;

  ctx.setTransform(a, b, c, d, e, f);
  ctx.drawImage(image, 0, 0);
  ctx.restore();
}

/**
 * Computes the 4 destination corners for a phone screen that appears
 * rotated around the Y axis by `angleY` degrees, viewed from a certain perspective.
 *
 * @param rect - The flat screen rect {x, y, width, height} in canvas coords
 * @param angleY - Y-axis rotation in degrees (positive = right side closer)
 * @param perspective - Perspective distance (higher = less extreme, 800-1200 typical)
 * @returns Four corners [topLeft, topRight, bottomRight, bottomLeft]
 */
export function computePerspectiveCorners(
  rect: { x: number; y: number; width: number; height: number },
  angleY: number,
  perspective = 1000,
): [[number, number], [number, number], [number, number], [number, number]] {
  const rad = (angleY * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  // Center of the rect
  const cx = rect.x + rect.width / 2;
  const cy = rect.y + rect.height / 2;
  const hw = rect.width / 2;
  const hh = rect.height / 2;

  // 3D corners relative to center (x, y, z)
  const corners3d: [number, number, number][] = [
    [-hw, -hh, 0], // top-left
    [hw, -hh, 0], // top-right
    [hw, hh, 0], // bottom-right
    [-hw, hh, 0], // bottom-left
  ];

  // Rotate around Y axis and project to 2D
  const projected = corners3d.map(([x, y, z]): [number, number] => {
    const rx = x * cos - z * sin;
    const ry = y;
    const rz = x * sin + z * cos;
    const s = perspective / (perspective + rz);
    return [cx + rx * s, cy + ry * s];
  });

  return projected as [
    [number, number],
    [number, number],
    [number, number],
    [number, number],
  ];
}
