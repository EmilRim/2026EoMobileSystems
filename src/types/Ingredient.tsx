export type Category =
  | "fruit"
  | "vegetable"
  | "dairy"
  | "fish"
  | "meat"
  | "liquid";

export type Location = "fridge" | "freezer" | "pantry";

export type ConfectionType = "fresh" | "canned" | "frozen" | "cured";

export type Ripeness = "unripe" | "ripe" | "overripe";

export interface Ingredient {
  id: number;

  name: string;

  brand?: string;

  category?: Category;

  location?: Location;

  confectionType?: ConfectionType;

  expirationDate?: Date;

  frozenDate?: Date;

  openedDate?: Date;

  openedShelfLifeDays?: number;

  ripeness?: Ripeness;

  lastRipenessCheck?: Date;
}
