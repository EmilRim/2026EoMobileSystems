import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Ingredient } from "../types/Ingredient";
import { Picker } from "@react-native-picker/picker";

interface Props {
  ingredients: Ingredient[];
}

export default function ExpiringScreen({ ingredients }: Props) {
  const [daysRange, setDaysRange] = React.useState(7);

  const expiringIngredients = ingredients

    .filter((i) => i.expirationDate)

    .filter((i) => {
      const today = new Date();

      const expiration = i.expirationDate!;

      const difference = expiration.getTime() - today.getTime();

      const daysUntilExpiration = difference / (1000 * 60 * 60 * 24);

      return daysUntilExpiration <= daysRange;
    })

    .sort((a, b) => a.expirationDate!.getTime() - b.expirationDate!.getTime());

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expiring Soon</Text>

      <View style={styles.filterSection}>
        <Text>Days ahead:</Text>
        <Picker
          selectedValue={daysRange}
          onValueChange={(value) => setDaysRange(value)}
        >
          <Picker.Item label="1 day" value={1} />
          <Picker.Item label="7 days" value={7} />
          <Picker.Item label="30 days" value={30} />
        </Picker>
      </View>

      {expiringIngredients.length === 0 ? (
        <Text style={styles.emptyText}>No ingredients found.</Text>
      ) : (
        expiringIngredients.map((ingredient) => (
          <View key={ingredient.id} style={styles.card}>
            <Text style={styles.cardTitle}>Name: {ingredient.name}</Text>

            <Text style={styles.cardRow}>
              Expiration: {ingredient.expirationDate?.toDateString()}
            </Text>
          </View>
        ))
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

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },

  pickerContainer: {
    marginBottom: 18,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },

  label: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 12,
    color: "#555",
    fontWeight: "600",
  },

  picker: {
    backgroundColor: "#fff",
  },

  buttonContainer: {
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 10,
    overflow: "hidden",
  },

  filterSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 2,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
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

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#888",
  },
});
