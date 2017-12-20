import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  FormLabel,
  FormInput,
  ScrollView,
  Alert} from "react-native";
import { Button } from 'react-native-elements';
import axios from 'axios';

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
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;    
    // console.log("in renderResults.");
    // console.log('this.state.results.beersData:', this.state.results.beersData);
    // console.log('Array.isArray(this.state.results.beersData):', Array.isArray(this.state.results.beersData));
    if (this.state.results.beersData) { 
      // console.log('got beersData')
      return this.state.results.beersData.map((x, i)=>{
        // console.log("x:", x);
        return (<View style={styles.beerView} key={i}>
         <Text onPress={() => {
            Alert.alert('Your beer was saved!')
            // console.log("In SearchScreen renderResults, about to send axios post");
            axios.post(`https://morning-oasis-96903.herokuapp.com/beers/`, {
              name: x.name,
              description: x.description,
            })
            // .then(function (response) {
            //   // console.log("in SearchScreen renderResults onPress callback response. response:",response);
            //   navigate('Profile')
            //   })
            .catch(function (error) {
              console.log(error);
              });
            }
          }  
          style={styles.titleText}>{x.name}</Text>
          <Text style={styles.baseText}>{x.description}</Text>
        </View>)
      });
    } else {
      // console.log('no beersData')
      return null;
    }
  }

// redirect to profile screen 


// Swipeout component


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
      <View style={styles.container}>
      <Text style={styles.text}>After searching, click on the name to save the beer.</Text>
        <TextInput
          style={styles.textInputView}
          blurOnSubmit={true}
          onChangeText={this.handleChange}
          placeholder={'Search'}
          onSubmitEditing={this.onSubmit}
        />
        <Button 
          constainerViewStyle={{padding: 20, width: '100%'}}
          icon={{name: 'check', type: 'font-awesome'}}
          onPress={this.onSubmit} 
          title="Submit"
        />
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
    backgroundColor: "#2D3142",
    alignItems: "center",
    // paddingTop: 40,
  },
  logo: {
    fontSize: 30,
    color: '#E64017',
    fontFamily: 'Futura-CondensedMedium',
    // fontFamily: 'Cabin Sketch'
  },
  beerView: {
    borderRadius: 2,
    backgroundColor: '#8693AB',
    margin: 10,
    padding: 10
  },
  baseText: {
    fontFamily: 'Futura-CondensedMedium',
    fontSize: 15    
        
  },
  headerView: {
    textAlign: "center",
    fontFamily: 'Futura-CondensedMedium',
    fontSize: 30,
    padding: 10
  },  
  titleText: {
    fontSize: 20,
    fontFamily: 'Futura-CondensedMedium',
    color: 'white'
  },
  text: {
    fontSize: 27,
    fontFamily: 'Futura-CondensedMedium',
    paddingTop: 30,
    color: 'white',
    textAlign: 'center' 
  },
  textInputView: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    width: 300,
    backgroundColor: "white",
    textAlign: 'center',
    margin: 20
  }  
});

export {SearchScreen}
