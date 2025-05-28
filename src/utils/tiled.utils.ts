import { TILED_OBJECT_PROPS, NPC_BEHAVIOR } from "../models";

/**
 * Safely get a property value from a Tiled object
 */
export function getTiledProperty(tiledObject: any, propertyName: string, defaultValue?: any): any {
  if (!tiledObject?.properties) return defaultValue;
  
  const property = tiledObject.properties.find((prop: any) => prop.name === propertyName);
  return property ? property.value : defaultValue;
}

/**
 * Get NPC behavior from Tiled properties with validation
 */
export function getNPCBehavior(tiledObject: any): NPC_BEHAVIOR {
  const behavior = getTiledProperty(tiledObject, TILED_OBJECT_PROPS.BEHAVIOR, NPC_BEHAVIOR.PASSIVE);
  
  // Validate that the behavior is a valid enum value
  if (Object.values(NPC_BEHAVIOR).includes(behavior)) {
    return behavior as NPC_BEHAVIOR;
  }
  
  console.warn(`Invalid NPC behavior "${behavior}", defaulting to PASSIVE`);
  return NPC_BEHAVIOR.PASSIVE;
}

/**
 * Get NPC level from Tiled properties with validation
 */
export function getNPCLevel(tiledObject: any): number {
  const level = getTiledProperty(tiledObject, TILED_OBJECT_PROPS.LEVEL, 1);
  const parsedLevel = parseInt(level, 10);
  
  if (isNaN(parsedLevel) || parsedLevel < 1) {
    console.warn(`Invalid NPC level "${level}", defaulting to 1`);
    return 1;
  }
  
  return Math.min(parsedLevel, 100); // Cap at level 100
}

/**
 * Get NPC name from Tiled properties
 */
export function getNPCName(tiledObject: any, defaultName: string = "Unknown"): string {
  const name = getTiledProperty(tiledObject, TILED_OBJECT_PROPS.NAME, defaultName);
  return typeof name === 'string' && name.trim() ? name.trim() : defaultName;
} 