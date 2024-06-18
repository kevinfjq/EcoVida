import React, { useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { fontFamily } from "@/src/styles/fontFamily";
import Accordion from 'react-native-collapsible/Accordion';

const styles = StyleSheet.create({
    title: {
      fontFamily: fontFamily.pmedium,
      fontSize: 20,
      marginBottom: 10,
      marginTop: 10,
      textAlign: 'center',
    },
    header: {
      backgroundColor: '#b5e48c',
      padding: 10,
      borderWidth: 5,
      borderColor: '#D3A9F4',
    },
    headerText: {
      fontSize: 16,
      fontWeight: '500',
    },
    content: {
      padding: 20,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: 200,
      marginBottom: 10,
      borderColor: '#b5e48c', 
      borderWidth: 5
    },
    paragraph: {
      fontSize: 16,
      fontFamily: fontFamily.pregular,
      textAlign: 'justify',
      lineHeight: 26,
    },
    bold: {
      fontFamily: fontFamily.pbold,
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 10,
    },
    contentContainer: {
      width: '100%',
      alignItems: 'center',
    },
  });
  
  interface Section {
    title: string;
    content: string;
    subtitle1: string;
    subtitle2: string;
    image?: any;
  }
  
  const SECTIONS: Section[] = [
    {
      title: 'Preço é a principal barreira para a prática da sustentabilidade no Brasil, aponta pesquisa do Instituto Akatu',
      subtitle1: 'Para 57% dos brasileiros, viver de uma maneira mais saudável e sustentável é “muito caro”',
      content: '    O Instituto Akatu alerta para a necessidade de democratização do acesso a produtos e serviços mais sustentáveis no país. De acordo com a pesquisa Vida Saudável e Sustentável 2023, realizada pelo Akatu e GlobeScan, o preço é a maior barreira para a adoção de estilos de vida com melhor impacto para as pessoas e para o meio ambiente: 57% dos brasileiros dizem que viver de forma mais sustentável é “muito caro” — contra 49% da média global de 31 países mapeados pelo estudo. Para Felipe Seffrin, coordenador de comunicação do Instituto Akatu, essa percepção de que produtos sustentáveis são mais caros é uma visão limitada da sustentabilidade. “Praticar o consumo consciente pode significar economia direta no bolso, ao evitarmos desperdícios de água, de energia e de alimentos, por exemplo, ou quando deixamos de comprar itens supérfluos”, explica o especialista da organização que atua há duas décadas pela mobilização de indivíduos e empresas para o consumo consciente e a sustentabilidade. Além de ampliar a oferta e o acesso a produtos mais saudáveis e sustentáveis, como alimentos com menos agrotóxicos, produtos mais duráveis, opções com menos embalagens e itens feitos a partir de matérias-primas recicladas ou recicláveis, é importante trabalhar a percepção dos benefícios da sustentabilidade para todos. “Quando o consumidor têm mais acesso à informação e aos benefícios socioambientais embutidos no preço, ele tem maior probabilidade de fazer melhores escolhas”, afirma Felipe Seffrin. O Instituto Akatu reforça que o consumidor precisa observar diferentes ângulos ao fazer uma compra: à primeira vista um produto mais durável pode ser mais caro que um produto descartável, mas evita compras recorrentes e gera menos resíduos. Da mesma forma, produtos mais sustentáveis podem ter preço mais elevado que outras opções, mas representam menos impactos negativos ao meio ambiente, como emissões de gases poluentes e desperdícios de matérias-primas que, no final das contas, protegem a natureza e beneficiam o próprio consumidor. A Pesquisa Vida Saudável e Sustentável 2023 também mapeou que outras barreiras importantes para o consumo consciente e a prática da sustentabilidade no país são a falta de apoio do governo e das empresas, respectivamente para 49% e 40% dos respondentes. Outro empecilho está na falta de informação: 28% dos brasileiros afirmam não saber como viver de uma maneira que seja boa para si, para outras pessoas e para o meio ambiente — índice que aumenta para 34% entre os jovens da Geração Z, nascidos a partir de 2000. De acordo com Felipe Seffrin, em um país com tantos desafios sociais como o Brasil é natural que exista essa percepção elitizada da sustentabilidade ou um distanciamento da temática. “O consumo consciente pode ser praticado por todos, com benefícios diretos no bolso e na saúde”, explica. “Precisamos aproximar o tema das pessoas e mobilizar governos e empresas por mais educação, informação e transparência quando falamos de sustentabilidade. Assim, o preço na etiqueta ganha outro significado.” A Pesquisa Vida Saudável e Sustentável 2023 foi desenvolvida pela parceria entre Instituto Akatu e a GlobeScan e contou com o patrocínio de Ambev, Asics, Assaí Atacadista, Mercado Livre, PepsiCo, RaiaDrogasil e Unilever e apoio institucional de PwC e WWF-Brasil.',
      subtitle2: 'Tudo é uma questão de ponto de vista',
      image: require('../assets/images/slides/sol.jpg'),
    },
    {
      title: 'Litoral brasileiro foi o mais afetado por aumento do nível dos mares, diz estudo da Organização Meteorológica Mundial (OMN)',
      subtitle1: 'De acordo com o levantamento “O Estado do Clima na América Latina e no Caribe em 2023”, degelo de calotas polares é o responsável pela elevação do nível oceânico',
      content: '“O Estado do Clima na América Latina e no Caribe em 2023″ , estudo realizado pela Organização Meteorológica Mundial (OMN), aponta que o ano passado ficou marcado pelo recorde de temperatura e pela maior elevação dos mares já registrada, com destaque para trechos da faixa litorânea brasileira. De acordo com o professor do Instituto de Energia e Ambiente Universidade de São Paulo (IEE-USP), Michel Michaelovitch Mahiques, o aquecimento do planeta é responsável pela subida absoluta do nível do mar, na medida em que ocorre o degelo das calotas. “Analogamente, nos períodos glaciais, a água fica aprisionada nas calotas e o nível absoluto diminui. Mas, o que é importante observar é que, na maioria das vezes, o que se mede, na linha de costa, é o nível do mar relativo que, além de considerar o volume de água, também a movimentação da crosta terrestre, dentro de outros fatores”. O especialista explica que, em muitos casos, a erosão da linha da costa acompanha a subida do nível do mar. Os processos de subida e descida do nível do mar acompanham variações astronômicas, em escalas de dezenas a centenas de milhares de anos, conhecidas como variáveis de Milankovitch. “O que acontece é que, sobre as variáveis de Milankovitch, nos últimos 200 anos, aproximadamente, a ação humana tem introduzido os chamados gases estufa, na atmosfera, o que tem levado a um aumento da temperatura média do planeta e, portanto, à tendência de subida do nível do mar”. A ocorrência do nível vem provocando efeitos negativos em países como Bangladesh. Superpovoado e com considerável parte do território localizado próximo ao nível do mar, o local sofre com a erosão a salinização dos poços de água e a necessidade de deslocamento de uma parcela maciça da população. Além de contar com características de relevos diferentes nos 270 municípios costeiros e que respondem de formas únicas às variações relativas do nível do mar, o Brasil não contempla de políticas que favoreçam à preservação da faixa litorânea contra processos erosivos costeiros e que, aliados às mudanças climáticas afetam seu estado inicial. O evento afeta, ainda, a infraestrutura viária próximas às praias. “Muito importante, também, é que, dependendo do relevo, haverá o desaparecimento de manguezais, que são um bioma importantíssimo no ciclo de vida de muitas espécies”, alerta o professor do IEE.',
      subtitle2: 'Brasil registra maior alta do nível do mar ',  
      image: require('../assets/images/slides/agua.jpg'),
    },
    {
        title: 'Preço é a principal barreira para a prática da sustentabilidade no Brasil, aponta pesquisa do Instituto Akatu',
        subtitle1: 'Para 57% dos brasileiros, viver de uma maneira mais saudável e sustentável é “muito caro”',
        content: '    O Instituto Akatu alerta para a necessidade de democratização do acesso a produtos e serviços mais sustentáveis no país. De acordo com a pesquisa Vida Saudável e Sustentável 2023, realizada pelo Akatu e GlobeScan, o preço é a maior barreira para a adoção de estilos de vida com melhor impacto para as pessoas e para o meio ambiente: 57% dos brasileiros dizem que viver de forma mais sustentável é “muito caro” — contra 49% da média global de 31 países mapeados pelo estudo. Para Felipe Seffrin, coordenador de comunicação do Instituto Akatu, essa percepção de que produtos sustentáveis são mais caros é uma visão limitada da sustentabilidade. “Praticar o consumo consciente pode significar economia direta no bolso, ao evitarmos desperdícios de água, de energia e de alimentos, por exemplo, ou quando deixamos de comprar itens supérfluos”, explica o especialista da organização que atua há duas décadas pela mobilização de indivíduos e empresas para o consumo consciente e a sustentabilidade. Além de ampliar a oferta e o acesso a produtos mais saudáveis e sustentáveis, como alimentos com menos agrotóxicos, produtos mais duráveis, opções com menos embalagens e itens feitos a partir de matérias-primas recicladas ou recicláveis, é importante trabalhar a percepção dos benefícios da sustentabilidade para todos. “Quando o consumidor têm mais acesso à informação e aos benefícios socioambientais embutidos no preço, ele tem maior probabilidade de fazer melhores escolhas”, afirma Felipe Seffrin. O Instituto Akatu reforça que o consumidor precisa observar diferentes ângulos ao fazer uma compra: à primeira vista um produto mais durável pode ser mais caro que um produto descartável, mas evita compras recorrentes e gera menos resíduos. Da mesma forma, produtos mais sustentáveis podem ter preço mais elevado que outras opções, mas representam menos impactos negativos ao meio ambiente, como emissões de gases poluentes e desperdícios de matérias-primas que, no final das contas, protegem a natureza e beneficiam o próprio consumidor. A Pesquisa Vida Saudável e Sustentável 2023 também mapeou que outras barreiras importantes para o consumo consciente e a prática da sustentabilidade no país são a falta de apoio do governo e das empresas, respectivamente para 49% e 40% dos respondentes. Outro empecilho está na falta de informação: 28% dos brasileiros afirmam não saber como viver de uma maneira que seja boa para si, para outras pessoas e para o meio ambiente — índice que aumenta para 34% entre os jovens da Geração Z, nascidos a partir de 2000. De acordo com Felipe Seffrin, em um país com tantos desafios sociais como o Brasil é natural que exista essa percepção elitizada da sustentabilidade ou um distanciamento da temática. “O consumo consciente pode ser praticado por todos, com benefícios diretos no bolso e na saúde”, explica. “Precisamos aproximar o tema das pessoas e mobilizar governos e empresas por mais educação, informação e transparência quando falamos de sustentabilidade. Assim, o preço na etiqueta ganha outro significado.” A Pesquisa Vida Saudável e Sustentável 2023 foi desenvolvida pela parceria entre Instituto Akatu e a GlobeScan e contou com o patrocínio de Ambev, Asics, Assaí Atacadista, Mercado Livre, PepsiCo, RaiaDrogasil e Unilever e apoio institucional de PwC e WWF-Brasil.',
        subtitle2: 'Tudo é uma questão de ponto de vista',
        image: require('../assets/images/slides/sol.jpg'),
      },
      {
        title: 'Litoral brasileiro foi o mais afetado por aumento do nível dos mares, diz estudo da Organização Meteorológica Mundial (OMN)',
        subtitle1: 'De acordo com o levantamento “O Estado do Clima na América Latina e no Caribe em 2023”, degelo de calotas polares é o responsável pela elevação do nível oceânico',
        content: '“O Estado do Clima na América Latina e no Caribe em 2023″ , estudo realizado pela Organização Meteorológica Mundial (OMN), aponta que o ano passado ficou marcado pelo recorde de temperatura e pela maior elevação dos mares já registrada, com destaque para trechos da faixa litorânea brasileira. De acordo com o professor do Instituto de Energia e Ambiente Universidade de São Paulo (IEE-USP), Michel Michaelovitch Mahiques, o aquecimento do planeta é responsável pela subida absoluta do nível do mar, na medida em que ocorre o degelo das calotas. “Analogamente, nos períodos glaciais, a água fica aprisionada nas calotas e o nível absoluto diminui. Mas, o que é importante observar é que, na maioria das vezes, o que se mede, na linha de costa, é o nível do mar relativo que, além de considerar o volume de água, também a movimentação da crosta terrestre, dentro de outros fatores”. O especialista explica que, em muitos casos, a erosão da linha da costa acompanha a subida do nível do mar. Os processos de subida e descida do nível do mar acompanham variações astronômicas, em escalas de dezenas a centenas de milhares de anos, conhecidas como variáveis de Milankovitch. “O que acontece é que, sobre as variáveis de Milankovitch, nos últimos 200 anos, aproximadamente, a ação humana tem introduzido os chamados gases estufa, na atmosfera, o que tem levado a um aumento da temperatura média do planeta e, portanto, à tendência de subida do nível do mar”. A ocorrência do nível vem provocando efeitos negativos em países como Bangladesh. Superpovoado e com considerável parte do território localizado próximo ao nível do mar, o local sofre com a erosão a salinização dos poços de água e a necessidade de deslocamento de uma parcela maciça da população. Além de contar com características de relevos diferentes nos 270 municípios costeiros e que respondem de formas únicas às variações relativas do nível do mar, o Brasil não contempla de políticas que favoreçam à preservação da faixa litorânea contra processos erosivos costeiros e que, aliados às mudanças climáticas afetam seu estado inicial. O evento afeta, ainda, a infraestrutura viária próximas às praias. “Muito importante, também, é que, dependendo do relevo, haverá o desaparecimento de manguezais, que são um bioma importantíssimo no ciclo de vida de muitas espécies”, alerta o professor do IEE.',
        subtitle2: 'Brasil registra maior alta do nível do mar ',  
        image: require('../assets/images/slides/agua.jpg'),
      },
  ];
export default function ArticlesHome() {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const renderHeader = (section: Section, _: number, isActive: boolean) => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const renderContent = (section: Section, _: number, isActive: boolean) => {
    return (
      <View style={styles.content}>
        {section.image && <Image source={section.image} style={styles.image} />}
        <Text style={styles.bold}>{section.subtitle1}</Text>
        <Text style={styles.paragraph}>{section.content}</Text>
        <Text style={styles.bold}>{section.subtitle2}</Text>
      </View>
    );
  };

  const updateSections = (activeSections: number[]) => {
    setActiveSections(activeSections);
  };

  return (
    <ScrollView>
        <View>
        <View>
            <Text style={styles.title}>Artigos Principais</Text>
        </View>
        <View>
            <Accordion
            sections={SECTIONS}
            activeSections={activeSections}
            renderHeader={renderHeader}
            renderContent={renderContent}
            onChange={updateSections}
            />
        </View>
        </View>
  </ScrollView>
    
  );
}
