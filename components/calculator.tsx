import { fontFamily } from '@/src/styles/fontFamily';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Calculator: React.FC = () => {
  const [inputs, setInputs] = useState({
    mainTransport: '',
    transportType: '',
    kmPercorrido: '',
    consumoCombustivel: '',
    dieta: '',
    kgCarneVermelha: '',
    kgCarneBranca: '',
    kgVegetais: '',
    consumoEnergia: '',
    kgLixo: '',
    kgPlastico: '',
    qntRoupas: '',
    qntGadgets: '',
  });

  const [result, setResult] = useState<number | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setInputs({ ...inputs, [key]: value });
  };

  // apresentação do resultado
  const [modalVisible, setModalVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const calculatePegadaDeCarbono = () => {
    let transportEmission = 0;
    let foodEmission = 0;
    let energyEmission = 0;
    let wasteEmission = 0;
    let productEmission = 0;

    // Cálculos para Transporte
    if (inputs.mainTransport === 'Carro' && inputs.transportType === 'Gasolina') {
        transportEmission = parseFloat(inputs.kmPercorrido) * (1 / parseFloat(inputs.consumoCombustivel)) * 2.31;
    } 
    else if (inputs.mainTransport === 'Carro' && inputs.transportType === 'Diesel') {
        transportEmission = parseFloat(inputs.kmPercorrido) * parseFloat(inputs.consumoCombustivel) * 2.68;
    } 
    else if (inputs.mainTransport === 'Ônibus') {
        transportEmission = parseFloat(inputs.kmPercorrido) * 0.089;
    }
    else if(inputs.mainTransport === 'A pé' || inputs.mainTransport === 'Bicicleta'){
        transportEmission = 0;
    }

    // Cálculos para Alimentação
    foodEmission = (parseFloat(inputs.kgCarneVermelha) * 27) + (parseFloat(inputs.kgCarneBranca) * 6.9) + (parseFloat(inputs.kgVegetais) * 2);

    // Cálculos para Consumo de Energia
    energyEmission = parseFloat(inputs.consumoEnergia) * 0.233;

    // Cálculos para Resíduos
    wasteEmission = ((parseFloat(inputs.kgLixo) * 0.5) + (parseFloat(inputs.kgPlastico) * 3.1)) * 4;

    // Cálculos para Consumo de Produtos
    productEmission = ((parseFloat(inputs.qntRoupas) * 14)/12) + ((parseFloat(inputs.qntGadgets) * 200) / 12);

    // Total da Pegada de Carbono
    const totalEmission = transportEmission + foodEmission + energyEmission + wasteEmission + productEmission;
    setResult(totalEmission);

    let message;
    if (totalEmission < 100) {
      message = 'Parabéns, você emite pouco carbono! \n Continue ajudando o planeta!';
    } else if (totalEmission < 200) {
      message = 'Você está na média, mas pode melhorar! \n Confira algumas dicas sustentáveis.';
    } else {
      message = 'Opa, você está emitindo muito carbono! \n Melhor confessar os pecados...';
    }
    setResultMessage(message);
    setModalVisible(true);
  };  
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Descubra Qual é a Sua Pegada de Carbono</Text>
      
      {/* Transporte */}
      <View style={styles.formGroup}>
        <Text style={styles.questionsText}>Qual é o seu principal meio de transporte?</Text>
        <RNPickerSelect
          onValueChange={(value) => handleInputChange('mainTransport', value)}
          items={[
            { label: 'Carro', value: 'Carro' },
            { label: 'Ônibus', value: 'Ônibus' },
            { label: 'A pé', value: 'A pé' },
            { label: 'Bicicleta', value: 'Bicicleta' }
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: 'Selecione o meio de transporte', value: '' }}
          value={inputs.mainTransport}
        />
      </View>

      {/* Opção de combustível para Carro */}
      {inputs.mainTransport === 'Carro' && (
        <View style={styles.formGroup}>
          <Text style={styles.questionsText}>Opção de combustível:</Text>
          <RNPickerSelect
            onValueChange={(value) => handleInputChange('transportType', value)}
            items={[
              { label: 'Gasolina', value: 'Gasolina' },
              { label: 'Diesel', value: 'Diesel' }
            ]}
            style={pickerSelectStyles}
            placeholder={{ label: 'Selecione o combustível', value: '' }}
            value={inputs.transportType}
          />
        </View>
      )}

      {/* Quilômetros percorridos */}
      <View style={styles.formGroup}>
        <Text style={styles.questionsText}>Quantos quilômetros você percorre semanalmente?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Km percorridos"
          value={inputs.kmPercorrido}
          onChangeText={(value) => handleInputChange('kmPercorrido', value)}
        />
      </View>

      {/* Campo de Consumo de Combustível somente para Carro */}
      {inputs.mainTransport === 'Carro' && (
        <View style={styles.formGroup}>
          <Text>Consumo de Combustível:</Text>
          <TextInput
            style={styles.input}
            placeholder="Consumo de Combustível"
            value={inputs.consumoCombustivel}
            onChangeText={(value) => handleInputChange('consumoCombustivel', value)}
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Alimentação */}
      <View style={styles.formGroup}>
        <Text  style={styles.questionsText}>Qual é a sua dieta? (Vegetariana, vegana, onívora)</Text>
        <TextInput
          style={styles.input}
          placeholder="Dieta"
          value={inputs.dieta}
          onChangeText={(value) => handleInputChange('dieta', value)}
        />
      </View>

      {/* Quilos de carne vermelha */}
      <View style={styles.formGroup}>
        <Text  style={styles.questionsText}>Quantos quilos de carne vermelha você aproximadamente consome por mês?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Kg de carne vermelha"
          value={inputs.kgCarneVermelha}
          onChangeText={(value) => handleInputChange('kgCarneVermelha', value)}
        />
      </View>

      {/* Quilos de carne branca */}
      <View style={styles.formGroup}>
        <Text style={styles.questionsText}>Quantos quilos de carne branca você aproximadamente consome por mês?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Kg de carne branca"
          value={inputs.kgCarneBranca}
          onChangeText={(value) => handleInputChange('kgCarneBranca', value)}
        />
      </View>

      {/* Quilos de vegetais */}
      <View style={styles.formGroup}>
        <Text style={styles.questionsText}>Quantos quilos de vegetais você aproximadamente consome por mês?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Kg de vegetais"
          value={inputs.kgVegetais}
          onChangeText={(value) => handleInputChange('kgVegetais', value)}
        />
      </View>

      {/* Consumo de Energia */}
      <View style={styles.formGroup}>
        <Text style={styles.questionsText}>Quanto você costuma gastar de eletricidade? (Em kWh ou valor monetário)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Consumo de eletricidade"
          value={inputs.consumoEnergia}
          onChangeText={(value) => handleInputChange('consumoEnergia', value)}
        />
      </View>

      {/* Resíduos */}
      <View style={styles.formGroup}>
        <Text style={styles.questionsText}>Quanto lixo você produz semanalmente? (kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Kg de lixo"
          value={inputs.kgLixo}
          onChangeText={(value) => handleInputChange('kgLixo', value)}
        />
      </View>

      {/* Quantidade de plástico */}
      <View style={styles.formGroup}>
        <Text style={styles.questionsText}>Qual é a quantidade de plástico que você descarta semanalmente? (Em kg)</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Kg de plástico"
          value={inputs.kgPlastico}
          onChangeText={(value) => handleInputChange('kgPlastico', value)}
        />
      </View>

      {/* Consumo de Produtos */}
      <View style={styles.formGroup}>
        <Text style={styles.questionsText}>Quantas roupas novas você compra por ano?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Quantidade de roupas"
          value={inputs.qntRoupas}
          onChangeText={(value) => handleInputChange('qntRoupas', value)}
        />
      </View>

      {/* Quantidade de gadgets */}
      <View style={styles.formGroup}>
        <Text style={styles.questionsText}>Quantos produtos eletrônicos ou gadgets você compra por ano?</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Quantidade de gadgets"
          value={inputs.qntGadgets}
          onChangeText={(value) => handleInputChange('qntGadgets', value)}
        />
      </View>

      {/* Botão para Calcular */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calculatePegadaDeCarbono}>
          <Text style={styles.buttonText}>Calcular Emissão</Text>
        </TouchableOpacity>
      </View>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {result !== null && (
            <>
              <Text style={styles.modalText}>Emissão Total: {result.toFixed(2)} kg CO2/mês</Text>
              <Text style={styles.modalText}>{resultMessage}</Text>
            </>
          )}
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textStyle}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
   inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontFamily: fontFamily.pbold,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
    fontFamily: fontFamily.pregular,
  },
  input: {
    borderWidth: 1,
    borderColor: '#8e22bb',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    fontFamily: fontFamily.pmedium,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    fontFamily: fontFamily.pregular,
  },
  button: {
    backgroundColor: '#D3A9F4',
    padding: 10,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: fontFamily.pbold,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: fontFamily.pbold,
  },
  questionsText: {
    fontSize: 16,
    fontFamily: fontFamily.pregular,
    marginBottom: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#ab49cc',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  picker: {
    fontFamily: fontFamily.plight,
  },
});

export default Calculator;