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
    backgroundColor: "#FFFCEB",
    alignItems: "center",
    paddingTop: 50
  },
  logo: {
    fontSize: 70,
    color: '#E64017',
    fontFamily: 'Futura-CondensedMedium',
    padding: 20
    // fontFamily: 'Cabin Sketch'
  },
  textInputStyle:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: 300,
    backgroundColor:'white'
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
