import React from "react";
import { AppRegistry, Image, StyleSheet } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
export default class SideBar extends React.Component {
  
  render() {
    return (
      <Container style={styles.container}>
        <Content>
          <Image
            source={require('../../images/logo.png')}
            style={{
              height: 150,
              width: 300,
              marginTop: 20,
              justifyContent: "center",
              alignItems: "center"
            }}
           />
            <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri:
                  "https://github.com/GeekyAnts/NativeBase-KitchenSink/raw/react-navigation/img/logo.png"
              }}
            />
          <List>
              <ListItem
                      button
                      onPress={() => {
                        this.props.navigation.navigate("Home");}}
                    >
                      <Text style={styles.listItemText}>Início</Text>
              </ListItem>
              <ListItem
                      button
                      onPress={() => {
                        this.props.navigation.navigate("SearchDiarist");}}
                    >
                      <Text style={styles.listItemText}>Procure um diarist</Text>
              </ListItem>
              <ListItem
                      button
                      onPress={() => {
                        this.props.navigation.navigate("Home");}}
                    >
                      <Text style={styles.listItemText}>Agenda</Text>
              </ListItem>
              <ListItem
                      button
                      onPress={() => {
                        this.props.navigation.navigate("CustomerUpdate");}}
                    >
                      <Text style={styles.listItemText}>Perfil</Text>
              </ListItem>
              <ListItem
                      button
                      onPress={() => {
                        this.props.navigation.navigate("Home");}}
                    >
                      <Text style={styles.listItemText}>Sair</Text>
              </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8C72E1"
  },
  listItemText: {
    color: "#FFF"
  }

});