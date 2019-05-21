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
    title: "Pesquisar serviços",
    headerTintColor: "black"
  };
  constructor(props) {
    super(props);
    this.state = { token: "" };
  }

  state = {
    docs: []
  };
  _retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('@diaristApp:Token');
      if (token !== null) {
        this.state.token = token;
        console.log(token);
        this.loadSearch();
        console.log('FUNFOU NO SEARCH');
      }
    } catch (error) {
      console.log('Deu erro nesse token em patrão, meu deus');
    }
  }; 
  
  componentDidMount() {
    this._retrieveData();
    
  }

  loadSearch = async () => {
    const AuthStr = 'Bearer '.concat(this.state.token); 
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
