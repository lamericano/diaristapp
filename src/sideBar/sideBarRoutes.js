import React, { Component } from "react";
import Main from "../pages/main";
import Products from "../pages/products";
import ProductAdd from "../pages/productAdd";
import CustomerAdd from "../pages/customerAdd";
import Home from "../pages/home";
import SignIn from "../pages/signIn";
import { DrawerNavigator } from "react-navigation";
import SideBar from "./SideBar";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: Home },
    Serviços: { screen: SignIn },
    Main: { screen: Main }
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter