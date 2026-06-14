import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export interface FilterValues {
  location: string;
  confectionType: string;
  category: string;
  searchQuery: string;
  showMissingOnly: boolean;
  showRecentOnly: boolean;
}

interface Props {
  onChange: (filters: FilterValues) => void;
}

export default function FilterBar({ onChange }: Props) {
  const [location, setLocation] = React.useState("all");
  const [confectionType, setConfectionType] = React.useState("all");
  const [category, setCategory] = React.useState("all");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showMissingOnly, setShowMissingOnly] = React.useState(false);
  const [showRecentOnly, setShowRecentOnly] = React.useState(false);

  const update = (patch: Partial<FilterValues>) => {
    const next: FilterValues = {
      location,
      confectionType,
      category,
      searchQuery,
      showMissingOnly,
      showRecentOnly,
      ...patch,
    };
    onChange(next);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search ingredients..."
        value={searchQuery}
        onChangeText={(value) => {
          setSearchQuery(value);
          update({ searchQuery: value });
        }}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.toggle, showMissingOnly && styles.toggleActive]}
          onPress={() => {
            const next = !showMissingOnly;
            setShowMissingOnly(next);
            update({ showMissingOnly: next });
          }}
        >
          <Text>{showMissingOnly ? "Show All" : "Show Missing Data"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggle, showRecentOnly && styles.toggleActive]}
          onPress={() => {
            const next = !showRecentOnly;
            setShowRecentOnly(next);
            update({ showRecentOnly: next });
          }}
        >
          {showRecentOnly ? "Show All Items" : "Show Recently Added"}
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Location</Text>
      <Picker
        selectedValue={location}
        onValueChange={(value) => {
          setLocation(value);
          update({ location: value });
        }}
      >
        <Picker.Item label="All Locations" value="all" />
        <Picker.Item label="Fridge" value="fridge" />
        <Picker.Item label="Pantry" value="pantry" />
        <Picker.Item label="Freezer" value="freezer" />
      </Picker>

      <Text style={styles.label}>Confection Type</Text>
      <Picker
        selectedValue={confectionType}
        onValueChange={(value) => {
          setConfectionType(value);
          update({ confectionType: value });
        }}
      >
        <Picker.Item label="All Types" value="all" />
        <Picker.Item label="Fresh" value="fresh" />
        <Picker.Item label="Canned" value="canned" />
        <Picker.Item label="Frozen" value="frozen" />
        <Picker.Item label="Cured" value="cured" />
      </Picker>

      <Text style={styles.label}>Category</Text>
      <Picker
        selectedValue={category}
        onValueChange={(value) => {
          setCategory(value);
          update({ category: value });
        }}
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginTop: 8,
    marginLeft: 4,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 8,
  },
  toggle: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d0d0d0",
    fontSize: 13,
    color: "#555",
  },
  toggleActive: {
    borderColor: "#841584",
    color: "#841584",
  },
});
