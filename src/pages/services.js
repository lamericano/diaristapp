import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  AsyncStorage
} from "react-native";
import api from "../services/api";
import { Container, Header, Content, Button, Text } from "native-base";

export default class Services extends Component {
  static navigationOptions = {
    title: "diaristApp",
    headerTintColor: "black"
  };


  constructor(props) {
    super(props);
    this.state = {
      docs: [],
      token: '',
      idContratante: '',
      loading: false,
      contentLoaded:false,
    };
    animating = this.state.loading
  }

  async componentDidMount(){
    this.retrieveData();
  }

  retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('@diaristApp:Token');
      const idContratante = await AsyncStorage.getItem('@diaristApp:idContratante');
      this.state.idContratante = idContratante
      if (token !== null) {
        this.state.token = token;
        this.state.idContratante = idContratante;
        
        this.loadServices();
      }
    } catch (error) {
      console.log(error);
    }
  }; 

  loadServices = async () => {
    this.setState({loading:false});
    const AuthStr = 'Bearer '.concat(this.state.token); 
    const response = await api.get('/Servico/ServicosAgendados?idContratante='.concat(this.state.idContratante), 
                                        { headers: { Authorization: AuthStr }});
    console.log('response services', response)
    console.log('sucesso:', response.data.sucesso)
    this.setState({
      loading:false,
      docs:response.data.dados,
      contentLoaded:true
    })
    if (response.data.sucesso == true){
    this.setState({docs : response.data.dados});}
    console.log('docs', docs)
    
  };

  renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productTitle}>Giuliana Pontes</Text>
      <Text style={styles.productDescription}>Data do serviço: {item.dataServico}</Text>
      <Text style={styles.productDescription}>R${item.preco}</Text>
    </View>
  );

  render() {
    return (
      <View>
        <FlatList
          contentContainerStyle={styles.list}
          data={this.state.docs}
          keyExtractor={item => item.id}
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
  productContainer: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },

  productDescription: {
    fontSize: 16,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },
  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#8C72E1",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5
  },
  productButtonText: {
    fontSize: 16,
    color: "#8C72E1",
    fontWeight: "bold"
  }
});
