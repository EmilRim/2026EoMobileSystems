import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import { Ingredient } from "../types/Ingredient";
import { Picker } from "@react-native-picker/picker";

interface Props {
  ingredients: Ingredient[];
}

export default function BrowseScreen({ ingredients }: Props) {
  const [confectionType, setConfectionType] = React.useState("all");
  const [location, setLocation] = React.useState("all");
  const [category, setCategory] = React.useState("all");
  const [ifHasMissingElements, setIfHasMissingElements] = React.useState(false);

  const expiringIngredients = ingredients

    .filter((i) => (ifHasMissingElements ? i : true))

    // keep only ingredients expiring within selected range
    .filter((i) => (location === "all" ? i : i.location === location))
    .filter((i) =>
      confectionType === "all" ? i : i.confectionType === confectionType,
    )
    .filter((i) => (category === "all" ? i : i.category === category));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Browse</Text>

      <View style={styles.filterSection}>
        <Text>Location:</Text>
        <Picker
          selectedValue={location}
          onValueChange={(value) => setLocation(value)}
        >
          <Picker.Item label="All Locations" value="all" />
          <Picker.Item label="Fridge" value="fridge" />
          <Picker.Item label="Pantry" value="pantry" />
          <Picker.Item label="Freezer" value="freezer" />
        </Picker>
        <Picker
          selectedValue={confectionType}
          onValueChange={(value) => setConfectionType(value)}
        >
          <Picker.Item label="All Types" value="all" />
          <Picker.Item label="Fresh" value="fresh" />
          <Picker.Item label="Canned" value="canned" />
          <Picker.Item label="Frozen" value="frozen" />
          <Picker.Item label="Cured" value="cured" />
        </Picker>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
        >
          <Picker.Item label="All Categories" value="all" />
          <Picker.Item label="Fruit" value="fruit" />
          <Picker.Item label="Vegetable" value="vegetable" />
          <Picker.Item label="Dairy" value="dairy" />
          <Picker.Item label="Fish" value="fish" />
          <Picker.Item label="Liquid" value="liquid" />
          <Picker.Item label="Meat" value="meat" />
        </Picker>
      </View>

      {expiringIngredients.map((ingredient) => (
        <View key={ingredient.id} style={styles.card}>
          <Text style={styles.cardTitle}>Name: {ingredient.name}</Text>

          <Text style={styles.cardRow}>
            Expiration: {ingredient.expirationDate?.toDateString()}
          </Text>

          <Text style={styles.cardRow}>Location: {ingredient.location}</Text>
          <Text style={styles.cardRow}>Type: {ingredient.confectionType}</Text>
          <Text style={styles.cardRow}>Category: {ingredient.category}</Text>

          <Text style={styles.cardRow}>
            Missing elements: {ifHasMissingElements ? "Yes" : "No"}
          </Text>
        </View>
      ))}
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
