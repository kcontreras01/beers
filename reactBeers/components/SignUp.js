import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FormLabel,
  FormInput
} from "react-native";
import { StackNavigator } from "react-navigation";
import HomeScreen from "../App";
// import SearchScreen from "./components/SearchScreen";
// import ProfileScreen from "./components/ProfileScreen";

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "Email", password: "Password" };
  }
  static navigationOptions = {
    title: "Sign Up Here"
  };	

   render() {
    const { navigate } = this.props.navigation;
    return (
    	<View>
    		<Text>Sign up</Text>
    	</View>

    	)
}
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },

});