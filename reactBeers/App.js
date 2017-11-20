import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FormLabel,
  FormInput,
  ScrollView
} from "react-native";
import { StackNavigator } from "react-navigation";
import {
  HomeScreen,
  ProfileScreen,
  SearchScreen,
  SignUp,
  ViewOne,
  AddOne
} from "./components";
// Expo.Font.loadAsync('Cabin Sketch', 'https://fonts.googleapis.com/css?family=Cabin+Sketch');

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontSize: 30
  },
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  beerView: {
    backgroundColor: 'lightblue',
    borderRadius: 8,
    margin: 10,
    padding: 10,
  }
});

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Search: { screen: SearchScreen },
  SignUp: { screen: SignUp },
  ViewOne: {screen: ViewOne },
  AddOne: {screen: AddOne }

});
