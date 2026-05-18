export interface Ingredient {
  id: number;
  name: string;
  category?: string;
  location?: string;
  confectionType?: string;
  expirationDate?: Date;
}