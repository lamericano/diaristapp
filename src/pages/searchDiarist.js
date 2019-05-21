import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import api from "../services/api";
import { Container, Header, Content, Button, Text } from "native-base";

export default class SearchDiarist extends Component {
  static navigationOptions = {
    title: "diaristApp",
    headerTintColor: "black"
  };

  state = {
    docs: []
  };
  _retrieveData = async () => {
    try {
      const value = AsyncStorage.getItem('@diaristApp:Token');
      if (value !== null) {
        // We have data!!
        console.log('FUNFOU');
      }
    } catch (error) {
      console.log('Deu erro nesse token em patrão, meu deus');
    }
  }; 
  
  componentDidMount() {
    this.loadSearch();
    this._retrieveData();
  }

  loadSearch = async () => {
    const AuthStr = 'Bearer '.concat('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkZXYiLCJqdGkiOiIxMzgwZWJjZS02NDUzLTQxNjEtODU3OS0wNDU5MDZlMmQxZDciLCJleHAiOjE1NTgyOTk1NjYsImlzcyI6IkFwcERpYXJpc3RhQVBJIiwiYXVkIjoiQXBwRGlhcmlzdGFNb2JpbGUifQ.OM6mU_5gLI2qopLEk7HLmzOnI5SsZszHXs5ieW4O3No'); 
    const response = await api.get("/BuscaDiarista/PorCidade?cidade=São Paulo", { 'headers': { Authorization: AuthStr } });
    const { docs } = response.data;
    this.setState({ docs });
  };

  renderItem = ({ item }) => (
    <View style={styles.SearchContainer}>
      <Text style={styles.SearchTitle}>{dados.id}</Text>
      <Text style={styles.SearchDescription}>{dados.nome}</Text>
      <TouchableOpacity
        style={styles.SearchButton}
        onPress={() => {
          this.props.navigation.navigate("Search");
        }}
      >
        <Text style={styles.SearchButtonText}>Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={dados => dados.id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#000"
  },
  list: {
    padding: 20
  },
  SearchContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  SearchTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },

  SearchDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },
  SearchButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#8C72E1",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  SearchButtonText: {
    fontSize: 16,
    color: "#8C72E1",
    fontWeight: "bold"
  }
});
