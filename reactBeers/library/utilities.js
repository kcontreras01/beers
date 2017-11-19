import { AsyncStorage } from 'react-native';

export async function setUser(user){
  try {
    await AsyncStorage.setItem('@BeerStore:user', JSON.stringify(user));
  } catch (error) {
    // Error saving data
    console.log(error);
  }
}

export async function getUser(){
  try {
    const user = await AsyncStorage.getItem('@BeerStore:user');
    if (user !== null){

      return JSON.parse(user);
    }
  } catch (error) {
    // Error retrieving data
    console.log(error);
  }
}