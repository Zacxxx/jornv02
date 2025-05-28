import { ImageSource, Actor, Vector, CollisionType, Color } from "excalibur";
import { getOpaquePixelBoundingBox } from "../utils.pixel";

export async function createPixelPerfectTileCollider(x: number, y: number, imageSource: ImageSource): Promise<Actor | undefined> {
  const bounds = await getOpaquePixelBoundingBox(imageSource);
  if (bounds.width === 0 || bounds.height === 0) return undefined;
  return new Actor({
    pos: new Vector(x + bounds.x + bounds.width / 2, y + bounds.y + bounds.height / 2),
    width: bounds.width,
    height: bounds.height,
    collisionType: CollisionType.Fixed,
    color: new Color(0, 0, 255, 0.3), // Blue for debug
  });
}
