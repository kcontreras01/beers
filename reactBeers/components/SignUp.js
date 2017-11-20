import React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet
} from "react-native";
import axios from 'axios';
import { setUser } from "../library/utilities";
import { FormLabel, FormInput } from 'react-native-elements'

export class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: "",
      password: "",
      password_confirmation:''
    };
  }

    static navigationOptions = {
    header: null
  }

  signUp(){

    const { navigate } = this.props.navigation;
    const { name, email, password, password_confirmation } = this.state;

    // console.log('the state is', this.state)
    fetch('https://morning-oasis-96903.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, password_confirmation }),
    })

        .then(user => {
          //if successful set the user and then navigate to profile because we are logged in
          // console.log(user);
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
      <View style={styles.container}>
        <Text style={logo}>I Like Beer</Text>

        <Text>Name</Text>
        <TextInput
            // style={textInputStyle}
            blurOnSubmit={true}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            placeholder={'John'}
            style={styles.textInputStyle}
        />

        <Text>Email</Text>
        <TextInput
            // style={textInputStyle}
            blurOnSubmit={true}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            placeholder={'JohnSmith@example.com'}
            style={styles.textInputStyle}
        />

        <Text>Password</Text>
        <TextInput
            // style={textInputStyle}
            blurOnSubmit={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password}
            placeholder={'********'}
            style={styles.textInputStyle}
        />

        <Text>Confirm Password</Text>
        <TextInput
            // style={textInputStyle}
            blurOnSubmit={true}
            onChangeText={(password_confirmation) => this.setState({password_confirmation})}
            value={this.state.password_confirmation}
            placeholder={'********'}
            style={styles.textInputStyle}
        />

        <Button
            onPress={this.signUp.bind(this)}
            title="Confirm"
        />

        <Button
            onPress={() => navigate('Home')}
            title="Return to Login"
        />
      </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCEB",
    alignItems: "center",
    paddingTop: 40
  },
  logo: {
    fontSize: 30,
    color: '#E64017',
    fontFamily: 'Futura-CondensedMedium',
    // fontFamily: 'Cabin Sketch'
  },
  textInputStyle:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    width: 300,
    backgroundColor:'white'
  }
});