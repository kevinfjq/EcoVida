import React , {useState}from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Modal, Linking } from "react-native";
import { fontFamily } from "@/src/styles/fontFamily";

const transparent = 'rgba(0,0,0,0.5)';
export default function Product(){

    const [selectedProduct, setSelectedProduct] = useState<any>(null); // Estado para armazenar o produto selecionado
    const [productUrl, setProductUrl] = useState<string>(''); // Estado para armazenar a URL do produto

   // Função para renderizar o conteúdo do modal
   function renderModal() {
    if (!selectedProduct) return null; // Não renderiza o modal se nenhum produto estiver selecionado

    // Define a URL do produto selecionado apenas uma vez
    const url = selectedProduct.url;
    if (url !== productUrl) {
        setProductUrl(url);
    }

        return (
            <Modal visible={true} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image style={styles.imageModal} source={selectedProduct.image} />
                        <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                        <Text style={styles.modalPrice}>{selectedProduct.price}</Text>
                        <TouchableOpacity style={styles.accessButton} onPress={handleAccessButtonPress}>
                            <Text style={styles.accessText}>Acessar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeButton} onPress={() => handleCloseModal()}>
                            <Text style={styles.closeText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }

   function handleAccessButtonPress() {
    if (productUrl) {
        Linking.openURL(productUrl);
    }
}


function handleCloseModal() {
    setSelectedProduct(null);
    setProductUrl('');
}

    function filterDesc(desc: string){
        if(desc.length < 30 ){
            return desc;
        }
        return `${desc.substring(0, 25)}...`;
    } 

    
    return(
        <ScrollView contentContainerStyle={styles.container}>
            
            {/* Ecobags */}
            <Text style={styles.title}> EcoBags </Text>
            <View style={styles.productGrid}>
                {/* produtos */}
                <TouchableOpacity style={styles.containerT} onPress={() => setSelectedProduct({
                    image: require('../assets/images/products/ecobag1.jpg'),
                    name: 'ECOBAG DE ALGODÃO RECICLADO: SEJA PARTE DA SOLUÇÃO - TAM. GRANDE',
                    price: 'R$ 45,00',
                    url: 'https://www.cantoeco.com.br/ecobag-de-algodao-cru-eu-cuido-do-oceano',
                })}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/ecobag1.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('ECOBAG DE ALGODÃO RECICLADO: SEJA PARTE DA SOLUÇÃO - TAM. GRANDE')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ 45,00 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/ecobag2.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('ECOBAG DE ALGODÃO CRU EU CUIDO DO OCEANO')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ 25,00 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/ecobag3.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('ECOBAG PRETA: EU NÃO SOU DE JOGAR FORA')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ 25,00 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/ecobag4.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('ECOBAG LINHA PET DA COLEÇÃO CAPRALÁ')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ 9,90 </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* Casa e Cozinha */}
            <Text style={styles.title}> Casa e Cozinha </Text>
            <View style={styles.productGrid}>
                {/* produtos */}
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/cs-filtrodecafe.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('KIT 2 FILTRO DE CAFÉ REUTILIZÁVEL DE ALGODÃO')}</Text>
                    <View> 
                        <Text style={styles.textPreco}>  R$ 30,00 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/cs-kitcozinha.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('KIT COZINHA ZERO LIXO')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ 229,00 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/cs-panodecera.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('PANO DE CERA DE ABELHA "LEVE LANCHE" - ESTAMPA DE FRUTAS')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ 29,90 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/cs-powerbank.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('POWER BANK SOLAR PV LIGHT SHERPA I-26W COM CAPACIDADE DE 26.800MAH')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ 720,00 </Text>
                    </View>
                </TouchableOpacity>
            </View>
            {/* higierne */}
            <Text style={styles.title}> Higiêne </Text>
            <View style={styles.productGrid}>
                {/* produtos */}
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/hg-kitsabonete.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('KIT COM 3 SABONETES EM BARRA VEGETAIS E NATURAIS')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ 34,00 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/hg-saboneteira.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('SABONETEIRA DE BAMBU')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ 24,00 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/hg-kithigiene.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('KIT DE AUTOCUIDADO SUSTENTÁVEL E HIGIENE PESSOAL')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ R$ 99,90 </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.containerT}>
                    <Image style={styles.imageProduct} source={require('../assets/images/products/hg-kitcotonete.jpg')}/>
                    <Text style={styles.textProducts}>{filterDesc('KIT 3 CX. DE COTONETE COM HASTES DE PAPEL')}</Text>
                    <View> 
                        <Text style={styles.textPreco}> R$ R$ 25,90 </Text>
                    </View>
                </TouchableOpacity>
                {renderModal()}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerT: {
        width: '48%',
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    container: {
        padding: 20,
        alignItems: 'center',      
        flexGrow: 1,  
        paddingBottom: 150,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'left',
        alignSelf: 'stretch',
    },
    imageProduct: {
        width: 145,
        height: 145,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#000'
    },
    textProducts: {
        fontSize: 14,
        paddingTop: 10,
        textAlign: 'center',
    },
    textPreco: {
        fontSize: 16,
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: transparent,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    imageModal: {
        width: 150,
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    modalPrice: {
        fontSize: 16,
        marginBottom: 10,
    },
    accessButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#b5e48c',
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    accessText: {
        fontSize: 14,
        fontFamily: fontFamily.pmedium
    },
    closeButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ab49cc',
        borderRadius: 5,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000'
    },
    closeText: {
        color: 'white',
        fontSize: 12,
        fontFamily: fontFamily.pregular
    },
    
});
