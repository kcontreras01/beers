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
// const API_KEY = "af623a0daee2b026720af11cde68fdbf";
// const API_URL = "http://api.brewerydb.com/v2/search?q=";
// const params = "?key=" + API_KEY;
// const REQUEST_URL = API_URL + params;

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
          onPress={() => navigate("SignUp", { user: "Kiara" })}
          title="Sign Up"
        />
        <Button
          onPress={() => navigate("Login", { user: "Kiara" })}
          title="Login"
        />
        <Button
          onPress={() => navigate("Profile", { user: "Kiara" })}
          title="Profile"
        />
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
      results: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderResults = this.renderResults.bind(this);
  }

  static navigationOptions = {
    title: "Find A Beer"
  };

  // componentDidMount() {
  // const {search} = this.state.search;

  // fetch(`http://api.brewerydb.com/v2/search?q=${search}&key=af623a0daee2b026720af11cde68fdbf`)
  //   .then((response) => response.json())
  //   .then((responseJson) => {
  //     // console.log(responseJson) //api key could not be found if api is not in link

  //     this.setState({
  //       results: responseJson
  //     }) //, function() {
  //      // console.log('Component did mount. The Beer name is:', this.state.results.data[0].name) // results are hit immediately with no search
  //       // do something with new state
  // //    });
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  // };

  componentDidMount() {
    // this.fetchData();
  }

  fetchData() {
    let url = `http://api.brewerydb.com/v2/search?q=${this.state
      .search}&key=af623a0daee2b026720af11cde68fdbf`;
    console.log("In fetchData. url:", url);
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        console.log("in fetchData callback. responseData:", responseData);
        this.setState({
          // console.log(responseData)
          results: responseData.results
        });
      });
  }

  handleChange(text) {
    console.log("in handleChange. text:", text);
    this.setState({
      search: text
    });
  }

  // onSubmit(event) {
  //   // render results
  //   event.preventDefault();
  //   // console.log('submitted')
  //   this.setState({
  //     displayForm: false,
  //     displayResults: true
  //   });
  // }

  onSubmit(e) {
    console.log("------------------------------------");
    console.log("In onSubmit. e.constructor:", e.constructor);
    // e.preventDefault();
    e.stopPropagation();
    console.log("made it here!");
    let url = `http://api.brewerydb.com/v2/search?q=${this.state
      .search}&key=af623a0daee2b026720af11cde68fdbf`;
    console.log("url:", url);
    fetch(url)
      .then(response => {
        console.log("received response. response:", response);
        return response.json();
      })
      .then(response => {
        //console.log("response:", response);
        this.setState({
          results: response.data
        });
      })
      .catch(err => {
        console.log("caught error");
      });
  }

  renderResults() {
    console.log("in renderResults.");
    console.log("this.state:", this.state);
    console.log("this.state.results:", this.state.results);
    let els = this.state.results.map(e => {
      return <Text>{e}</Text>;
    });
    console.log("els:", els);
    return els;
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

//create a forEach function to go over each result and render it

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen },
  Search: { screen: SearchScreen }
});

//   render(){
//     const { navigate } = this.props.navigation;
//     // console.log("Render. The Beers are:", this.state.results)
//     return(
//       <View>
//         <TextInput
//         style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, width: 300, backgroundColor:'white'}}
//         />
//         <Button
//         onPress={this.onSubmit}
//         title="Submit"
//         />

//       </View>
//       )
//   }
// }
