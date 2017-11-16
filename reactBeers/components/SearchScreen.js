// import React from 'react';
// import { AppRegistry, StyleSheet, Text, View , Button, TextInput, FormLabel, FormInput} from 'react-native';
// import { StackNavigator } from 'react-navigation';
// import SimpleApp from '../App'

// class SearchScreen extends React.Component {
//     constructor(props) {
//     super(props);
//     this.state = { 
//       text: 'Beer Name',
//       search: "",
//       results: []
//        };

//     this.handleChange = this.handleChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.onClick = this.onClick.bind(this);
//   }

//   static navigationOptions = {
//     title: 'Find A Beer'
//   };


//     componentDidMount() {
//     const {search} = this.state.search;

//     return fetch(`http://api.brewerydb.com/v2/search?q=${search}&key=${API_KEY}`)
//       .then((response) => response.json())
//       .then((responseJson) => {
//         this.setState({
//           results: responseJson.results
//         }, function() {
//           console.log('Beers', this.state.results)
//           // do something with new state
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     };


//   handleChange(event) {
//     event.preventDefault();
//     this.setState({
//       value: event.target.value
//     });
//   }

//   onClick(event) {
//     event.preventDefault();
//     this.setState({
//       displayForm: true,
//       displayResults: false,
//       value: ""
//     });
//   }

//   onSubmit(event) {
//     event.preventDefault();
//     this.setState({
//       displayForm: false,
//       displayResults: true
//     });
//   }

//   render(){
//     console.log("Beers:", this.state.beers)
//     return(
//       <View>
//         <FormLabel style={styles.header}>Search Here</FormLabel>
//         <FormInput
//         style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, width: 300, backgroundColor:'white'}}
//         onChangeText={this.handleChange}
//         value={this.state.value}
//         />
//         <Button
//         onPress={this.onSubmit}
//         title="Sumbit"
//         />        

//       </View>
//       )
//   }
// }
