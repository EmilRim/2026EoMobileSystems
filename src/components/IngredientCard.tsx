import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

import { Ingredient } from "../types/Ingredient";

import RipenessEditor from "./RipenessEditor";
import EditMissingDataForm from "./EditMissingDataForm";

interface Props {
  ingredient: Ingredient;
  isEditing: boolean;
  onEditToggle: (id: number | null) => void;
  onSave: (id: number, patch: Partial<Ingredient>) => void;
  onUpdateRipeness: (id: number, ripeness: Ingredient["ripeness"]) => void;
  onDelete: (id: number) => void;
  onFreeze: (id: number) => void;
  onOpen: (id: number) => void;
}

const isMissingData = (i: Ingredient): boolean =>
  !i.expirationDate || !i.category;

export default function IngredientCard({
  ingredient,
  isEditing,
  onEditToggle,
  onSave,
  onUpdateRipeness,
  onDelete,
  onFreeze,
  onOpen,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{ingredient.name}</Text>

      {ingredient.brand ? (
        <Text style={styles.cardRow}>Brand: {ingredient.brand}</Text>
      ) : null}

      <Text style={styles.cardRow}>
        Expiration: {ingredient.expirationDate?.toDateString() ?? "—"}
      </Text>
      <Text style={styles.cardRow}>Location: {ingredient.location ?? "—"}</Text>
      <Text style={styles.cardRow}>
        Type: {ingredient.confectionType ?? "—"}
      </Text>
      <Text style={styles.cardRow}>Category: {ingredient.category ?? "—"}</Text>

      {ingredient.ripeness ? (
        <Text style={styles.cardRow}>Ripeness: {ingredient.ripeness}</Text>
      ) : null}

      <Text style={styles.cardRow}>
        {isMissingData(ingredient) ? "⚠ Incomplete data" : "✓ Complete"}
      </Text>

      {(ingredient.category === "fruit" ||
        ingredient.category === "vegetable") && (
        <RipenessEditor
          ingredient={ingredient}
          onUpdate={(ripeness) => onUpdateRipeness(ingredient.id, ripeness)}
        />
      )}

      {!isEditing && (
        <Button title="Edit" onPress={() => onEditToggle(ingredient.id)} />
      )}

      {isEditing && (
        <EditMissingDataForm
          ingredient={ingredient}
          onSave={(patch) => {
            onSave(ingredient.id, patch);
            onEditToggle(null);
          }}
          onFreeze={() => onFreeze(ingredient.id)}
          onOpen={() => onOpen(ingredient.id)}
          onDelete={() => onDelete(ingredient.id)}
          onCancel={() => onEditToggle(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#222",
  },
  cardRow: {
    fontSize: 15,
    marginBottom: 4,
    color: "#555",
  },
});
