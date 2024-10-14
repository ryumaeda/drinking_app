import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./components/HomeScreen";
import GameResultScreen from "./components/GameResultScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ThinkingGame">
        <Stack.Screen
          name="ThinkingGame"
          component={HomeScreen}
          options={{ headerShown: false }} // ナビゲーションバーを非表示にする
        />
        <Stack.Screen
          name="ThinkingGameResult"
          component={GameResultScreen}
          options={{ headerShown: false }} // ナビゲーションバーを非表示にする
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
