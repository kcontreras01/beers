import React from 'react';
import { StyleSheet, Text, View , Button, TextInput} from 'react-native';
import { StackNavigator } from 'react-navigation';

// export default class App extends React.Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.logo}>I Like Beer</Text>
//         <Text>An app to keep track of the beers you've tried.</Text>
//       </View>
//     );
//   }
// }

export default class App extends React.Component {
  render() {
    return (
     <SimpleApp />
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 30,
  },
});

//Landing Page
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>I Like Beer</Text>
        <Text>An app to keep track of the beers you've tried.</Text>

              <Button
        onPress={() => navigate('Profile', {user: 'Kiara'})}
        title="Profile"
        />
      </View>

      )
  }
}

//User profile screen
class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: 'My Profile'
    // title: `${navigation.state.params.user}'s Profile`
  };
  render(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return(
      <View>
        <Text style={styles.header}>Here are your saved beers</Text>

      <Button
        onPress={() => navigate('Search', {user: 'Kiara'})}
        title="Search"
        />        
      </View>
      )
  }
}


//User profile screen
class SearchScreen extends React.Component {
    constructor(props) {
    super(props);
    this.state = { text: 'Beer Name' };
  }

  static navigationOptions = {
    title: 'Find A Beer'
  };

  render(){
    return(
      <View>
        <Text style={styles.header}>Search Here</Text>
        <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, width: 300, backgroundColor:'white'}}
        blurOnSubmit={true}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        />
      </View>
      )
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: {screen: ProfileScreen },
  Search: {screen: SearchScreen}
});

