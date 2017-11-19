// import React from 'react';


// import { View, Button, FormLabel, FormInput, Text, TextInput } from 'react-native';

// class SearchScreen extends React.Component {
//     constructor(props) {
//     super(props);
//     this.state = {
//       text: 'Beer Name',
//       search: "",
//       saved: [],
//       results: []
//        };

//     this.handleChange = this.handleChange.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.renderResults = this.renderResults.bind(this);
//   }

//   static navigationOptions = {
//     title: 'Find A Beer'
//   };

//  componentDidMount() {
//     this.fetchData();
//   }
//   fetchData() {
//     let url = "https://morning-oasis-96903.herokuapp.com/beers";
//     fetch(url)
//       .then(response => response.json())
//       .then(responseData => {
//         // console.log("in fetchData callback. responseData:", responseData);
//         this.setState({
//           // console.log(responseData.results)
//           saved: responseData
//         });
//         // console.log("the state in fetch is", this.state.saved)
//       })
//       .catch(err => console.log(err));
//   }
//   handleChange(text) {
//     // console.log("in handleChange. text:", text);
//     this.setState({
//       search: text
//     });
//   }
//   onSubmit(e) {
//     // console.log("In onSubmit.");
//     // console.log("------------------------------------");
//     // console.log("In onSubmit. e.constructor:", e.constructor);
//     e.preventDefault();
//     e.stopPropagation();
//     // console.log("made it here!");
//     // console.log("this.state.search:", this.state.search);
//     let url = "https://morning-oasis-96903.herokuapp.com/beers/search",
//       body = JSON.stringify({
//         search: this.state.search
//       });
//     // console.log("made it here");
//     // console.log("body:", body);
//     fetch(url, {
//       method: "POST",
//       body: body
//     })
//       .then(response => {
//         // console.log("in .then of fetch in onSubmit");
//         // console.log("response:", response);
//         return response.json();
//       })
//       .then(responseData => {
//         // console.log("got a response");
//         // console.log("response:", responseData);
//         this.setState({
//           results: responseData
//         });
//       })
//       .catch(err => {
//         console.log("caught error", err);
//       });
//     // console.log("the state in onSubmit is", this.state.results);
//   }
//   renderResults() {
//     // console.log("in renderResults.");
//     // console.log('this.state.results.beersData:', this.state.results.beersData);
//     // console.log('Array.isArray(this.state.results.beersData):', Array.isArray(this.state.results.beersData));
//     if (this.state.results.beersData) { 
//       // console.log('got beersData')
//       return this.state.results.beersData.map((x, i)=>{
//         // console.log("x:", x);
//         return 
//         <Text key={i}>{x.name}</Text>
//       });
//     } else {
//       // console.log('no beersData')
//       return null;
//     }
//   }
//   render() {
//     // console.log("------------------------------------");
//     // console.log("In render.");
//     return (
//       <View>
//         <Text>Search</Text>
//         <TextInput
//           style={{
//             height: 40,
//             borderColor: "gray",
//             borderWidth: 1,
//             borderRadius: 8,
//             width: 300,
//             backgroundColor: "white"
//           }}
//           blurOnSubmit={true}
//           onChangeText={this.handleChange}
//         />
//         <Button
//           onPress={() => {
//             console.log("in onPress of Stupid Button");
//           }}
//           title="Stupid Button"
//         />
//         <Button onPress={this.onSubmit} title="Consider Submitting" />
//         {this.renderResults()}
//       </View>
//     );
//   }
// }
// export { SearchScreen }

// //     componentDidMount() {
// //     const {search} = this.state.search;
// //     const { url } = 
// //     return fetch(`http://api.brewerydb.com/v2/search?q=${search}&key=${API_KEY}`)
// //       .then((response) => response.json())
// //       .then((responseJson) => {
// //         this.setState({
// //           results: responseJson.results
// //         }, function() {
// //           console.log('Beers', this.state.results)
// //           // do something with new state
// //         });
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //     };


// //   handleChange(event) {
// //     event.preventDefault();
// //     this.setState({
// //       value: event.target.value
// //     });
// //   }

// //   onClick(event) {
// //     event.preventDefault();
// //     this.setState({
// //       displayForm: true,
// //       displayResults: false,
// //       value: ""
// //     });
// //   }

// //   onSubmit(event) {
// //     event.preventDefault();
// //     this.setState({
// //       displayForm: false,
// //       displayResults: true
// //     });
// //   }

// //   render(){
// //     console.log("Beers:", this.state.beers)
// //     return(
// //       <View>

// //         <FormLabel style={styles.header}>Search Here</FormLabel>
// //         <FormInput
// //         style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 8, width: 300, backgroundColor:'white'}}
// //         onChangeText={this.handleChange}
// //         value={this.state.value}
// //         />

// //         <Button
// //         onPress={this.onSubmit}
// //         title="Sumbit"
// //         />

// //       </View>
// //       )
// //   }
// // }

