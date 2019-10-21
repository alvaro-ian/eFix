import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lista from './ListagemServicos';
import Home from './Home';
import Cadastro from './Cadastro';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {createAppContainer } from 'react-navigation';

const BottomTab =  createMaterialBottomTabNavigator(
  {
    Home: { screen: Home,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'home'}/>  
                    </View>
                ),  
            }
    },
    Busca: { screen: Lista,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'search'}/>  
                    </View>
                ),  
            }
    },
    Novo: { screen: Cadastro,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => (  
                    <View>  
                        <Icon style={[{color: tintColor}]} size={25} name={'add'}/>  
                    </View>
                ),  
            }
    },
  },
  {
    navigationOptions: {
        headerSytle: {
            backgroundColor: "#ebd034"
        },
        headerTintColor: "#FFF"
    },
    shifting: true,
    initialRouteName: 'Home',
    activeColor: '#2196f3',
    inactiveColor: '#788281',
    barStyle: { backgroundColor: '#DEE6E6'},
}
);

export default createAppContainer(BottomTab);