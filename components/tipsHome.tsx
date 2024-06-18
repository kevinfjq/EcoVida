import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from "react-native";
import { fontFamily } from "@/src/styles/fontFamily";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop:30,
    marginBottom:20,
    borderColor: '#b5e48c',
    borderWidth: 5,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: fontFamily.pmedium,
  },
  tip: {
    marginBottom: 10,
    fontFamily: fontFamily.pregular,
  },
  updateTips:{
    fontFamily: fontFamily.psemibold,
    textAlign: 'right',
  }
});

// Lista de todas as dicas sustentáveis
const allTips = [
    "Economize água desligando a torneira ao escovar os dentes.",
    "Utilize sacolas retornáveis ao fazer compras.",
    "Prefira produtos orgânicos e locais.",
    "Reduza o consumo de plástico descartável.",
    "Recicle todo o papel, vidro e plástico que puder.",
    "Plante árvores e apoie iniciativas de reflorestamento.",
    "Economize energia desligando aparelhos eletrônicos quando não estiverem em uso.",
    "Opte por transportes sustentáveis como caminhada, bicicleta ou transporte público.",
    "Use lâmpadas de LED de baixo consumo de energia.",
    "Participe de campanhas de limpeza de praias e áreas naturais.",
    "Tome banhos mais rápidos e fechar a torneira na hora de escovar os dentes",
    "Instale um arejador nas torneiras. Isso garante a sensação de volume, mas diminui o fluxo de água",
    "Usar o transporte público, bicicleta ou simplesmente caminhar ajuda a reduzir as emissões de CO2 e outros poluentes",
    "Evite o uso dos utensílios descartáveis",
    "No trabalho, tenha uma caneca reutilizável para hora do café",
    "Troque o canudo plástico pelas opções de inox ou bambu",
    "Ao invés de plástico filme, utilize tecidos encerados",
    "Troque shampoos e condicionadores em embalagens tradicionais pelas opções em barras",
    "Separe seu lixo. A separação de materiais orgânicos e recicláveis colabora para a destinação correta dos resíduos",
    "Ao fazer compras no supermercado, não esqueça de levar sua ecobag",
    "Faça compras a granel, isso reduz o consumo de embalagens plásticas",
    "Congele suas refeições da semana, isso também ajuda a reduzir o desperdício alimentar",
    "Nunca descarte o óleo de cozinha no ralo da pia, isso polui mares e oceanos. Acondicione em uma garrafa e busque empresas que transformam óleo usado em biodiesel ou carvão",
    "Outra possibilidade para o óleo de cozinha usado é utilizá-lo para fazer sabão caseiro",
    "Troque os guardanapos de papel pelos de tecido",
    "Substitua a bucha sintética de lavar pratos por uma bucha vegetal",
    "Use lâmpadas LED. Além de mais duráveis, promovem economia de energia elétrica",
    "Sempre que possível, aproveite a iluminação natural dos ambientes",
    "Não utilize secadora para secar as roupas lavadas, opte por secar naturalmente",
    "Descarte o lixo eletrônico, como pilhas, baterias, celulares e computadores antigos, em ecopontos específicos para esse fim para não contaminar o solo",
    "Elimine vazamentos. Evita o desperdício de água e reduz o valor da conta de água no fim do mês",
    "Não deixe aparelhos eletroeletrônicos em standy by. Economiza em média 12% do consumo doméstico de energia elétrica",
    "Diminua custos de limpeza, adotando produtos biodegradáveis e receitas caseiras",
    "Transforme coisas velhas em novas com um pouco de criatividade e materiais que tem em casa",
    "Em curtas distâncias deixe o carro na garagem e faça uma caminhada, além de evitar a emissão de gases poluentes, faz bem à saúde",
    "Andar de bicicleta também gasta calorias e poupa a natureza",
];

const getRandomTips = (allTips: string[], count: number) => {
  const shuffled = allTips.sort(() => 0.5 - Math.random()); // Embaralha a lista
  return shuffled.slice(0, count); // Seleciona apenas `count` dicas
};

const SustainabilityTipsScreen = () => {
  const [tips, setTips] = useState<string[]>([]);

  useEffect(() => {
    const randomTips = getRandomTips(allTips, 5);
    setTips(randomTips);
  }, []); 

  const refreshTips = () => {
    const randomTips = getRandomTips(allTips, 5);
    setTips(randomTips);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Dicas Sustentáveis</Text>
        {tips.map((tip, index) => (
          <Text key={index} style={styles.tip}>{`${index + 1}. ${tip}`}</Text>
        ))}
        <TouchableOpacity onPress={refreshTips}>
          <Text style={styles.updateTips}>Atualizar Dicas</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SustainabilityTipsScreen;