import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Root } from "native-base";
import React from 'react';
import Main from './pages/main';
import Products from './pages/products';
import ProductAdd from './pages/productAdd';
import CustomerAdd from './pages/customerAdd';
import SignIn from './pages/login';


const AppNavigator = createStackNavigator({
	Main,
	Products,
	ProductAdd,
	CustomerAdd,
	SignIn
}, {
	navigationOptions: {
		headerStyle: {
			backgroundColor: "#FFF"			
		},
		headerTintColor: "#FFF"
	},
},
);

const AppContainer = createAppContainer(AppNavigator);

export default () =>
  <Root>
    <AppContainer />
  </Root>;