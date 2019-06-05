import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import api from '../services/api';
import { Container, Header, Content, Button, Text } from 'native-base';
import { getActiveChildNavigationOptions } from 'react-navigation';
import { isTSTypeParameterDeclaration, mixedTypeAnnotation } from '@babel/types';

export default class SearchDiarist extends Component {
  static navigationOptions = {
    title: 'Pesquisar serviços',
    headerTintColor: 'black'
  };
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      docs: [],
      loading: false,
      contentLoaded:false,
    };
    animating = this.state.loading
  }
  
  retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('@diaristApp:Token');
      if (token !== null) {
        this.state.token = token;
        this.loadSearch();
      }
    } catch (error) {
      console.log(error);
    }
  }; 
  
  loadSearch = async () => {
    this.setState({loading:false});
    const AuthStr = 'Bearer '.concat(this.state.token); 
    const response = await api.get('/BuscaDiarista/PorCidade?cidade=São Paulo', 
                                        { headers: { Authorization: AuthStr }});
    //this.state.docs = response.data.dados;
    //this.state.loading = false;

    /*dica importante!!
    presta atencao
    isso vai mudar a sua vida!!
    o react por padrao
    so renderiza de novo o componente vc usa o this.setState() e n o this.state
    vc vai entender agr */

    this.setState({
      loading:false,
      docs:response.data.dados,
      contentLoaded:true
    })
    console.log(response.data.dados); 
  };
  
  async componentDidMount(){
    this.retrieveData();
  }

  renderItem = ({ item }) => (
    <View style={styles.SearchContainer}>
      <Text style={styles.SearchTitle}>{item.nome}</Text>
      <Text style={styles.SearchDescription}>{item.email}</Text>
      <Text style={styles.SearchDescription}>Data de Nascimento: {item.dataNascimento}</Text>
      <Text style={styles.SearchDescription}>Preço diaria: {item.precoDiaria}</Text>
      <Text style={styles.SearchDescription}>Avaliação: {item.nota}</Text>
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
    
    /* if (!this.state.contentLoaded && this.state.loading){
      return ( <ActivityIndicator animating = {this.state.loading}/> );
    } else { */
      return (
        <View style={{flex: 1}}>
          {/* <Button>
            <Text>Pesquisar</Text>
          </Button> */}
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.docs}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            extraData={this.state}
          />  
        </View>
      )

  /* } */
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000'
  },
  list: {
    padding: 20,
    flex: 1
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
