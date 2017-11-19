import React from 'react';
import { Text, View , Button, StyleSheet, ScrollView } from 'react-native';

class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      saved: []
    }
        this.renderResults = this.renderResults.bind(this);

  }

  static navigationOptions = {
    title: 'My Profile'
    // title: `${navigation.state.params.user}'s Profile`
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
  renderResults() {
    // console.log("in renderResults.");
    // console.log('this.state.results.beersData:', this.state.results.beersData);
    // console.log('Array.isArray(this.state.results.beersData):', Array.isArray(this.state.results.beersData));
    if (this.state.saved.beers) { 
      // console.log('got beersData')
      return this.state.saved.beers.map((x, i)=>{
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

  render(){
    const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

    return(
      <View>
        <Text style={styles.header}>Here are your saved beers</Text>


      <Button
        onPress={() => navigate('Search')}
        title="Search"
        />

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

export { ProfileScreen }
