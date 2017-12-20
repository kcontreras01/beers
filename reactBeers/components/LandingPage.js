import React from "react";
import { Text, View, TextInput, StyleSheet} from 'react-native';
import { Button } from "react-native-elements";


class LandingPage extends React.Component {
	    static navigationOptions = {
    header: null
  }

  render(){
  	const { navigate } = this.props.navigation;
    const { params } = this.props.navigation.state;

  	return(
  		<View style={styles.container}>
  			<Text style={styles.logo}>I LIKE BEER</Text>
  			<Text style={styles.text}>An app to search and save your favorite drinks</Text>
        <Button
          onPress={() => navigate('Profile')}
          containerViewStyle={{width: '90%', padding: 20, backgroundColor: '#2D3142'}}
          textStyle={{textAlign: 'center'}}
          title={`Enter`}
        />
  		</View>
  		)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#8693AB",
    alignItems: "center",
    paddingTop: 50
  },
  logo: {
    fontSize: 70,
    color: '#E64017',
    fontFamily: 'Futura-CondensedMedium',
    padding: 20
  },
  text: {
    fontSize: 27,
    fontFamily: 'Futura-CondensedMedium',
    paddingTop: 30,
    color: 'white',
    textAlign: 'center' ,
    width: '80%',
  },
});

export {LandingPage}