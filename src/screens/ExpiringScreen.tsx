import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Ingredient } from "../types/Ingredient";
import { Picker } from "@react-native-picker/picker";

import {
  getEffectiveExpirationDate,
  isExpiringSoon,
  needsRipenessCheck,
} from "../utils/ingredientUtils";
import { colors, radii, shadow } from "../constants/theme";

interface Props {
  ingredients: Ingredient[];
}

const getUrgencyStyle = (ingredient: Ingredient) => {
  const date = getEffectiveExpirationDate(ingredient);
  if (!date) return {};
  const days = (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  if (days <= 1) return { borderLeftWidth: 4, borderLeftColor: "#cc3333" };
  if (days <= 3) return { borderLeftWidth: 4, borderLeftColor: "#e67e00" };
  return { borderLeftWidth: 4, borderLeftColor: "#2e7d32" };
};

export default function ExpiringScreen({ ingredients }: Props) {
  const [daysRange, setDaysRange] = React.useState(7);

  const ingredientsNeedingCheck = ingredients.filter(needsRipenessCheck);

  const expiringIngredients = ingredients
    .filter((i) => {
      if (i.ripeness === "ripe") return true;
      if (i.openedDate) return true;
      if (i.frozenDate && !isExpiringSoon(i, daysRange)) return false;
      return isExpiringSoon(i, daysRange);
    })
    .sort((a, b) => {
      const da = getEffectiveExpirationDate(a)?.getTime() ?? Infinity;
      const db = getEffectiveExpirationDate(b)?.getTime() ?? Infinity;
      return da - db;
    });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expiring Soon</Text>
      <View style={styles.filterSection}>
        <Text>Days ahead:</Text>
        <Picker
          selectedValue={daysRange}
          onValueChange={(v) => setDaysRange(v)}
        >
          <Picker.Item label="1 day" value={1} />
          <Picker.Item label="7 days" value={7} />
          <Picker.Item label="30 days" value={30} />
        </Picker>
      </View>
      {expiringIngredients.length === 0 ? (
        <Text style={styles.emptyText}>Nothing expiring soon.</Text>
      ) : (
        expiringIngredients.map((ingredient) => {
          const effectiveDate = getEffectiveExpirationDate(ingredient);
          return (
            <View
              key={ingredient.id}
              style={[styles.card, getUrgencyStyle(ingredient)]}
            >
              <Text style={styles.cardTitle}>{ingredient.name}</Text>
              {ingredient.brand ? (
                <Text style={styles.cardRow}>Brand: {ingredient.brand}</Text>
              ) : null}
              <Text style={styles.cardRow}>
                Expires: {effectiveDate?.toDateString() ?? "Unknown"}
              </Text>
              {ingredient.ripeness === "ripe" && (
                <Text style={styles.cardRow}>⚠ Ripe</Text>
              )}
              {ingredient.openedDate && (
                <Text style={styles.cardRow}>⚠ Opened</Text>
              )}
            </View>
          );
        })
      )}
      {ingredientsNeedingCheck.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>
            Ripeness check needed for {ingredientsNeedingCheck.length} item
            {ingredientsNeedingCheck.length > 1 ? "s" : ""}
          </Text>

          {ingredientsNeedingCheck.map((ingredient) => (
            <View key={ingredient.id} style={styles.card}>
              <Text style={styles.cardTitle}>{ingredient.name}</Text>

              {ingredient.brand ? (
                <Text style={styles.cardRow}>Brand: {ingredient.brand}</Text>
              ) : null}
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 10,
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: colors.textSecondary,
  },
  filterSection: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    padding: 15,
    marginBottom: 20,
    ...shadow,
  },
  card: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: radii.card,
    marginBottom: 14,
    ...shadow,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: colors.textPrimary,
  },
  cardRow: {
    fontSize: 15,
    marginBottom: 4,
    color: colors.textSecondary,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: colors.textMuted,
  },
});
