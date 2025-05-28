/**
 * Utility to extract the minimal bounding box of opaque pixels from an ImageSource
 * and optionally generate a pixel-perfect collision polygon.
 */
import { ImageSource, Vector } from "excalibur";

export interface PixelBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Get the minimal bounding box of non-transparent pixels in an image.
 * @param imageSource Excalibur ImageSource
 * @returns PixelBounds in image coordinates
 */
export async function getOpaquePixelBoundingBox(imageSource: ImageSource): Promise<PixelBounds> {
  await imageSource.load(); // Ensure loaded
  const image = imageSource.image;
  const w = image.width;
  const h = image.height;
  // Draw to hidden canvas
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const alpha = data[(y * w + x) * 4 + 3];
      if (alpha > 0) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX === -1 || maxY === -1) {
    // No opaque pixels
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  return {
    x: minX,
    y: minY,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
  };
}

/**
 * Get a polygon (array of points) around all non-transparent pixels (convex hull, simple version).
 * For most games, bounding box is enough, but you can use this for pixel-perfect collision.
 */
export async function getOpaquePixelPolygon(imageSource: ImageSource): Promise<Vector[]> {
  await imageSource.load();
  const image = imageSource.image;
  const w = image.width;
  const h = image.height;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;
  const points: Vector[] = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const alpha = data[(y * w + x) * 4 + 3];
      if (alpha > 0) {
        points.push(new Vector(x, y));
      }
    }
  }
  // For simplicity, return the convex hull (or just all points for now)
  // TODO: Implement convex hull if needed
  return points;
}
