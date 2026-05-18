import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Tabs from './src/navigation/Tabs';
import { Ingredient } from './src/types/Ingredient';

export default function App() {

  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);

  const addIngredient = (newIngredient: Ingredient) => {
    setIngredients((prev) => [...prev, newIngredient]);
  };

  return (
    <NavigationContainer>
      <Tabs
        ingredients={ingredients}
        addIngredient={addIngredient}
      />
    </NavigationContainer>
  );
}