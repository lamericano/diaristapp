import React, { Component } from "react";
import { StyleSheet, CheckBox, View } from "react-native";
import {
  Container,
  Content,
  Button,
  Text,
  Item,
  Label,
  Input,
  Form,
  Toast
} from "native-base";
import $ from "jquery";
import PubSub from "pubsub-js";

export default class ProductAdd extends Component {
  constructor() {
    super();
    this.state = { list: [] };
  }
  static navigationOptions = {
    title: "Cadastro de produtos",
    headerTintColor: "black"
  };

  state = {
    docs: []
  };

  render() {
    return (
      <Container style={style.container}>
        <Content>
          <FormProduto />
        </Content>
      </Container>
    );
  }
}

class FormProduto extends Component {
  constructor() {
    super();
    this.state = {
      idProduto: "",
      titulo: "",
      descricao: "",
      pacote: "",
      imagem: "",
      valor: "",
      unitario: "",
      fornecedor: "",
      gluten: "",
      lowCarb: "",
      vegano: "",
      porcoes: "",
      listProduto: ""
    };
    this.enviaForm = this.enviaForm.bind(this);
    this.setidProduto = this.setidProduto.bind(this);
    this.setTitulo = this.setTitulo.bind(this);
    this.setDescricao = this.setDescricao.bind(this);
    this.setPacote = this.setPacote.bind(this);
    this.setImagem = this.setImagem.bind(this);
    this.setValor = this.setValor.bind(this);
    this.setUnitario = this.setUnitario.bind(this);
    this.setFornecedor = this.setFornecedor.bind(this);
    this.setGluten = this.setGluten.bind(this);
    this.setLowCarb = this.setLowCarb.bind(this);
    this.setVegano = this.setVegano.bind(this);
    this.setPorcoes = this.setPorcoes.bind(this);
    this.setListProduto = this.setListProduto.bind(this);
  }

  enviaForm(event) {
    event.preventDefault();
    $.ajax({
      url: "localhost:8080",
      contentType: "application/json",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        titulo: this.state.titulo,
        descricao: this.state.descricao,
        pacote: this.state.pacote,
        imagem: this.state.imagem,
        valor: this.state.valor,
        unitario: this.state.unitario,
        fornecedor: this.state.fornecedor,
        gluten: this.state.gluten,
        lowCarb: this.state.lowCarb,
        vegano: this.state.vegano,
        porcoes: this.state.porcoes,
        listProduto: this.state.listProduto
      }),
      success: function(newList) {
        PubSub.publish("update-list-produtos", newList);
        this.setState({
          titulo: "",
          descricao: "",
          pacote: "",
          imagem: "",
          valor: "",
          unitario: "",
          fornecedor: "",
          gluten: "",
          lowCarb: "",
          vegano: "",
          porcoes: "",
          listProduto: ""
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

  setidProduto(event) {
    this.setState({ titulo: event.target.value });
  }
  setTitulo(event) {
    this.setState({ titulo: event.target.value });
  }
  setDescricao(event) {
    this.setState({ descricao: event.target.value });
  }
  setPacote(event) {
    this.setState({ pacote: event.target.value });
  }
  setImagem(event) {
    this.setState({ imagem: event.target.value });
  }
  setValor(event) {
    this.setState({ valor: event.target.value });
  }
  setUnitario(event) {
    this.setState({ unitario: event.target.value });
  }
  setFornecedor(event) {
    this.setState({ fornecedor: event.target.value });
  }
  setGluten(event) {
    this.setState({ gluten: event.target.value });
  }
  setLowCarb(event) {
    this.setState({ lowCarb: event.target.value });
  }
  setVegano(event) {
    this.setState({ vegano: event.target.value });
  }
  setPorcoes(event) {
    this.setState({ porcoes: event.target.value });
  }
  setListProduto(event) {
    this.setState({ listProduto: event.target.value });
  }

  render() {
    return (
      <Form style={style.form} onSubmit={this.enviaForm} method="post">
        <Item stackedLabel style={style.item}>
          <Label style={style.label}>Titulo</Label>
          <Input
            style={style.input}
            underline={false}
            value={this.state.titulo}
            onChange={this.setTitulo}
          />
        </Item>
        <Item stackedLabel style={[style.item, style.itemDesc]}>
          <Label style={style.label}>Descricao</Label>
          <Input
            style={style.input}
            value={this.state.descricao}
            onChange={this.setDescricao}
          />
        </Item>
        <Label style={style.label}>Especiais</Label>
        <View
          style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}
        >
          <CheckBox
            value={this.state.checked}
            onValueChange={() =>
              this.setState({ checked: !this.state.checked })
            }
          />
          <Text style={{ marginTop: 5 }}> Gluten</Text>

          <CheckBox
            value={this.state.checked}
            onValueChange={() =>
              this.setState({ checked: !this.state.checked })
            }
          />
          <Text style={{ marginTop: 5 }}> Vegano</Text>

          <CheckBox
            value={this.state.checked}
            onValueChange={() =>
              this.setState({ checked: !this.state.checked })
            }
          />
          <Text style={{ marginTop: 5 }}> Low Carb</Text>
        </View>
        <Item stackedLabel style={style.item}>
          <Label style={style.label}>Pacote</Label>
          <Input
            style={style.input}
            value={this.state.pacote}
            onChange={this.setPacote}
          />
        </Item>
        <Item stackedLabel style={style.item}>
          <Label style={style.label}>Valor</Label>
          <Input
            style={style.input}
            value={this.state.valor}
            onChange={this.setValor}
          />
        </Item>
        <Item stackedLabel style={style.item}>
          <Label style={style.label}>Unitario</Label>
          <Input
            style={style.input}
            value={this.state.unitario}
            onChange={this.setUnitario}
          />
        </Item>
        <Item stackedLabel style={style.item}>
          <Label style={style.label}>Fornecedor</Label>
          <Input
            style={style.input}
            value={this.state.fornecedor}
            onChange={this.setFornecedor}
          />
        </Item>
        <Item stackedLabel style={style.item}>
          <Label style={style.label}>Gluten</Label>
          <Input
            style={style.input}
            value={this.state.gluten}
            onChange={this.setGluten}
          />
        </Item>
        <Item stackedLabel style={style.item}>
          <Label style={style.label}>Porcoes</Label>
          <Input
            style={style.input}
            value={this.state.porcoes}
            onChange={this.setPorcoes}
          />
        </Item>
        <Item stackedLabel underline="false" style={style.lastItem}>
          <Label style={style.label}>Imagem</Label>
          <Input
            style={style.input}
            value={this.state.imagem}
            onChange={this.setImagem}
          />
        </Item>
        <Button
          success
          style={style.button}
          onPress={() =>
            Toast.show({
              text: "Produto criado com sucesso!",
              buttonText: "Okay",
              type: "success"
            })
          }
        >
          <Text>Cadastrar</Text>
        </Button>
      </Form>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30
  },

  label: {
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    alignSelf: "center"
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 14,
    borderRadius: 6,
    fontSize: 16,
    color: "#555",
    borderWidth: 2,
    borderColor: "#76D963",
    backgroundColor: "#FFF",
    marginRight: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  itemDesc: {
    height: 200,
    marginBottom: 15
  },

  button: {
    padding: 30,
    margin: 20,
    alignSelf: "center"
  }
});
