
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AddIngredientScreen from '../screens/AddIngredientScreen'
import ExpiringScreen from '../screens/ExpiringScreen'
import BrowseScreen from '../screens/BrowseScreen'
import { Ingredient } from '../types/Ingredient'

const Tab = createBottomTabNavigator()

export default function Tabs({ ingredients, addIngredient }: { ingredients: Ingredient[], addIngredient: (ingredient: Ingredient) => void }) {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Add ingredient">
      {() => (
        <AddIngredientScreen
          ingredients={ingredients}
          addIngredient={addIngredient} />
      )}
    </Tab.Screen>
        <Tab.Screen name="Expiring soon">
      {() => (
        <ExpiringScreen
          ingredients={ingredients} />
      )}
    </Tab.Screen>
    <Tab.Screen name="Browse">
      {() => (
        <BrowseScreen
          ingredients={ingredients} />
      )}
    </Tab.Screen >
    </Tab.Navigator>
  )
}
