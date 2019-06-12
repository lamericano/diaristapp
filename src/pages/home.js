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
            backgroundColor: "#8C72E1" }}>
          <Text style={{ fontWeight: "600", color: '#FFF' }}>
              {" "}{item.title}
            </Text>
            {expanded
              ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
              : <Icon style={{ fontSize: 18 }} name="add-circle" />}
          </View>
        );
      }
      _renderContent(item) {
        return (
          <Text
            style={{
              backgroundColor: "#e3f1f1",
              padding: 10,
              fontStyle: "italic",
            }}
          >
            {item.content}
          </Text>
        );
      }

  render() {
    const dataArray = [
      { title: "Serviços agendados", content: "Lorem ipsum dolor sit amet" },
      { title: "Serviços recentes", content: "Lorem ipsum dolor sit amet" },
      { title: "Melhores Diarists para você", content: "Lorem ipsum dolor sit amet" }
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
              <Icon type="FontAwesome" name="home" />
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
            expanded={true}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent} />
          </Content>
      </Container>
      </Drawer>
      

    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#8C72E1",
    

  },
  widget:{
    backgroundColor: "#8C72E1",
    borderRadius: 8
  }
});