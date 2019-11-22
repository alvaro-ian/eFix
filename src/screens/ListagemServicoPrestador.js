import React, { Component } from 'react';
import { 
    Text, 
    View,
    StyleSheet,
    FlatList,
    Button,
    TouchableOpacity,
    Alert
} from 'react-native';
import ItemServico from './ItemServico.js';
import api from '../services/API';

export default class ListagemServicoPrestador extends Component {
    
    state = {
        servicos: [],
        servico: [],
        errorMessage: null,
        filter: null,
        value: null,
        value2: null, 
        value3: null,
        id_prestador: null,
        ord: null
    };

    componentDidMount() {
        this.updateServicesList(this.props.filter, this.props.value, this.props.value2, this.props.value3, this.props.ord);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.filter !== prevState.filter || nextProps.value !== prevState.value || nextProps.value2 !== prevState.value2 || nextProps.value3 !== prevState.value3 || nextProps.ord !== prevState.ord) {
            return {
                filter: nextProps.filter,
                value: nextProps.value,
                value2: nextProps.value2,
                value3: nextProps.value3,
                ord: nextProps.ord
            }
        } else {
            return null;
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.filter !== this.props.filter || prevProps.value !== this.props.value || prevProps.value2 !== this.props.value2 || prevProps.value3 !== this.props.value3 || prevProps.ord !== this.props.ord) {
            console.log("Atualizar lista");
            this.updateServicesList(this.props.filter, this.props.value, this.props.value2, this.props.value3, this.props.ord);
        }
    }

    updateServicesList(filter, value, value2, value3, ord) {
        this.setState({ filter: filter, value: value , value2: value2, value3: value3, ord: ord });

        switch(filter) {
            case 'categoria':
                this.getServicesByCategoria(value);
                console.log("Filtro por categoria " + value);
                break;
            case 'preco':
                this.getServicesByPreco(value);
                console.log("Filtro por preco " + value);
                break;
            case 'busca':
                this.getServicesBySearch(value);
                console.log("Filtro de busca por " + value);
                break;
            case 'busca2':
                this.getServicesBySearch2(value, value2);
                console.log("Filtro de busca por " + value);
                break;
            case 'busca3':
                this.getServicesBySearch3(value, value2);
                console.log("Filtro de busca por " + value);
                break;
            case 'busca4':
                this.getServicesBySearch4(value, value2);
                console.log("Filtro de busca4 por " + value);
                console.log("pesquiza::" + value);
                console.log("categoria:" + value2);
                break;
            case 'buscatudinho':
                this.getServicesBySearchtudinho(value, value2, value3);
                console.log("Filtro de busca4 por " + value);
                console.log("pesquiza::" + value);
                console.log("categoria:" + value2);
                console.log("preço:" + value3);
                break;
            default:
                this.getServicesList();
                console.log("Sem filtro");
                break;
        }
    }

    getServicesList = async () => {
        try {
            const response = await api.getServices();

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }

    getServicesByCategoria = async (categoria) => {
        try {
            const response = await api.getServicesByCategory(categoria);

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }

    getServicesByProvider = async (id_prestador) => {
        try{
            const response = await api.getServicesByProvider(id_prestador);
            this.setState({servicos: response.data["servicos"]})
        }   catch (response) {
            this.setState({errorMessage: "Erro"});
        }
    }

    getServicesByPreco = async (preco) => {
        try {
            const response = await api.getServicesUnderPrice(preco);

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }

    getServicesBySearch = async (texto) => {
        try {
            const response = await api.getServicesSearch(texto);

            console.log("Tela: " + response.data);

            this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }
    getServicesBySearch2 = async (texto, texto2) => {
        try {
            const response = await api.getServicesSearch(texto);
            console.log("Tela: " + response.data);
		let filtrados = []
		filtrados = response.data["servicos"].filter(function(a){
            return a.preco <= texto2;})
            this.setState({servicos: filtrados});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }
    getServicesBySearch3 = async (categoria, texto2) => {
        try {
            const response = await api.getServicesByCategory(categoria);
            console.log("Tela: " + response.data);
		let filtrados = []
		filtrados = response.data["servicos"].filter(function(a){
            return a.preco <= texto2;})
            this.setState({servicos: filtrados});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }
    getServicesBySearch4 = async (texto, texto2) => {
        try {
            const response = await api.getServicesSearch(texto);

            console.log("Tela: " + response.data);

            let filtrados = []
            filtrados = response.data["servicos"].filter(function(a){
                return a.categoria === texto2;})
                this.setState({servicos: filtrados});
           
            // this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }
    getServicesBySearchtudinho = async (texto, texto2, texto3) => {
        try {
            const response = await api.getServicesSearch(texto);

            console.log("Tela: " + response.data);

            let filtrados = []
            filtrados = response.data["servicos"].filter(function(a){
                return a.categoria === texto2 && a.preco <= texto3;})
                this.setState({servicos: filtrados});
           
            // this.setState({servicos: response.data["servicos"]});
        } catch (response) {
            console.log("Erro: " + response.data);
            this.setState({errorMessage: "Erro"});
        }
    }

    showAlert = () => {
        Alert.alert("Contratar serviço");
    }

    render() {
        const emptyList = <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text>Nenhum serviço recuperado.</Text> 

        </View>

        return(
            <View style={styles.container}>
               
                {console.log(this.state.servicos)}

                <FlatList 
                    data={this.state.servicos}
                    ListEmptyComponent={emptyList}
                    extraData={this.state.servicos}
                    renderItem={({item}) => <ItemServico servico={item} onPress={() => this.props.contract(item)}/>}
                    keyExtractor={(item, id_servico) => item.nome + id_servico}
                />
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        overflow: 'scroll',
        backgroundColor:'white'
    },
    buttons:{
        alignItems: 'center',
        justifyContent: 'center',
        height:15,
        elevation: 20,
        
    },
    buttonText:{
        padding: 4,
        fontSize:15
    }
});