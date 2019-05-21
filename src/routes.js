import { createAppContainer, createStackNavigator } from "react-navigation";
import { Root } from "native-base";
import React from "react";
import Main from "./pages/main";
import SearchDiarist from "./pages/searchDiarist";
import CustomerAdd from "./pages/customerAdd";
import CustomerUpdate from "./pages/customerUpdate";
import Home from "./pages/home";
import SignIn from "./pages/signIn";

const AppNavigator = createStackNavigator(
  {
    SignIn : {
      screen: SignIn
    },
    Main : {
      screen: Main
    },
    SearchDiarist : {
      screen: SearchDiarist
    },
    CustomerAdd : {
      screen: CustomerAdd
    },
    CustomerUpdate : {
      screen: CustomerUpdate
    },
	  Home : {
      screen: Home
    }
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#FFF"
      },
      headerTintColor: "#FFF"
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default () => (
  <Root>
    <AppContainer />
  </Root>
);