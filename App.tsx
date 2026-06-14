import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Tabs from "./src/navigation/Tabs";
import { Ingredient } from "./src/types/Ingredient";

export default function App() {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

  const [scannedProduct, setScannedProduct] = React.useState<{
    name: string;
    brand: string;
  } | null>(null);

  const hasLoaded = React.useRef(false);

  React.useEffect(() => {
    if (!hasLoaded.current) return;

    const saveIngredients = async () => {
      try {
        await AsyncStorage.setItem("ingredients", JSON.stringify(ingredients));
      } catch (error) {
        console.log("Error saving ingredients", error);
      }
    };

    saveIngredients();
  }, [ingredients]);

  React.useEffect(() => {
    const loadIngredients = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("ingredients");

        if (jsonValue !== null) {
          const parsed: Ingredient[] = JSON.parse(jsonValue);

          const restoredIngredients: Ingredient[] = parsed.map(
            (ingredient) => ({
              ...ingredient,

              expirationDate: ingredient.expirationDate
                ? new Date(ingredient.expirationDate)
                : undefined,

              openedDate: ingredient.openedDate
                ? new Date(ingredient.openedDate)
                : undefined,

              frozenDate: ingredient.frozenDate
                ? new Date(ingredient.frozenDate)
                : undefined,

              lastRipenessCheck: ingredient.lastRipenessCheck
                ? new Date(ingredient.lastRipenessCheck)
                : undefined,
            }),
          );

          setIngredients(restoredIngredients);
        }
      } catch (error) {
        console.log("Error loading ingredients", error);
      } finally {
        hasLoaded.current = true;
      }
    };

    loadIngredients();
  }, []);

  const addIngredient = (ingredient: Ingredient): void => {
    setIngredients((previousIngredients) => [
      ...previousIngredients,
      ingredient,
    ]);
  };

  return (
    <NavigationContainer>
      <Tabs
        ingredients={ingredients}
        addIngredient={addIngredient}
        scannedProduct={scannedProduct}
        setScannedProduct={setScannedProduct}
        setIngredients={setIngredients}
      />
    </NavigationContainer>
  );
}
