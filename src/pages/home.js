import React, { Component } from "react";
import { Button } from "react-native";
import { Drawer } from "native-base";
import SideBar from "../sideBar/SideBar";
export default class Home extends Component {

  
    closeDrawer() {
        this.drawer._root.close();
      };
      openDrawer() {
        this.drawer._root.open();
      };
  render() {
      
    return (
        
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigator={this.navigator} />}
        onClose={() => this.closeDrawer()}
      >
        <Button title="Oi" onPress={() => this.openDrawer()}/>
      </Drawer>
    );
  }
}
