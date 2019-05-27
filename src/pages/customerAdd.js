import React, { Component } from "react";
import { StyleSheet, CheckBox, View, TouchableOpacity } from "react-native";
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
  DatePicker
} from "native-base";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import $ from "jquery";

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
      nome: "",
      senha: "",
      email: "",
      cpf: "",
      dataNascimento: "",
      logradouro: "",
      numero: "",
      cidade: "",
      estado: "",
      cep: "",
      complemento: "",
      telefone: "",
      listCustomer: ""
    };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setSenha = this.setSenha.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setCpf = this.setCpf.bind(this);
    this.setDataNascimento = this.setDataNascimento.bind(this);
    this.setTelefone = this.setTelefone.bind(this);
    this.setLogradouro = this.setLogradouro.bind(this);
    this.setNumero = this.setNumero.bind(this);
    this.setCidade = this.setCidade.bind(this);
    this.setEstado = this.setEstado.bind(this);
    this.setComplemento = this.setComplemento.bind(this);
    this.setCep = this.setCep.bind(this);
  }

  enviaForm(event) {
    event.preventDefault();
    $.ajax({
      url: "http://localhost:52807",
      contentType: "application/json",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        Nome: this.state.nome,
        Senha: this.state.senha,
        Email: this.state.email,
        Cpf: this.state.cpf,
        DataNascimento: this.state.dataNascimento,
        Telefone: this.state.telefone,
        Logradouro: this.state.logradouro,
        Numero: this.state.numero,
        Cidade: this.state.cidade,
        Estado: this.state.estado,
        Complemento: this.state.complemento,
        Cep: this.state.cep,
        listCustomer: this.state.listCustomer
      }),
      success: function(newList) {
        PubSub.publish("update-list-produtos", newList);
        this.setState({
          nome: "",
          senha: "",
          email: "",
          idendereco: "",
          logradouro: "",
          cidade: "",
          estado: "",
          cep: "",
          numero: "",
          complemento: "",
          telefone: "",
          listCustomer: ""
        });
      }.bind(this),
      error: function(resposta) {
        if (resposta.status === 400) {
          PubSub.publishError(resposta.responseJSON);
        }
      },
      beforeSend: function() {
        PubSub.publish({});
      }
    });
  }

  setNome(event) {
    this.setState({ nome: event.target.value });
  }
  setSenha(event) {
    this.setState({ senha: event.target.value });
  }
  setEmail(event) {
    this.setState({ email: event.target.value });
  }
  setCpf(event) {
    this.setState({ cpf: event.target.value });
  }
  setDataNascimento(event) {
    this.setState({ dataNascimento: event.target.value });
  }
  setTelefone(event) {
    this.setState({ telefone: event.target.value });
  }
  setLogradouro(event) {
    this.setState({ logradouro: event.target.value });
  }
  setNumero(event) {
    this.setState({ numero: event.target.value });
  }
  setCidade(event) {
    this.setState({ cidade: event.target.value });
  }
  setEstado(event) {
    this.setState({ estado: event.target.value });
  }
  setComplemento(event) {
    this.setState({ complemento: event.target.value });
  }
  setCep(event) {
    this.setState({ cep: event.target.value });
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
          <TouchableOpacity style={style.mainButton}>
            <Text style={style.mainButtonText}>
              Eu gostaria de contratar serviços!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.mainButton}>
            <Text style={style.mainButtonText}>
              Eu gostaria de oferecer serviços!
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.mainButton}>
            <Text style={style.mainButtonText}>Eu gostaria de ambos!</Text>
          </TouchableOpacity>
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
                  underline={false}
                  value={this.state.nome}
                  onChange={this.setNome}
                />
              </Item>

              <Item style={style.item}>
                <Label style={style.label}>Email</Label>
                <Input
                  style={style.input}
                  value={this.state.email}
                  onChange={this.setEmail}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Data de Nascimento</Label>
                <DatePicker
                  defaultDate={new Date(1980, 1, 1)}
                  minimumDate={new Date(1920, 1, 1)}
                  maximumDate={new Date(2001, 12, 31)}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={false}
                  animationType={"fade"}
                  androidMode={"default"}
                  placeHolderText="Selecione a data"
                  textStyle={{ color: "green" }}
                  placeHolderTextStyle={{ color: "#d3d3d3" }}
                  onDateChange={this.setDate}
                  disabled={false}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Telefone</Label>
                <Input
                  style={style.input}
                  value={this.state.telefone}
                  onChange={this.setTelefone}
                  data-mask="(00) 0000-0000"
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>CPF</Label>
                <Input
                  style={style.input}
                  value={this.state.cpf}
                  onChange={this.setCpf}
                />
              </Item>
              <Item style={[style.item]}>
                <Label style={style.label}>Senha</Label>
                <Input
                  style={style.input}
                  value={this.state.senha}
                  onChange={this.setSenha}
                />
              </Item>
            </Form>
          </View>
        </ProgressStep>
        <ProgressStep
          previousBtnText="Voltar"
          submitBtnText="Finalizar!"
          label="Endereço"
          onSubmit={() =>
            Toast.show({
              text: "Cadastro realizado com sucesso!",
              buttonText: "Okay",
              type: "success"
            },
            this.props.navigation.navigate("SearchDiarist")
            )
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
              onSubmit={this.enviaForm}
              method="post"
            >
              <Item style={style.item}>
                <Label style={style.label}>Cidade</Label>
                <Input
                  style={style.input}
                  value={this.state.cidade}
                  onChange={this.setCidade}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Estado</Label>
                <Input
                  style={style.input}
                  value={this.state.estado}
                  onChange={this.setEstado}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>CEP</Label>
                <Input
                  style={style.input}
                  value={this.state.cep}
                  onChange={this.setCep}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Endereco</Label>
                <Input
                  style={style.input}
                  value={this.state.endereco}
                  onChange={this.setEndereco}
                />
              </Item>
              <Item style={style.item}>
                <Label style={style.label}>Logradouro / Complemento</Label>
                <Input
                  style={style.input}
                  value={this.state.logradouro}
                  onChange={this.setLogradouro}
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
  mainButton: {
    height: 42,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#8C72E1",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    marginLeft: 40,
    marginRight: 40
  },
  mainButtonText: {
    fontSize: 15,
    color: "#FFF"
  }
});
