import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  Image } from 'react-native';

import api from '../services/api';
import { format } from 'date-fns';
import { Icon, Text, DatePicker, Toast } from 'native-base';


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
      idContratante: '',
      idDiarista: '',
      dataServico: new Date(),
    };
    animating = this.state.loading
  }
  
  retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('@diaristApp:Token');
      const idContratante = await AsyncStorage.getItem('@diaristApp:idContratante');
      this.state.idContratante = idContratante
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

    this.setState({
      loading:false,
      docs:response.data.dados,
      contentLoaded:true
    })
    console.log(response.data.dados); 
  };

  handleScheduleDate = async () => {
      try { 
        const nav = this.props.navigation;
        const AuthStr = 'Bearer '.concat(this.state.token); 
        const response = await api.post("/Servico/Agendar", 
        {
          IdContratante: this.state.idContratante,
          IdDiarista: this.state.idDiarista,
          DataServico: format(this.state.dataServico, 'MM-DD-YYYY')
          
        },
        { headers: { Authorization: AuthStr }}
        );
          if (response.data.sucesso == true) {
            console.log('Agendamento realizado com sucesso')
              Toast.show({
                text: 'Agendamento realizado com sucesso!',
                buttonText: 'Fechar',
                type: "success",
                duration: 2300
              })
              this.setModalVisible(false);
              nav.navigate("Home");
              
            }
           else {
            Toast.show({
              text: 'Essa data não se encontra disponível',
              buttonText: 'Fechar',
              type: "warning",
              duration: 1800
            })
          }           
      
        
      }
        catch(error) {  
          console.log(error)
      };
    
    
  };
  async componentDidMount(){
    this.retrieveData();
  }
  setDataServico = dataServico => {this.setState({dataServico})}
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  renderItem = ({ item }) => (
    <View style={styles.SearchContainer}>
    <Modal
          animationType="fade"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            console.log('Modal request close')
          }}>
          <View style={styles.modalContainer}>
            <View style = {styles.ModalHeader}>
              <TouchableOpacity
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  style={styles.ModalCloseButton}
                  >
                  <Text style={styles.ModalCloseButtonText}>Fechar</Text>
                </TouchableOpacity> 
                <Text style={styles.ModalTitle}>Agendar serviço</Text>
              </View>
              <View style = {styles.modalHeaderContent}>
              <Image
                  source={require('../../images/avatar-female.png')}
                  style={styles.avatar}
                />
                <Text style={styles.ModalName}>
                  {item.nome}
                </Text>
                <Text style={styles.ModalRating}><Icon style={styles.ModalStar} name="star"/>{item.nota}</Text>
              </View>
              <View style={styles.modalDescription}>
                <Text style={{alignSelf: 'center', color: '#FFF', marginTop: 20, fontSize: 16, fontWeight: 'bold'}}>Descrição:</Text>
                <Text style={{ width: '80%',flexShrink: 0.7, textAlign: 'center',alignSelf: 'center', fontSize: 13, color: '#FFF'}}>Description Description Description Description Description Description Description Description Description Description Description Description</Text>
              </View>
              <View style={{justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            marginTop: 60}}>
              <DatePicker
                  minimumDate={new Date(2019, 6, 17)}
                  maximumDate={new Date(2023, 12, 31)}
                  format="YYYY-MM-DD"
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={true}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Selecione a data"
                  textStyle={{fontSize: 16, color: "#8759ff", backgroundColor:"#FFF", padding: 18, borderRadius: 15 }}
                  placeHolderTextStyle={{ fontSize: 16, color: "#8759ff", backgroundColor:"#FFF", padding: 18, borderRadius: 15 }}
                  
                  onDateChange={this.setDataServico}
                />
               <TouchableOpacity
                  style={styles.ModalButton}
                  onPress={() => {
                    this.handleScheduleDate();
                }}>
                <Text style={styles.ModalButtonText}>Agendar</Text>
              </TouchableOpacity>   
                </View>
          </View>
        </Modal>

        <View style={styles.headerCard}>
          <Image
            source={require('../../images/avatar-female.png')}
            style={styles.avatar}
          />
          <Text style={styles.name}>{item.nome}</Text>
          <Text style={styles.rating}><Icon style={styles.ratingStar} name="star"/>{item.nota}</Text>
       </View>
       <Text style={{alignSelf: 'flex-end', width: '80%',flexShrink: 0.7, marginTop: -65, marginBottom: -10, textAlign: 'right', fontSize: 13, color: '#999'}} ellipsizeMode='tail'>Description Description Description Description Description Description Description Description Description Description Description Description</Text>

      <Text style={styles.price}>R${item.precoDiaria}</Text>
      
      <TouchableOpacity
        style={styles.SearchButton}
        onPress={() => {
            this.setModalVisible(true);
            this.state.idDiarista = item.id;
          }}
      >
        <Text style={styles.SearchButtonText}>Detalhes</Text>
      </TouchableOpacity>
    </View>
  );


  render() {
      return (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={styles.list}
            data={this.state.docs}
            keyExtractor={item => item.id}
            renderItem={this.renderItem}
            extraData={this.state}
          />  
        </View>
      )

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  modalContainer: {
    backgroundColor: '#8759ff',
    flex: 1
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
  headerCard: {
    justifyContent: 'space-between',
    flexDirection:"row",
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  avatar:{
    width: 100,
    height: 100,
    borderRadius: 100
  },
  rating: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
    textAlign: 'right'
  },
  ratingStar: {
    fontSize: 16,
    color: '#8759ff',
    marginTop: 5,
    marginRight: 5,
    lineHeight: 24,
    textAlign: 'right'
  },
  price: {
    fontSize: 20,
    color: '#8759ff',
    marginLeft: 22,
    marginTop: 15,
    marginBottom: 5,
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
  },
  ModalButton: {
    height: 52,
    width: 350,
    borderRadius: 5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 65
  },
  ModalButtonText: {
    fontSize: 16,
    color: '#8759ff',
    fontWeight: 'bold'
  },
  ModalHeader:{
    justifyContent: 'space-between',
    flexDirection:"row",
    marginTop: 60,

  },
  ModalCloseButton: {
    height: 38,
    width: 80,
    borderRadius: 5,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: 28
  },
  ModalCloseButtonText:{
    color: '#8759ff',
  },
  ModalTitle:{
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 28,
    marginRight: 80
  },
  ModalName:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 30

  },
  ModalStar:{
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',

  },
  ModalRating:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginLeft: 25,
    marginTop: 30,
    marginRight: 20

  },
  modalDescription:{
    marginTop: 20
  }
  ,
  modalHeaderContent: {
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    flexDirection:"row",
    borderWidth: 0.33,
    borderColor: '#FFF',
    borderRadius: 12,
  },
});