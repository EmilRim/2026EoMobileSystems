import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";

import { Ingredient } from "../types/Ingredient";

interface Props {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
}

export default function AddIngredientScreen({
  ingredients,
  addIngredient,
}: Props) {
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [ingredientName, setIngredientName] = React.useState("");

  const [location, setLocation] = React.useState("");
  const [type, setType] = React.useState("");

  const [expirationDate, setExpirationDate] = React.useState("");

  const handleSubmit = () => {
    alert("SUBMIT");
    console.log(ingredients);

    let finalExpirationDate: Date | undefined = undefined;

    if (expirationDate === "1 day") {
      finalExpirationDate = new Date();
      finalExpirationDate.setDate(finalExpirationDate.getDate() + 1);
    } else if (expirationDate === "1 week") {
      finalExpirationDate = new Date();
      finalExpirationDate.setDate(finalExpirationDate.getDate() + 7);
    } else if (expirationDate === "1 month") {
      finalExpirationDate = new Date();
      finalExpirationDate.setMonth(finalExpirationDate.getMonth() + 1);
    }

    const newIngredient: Ingredient = {
      id: ingredients.length + 1,

      name: ingredientName,
      category: selectedCategory,
      location: location,
      confectionType: type,

      expirationDate: finalExpirationDate,
    };

    addIngredient(newIngredient);

    setIngredientName("");
    setSelectedCategory("");
    setLocation("");
    setType("");
    setExpirationDate("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Ingredient</Text>

      <TextInput
        style={styles.input}
        onChangeText={setIngredientName}
        value={ingredientName}
        placeholder="Ingredient name"
      />

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Category</Text>

        <Picker
          selectedValue={selectedCategory}
          onValueChange={setSelectedCategory}
          style={styles.picker}
        >
          <Picker.Item label="Select category..." value="" />
          <Picker.Item label="fruit" value="fruit" />
          <Picker.Item label="vegetable" value="vegetable" />
          <Picker.Item label="dairy" value="dairy" />
          <Picker.Item label="fish" value="fish" />
          <Picker.Item label="liquid" value="liquid" />
          <Picker.Item label="meat" value="meat" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Location</Text>

        <Picker
          selectedValue={location}
          onValueChange={setLocation}
          style={styles.picker}
        >
          <Picker.Item label="Select location..." value="" />
          <Picker.Item label="fridge" value="fridge" />
          <Picker.Item label="freezer" value="freezer" />
          <Picker.Item label="pantry" value="pantry" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Confection Type</Text>

        <Picker
          selectedValue={type}
          onValueChange={setType}
          style={styles.picker}
        >
          <Picker.Item label="Select type..." value="" />
          <Picker.Item label="fresh" value="fresh" />
          <Picker.Item label="canned" value="canned" />
          <Picker.Item label="frozen" value="frozen" />
          <Picker.Item label="cured" value="cured" />
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Expiration Estimate</Text>

        <Picker
          selectedValue={expirationDate}
          onValueChange={setExpirationDate}
          style={styles.picker}
        >
          <Picker.Item label="Select expiration..." value="" />
          <Picker.Item label="1 day" value="1 day" />
          <Picker.Item label="1 week" value="1 week" />
          <Picker.Item label="1 month" value="1 month" />
          <Picker.Item label="1 year" value="1 year" />
        </Picker>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit} title="Add Ingredient" color="#841584" />
      </View>
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
