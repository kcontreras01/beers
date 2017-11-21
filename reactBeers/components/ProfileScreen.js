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
    this._onRefresh = this._onRefresh.bind(this); 

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
            // .then(() => {navigate('Profile')})
          } 
          style={styles.titleText}>Name: {x.name}</Text>
          <Text style={styles.baseText}>{x.description}</Text>
        </View>);
      });
    } else {
      return null;
    }
  }

  _onRefresh(){
    this.fetchData()
  }

  render(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;


    return(
      <View style={styles.container}>
      <Button
        onPress={() => navigate('Search')}
        title="Search for Beers"
        style={styles.searchButton}
        />
      
      <Text style={styles.headerView}>Here are your saved beers</Text>

      <ScrollView
        refreshControl ={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }>
        {this.renderResults()}
      </ScrollView>
        </View>
        )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFCEB",
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
    borderRadius: 8,
    backgroundColor: '#A5D0A8',
    margin: 10,
    padding: 10
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
  },
  baseText: {
    fontFamily: 'Futura-CondensedMedium',
    fontSize: 15    
  },  
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   headerView: {
//     textAlign: "center",
//     fontFamily: "Cochin",
//     fontSize: 20
//   },
//   logo: {
//     fontSize: 30
//   },
//   baseText: {
//     fontFamily: "Cochin"
//   },
//   titleText: {
//     fontSize: 20,
//     fontWeight: "bold"
//   },
//   beerView: {
//     backgroundColor: "lightblue",
//     borderRadius: 8,
//     margin: 10,
//     padding: 10
//   }
// });

export { ProfileScreen };
