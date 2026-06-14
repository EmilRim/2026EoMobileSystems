import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import AddIngredientScreen from "../screens/AddIngredientScreen";
import ExpiringScreen from "../screens/ExpiringScreen";
import BrowseScreen from "../screens/BrowseScreen";
import BarcodeScannerScreen from "../screens/BarcodeScannerScreen";

import { Ingredient } from "../types/Ingredient";

const Tab = createBottomTabNavigator();

type ScannedProduct = {
  name: string;
  brand: string;
};

type TabsProps = {
  ingredients: Ingredient[];

  addIngredient: (ingredient: Ingredient) => void;

  scannedProduct: ScannedProduct | null;

  setScannedProduct: React.Dispatch<
    React.SetStateAction<ScannedProduct | null>
  >;

  setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
};

export default function Tabs({
  ingredients,
  addIngredient,
  scannedProduct,
  setScannedProduct,
  setIngredients,
}: TabsProps) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Add Ingredient">
        {() => (
          <AddIngredientScreen
            ingredients={ingredients}
            addIngredient={addIngredient}
            scannedProduct={scannedProduct}
            setScannedProduct={setScannedProduct}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Expiring Soon">
        {() => <ExpiringScreen ingredients={ingredients} />}
      </Tab.Screen>

      <Tab.Screen name="Browse">
        {() => (
          <BrowseScreen
            ingredients={ingredients}
            setIngredients={setIngredients}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Scanner">
        {() => <BarcodeScannerScreen setScannedProduct={setScannedProduct} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
