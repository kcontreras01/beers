// import React from 'react';
// import { Text, View , Button, StyleSheet } from 'react-native';

// class ProfileScreen extends React.Component {

//   static navigationOptions = {
//     title: 'My Profile'
//     // title: `${navigation.state.params.user}'s Profile`
//   };

//   render(){
//     const { navigate } = this.props.navigation;
//     const { params } = this.props.navigation.state;

//     return(
//       <View>
//         <Text style={styles.header}>Here are your saved beers</Text>

//       <Button
//         onPress={() => navigate('Search')}
//         title="Search"
//         />
//       </View>
//       )
//   }
// }

// const styles = StyleSheet.create({
//   header: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: 30
//   }
// });

// export { ProfileScreen }


// class ProfileScreen extends React.Component {
//   static navigationOptions = {
//     title: "My Profile"
//     // title: `${navigation.state.params.user}'s Profile`
//   };
//   render() {
//     const { navigate } = this.props.navigation;
//     const { params } = this.props.navigation.state;
//     return (
//       <View>
//         <Text style={styles.header}>Here are your saved beers</Text>
//         <Button onPress={() => navigate("Search")} title="Search" />
//       </View>
//     );
//   }
// }