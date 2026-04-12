import React from "react";
import { createStackNavigator } from "@react-navigation/stack";


import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./src/api/screens/HomeScreen";

import LearningPathList from "./src/api/screens/LearningPath";
import PathDetail from "./src/api/screens/PathDetail";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LearningPaths" component={LearningPathList} />
        <Stack.Screen name="PathDetail" component={PathDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}