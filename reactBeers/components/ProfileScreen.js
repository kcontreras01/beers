import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ListView,
  FlatList,
  RefreshControl,
  Alert
} from "react-native";
import { List, ListItem, Header, Button, Icon} from "react-native-elements";
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
    title: "Saved Beers"
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
          onPress={() => {
            Alert.alert('Your beer was deleted! Refresh page to view beers.'),
            axios.delete(`https://morning-oasis-96903.herokuapp.com/beers/${x.id}`)
            // .then(() => {navigate('Profile')})
          } }
          style={styles.titleText}>{x.name}</Text>
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
          icon={{name: 'beer', type: 'font-awesome'}}
          containerViewStyle={{width: '90%', padding: 20}}
          textStyle={{textAlign: 'center'}}
          title={`Search for Beers`}
        />
     <ScrollView
        refreshControl={
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
    backgroundColor: "#2D3142",
    alignItems: "center",
  },
  logo: {
    fontSize: 30,
    color: '#E64017',
    fontFamily: 'Futura-CondensedMedium',
  },
  beerView: {
    borderRadius: 2,
    backgroundColor: '#8693AB',
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
    fontSize: 30,
    fontFamily: 'Futura-CondensedMedium',
    color: 'white'
  },
  baseText: {
    fontFamily: 'Futura-CondensedMedium',
    fontSize: 15    
  },  
});

export { ProfileScreen };
