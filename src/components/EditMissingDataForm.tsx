import { View, Text, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ingredient } from "../types/Ingredient";
import { addDays } from "../utils/ingredientUtils";
import React, { useState } from "react";

interface Props {
  ingredient: Ingredient;
  onSave: (patch: Partial<Ingredient>) => void;
  onFreeze: () => void;
  onOpen: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export default function EditMissingDataForm({
  ingredient,
  onSave,
  onFreeze,
  onOpen,
  onDelete,
  onCancel,
}: Props) {
  const [editCategory, setEditCategory] = useState<Ingredient["category"] | "">(
    ingredient.category ?? "",
  );

  const [editExpiration, setEditExpiration] = useState("");
  const handleSave = () => {
    const patch: Partial<Ingredient> = {};

    if (!ingredient.category && editCategory !== "") {
      patch.category = editCategory as Ingredient["category"];
    }

    if (!ingredient.expirationDate && editExpiration !== "") {
      const days =
        editExpiration === "1 day"
          ? 1
          : editExpiration === "1 week"
            ? 7
            : editExpiration === "1 month"
              ? 30
              : 365;

      patch.expirationDate = addDays(new Date(), days);
    }

    onSave(patch);
  };

  return (
    <View>
      {!ingredient.category && (
        <>
          <Text>Category</Text>
          <Picker
            selectedValue={editCategory}
            onValueChange={(value) => setEditCategory(value)}
          >
            <Picker.Item label="Select category..." value="" />
            <Picker.Item label="Fruit" value="fruit" />
            <Picker.Item label="Vegetable" value="vegetable" />
            <Picker.Item label="Dairy" value="dairy" />
            <Picker.Item label="Fish" value="fish" />
            <Picker.Item label="Liquid" value="liquid" />
            <Picker.Item label="Meat" value="meat" />
          </Picker>
        </>
      )}

      {!ingredient.expirationDate && (
        <>
          <Text>Expiration</Text>
          <Picker
            selectedValue={editExpiration}
            onValueChange={(value) => setEditExpiration(value)}
          >
            <Picker.Item label="Select expiration..." value="" />
            <Picker.Item label="1 day" value="1 day" />
            <Picker.Item label="1 week" value="1 week" />
            <Picker.Item label="1 month" value="1 month" />
            <Picker.Item label="1 year" value="1 year" />
          </Picker>
        </>
      )}

      <Button title="Save" onPress={handleSave} />
      <Button title="Freeze" onPress={onFreeze} />
      <Button title="Open" onPress={onOpen} />
      <Button title="Delete" onPress={onDelete} color="red" />
      <Button title="Cancel" onPress={onCancel} />
    </View>
  );
}
