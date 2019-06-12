import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  ActivityIndicator
} from 'react-native';
import api from '../services/api';
import { Icon, Text } from 'native-base';


export default class SearchDiarist extends Component {
  static navigationOptions = {
    title: 'Pesquisar serviços',
    headerTintColor: '#FFF',
    headerStyle: {
      backgroundColor: "#8759ff"
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      docs: [],
      loading: false,
      contentLoaded:false,
      modalVisible: false,
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

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderItem = ({ item }) => (
    <View style={styles.SearchContainer}>
    <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      <Text style={styles.name}>{item.nome}</Text>
      <Text style={styles.rating}><Icon style={styles.ratingStar} name="star"/>{item.nota}</Text>
      <Text style={styles.price}>R${item.precoDiaria}</Text>
      
      <TouchableOpacity
        style={styles.SearchButton}
        onPress={() => {
            this.setModalVisible(true);
          }}
      >
        <Text style={styles.SearchButtonText}>Agendar</Text>
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
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  rating: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
    textAlign: 'right'
  },
  ratingStar: {
    fontSize: 12,
    color: '#F00',
    marginTop: 5,
    marginLeft: 5,
    lineHeight: 24,
    textAlign: 'right'
  },
  price: {
    fontSize: 20,
    color: '#000',
    marginTop: 5,
    fontWeight: 'bold',
    lineHeight: 24
  },
  SearchButton: {
    height: 42,
    borderRadius: 5,
    backgroundColor: '#8759ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5
  },
  SearchButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold'
  }
});