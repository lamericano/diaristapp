import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import api from '../services/api';
import { Container, Header, Content, Button, Text } from 'native-base';

export default class SearchDiarist extends Component {
  static navigationOptions = {
    title: 'Pesquisar serviços',
    headerTintColor: 'black'
  };
  constructor(props) {
    super(props);
    this.state = { token: '', docs: [] };
    this.loadSearch();
  }
  
  retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('@diaristApp:Token');
      if (token !== null) {
        this.state.token = token;
        
      }
    } catch (error) {
      console.log(error);
    }
  }; 
  
  loadSearch = async () => {
    const AuthStr = 'Bearer '.concat(this.state.token); 
    const response = await api.get('/BuscaDiarista/PorCidade?cidade=São Paulo', 
                                        { headers: { Authorization: AuthStr }});
    this.state.docs = response.data.dados;
    console.log(this.state.docs);
  };
  
  componentDidMount(){
    this.retrieveData();
  }

  renderItem = ({ item }) => (
    <View style={styles.SearchContainer}>
      <Text style={styles.SearchTitle}>{item.id}</Text>
      <Text style={styles.SearchDescription}>{item.nome}</Text>
      <TouchableOpacity
        style={styles.SearchButton}
        onPress={() => {
          this.props.navigation.navigate('Main');
        }}
      >
        <Text style={styles.SearchButtonText}>Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View>
        <Text>Oi pessoal </Text>
        <Button>
          <Text>Olaa</Text>
        </Button>
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
    backgroundColor: '#000'
  },
  list: {
    padding: 20
  },
  SearchContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  SearchTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  SearchDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24
  },
  SearchButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#8C72E1',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  SearchButtonText: {
    fontSize: 16,
    color: '#8C72E1',
    fontWeight: 'bold'
  }
});
