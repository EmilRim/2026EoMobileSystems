import { Picker } from "@react-native-picker/picker";
import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import { Ingredient } from "../types/Ingredient";
import { useNavigation } from "@react-navigation/native";
import {
  addDays,
  DEFAULT_OPENED_SHELF_LIFE_DAYS,
} from "../utils/ingredientUtils";

interface Props {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;

  scannedProduct: {
    name: string;
    brand: string;
  } | null;
  setScannedProduct: React.Dispatch<
    React.SetStateAction<{
      name: string;
      brand: string;
    } | null>
  >;
}

export default function AddIngredientScreen({
  ingredients,
  addIngredient,
  scannedProduct,
  setScannedProduct,
}: Props) {
  const [selectedCategory, setSelectedCategory] = React.useState<
    Ingredient["category"] | ""
  >("");
  const [ingredientName, setIngredientName] = React.useState("");

  const [location, setLocation] = React.useState<Ingredient["location"] | "">(
    "",
  );

  const [type, setType] = React.useState<Ingredient["confectionType"] | "">("");

  const [expirationDate, setExpirationDate] = React.useState<string>("");

  const [brand, setBrand] = React.useState("");

  const [openedDate, setOpenedDate] = React.useState<Date | undefined>(
    undefined,
  );

  const [frozenDate, setFrozenDate] = React.useState<Date | undefined>(
    undefined,
  );

  const [ripeness, setRipeness] = React.useState<Ingredient["ripeness"] | "">(
    "",
  );

  React.useEffect(() => {
    if (!scannedProduct) return;

    setIngredientName(scannedProduct.name ?? "");
    setBrand(scannedProduct.brand ?? "");

    setScannedProduct(null);
  }, [scannedProduct, setScannedProduct]);

  const handleTypeChange = (value: Ingredient["confectionType"] | "") => {
    setType(value);

    // automatically freeze if type is frozen
    if (value === "frozen") {
      setFrozenDate(new Date());
    } else {
      setFrozenDate(undefined);
    }
  };

  const handleFreeze = () => {
    setFrozenDate(new Date());
  };

  const handleUnfreeze = () => {
    setFrozenDate(undefined);
  };

  const handleOpen = () => {
    setOpenedDate(new Date());
  };

  const handleClose = () => {
    setOpenedDate(undefined);
  };

  const navigation = useNavigation<any>();

  const handleSubmit = () => {
    let finalExpirationDate: Date | undefined = undefined;

    if (!ingredientName.trim()) {
      Alert.alert("Missing Name", "Ingredient name is required.");
      return;
    }
    if (expirationDate === "1 day") {
      finalExpirationDate = addDays(new Date(), 1);
    } else if (expirationDate === "1 week") {
      finalExpirationDate = addDays(new Date(), 7);
    } else if (expirationDate === "1 month") {
      finalExpirationDate = addDays(new Date(), 30);
    } else if (expirationDate === "1 year") {
      finalExpirationDate = addDays(new Date(), 365);
    }

    const newIngredient: Ingredient = {
      // safer unique id
      id: Date.now(),

      name: ingredientName,

      category: selectedCategory === "" ? undefined : selectedCategory,
      location: location === "" ? undefined : location,
      confectionType: type === "" ? undefined : type,

      expirationDate: finalExpirationDate,

      brand: brand,

      openedDate: openedDate ? new Date(openedDate) : undefined,

      openedShelfLifeDays: openedDate
        ? DEFAULT_OPENED_SHELF_LIFE_DAYS
        : undefined,

      frozenDate: frozenDate ? new Date(frozenDate) : undefined,

      ripeness: ripeness === "" ? undefined : ripeness,

      lastRipenessCheck:
        selectedCategory === "fruit" || selectedCategory === "vegetable"
          ? new Date()
          : undefined,
    };

    addIngredient(newIngredient);

    // RESET FORM

    setIngredientName("");

    setSelectedCategory("");

    setLocation("");

    setType("");

    setExpirationDate("");

    setBrand("");

    setOpenedDate(undefined);

    setFrozenDate(undefined);

    setRipeness("");
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

      <TextInput
        style={styles.input}
        onChangeText={setBrand}
        value={brand}
        placeholder="Brand"
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
          onValueChange={handleTypeChange}
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

      {(selectedCategory === "fruit" || selectedCategory === "vegetable") && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Ripeness</Text>

          <Picker
            selectedValue={ripeness}
            onValueChange={setRipeness}
            style={styles.picker}
          >
            <Picker.Item label="Select ripeness..." value="" />

            <Picker.Item label="unripe" value="unripe" />
            <Picker.Item label="ripe" value="ripe" />
            <Picker.Item label="overripe" value="overripe" />
          </Picker>
        </View>
      )}

      <View style={styles.actionButtons}>
        <Button
          title={frozenDate ? "Unfreeze" : "Freeze"}
          onPress={frozenDate ? handleUnfreeze : handleFreeze}
          color="#841584"
        />
      </View>

      <View style={styles.actionButtons}>
        <Button
          title={openedDate ? "Undo open" : "Open"}
          onPress={openedDate ? handleClose : handleOpen}
          color="#841584"
        />
      </View>

      <View style={styles.actionButtons}>
        <Button
          title="Scan Barcode"
          onPress={() => navigation.navigate("Scanner")}
          color="#841584"
        />
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

  actionButtons: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
  },

  buttonContainer: {
    marginTop: 15,
    marginBottom: 30,
    borderRadius: 10,
    overflow: "hidden",
  },
});
