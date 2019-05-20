import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = "@diaristApp:token";

export const onSignIn = () => AsyncStorage.setItem(TOKEN_KEY, "true");

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);

export const setToken = token => TOKEN_KEY = token;

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return (token !== null) ? true : false;
};