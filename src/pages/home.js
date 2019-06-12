import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Drawer, Header, Title, Left, Right, Icon, Body, Button, Accordion, Container, Content, Text } from "native-base";
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

      _renderHeader(item, expanded) {
          return (
            <View style={{
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-between",
              alignItems: "center" ,
              marginTop: 20,
              backgroundColor: "#8759ff",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12
               }}>
            <Text style={{ fontWeight: "600", color: '#FFF' }}>
                {" "}{item.title}
              </Text>
              {expanded
                ? <Icon style={{ fontSize: 20, color: '#FFF' }} name="remove" />
                : <Icon style={{ fontSize: 20, color: '#FFF' }} name="add" />}
            </View>
          );
      }
      _renderContent(item) {
        return (
          <Text
            style={{
              padding: 10,
              borderWidth: 0.11,
              fontStyle: "italic",
              borderBottomLeftRadius: 12
            }}
          >
            {item.content}
          </Text>
        );
      }

  render() {
    const dataArray = [
      { title: "Serviços agendados", content: "Lorem ipsum dolor sit amet" }
    ];
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
              <Icon name="home" />
            </Button>
          </Left>
          <Body>
            <Title>diaristApp</Title>
          </Body>
          <Right />
        </Header>
        <Container>
          <Content padder>
            <Accordion dataArray={dataArray}
            animation={true}
            expanded={0}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent} 
            
            style={styles.accord}
            />
          </Content>
      </Container>
      </Drawer>
      

    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#8759ff"
  },
  accord:{
    borderWidth: 0
  }
});