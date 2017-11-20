import React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  ScrollView,
  ListView,
  FlatList,
  RefreshControl
} from "react-native";
import { List, ListItem } from "react-native-elements";
import axios from 'axios';
// import Swipeout from 'react-native-swipeout';
// import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saved: [],
      refreshing: false
          };
    this.renderResults = this.renderResults.bind(this); 
    // this.delete = this.delete.bind(this);


  }

  static navigationOptions = {
    title: "Profile"
  };


  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
    let url = "https://morning-oasis-96903.herokuapp.com/beers";
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          saved: responseData
        });
      })
      .catch(err => console.log(err));
  }
  renderResults() {
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    if (this.state.saved.beers) { 
      return this.state.saved.beers.map((x, i)=>{
        return (<View style={styles.beerView} key={i}>
          <Text  
          onPress={() => 
            axios.delete(`https://morning-oasis-96903.herokuapp.com/beers/${x.id}`)
            .then(() => {navigate('Profile')})
          } 
          style={styles.titleText}>Name: {x.name}</Text>
          <Text style={styles.baseText}>Description: {x.description}</Text>
        </View>);
      });
    } else {
      return null;
    }
  }


  // findById(){
  //   const id = this.props.id;
  //   // on press of text show desc by id
  //   let url = `https://morning-oasis-96903.herokuapp.com/beers/${id}`;
  //   fetch(url)
  //     .then(response => response.json())
  //     .then(responseData => {
  //       console.log('the responseData is', responseData)
  //       // this.setState({
  //       //   saved: responseData
  //       // });
  //     })
  //     .catch(err => console.log(err));
  //   }

  // renderOne(i){
  //   this.findById()
  //     return (<View>
  //         <Text>{i.name}</Text>
  //       </View>)
  // }

  render(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return(
      <View>
      <Button
        onPress={() => navigate('Search')}
        title="Search for Beers"
        />
      
      <Text style={styles.headerView}>Here are your saved beers</Text>

      <ScrollView>
        {this.renderResults()}
      </ScrollView>
        </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  headerView: {
    textAlign: "center",
    fontFamily: "Cochin",
    fontSize: 20
  },
  logo: {
    fontSize: 30
  },
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  beerView: {
    backgroundColor: "lightblue",
    borderRadius: 8,
    margin: 10,
    padding: 10
  }
});

export { ProfileScreen };
