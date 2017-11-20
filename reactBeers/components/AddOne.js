import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import axios from 'axios';

class AddOne extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			saved: []
		};
		// this.renderResults = this.renderResults.bind(this);
			this.onClickSave = this.onClickSave.bind(this);

	}

	componentDidMount() {
		this.fetchData();
	}
	fetchData() {
		console.log("the state is", this.state.id);
		const { id } = this.state;
		let url = `https://morning-oasis-96903.herokuapp.com/beers/search/${id}`;
		fetch(url)
			.then(response => response.json())
			.then(responseData => {
				console.log("the response is", responseData);
				// this.setState({
				//   saved: responseData
				// });
			})
			.catch(err => console.log(err));
	}


	onClickSave(e){
		e.preventDefault();
			console.log(this.state.beersData)

		// axios.post('https://morning-oasis-96903.herokuapp.com/beers/', {
		// 	// name: this.state.beersData.name,
		// 	// description: this.state.beersData.description,
		// }).then(res => {
		// 	this.setState({
		// 		saved: beersData
		// 	})
		// })
	}	

	render() {
		return (
			<View>
				<Text>Add One page</Text>
				<Button onPress={this.onClickSave} title="Save" />
			</View>
		);
	}
}

export { AddOne };
