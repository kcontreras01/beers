import React from "react";
import {
  Text,
  View,
  TextInput,
  Button
} from "react-native";
import axios from 'axios';
import { setUser } from "../library/utilities";

export class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: "",
      password: "",
      password_confirmation:''
    };
  }

  static navigationOptions = {
    title: "Sign Up Here"
  };

  signUp(){

    const { navigate } = this.props.navigation;
    const { first_name, last_name, email, password, password_confirmation } = this.state;

    return fetch('https://morning-oasis-96903.herokuapp.com/users',
        {
          first_name, last_name, email, password, password_confirmation
        })
        .then(user => {
          //if successful set the user and then navigate to profile because we are logged in
          console.log(user);
          setUser(user).then(() => {
            navigate('Profile');
          });
        })
        .catch(err=>{
          console.log(err);
        });
  }

   render() {
    const { navigate } = this.props.navigation;
    const { textInputStyle, logo, container } = styles;

    return (
      <View style={container}>
        <Text style={logo}>I Like Beer</Text>

        <Text>First Name</Text>
        <TextInput
            style={textInputStyle}
            blurOnSubmit={true}
            onChangeText={(first_name) => this.setState({first_name})}
            value={this.state.first_name}
            placeholder={'John'}
        />

        <Text>Last Name</Text>
        <TextInput
            style={textInputStyle}
            blurOnSubmit={true}
            onChangeText={(last_name) => this.setState({last_name})}
            value={this.state.last_name}
            placeholder={'Smith'}
        />

        <Text>Email</Text>
        <TextInput
            style={textInputStyle}
            blurOnSubmit={true}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            placeholder={'JohnSmith@example.com'}
        />

        <Text>Password</Text>
        <TextInput
            style={textInputStyle}
            blurOnSubmit={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder={'********'}
        />

        <Text>Confirm Password</Text>
        <TextInput
            style={textInputStyle}
            blurOnSubmit={true}
            onChangeText={(password_confirmation) => this.setState({password_confirmation})}
            value={this.state.password_confirmation}
            placeholder={'********'}
        />

        <Button
            onPress={this.signUp.bind(this)}
            title="Sign Up"
        />

        <Button
            onPress={() => navigate('Home')}
            title="Login"
        />
      </View>
      )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  logo: {
    fontSize: 30
  },
  textInputStyle:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        width: 300,
        backgroundColor:'white'
      }
};