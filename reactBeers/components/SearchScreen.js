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
    // this.save = this.save.bind(this);
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
    // console.log("In onSubmit.");
    // console.log("------------------------------------");
    // console.log("In onSubmit. e.constructor:", e.constructor);
    e.preventDefault();
    e.stopPropagation();
    // console.log("made it here!");
    // console.log("this.state.search:", this.state.search);
    let url = "https://morning-oasis-96903.herokuapp.com/beers/search",
      body = JSON.stringify({
        search: this.state.search
      });
    // console.log("made it here");
    // console.log("body:", body);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: body
    })
      .then(response => {
        // console.log("in .then of fetch in onSubmit");
        // console.log("response:", response);
        return response.json();
      })
      .then(responseData => {
        // console.log("got a response");
        // console.log("response:", responseData);
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
    // console.log("in renderResults.");
    // console.log('this.state.results.beersData:', this.state.results.beersData);
    // console.log('Array.isArray(this.state.results.beersData):', Array.isArray(this.state.results.beersData));
    if (this.state.results.beersData) { 
      // console.log('got beersData')
      return this.state.results.beersData.map((x, i)=>{
        // console.log("x:", x);
        return (<View style={styles.beerView} key={i}>
          <Text style={styles.titleText}>{x.name}</Text>
          <Text style={styles.baseText}>{x.description}</Text>
        </View>)
      });
    } else {
      // console.log('no beersData')
      return null;
    }
  }

  // save(x){
  //   axios.post('https://morning-oasis-96903.herokuapp.com/beers/', {
  //       user_id: this.props.user.id,
  //       name: x.name,
  //       description: x.description,
  //     }).then(res => {
  //       console.log(res);
  //       this.props.goBack();
  //     })
  //   };

  render() {
    // console.log("------------------------------------");
    // console.log("In render.");
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
        <Button onPress={this.onSubmit} title="Submit" />
        <ScrollView>
        {this.renderResults()}
        </ScrollView>
      </View>
    );
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

export {SearchScreen}
