import React from 'react';
import { Text, View , Button, TextInput, StyleSheet} from 'react-native';
import axios from 'axios';
import { setUser } from '../library/utilities'

// Landing Page
class HomeScreen extends React.Component {

  constructor() {
    super();
    this.state = { email: '', password: '' };
  }

  // static navigationOptions = {
  //   title: 'Welcome'
  // };

  //   // method to log in
  // login(e){
  //   e.preventDefault(); // prevent default form action
  //   // send request to make sure the email and password are correct
  //   axios.post(`${this.props.url}/login`, this.state.inputs)
  //     .then(res => { // set the user based off of the response
  //       this.props.setUser(res.data)
  //     .then(() => {
  //       navigate('Profile')
  //     })
  //     })
  // }

  login(){
    const { email, password } = this.state;
    const { navigate } = this.props.navigation;

    axios.post('https://morning-oasis-96903.herokuapp.com/sessions', {email, password})
        .then(user => {
          console.log(response);
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
    const { container, logo, textInputStyle } = styles;

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>I Like Beer</Text>
        <Text>An app to keep track of the beers you've tried.</Text>

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

        <Button
          onPress={this.login.bind(this)}
          title="Login"
        />

        <Button
        onPress={() => navigate('SignUp')}
        title="Sign Up"
        />
      </View>

      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#71EDE2",
    alignItems: "center",
  },
  logo: {
    fontSize: 30,
    color: '#D84C34',
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

export {HomeScreen};