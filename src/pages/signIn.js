import React, { Component } from "react";
import { StatusBar, Alert, AsyncStorage, Keyboard  } from "react-native";
import { Toast } from "native-base";
import api from "../services/api";
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
     console.disableYellowBox = true; 
  }
  
   static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container >
        <StatusBar hidden />
        <Logo source={require("../../images/logo.png")} resizeMode="contain"/>
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
            Keyboard.dismiss();
          }}
        >
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink >
          <SignUpLinkText onPress={() => {this.handleSignUpPress() }}>
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
        },
        
        );
          if ((response.data.sucesso == true)) {
            console.log('aaaaaaa')
            
            try{
              AsyncStorage.setItem('@diaristApp:Token', response.data.dados.token);
              console.log('Token armazenado com sucesso')
            if (response.data.dados.diarista == null) {
              Toast.show({
                text: 'Olá '.concat(response.data.dados.contratante.nome,', seja bem-vindo!'),
                buttonText: 'Fechar',
                type: "success",
                duration: 1500
              });
              AsyncStorage.setItem('@diaristApp:idContratante', response.data.dados.contratante.idContratante);
              
              nav.navigate("Main");
            }
            else {
              Toast.show({
                text: 'Olá '.concat(response.data.dados.diarista.nome,', seja bem-vindo!'),
                buttonText: 'Fechar',
                type: "success",
                duration: 1500
              })
              AsyncStorage.setItem('@diaristApp:Token', response.data.dados.token);
              AsyncStorage.setItem('@diaristApp:idDiarista', response.data.dados.diarista.idDiarista);
              nav.navigate("Main");
            }
              console.log('ids armazenadoz com sucesso')
              
            }
            catch(error){
              console.log('O token não foi armazenado corretamente')
              console.log(error);
            }
          } else {
            console.log('else');
          }           
      
        
      }
        catch(error) {  
          console.log(error)
      };
    }
  };
}