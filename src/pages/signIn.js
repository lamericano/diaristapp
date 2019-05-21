import React, { Component } from "react";
import { StatusBar, Alert, AsyncStorage } from "react-native";
import { Toast } from "native-base";
import api from "../services/api";
import setToken from "../services/auth"
import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
  Button
} from "../styles";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", senha: "", error: "", dados: "" };
  }
  
   static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require("../../images/logo.png")} resizeMode="contain" />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
        />
        <Input
          placeholder="Senha"
          value={this.state.senha}
          onChangeText={this.handlePasswordChange}
          secureTextEntry={true}
        />
        <Button
          onPress={() => {
            this.handleSignInPress();
          }}
        >
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink onPress={() => {this.handleSignUpPress();}}>
          <SignUpLinkText>
            Não possuí uma conta ainda? Clique aqui!
          </SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = senha => {
    this.setState({ senha });
  };
  
  handleSignUpPress = () => {
    this.props.navigation.navigate("CustomerAdd");
  };
  handleDadosChange = dados => {
    this.setState({ dados });
    handleAsyncStorage();
  };
  handleAsyncStorage = () => {
    if(this.state.dados){
      AsyncStorage.setItem('@diaristToken', this.state.dados);
      Alert.alert('Data Saved');

    } else{
      Alert.alert('Existe um problema no token');
    }
  };

  handleSignInPress = async () => {
    const nav = this.props.navigation;
    if (this.state.email.length === 0 || this.state.senha.length === 0) {
      this.setState(
        { error: "Preencha usuário e senha para continuar!" },
        () => false
      );
    } else {
      try { 
        const response = await api.post("/login", 
        {
          Email: this.state.email,
          Senha: this.state.senha,
        }
        );
          if ((response.data.sucesso == true)) {
            this.state.dados = response.data.dados.token
            Toast.show({
              text: 'Olá '.concat(response.data.dados.contratante.nome,', seja bem-vindo!'),
              buttonText: 'Fechar',
              type: "success",
              duration: 2500
            })
            try{
              AsyncStorage.setItem('@diaristApp:Token', this.state.dados);
              console.log('foi viado')
            }
            catch(error){
              console.log('nao foi viado')
              console.log(error);
            }
            nav.navigate("Main");
          } else {
            console.log('else');
          }           
      
        
      }
        catch {  
          (err)=>{console.log('error');
        }
      };
    }
  };
}