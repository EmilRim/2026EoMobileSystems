import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Ingredient } from "../types/Ingredient";
import { applyFilters, freezeIngredient, openIngredient } from "../utils/ingredientUtils";
import { FilterValues } from "../components/FilterBar";

import FilterBar from "../components/FilterBar";
import IngredientCard from "../components/IngredientCard";

interface Props {
  ingredients: Ingredient[];
  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

export default function BrowseScreen({ ingredients, setIngredients }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);

  const [filters, setFilters] = useState<FilterValues>({
    location: "all",
    confectionType: "all",
    category: "all",
    searchQuery: "",
    showMissingOnly: false,
    showRecentOnly: false,
  });

  const filteredIngredients = applyFilters(ingredients, filters);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Browse</Text>

      <FilterBar onChange={setFilters} />

      {filteredIngredients.map((ingredient) => (
        <IngredientCard
          key={ingredient.id}
          ingredient={ingredient}
          isEditing={editingId === ingredient.id}
          onEditToggle={setEditingId}
          onSave={(id, patch) =>
            setIngredients((prev) =>
              prev.map((x) => (x.id === id ? { ...x, ...patch } : x))
            )
          }
          onUpdateRipeness={(id, r) =>
            setIngredients((prev) =>
              prev.map((x) =>
                x.id === id
                  ? { ...x, ripeness: r, lastRipenessCheck: new Date() }
                  : x
              )
            )
          }
          onDelete={(id) =>
            setIngredients((prev) => prev.filter((x) => x.id !== id))
          }
          onFreeze={(id) =>
            setIngredients((prev) =>
              prev.map((x) => (x.id === id ? freezeIngredient(x) : x))
            )
          }
          onOpen={(id) =>
            setIngredients((prev) =>
              prev.map((x) => (x.id === id ? openIngredient(x) : x))
            )
          }
        />
      ))}

      {filteredIngredients.length === 0 && (
        <Text style={styles.emptyText}>No ingredients found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 10,
    color: "#222",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#888",
  },
});