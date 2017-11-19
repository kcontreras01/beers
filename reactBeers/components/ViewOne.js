import React from 'react';
import { Text, View , Button, StyleSheet } from 'react-native';

class ViewOne extends React.Component {
	  static navigationOptions = {
    title: 'Profile'
  };

	render(){
		return(
			<View>
			<Text>View One page</Text>
			</View>
			)
	}
}

export { ViewOne }