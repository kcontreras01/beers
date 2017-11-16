import React from 'react';
import { AppRegistry, StyleSheet, Text, View , Button, TextInput, FormLabel, FormInput} from 'react-native';
import { StackNavigator } from 'react-navigation';
import App from '../App'

// Landing Page
class HomeScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = { email: 'Email', password: 'Password' };
  }
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>I Like Beer</Text>
        <Text>An app to keep track of the beers you've tried.</Text>

        <Text>Email</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, width: 300, backgroundColor:'white'}}
        blurOnSubmit={true}
        onChangeText={(email) => this.setState({email})}
        value={this.state.email}
        />
        <Text>Password</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, width: 300, backgroundColor:'white'}}
        blurOnSubmit={true}
        onChangeText={(password) => this.setState({password})}
        value={this.state.password}
        />
        <Button
        onPress={() => navigate('SignUp', {user: 'Kiara'})}
        title="Sign Up"
        />
        <Button
        onPress={() => navigate('Login', {user: 'Kiara'})}
        title="Login"
        />        
        <Button
        onPress={() => navigate('Profile', {user: 'Kiara'})}
        title="Profile"
        />
      </View>

      )
  }
}