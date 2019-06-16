import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  Container,
  Content,
  Button,
  Text,
  Item,
  Label,
  Input,
  Form,
  Toast,
  DatePicker,
  Alert,
} from "native-base";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import api from '../services/api';
import { format } from 'date-fns';

export default class CustomerAdd extends Component {
  constructor() {
    super();
    this.state = { list: [] };
  }
  static navigationOptions = {
    title: "Cadastre-se!",
    headerTintColor: "#FFF",
    headerStyle: {
      backgroundColor: "#8C72E1",
      borderRadius: 15,
      margin: 8,
      color: "#FFF"
    }
  };

  state = {
    docs: []
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FormCustomer />
      </View>
    );
  }
}

class FormCustomer extends Component {
  constructor() {
    super();
    this.state = {
      contratante: true,
      nome: '',
      senha: '',
      email: '',
      cpf: '',
      dataNascimento: new Date(),
      telefone: '',
      logradouro: '',
      numero: '',
      cidade: '',
      estado: '',
      complemento: '',
      cep: '',
      buttonContratanteDisabled: false,
      buttonDiaristaDisabled: false
    };
    Text.defaultProps.uppercase = false;
  }

  handleSubmit = async () => {
    
      try { 
        const response = await api.post("/cadastro", 
        {
          Contratante: this.state.contratante,
          Nome: this.state.nome,
          Senha: this.state.senha,
          Email: this.state.email,
          Cpf: this.state.cpf,
          DataNascimento: format(this.state.dataNascimento, 'YYYY-MM-DD'),
          Telefone: this.state.telefone,
          Logradouro: this.state.logradouro,
          Numero: this.state.numero,
          Cidade: this.state.cidade,
          Estado: this.state.estado,
          Complemento: this.state.complemento,
          Cep: this.state.cep
        });
        
          if ((response.data.sucesso == true)) {
            const nav = this.props.navigation;
            Toast.show({
              text: 'Cadastrado com sucesso, entre com suas informações!',
              buttonText: 'Okay',
              type: "success",
              duration: 2000
            });
            nav.navigate("SignIn");
          } else {
            Toast.show({
              text: 'Por favor revise seu cadastro.',
              type: "success"
            });
          }           
      
        
      }
        catch(error){  
          console.log('catchou');
          console.log('contratante'.concat(this.state.contratante));
        console.log('nome'.concat(this.state.nome));
        console.log('senha'.concat(this.state.senha));
        console.log('email'.concat(this.state.email));
        console.log('cpf'.concat(this.state.cpf));
        console.log(format(this.state.dataNascimento, 'YYYY-MM-DD')),`dataNascimento`;
        console.log('telefone'.concat(this.state.telefone));
        console.log('logradouro'.concat(this.state.logradouro));
        console.log('numero'.concat(this.state.numero));
        console.log('cidade'.concat(this.state.cidade));
        console.log('estado'.concat(this.state.estado));
        console.log('complemento'.concat(this.state.complemento));
        console.log('cep'.concat(this.state.cep));
        console.log(error);
      };
  };

    setNome = nome => {this.setState({nome})}
    setSenha = senha => {this.setState({senha})}
    setEmail = email => {this.setState({email})}
    setCpf = cpf => {this.setState({cpf})}
    setDataNascimento = dataNascimento => {this.setState({dataNascimento})}
    setLogradouro = logradouro => {this.setState({logradouro})}
    setCidade = cidade => {this.setState({cidade})}
    setEstado = estado => {this.setState({estado})}
    setCep = cep => {this.setState({cep})}
    setNumero = numero => {this.setState({numero})}
    setComplemento = complemento => {this.setState({complemento})}
    setTelefone = telefone => {this.setState({telefone})}

  onNextStep = async () => {
    this.props.onNext && (await this.props.onNext());

    // Return out of method before moving to next step if errors exist.
    if (this.props.errors) {
      return;
    }

    onSubmit = () => {
      this.props.onSubmit && this.props.onSubmit();
    };
  
    

  onNextFirst = () => {
    if (buttonContratanteDisabled  || buttonDiaristaDisabled ){
      Alert.alert('Selecione uma das opções');
      Toast.show({
        text: 'Selecione uma das opções!',
        buttonText: 'Okay',
        type: "danger",
        duration: 200
      });
    }
    }
  }

  setContratante = () => {
    this.state.contratante = true
    this.setState({buttonContratanteDisabled : true,
                   buttonDiaristaDisabled : false })

  } 
   setDiarista = () => {
    this.state.contratante = false
    this.setState({buttonDiaristaDisabled : true, 
                    buttonContratanteDisabled : false})
  }

  render() {
    return (
      <ProgressSteps>
        <ProgressStep
          previousBtnText="Voltar"
          
          nextBtnStyle={style.button}
          nextBtnTextStyle={style.buttonText}
          nextBtnText="Próximo"
          label="Finalidade"
        >
        <View style={style.buttonContent}>
          <Button style={style.mainButton} onPress={this.setContratante} disabled={this.state.buttonContratanteDisabled} >
            <Text style={style.mainButtonText} >
              Eu gostaria de contratar serviços!
            </Text>
          </Button>
          <Button style={style.mainButton} onPress={this.setDiarista} disabled={this.state.buttonDiaristaDisabled} >
            <Text style={style.mainButtonText} >
              Eu gostaria de oferecer serviços!
            </Text>
          </Button>
          </View>
        </ProgressStep>
        <ProgressStep
          previousBtnText="Voltar"
          nextBtnText="Próximo"
          label="Informações"
          nextBtnStyle={style.button}
          nextBtnTextStyle={style.buttonText}
          previousBtnStyle={style.button}
          previousBtnTextStyle={style.buttonText}
        >
          <View>
            <Form style={style.form} underline="false">
              <Item style={style.item}>
                <Label style={style.label}>Nome</Label>
                <Input
                  style={style.input}
                  value = {this.state.nome}
                  underline={false}
                  onChangeText={this.setNome}
                />
              </Item>

              <Item style={style.item}>
                <Label style={style.label}>Email</Label>
                <Input
                  style={style.input}
                  value = {this.state.email}
                  onChangeText={this.setEmail}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Data de Nascimento</Label>
                <DatePicker
                  defaultDate={new Date(1980, 1, 1)}
                  minimumDate={new Date(1920, 1, 1)}
                  maximumDate={new Date(2001, 12, 31)}
                  format="YYYY-MM-DD"
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={true}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Selecione a data"
                  textStyle={{ color: "#8759ff" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.setDataNascimento}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Telefone</Label>
                <Input
                  style={style.input}
                  value = {this.state.telefone}
                  onChangeText={this.setTelefone}
                  data-mask="(00) 0000-0000"
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>CPF</Label>
                <Input
                  style={style.input}
                  value = {this.state.cpf}
                  onChangeText={this.setCpf}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Senha</Label>
                <Input
                  style={style.input}
                  value = {this.state.senha}
                  onChangeText={this.setSenha}
                />
              </Item>
            </Form>
          </View>
        </ProgressStep>
        <ProgressStep
          previousBtnText="Voltar"
          submitBtnText="Finalizar!"
          label="Endereço"
          onSubmit={this.handleSubmit
          }
          nextBtnStyle={style.button}
          nextBtnTextStyle={style.buttonText}
          previousBtnTextStyle={style.buttonText}
          previousBtnStyle={style.button}
        >
          <View>
            <Form
              style={style.form}
              underline="false"
            >
            <Item style={style.item}>
                <Label style={style.label}>Estado</Label>
                <Input
                  style={style.input}
                  value = {this.state.estado}
                  onChangeText={this.setEstado}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Cidade</Label>
                <Input
                  style={style.input}
                  value = {this.state.cidade}
                  onChangeText={this.setCidade}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>CEP</Label>
                <Input
                  style={style.input}
                  value = {this.state.cep}
                  onChangeText={this.setCep}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Endereco</Label>
                <Input
                  style={style.input}
                  value = {this.state.logradouro}
                  onChangeText={this.setLogradouro}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Número</Label>
                <Input
                  style={style.input}
                  value = {this.state.numero}
                  onChangeText={this.setNumero}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Complemento</Label>
                <Input
                  style={style.input}
                  value = {this.state.complemento}
                  onChangeText={this.setComplemento}
                />
              </Item>

              {/* <Button success style={style.button} onPress={()=> Toast.show({
                                text: 'Customer criado com sucesso!',
                                buttonText: 'Okay',
                                type: "success"
                              })
                              }><Text>Cadastrar</Text>
                        </Button> */}
            </Form>
          </View>
        </ProgressStep>
      </ProgressSteps>
    );
  }
}

const style = StyleSheet.create({
  label: {
    fontSize: 14,
    color: "#333"
  },
  input: {
    fontSize: 12,
    color: "#555",
    /* borderColor: "#8C72E1", */
    backgroundColor: "#FFF",
    /* borderWidth: 1, */
    borderRadius: 20
  },
  item: {
    borderWidth: 0,
    padding: 5,
    marginLeft: 55,
    marginRight: 55
  },
  button: {
    borderColor: "#000",
    backgroundColor: "#8C72E1",
    borderWidth: 2,
    borderRadius: 9,
    height: 38
  },
  buttonText: {
    color: "#FFF",
    fontSize: 13,
    fontWeight: "bold"
  },
  buttonContent:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainButton: {
    height: 42,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#8C72E1",
    justifyContent: "center",
    alignSelf:"center",
    marginTop: 12,
    flex: 1,
  },
  mainButtonText: {
    fontSize: 15,
    color: "#FFF"
  }
});
