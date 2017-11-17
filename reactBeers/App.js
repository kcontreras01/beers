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
        <Button onPress={() => navigate("SignUp")} title="Sign Up" />
        <Button onPress={() => navigate("Profile")} title="Login" />
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
    );
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
      saved: [],
      results: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  static navigationOptions = {
    title: "Find A Beer"
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    let url = "https://morning-oasis-96903.herokuapp.com/beers";
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        // console.log("in fetchData callback. responseData:", responseData);
        this.setState({
          // console.log(responseData.results)
          saved: responseData
        });
        // console.log("the state in fetch is", this.state.saved)
      })
      .catch(err => console.log(err));
  }

  handleChange(text) {
    // console.log("in handleChange. text:", text);
    this.setState({
      search: text
    });
  }

  onSubmit(e) {
    console.log("In onSubmit.");
    // console.log("------------------------------------");
    // console.log("In onSubmit. e.constructor:", e.constructor);
    e.preventDefault();
    e.stopPropagation();
    // console.log("made it here!");
    console.log("this.state.search:", this.state.search);
    let url = "https://morning-oasis-96903.herokuapp.com/beers/search",
      body = JSON.stringify({
        search: this.state.search
      });
    console.log("made it here");
    console.log("body:", body);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        console.log("in .then of fetch in onSubmit");
        console.log("response:", response);
        return response.json();
      })
      .then(responseData => {
        console.log("got a response");
        console.log("response:", responseData);
        this.setState({
          results: responseData
        });
      })
      .catch(err => {
        console.log("caught error", err);
      });
    // console.log("the state in onSubmit is", this.state.results);
  }

  renderResults() {
    console.log("in renderResults.");
    console.log('this.state.results.beersData:', this.state.results.beersData);
    console.log('Array.isArray(this.state.results.beersData):', Array.isArray(this.state.results.beersData));
    if (this.state.results.beersData) { 
      console.log('got beersData')
      return this.state.results.beersData.map((x)=>{
        console.log("x:", x);
        return <Text>{x.name}</Text>
      });
    } else {
      console.log('no beersData')
      return null;
    }
  }

  render() {
    console.log("------------------------------------");
    console.log("In render.");
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
        {this.renderResults()}
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
