import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import api from '../services/api'


import {
  Container,
  Logo,
  Input,
  ErrorMessage,
  Button,
  ButtonText,
  SignUpLink,
  SignUpLinkText,
} from '../styles';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {email: '', senha: '', error: '' };
  }
  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/logo.png')} resizeMode="contain" />
        <Input
          placeholder="Endereço de e-mail"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
        />
        <Input
          placeholder="Senha"
          value={this.state.senha}
          onChangeText={this.handlePasswordChange}
        />
        <Button onPress={() => {
							this.handleSignInPress();
						}}>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink>
          <SignUpLinkText>Não possuí uma conta ainda? Clique aqui!</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }

  handleEmailChange = (email) => {
  this.setState({ email });
};

handlePasswordChange = (senha) => {
  this.setState({ senha });
};

handleCreateAccountPress = () => {
  this.props.navigation.navigate('SignUp');
};

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.senha.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      const response = await api.post('/login', {
        Email: this.state.email,
        Senha: this.state.senha
      });
        
      await AsyncStorage.setItem('@diaristApp:token', response.data.dados);

      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' }),
        ],
      });
      /* this.props.navigation.dispatch(resetAction);  */   
  };
}


}