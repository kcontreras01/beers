import React from "react";
import { AppRegistry, StyleSheet, Text, View, Button, TextInput, FormLabel, FormInput
} from "react-native";
import { StackNavigator } from "react-navigation";

// import SignUp from "./components/SignUp";

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
  }
});

// Landing Page
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "Email", password: "Password" };
  }
  static navigationOptions = {
    title: "Welcome"
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>I Like Beer</Text>
        <Text>An app to keep track of the beers you've tried.</Text>

        <Text>Email</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
            width: 300,
            backgroundColor: "white"
          }}
          blurOnSubmit={true}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Text>Password</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
            width: 300,
            backgroundColor: "white"
          }}
          blurOnSubmit={true}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          onPress={() => navigate("SignUp")}
          title="Sign Up"
        />
        <Button
          onPress={() => navigate("Profile")}
          title="Login"
        />
      </View>
    );
  }
}

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

//User profile screen
class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "My Profile"
    // title: `${navigation.state.params.user}'s Profile`
  };
  render() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;
    return (
      <View>
        <Text style={styles.header}>Here are your saved beers</Text>

        <Button onPress={() => navigate("Search")} title="Search" />
      </View>
    );
  }
}

// User profile screen
class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Beer Name",
      search: "",
      results: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  static navigationOptions = {
    title: "Find A Beer"
  };

  fetchData() {
    let url = `http://api.brewerydb.com/v2/search?q=${this.state
      .search}&key=af623a0daee2b026720af11cde68fdbf`;
    console.log("In fetchData. url:", url);
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        // console.log("in fetchData callback. responseData:", responseData);
        this.setState({
          // console.log(responseData)
          results: responseData.results
        });
      });
  }

  handleChange(text) {
    // console.log("in handleChange. text:", text);
    this.setState({
      search: text
    });
  }

  onSubmit(e) {
    console.log("------------------------------------");
    // console.log("In onSubmit. e.constructor:", e.constructor);
    e.preventDefault();
    e.stopPropagation();
    // console.log("made it here!");
    let url = `http://api.brewerydb.com/v2/search?q=${this.state
      .search}&key=af623a0daee2b026720af11cde68fdbf`;
    // console.log("url:", url);
    fetch(url)
      .then(response => {
        return response.json();
        console.log("received response. response:", response);
        // return response.json();
        // this is receiving the data
      })
      .then(response => {
        console.log("response:", response);
        this.setState({
          results: response.data
        });
      })
      .catch(err => {
        console.log("caught error", err);
      });
  }

  renderResults() {
    // console.log("in renderResults.");
    // console.log("this.state:", this.state);
    // console.log("this.state.results:", this.state.results);
    let els = this.state.results.map(e => {
      return <Text>{e}</Text>;
    });
    // console.log("els:", els);
    // return els;
  }

  render() {
    return (
      <View>
        <Text>Search</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
            width: 300,
            backgroundColor: "white"
          }}
          blurOnSubmit={true}
          onChangeText={this.handleChange}
        />
        <Button
          onPress={() => {
            console.log("in onPress of Stupid Button");
          }}
          title="Stupid Button"
        />
        <Button onPress={this.onSubmit} title="Consider Submitting" />
        <Text>{this.renderResults()}</Text>
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Search: { screen: SearchScreen },
  SignUp: { screen: SignUp }

});
