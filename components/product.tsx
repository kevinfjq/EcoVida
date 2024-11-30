import React, { useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
    Linking,
    TextInput,
    Alert,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { fontFamily } from "@/src/styles/fontFamily";
import { colors } from "@/src/styles/colors";
import { FIREBASE_AUTH, db } from "@/firebaseConfig";
import {
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    Timestamp,
} from "firebase/firestore";
import RNPickerSelect from 'react-native-picker-select';
import {getDoc} from "@firebase/firestore";

// Definição da interface Product
interface Product {
    id: string;
    name: string;
    price: string;
    photoURL: string;
    url: string;
    category: string;
    createdAt: Timestamp;
}

const transparent = "rgba(0,0,0,0.5)";

export default function Product() {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'createdAt'>>({
        name: "",
        price: "",
        photoURL: "",
        url: "",
        category: "",
    });

    const [products, setProducts] = useState<Product[]>([]);
    const [imageError, setImageError] = useState<{ [key: string]: boolean }>({});
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = FIREBASE_AUTH.currentUser;
            if (user) {
                try {
                    const docRef = doc(db, 'users', user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setIsAdmin(userData.isAdmin === true);
                    } else {
                        // O documento do usuário não existe
                        setIsAdmin(false);
                    }
                } catch (error) {
                    console.error('Erro ao obter dados do usuário:', error);
                    setIsAdmin(false);
                }
            } else {
                // Usuário não está autenticado
                setIsAdmin(false);
            }
        };

        fetchUserData();
    }, []);

    // Função para buscar produtos do Firestore em tempo real
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
            const productsData: Product[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as Omit<Product, 'id'>),
            }));
            setProducts(productsData);
        }, (error) => {
            console.error("Erro ao buscar produtos:", error);
            Alert.alert("Erro", "Não foi possível carregar os produtos.");
        });

        return () => unsubscribe();
    }, []);

    // Função para adicionar um novo produto
    const handleAddProduct = async () => {
        if (
          !newProduct.name ||
          !newProduct.price ||
          !newProduct.photoURL ||
          !newProduct.url ||
          !newProduct.category
        ) {
            Alert.alert("Erro", "Por favor, preencha todos os campos!");
            return;
        }

        try {
            const newProductData = {
                name: newProduct.name,
                price: newProduct.price,
                photoURL: newProduct.photoURL,
                url: newProduct.url,
                category: newProduct.category,
                createdAt: Timestamp.now(),
            };

            await addDoc(collection(db, "products"), newProductData);

            // Não atualize o estado local manualmente para evitar duplicação
            // O listener onSnapshot cuidará disso

            setShowAddModal(false);
            setNewProduct({
                name: "",
                price: "",
                photoURL: "",
                url: "",
                category: "",
            });
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
            Alert.alert("Erro", "Não foi possível adicionar o produto.");
        }
    };

    // Função para remover um produto
    const removeProduct = (id: string) => {
        Alert.alert(
          "Remover Produto",
          "Tem certeza de que deseja remover este produto?",
          [
              { text: "Cancelar", style: "cancel" },
              {
                  text: "Remover",
                  style: "destructive",
                  onPress: async () => {
                      try {
                          await deleteDoc(doc(db, 'products', id));
                          // O estado será atualizado automaticamente pelo onSnapshot
                      } catch (error) {
                          console.error('Erro ao remover produto:', error);
                          Alert.alert('Erro', 'Não foi possível remover o produto.');
                      }
                  }
              }
          ],
          { cancelable: true }
        );
    };

    // Renderiza o modal de detalhes do produto
    const renderModal = () => {
        if (!selectedProduct) return null;

        return (
          <Modal visible={true} animationType="slide" transparent={true}>
              <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                      <Image
                        style={styles.imageModal}
                        source={selectedProduct && selectedProduct.photoURL && selectedProduct.photoURL.trim().length > 0? {uri: selectedProduct.photoURL} : require("@/assets/images/fallback.jpg")}
                        onError={() => setImageError(prev => ({ ...prev, [selectedProduct.id]: true }))}
                        defaultSource={require("@/assets/images/fallback.jpg")} // Adicione uma imagem de fallback no seu projeto
                      />
                      <Text style={styles.modalTitle}>{selectedProduct.name}</Text>
                      <Text style={styles.modalPrice}>{selectedProduct.price}</Text>
                      <TouchableOpacity
                        style={styles.accessButton}
                        onPress={() => Linking.openURL(selectedProduct.url)}
                      >
                          <Text style={styles.accessText}>Acessar</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelectedProduct(null)}
                      >
                          <Text style={styles.closeText}>Fechar</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Modal>
        );
    };

    const pickImage = async () => {
        // Solicita permissão para acessar a mídia
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Desculpe!', 'Precisamos da permissão para acessar suas fotos.');
            return;
        }

        // Abre o seletor de imagens
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            selectionLimit: 1
        });

        if (!result.canceled) {
            // Atualiza o estado com o URI da imagem selecionada
            setNewProduct({ ...newProduct, photoURL: result.assets[0].uri });
        }
    };

    // Renderiza o modal para adicionar um novo produto
    const renderAddModal = () => (
      <Modal visible={showAddModal} animationType="fade" transparent={true}>
          <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>Adicionar Produto</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={newProduct.name}
                    onChangeText={(text) => setNewProduct({ ...newProduct, name: text })}
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Preço"
                    value={newProduct.price}
                    onChangeText={(text) => setNewProduct({ ...newProduct, price: text })}
                  />
                  <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                      <Text style={styles.imagePickerText}>
                          {newProduct.photoURL ? "Imagem Selecionada" : "Selecionar Imagem"}
                      </Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.input}
                    placeholder="Link"
                    value={newProduct.url}
                    onChangeText={(text) => setNewProduct({ ...newProduct, url: text })}
                  />
                  {/* Seleção de Categoria com RNPickerSelect */}
                  <RNPickerSelect
                    onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                    placeholder={{
                        label: "Selecione uma categoria",
                        value: null,
                    }}
                    items={[
                        { label: 'Ecobags', value: 'Ecobags' },
                        { label: 'Casa', value: 'Casa' },
                        { label: 'Cozinha', value: 'Cozinha' },
                        { label: 'Tecnologia', value: 'Tecnologia' },
                        { label: 'Higiene', value: 'Higiene' },
                        { label: 'Outros', value: 'Outros' },
                    ]}
                    style={pickerSelectStyles}
                    value={newProduct.category}
                    useNativeAndroidPickerStyle={false}
                    Icon={() => {
                        return <Ionicons name="chevron-down-outline" size={24} color="gray" />;
                    }}
                  />
                  <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                      <Text style={styles.accessText}>Adicionar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowAddModal(false)}
                  >
                      <Text style={styles.closeText}>Cancelar</Text>
                  </TouchableOpacity>
              </View>
          </View>
      </Modal>
    );

    return (
      <ScrollView contentContainerStyle={styles.container}>
      {
          isAdmin && (
              <TouchableOpacity
                style={styles.addProductButton}
                onPress={() => setShowAddModal(true)}
              >
                  <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            )
      }
    <View style={styles.productGrid}>
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.containerT}
              onPress={() => setSelectedProduct(product)}
            >
                <Image
                  style={styles.imageProduct}
                  source={product && product.photoURL && product.photoURL.trim().length > 0? {uri: product.photoURL} : require("@/assets/images/fallback.jpg")}
                  onError={() => setImageError(prev => ({ ...prev, [product.id]: true }))}
                  defaultSource={require("@/assets/images/fallback.jpg")} // Adicione uma imagem de fallback no seu projeto
                />
                <Text style={styles.textProducts}>{product.name}</Text>
                <Text style={styles.textPreco}>{product.price}</Text>
                {
                    isAdmin && (
                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => removeProduct(product.id)}
                        >
                            <Ionicons name="trash-outline" size={20} color="#ce2424" />
                        </TouchableOpacity>
                    )
                }
            </TouchableOpacity>
          ))}
    </View>

          {renderModal()}
          {renderAddModal()}
      </ScrollView>
    );
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        color: '#000',
        paddingRight: 30, // Para o ícone
        marginBottom: 10,
        fontFamily: fontFamily.pregular,
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 8,
        color: '#000',
        paddingRight: 30, // Para o ícone
        marginBottom: 10,
        fontFamily: fontFamily.pregular,
    },
    iconContainer: {
        top: 12,
        right: 10,
    },
});

const styles = StyleSheet.create({
    containerT: {
        width: '48%',
        paddingVertical: '2%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        position: 'relative', // Para posicionar o botão de remoção
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
        flexDirection: 'row',
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
        width: '80%', // Ajuste a largura conforme necessário
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
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
        height: 40,
        width: "100%",
        fontFamily: fontFamily.pregular,
    },
    addProductButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
        backgroundColor: "#34a853",
        padding: 10,
        borderRadius: 30,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: 'center',

    },
    floatingAddButton: {
        position: 'absolute',
        right: 20,
        bottom: 30,
        backgroundColor: "#34a853",
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        zIndex: 1000, // Para garantir que fique acima de outros elementos
    },
    addButton: {
        backgroundColor: "#4285f4",
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: "center",
    },
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    imagePickerButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    imagePickerText: {
        fontSize: 16,
        color: '#000',
        fontFamily: fontFamily.pregular,
    },
});




