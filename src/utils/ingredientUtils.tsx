import { Ingredient } from "../types/Ingredient";

import { FilterValues } from "../components/FilterBar";

export const DEFAULT_OPENED_SHELF_LIFE_DAYS = 4;

/**
 * Returns the effective expiration date after applying:
 * - frozen rules
 * - opened rules
 * - ripeness rules
 */
export function getEffectiveExpirationDate(
  ingredient: Ingredient,
): Date | undefined {
  // Ingredient has no expiration information
  if (!ingredient.expirationDate) {
    return undefined;
  }

  // Start with the original expiration date
  let effectiveExpiration = new Date(ingredient.expirationDate);

  // --------------------------------------------------
  // Frozen ingredients should last at least
  // 6 months after being frozen.
  // --------------------------------------------------

  if (ingredient.frozenDate) {
    const frozenMinimumDate = new Date(ingredient.frozenDate);

    frozenMinimumDate.setMonth(frozenMinimumDate.getMonth() + 6);

    if (frozenMinimumDate > effectiveExpiration) {
      effectiveExpiration = frozenMinimumDate;
    }
  }

  // --------------------------------------------------
  // Opened items may expire sooner than their
  // original expiration date.
  // --------------------------------------------------

  if (ingredient.openedDate && ingredient.openedShelfLifeDays) {
    const openedExpiration = new Date(ingredient.openedDate);

    openedExpiration.setDate(
      openedExpiration.getDate() + ingredient.openedShelfLifeDays,
    );

    if (openedExpiration < effectiveExpiration) {
      effectiveExpiration = openedExpiration;
    }
  }

  // --------------------------------------------------
  // Overripe produce should be considered
  // immediately expiring.
  // --------------------------------------------------

  if (ingredient.ripeness === "overripe") {
    return new Date();
  }

  return effectiveExpiration;
}

/**
 * Determines whether an ingredient expires
 * within the selected number of days.
 */
export function isExpiringSoon(
  ingredient: Ingredient,
  daysRange: number = 7,
): boolean {
  const expiration = getEffectiveExpirationDate(ingredient);

  if (!expiration) {
    return false;
  }

  const today = new Date();

  const difference = expiration.getTime() - today.getTime();

  const daysUntilExpiration = difference / (1000 * 60 * 60 * 24);

  // Ignore items already expired
  return daysUntilExpiration >= 0 && daysUntilExpiration <= daysRange;
}

/**
 * Fresh ingredients should have their
 * ripeness checked every 3 days.
 */
export function needsRipenessCheck(ingredient: Ingredient): boolean {
  if (ingredient.confectionType !== "fresh") {
    return false;
  }

  if (!ingredient.lastRipenessCheck) {
    return true;
  }

  const today = new Date();

  const difference = today.getTime() - ingredient.lastRipenessCheck.getTime();

  const daysSinceCheck = difference / (1000 * 60 * 60 * 24);

  return daysSinceCheck > 3;
}

export function freezeIngredient(i: Ingredient): Ingredient {
  return {
    ...i,
    frozenDate: new Date(),
  };
}

export function openIngredient(i: Ingredient): Ingredient {
  return {
    ...i,
    openedDate: new Date(),
    openedShelfLifeDays: DEFAULT_OPENED_SHELF_LIFE_DAYS,
  };
}

export function addDays(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function applyFilters(
  ingredients: Ingredient[],
  filters: FilterValues,
): Ingredient[] {
  const base = filters.showRecentOnly
    ? [...ingredients].sort((a, b) => b.id - a.id).slice(0, 10)
    : ingredients;

  return base
    .filter((i) =>
      filters.showMissingOnly ? !i.expirationDate || !i.category : true,
    )
    .filter((i) =>
      filters.location === "all" ? true : i.location === filters.location,
    )
    .filter((i) =>
      filters.confectionType === "all"
        ? true
        : i.confectionType === filters.confectionType,
    )
    .filter((i) =>
      filters.category === "all" ? true : i.category === filters.category,
    )
    .filter((i) =>
      filters.searchQuery.trim() === ""
        ? true
        : i.name.toLowerCase().includes(filters.searchQuery.toLowerCase()),
    );
}
