import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	View,
	FlatList,
	TouchableOpacity
  } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';


export default class Main extends Component {
	static navigationOptions = {
		title : "diaristApp",
		headerTintColor: '#FFF',
		headerStyle: {
			backgroundColor: '#8C72E1',
			borderRadius: 15,
			marginLeft: 3,
			marginRight: 3,
			color: '#FFF'
		  }
		  
	};



	render(){
		return(
			<View style={styles.container}>
				
				<View style={styles.mainContainer}>
					<Text style={styles.mainTitle} >Dev GUI</Text>
					<Text style={styles.mainDescription} >Functions</Text>
					<TouchableOpacity style={styles.mainButton}
						onPress={() => {
							this.props.navigation.navigate('Products')
						}}
					>
						<Text style={styles.mainButtonText}>
							Listar serviços
						</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity style={styles.mainButton}
						onPress={() => {
							this.props.navigation.navigate('productAdd')
						}}
					>
						<Text style={styles.mainButtonText}>
							Cadastrar produtos
						</Text>
					</TouchableOpacity> */}
					<TouchableOpacity style={styles.mainButton}
						onPress={() => {
							this.props.navigation.navigate('CustomerAdd')
						}}
					>
						<Text style={styles.mainButtonText}>
							Cadastrar usuarios
						</Text>
					</TouchableOpacity>
						<TouchableOpacity style={styles.mainButton}
						onPress={() => {
							this.props.navigation.navigate('SignIn')
						}}
					>
						<Text style={styles.mainButtonText}>
							SignIn
						</Text>
					</TouchableOpacity>
				</View>
				
			</View>
			);
	}

}

const styles =  StyleSheet.create({
	container:{
		backgroundColor: "#E3DEF5",
		flex: 1
	},
	list:{
		padding: 20
	},
	mainContainer: {
		backgroundColor: "#E3DEF5",
		borderWidth: 1,
		borderColor: "#DDD",
		borderRadius: 5,
		padding: 20,
		marginBottom: 20
	},
	mainTitle: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#333",
		fontFamily: 'Open Sans',
	},

	mainDescription: {
		fontSize: 16,
		color: "#999",
		marginTop: 5,
		lineHeight: 24
	},
	mainButton: {
		height: 42,
		borderRadius: 9,
		borderWidth: 2,
		borderColor: "#000",
		backgroundColor: "#8C72E1",
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 15,
		marginLeft: 40,
    	marginRight: 40
	},
	mainButtonText:{
		fontSize: 14,
		color: "#FFF"
	}

});
