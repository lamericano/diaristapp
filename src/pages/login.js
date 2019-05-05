import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StatusBar, AsyncStorage } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';



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
  render() {
    return (
      <Container>
        <StatusBar hidden />
        <Logo source={require('../../images/logo.png')} resizeMode="contain" />
        <Input
          placeholder="Endereço de e-mail"
          
        />
        <Input
          placeholder="Senha"
          
        />
        <Button>
          <ButtonText>Entrar</ButtonText>
        </Button>
        <SignUpLink>
          <SignUpLinkText>Não possuí uma conta ainda? Clique aqui!</SignUpLinkText>
        </SignUpLink>
      </Container>
    );
  }
}
