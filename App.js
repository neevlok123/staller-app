import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Homescreen from "./screen/1";
import ISSscreen from "./screen/2";
import Meteorscreen from "./screen/3";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Homescreen"
          ScreenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Homescreen" component={Homescreen} />
          <Stack.Screen name="ISSscreen" component={ISSscreen} />
          <Stack.Screen name="Meteorscreen" component={Meteorscreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});
