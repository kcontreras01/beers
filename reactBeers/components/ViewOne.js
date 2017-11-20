import React from 'react';
import { Text, View , Button, StyleSheet } from 'react-native';

class ViewOne extends React.Component {
	  constructor(props){
    super(props);
    this.state = {
      saved: props.saved
    }
    // this.renderResults = this.renderResults.bind(this);

  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData() {
  	console.log('the state is',this.state)
  	const { id } = this.state;
    let url = `https://morning-oasis-96903.herokuapp.com/beers/${id}`;
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
      	// console.log('the response is', responseData)
        this.setState({
          saved: responseData
        }), console.log('the response is', responseData)

      })
      .catch(err => console.log(err));
  }
  // renderResults() {
  //   if (this.state.saved.beers) { 
  //     return this.state.saved.beers.map((x, i)=>{
  //       return (<View style={styles.beerView} key={i}>
  //         <Text style={styles.titleText}>Name: {x.name}</Text>
  //         <Text style={styles.baseText}>Description: {x.description}</Text>
  //       </View>)
  //     });
  //   } else {
  //     return null;
  //   }
  // }

	render(){
		return(
			<View>
			<Text>View One page</Text>
			</View>
			)
	}
}





//   render(){
//     return(
//       <View>
//        {this.renderResults()}
//       </View>
//       )
//   }
// }

export { ViewOne }