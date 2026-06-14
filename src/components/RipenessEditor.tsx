import React from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ingredient } from "../types/Ingredient";

interface Props {
  ingredient: Ingredient;
  onUpdate: (ripeness: Ingredient["ripeness"]) => void;
}

export default function RipenessEditor({ ingredient, onUpdate }: Props) {
  return (
    <View>
      <Text>Update Ripeness</Text>
      <Picker
        selectedValue={ingredient.ripeness}
        onValueChange={(value) => onUpdate(value)}
      >
        <Picker.Item label="Unripe" value="unripe" />
        <Picker.Item label="Ripe" value="ripe" />
        <Picker.Item label="Overripe" value="overripe" />
      </Picker>
    </View>
  );
}