import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import { Navigation } from 'react-native-navigation';

import { registerScreens } from '../menu/drawerRoutes';

registerScreens();

Navigation.startSingleScreenApp({
    screen: {
        screen: 'example.Home',
    }
})

export default class Home extends Component {
  render() {
    return (
    <View>
      
        <Button title="oi" />
        <Text>Oi</Text>
        
        </View>
    );
  }


}
