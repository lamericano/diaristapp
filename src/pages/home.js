import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { Drawer, Header, Title, Left, Right, Icon, Body, Button } from "native-base";
import SideBar from "../sideBar/SideBar";

export default class Home extends Component {
    closeDrawer() {
        this.drawer._root.close();
      };
    openDrawer() {
      this.drawer._root.open()
      };
      static navigationOptions = {
        header: null
      }
  render() {

    return (
      
      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigation={this.props.navigation}/>}
        onClose={() => this.closeDrawer()}
      
      >
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => this.openDrawer()}
            >
              <Icon type="FontAwesome" name="home" />
            </Button>
          </Left>
          <Body>
            <Title>diaristApp</Title>
          </Body>
          <Right />
        </Header>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#8C72E1"
  }
});