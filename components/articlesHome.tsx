import React, { useState } from "react";
import { Text, StyleSheet, View, Image, ScrollView, Linking } from "react-native";
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
      backgroundColor: '#dde7c7',
      padding: 10,
      borderWidth: 5,
      borderColor: '#D3A9F4',
      marginBottom:20,
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
    link: string;
  }
  
  const SECTIONS: Section[] = [
    {
      title: 'Preço é a principal barreira para a prática da sustentabilidade no Brasil, aponta pesquisa do Instituto Akatu',
      subtitle1: 'Para 57% dos brasileiros, viver de uma maneira mais saudável e sustentável é “muito caro”',
      content: '    O Instituto Akatu alerta para a necessidade de democratização do acesso a produtos e serviços mais sustentáveis no país. De acordo com a pesquisa Vida Saudável e Sustentável 2023, realizada pelo Akatu e GlobeScan, o preço é a maior barreira para a adoção de estilos de vida com melhor impacto para as pessoas e para o meio ambiente: 57% dos brasileiros dizem que viver de forma mais sustentável é “muito caro” — contra 49% da média global de 31 países mapeados pelo estudo. Para Felipe Seffrin, coordenador de comunicação do Instituto Akatu, essa percepção de que produtos sustentáveis são mais caros é uma visão limitada da sustentabilidade. “Praticar o consumo consciente pode significar economia direta no bolso, ao evitarmos desperdícios de água, de energia e de alimentos, por exemplo, ou quando deixamos de comprar itens supérfluos”, explica o especialista da organização que atua há duas décadas pela mobilização de indivíduos e empresas para o consumo consciente e a sustentabilidade. Além de ampliar a oferta e o acesso a produtos mais saudáveis e sustentáveis, como alimentos com menos agrotóxicos, produtos mais duráveis, opções com menos embalagens e itens feitos a partir de matérias-primas recicladas ou recicláveis, é importante trabalhar a percepção dos benefícios da sustentabilidade para todos. “Quando o consumidor têm mais acesso à informação e aos benefícios socioambientais embutidos no preço, ele tem maior probabilidade de fazer melhores escolhas”, afirma Felipe Seffrin. O Instituto Akatu reforça que o consumidor precisa observar diferentes ângulos ao fazer uma compra: à primeira vista um produto mais durável pode ser mais caro que um produto descartável, mas evita compras recorrentes e gera menos resíduos. Da mesma forma, produtos mais sustentáveis podem ter preço mais elevado que outras opções, mas representam menos impactos negativos ao meio ambiente, como emissões de gases poluentes e desperdícios de matérias-primas que, no final das contas, protegem a natureza e beneficiam o próprio consumidor. A Pesquisa Vida Saudável e Sustentável 2023 também mapeou que outras barreiras importantes para o consumo consciente e a prática da sustentabilidade no país são a falta de apoio do governo e das empresas, respectivamente para 49% e 40% dos respondentes. Outro empecilho está na falta de informação: 28% dos brasileiros afirmam não saber como viver de uma maneira que seja boa para si, para outras pessoas e para o meio ambiente — índice que aumenta para 34% entre os jovens da Geração Z, nascidos a partir de 2000. De acordo com Felipe Seffrin, em um país com tantos desafios sociais como o Brasil é natural que exista essa percepção elitizada da sustentabilidade ou um distanciamento da temática. “O consumo consciente pode ser praticado por todos, com benefícios diretos no bolso e na saúde”, explica. “Precisamos aproximar o tema das pessoas e mobilizar governos e empresas por mais educação, informação e transparência quando falamos de sustentabilidade. Assim, o preço na etiqueta ganha outro significado.” A Pesquisa Vida Saudável e Sustentável 2023 foi desenvolvida pela parceria entre Instituto Akatu e a GlobeScan e contou com o patrocínio de Ambev, Asics, Assaí Atacadista, Mercado Livre, PepsiCo, RaiaDrogasil e Unilever e apoio institucional de PwC e WWF-Brasil.',
      subtitle2: 'Tudo é uma questão de ponto de vista',
      image: require('../assets/images/articles/artigo1.jpg'),
      link: 'https://ecoaliza.com.br/estilo-de-vida/preco-e-a-principal-barreira-para-a-pratica-da-sustentabilidade-no-brasil-aponta-pesquisa-do-instituto-akatu/',
    },
    {
      title: 'Litoral brasileiro foi o mais afetado por aumento do nível dos mares, diz estudo da Organização Meteorológica Mundial (OMN)',
      subtitle1: 'De acordo com o levantamento “O Estado do Clima na América Latina e no Caribe em 2023”, degelo de calotas polares é o responsável pela elevação do nível oceânico',
      content: '“O Estado do Clima na América Latina e no Caribe em 2023″ , estudo realizado pela Organização Meteorológica Mundial (OMN), aponta que o ano passado ficou marcado pelo recorde de temperatura e pela maior elevação dos mares já registrada, com destaque para trechos da faixa litorânea brasileira. De acordo com o professor do Instituto de Energia e Ambiente Universidade de São Paulo (IEE-USP), Michel Michaelovitch Mahiques, o aquecimento do planeta é responsável pela subida absoluta do nível do mar, na medida em que ocorre o degelo das calotas. “Analogamente, nos períodos glaciais, a água fica aprisionada nas calotas e o nível absoluto diminui. Mas, o que é importante observar é que, na maioria das vezes, o que se mede, na linha de costa, é o nível do mar relativo que, além de considerar o volume de água, também a movimentação da crosta terrestre, dentro de outros fatores”. O especialista explica que, em muitos casos, a erosão da linha da costa acompanha a subida do nível do mar. Os processos de subida e descida do nível do mar acompanham variações astronômicas, em escalas de dezenas a centenas de milhares de anos, conhecidas como variáveis de Milankovitch. “O que acontece é que, sobre as variáveis de Milankovitch, nos últimos 200 anos, aproximadamente, a ação humana tem introduzido os chamados gases estufa, na atmosfera, o que tem levado a um aumento da temperatura média do planeta e, portanto, à tendência de subida do nível do mar”. A ocorrência do nível vem provocando efeitos negativos em países como Bangladesh. Superpovoado e com considerável parte do território localizado próximo ao nível do mar, o local sofre com a erosão a salinização dos poços de água e a necessidade de deslocamento de uma parcela maciça da população. Além de contar com características de relevos diferentes nos 270 municípios costeiros e que respondem de formas únicas às variações relativas do nível do mar, o Brasil não contempla de políticas que favoreçam à preservação da faixa litorânea contra processos erosivos costeiros e que, aliados às mudanças climáticas afetam seu estado inicial. O evento afeta, ainda, a infraestrutura viária próximas às praias. “Muito importante, também, é que, dependendo do relevo, haverá o desaparecimento de manguezais, que são um bioma importantíssimo no ciclo de vida de muitas espécies”, alerta o professor do IEE.',
      subtitle2: 'Brasil registra maior alta do nível do mar ',  
      image: require('../assets/images/articles/artigo2.jpg'),
      link:'https://ecoaliza.com.br/meio-ambiente/litoral-brasileiro-foi-o-mais-afetado-por-aumento-do-nivel-dos-mares-diz-estudo-da-organizacao-meteorologica-mundial-omn/',
    },
    {
        title: 'Penalty reaproveita aproximadamente 2 milhões de garrafas pet na produção de sua linha Ecoknit',
        subtitle1: 'Empresa produz diversos produtos por meio de plástico reciclável e segue sendo exemplo de avanço sustentável em seu setor  ',
        content: '    Lançada em 2018, a linha Ecoknit, desenvolvida pela Penalty, marca 100% brasileira de artigos esportivos, continua expandindo e sendo exemplo de sustentabilidade em seu setor de atuação. A coleção é atualmente responsável pelo reaproveitamento de quase 2 milhões de garrafas pet. Desde o ano de seu lançamento, a linha já conta com mais de 10 produtos, incluindo bolas, meias, acessórios, tênis para futsal e chuteiras para campo e society. Em destaque, está a bola S11 Ecoknit, considerada a mais sustentável do mundo e detentora do selo máximo de qualidade Fifa (FIFA Quality Pro). Um novo modelo, nas cores vermelha e branca, com ilustrações 2D em seu design, foi lançado recentemente para as competições de futebol deste ano, sendo usado nos campeonatos Paulista e Carioca. Alguns números chamam a atenção: para se produzir uma bola S11, 62% de seus materiais é sustentável, incluindo insumos provenientes da cana-de-açúcar e cerca de quatro unidades de garrafas pet por bola. Já para uma chuteira, é preciso uma unidade. Com uma garrafa e meia, é possível fazer 1 metro quadrado de tecido, que se transforma em cinco pares de meia. Até o momento, a iniciativa já foi responsável pela fabricação de mais de um milhão de itens produzidos por meio dessa tecnologia sustentável. Todo o processo de produção ocorre inteiramente em solo brasileiro, nas cidades de Itabuna e Itajuípe, na Bahia, e Bayeux, na Paraíba. Com essa linha, a marca reforça seu compromisso com o desenvolvimento sustentável e tecnológico, como afirma o Gerente de P&D da Penalty, Alexandre Marcus Allgayer: “É uma marca expressiva e que fortalece o nosso trabalho em prol da preservação. O grande diferencial da linha Ecoknit é conseguir oferecer um produto que traz sustentabilidade, conforto, qualidade e durabilidade para a alta performance. É um desafio complexo, mas que tem gerado um resultado positivo para a empresa, para os clientes e para o meio ambiente”.',
        subtitle2: 'Tudo é uma questão de ponto de vista',
        image: require('../assets/images/articles/artigo3.jpg'),
        link:'https://ecoaliza.com.br/economia-circular/penalty-reaproveita-aproximadamente-2-milhoes-de-garrafas-pet-na-producao-de-sua-linha-ecoknit/',
      },
      {
        title: 'Brasil é responsável por 3,44 milhões de toneladas de plástico que chegam aos oceanos',
        subtitle1: 'Estima-se que o acumulado varie de 86 a 150 toneladas de componentes, com destaque para materiais sólidos fabricados ou transformados (plástico, filtros de cigarro, vidro, metal e madeira)',
        content: 'No mês de junho, comemora-se a campanha de conscientização Junho Verde, voltada para a preservação do meio ambiente por meio de práticas sustentáveis. Segundo estudo do Blue Keepers, projeto ligado ao Pacto Global das Nações Unidas (ONU), o Brasil é responsável por 3,44 milhões de toneladas de plástico que chegam aos oceanos. Do total, estima-se que o acumulado varie de 86 a 150 toneladas de componentes, com destaque para materiais sólidos fabricados ou transformados (plástico, filtros de cigarro, vidro, metal e madeira). Os dados foram apresentados no litoral de São Paulo, em Santos, e reforçaram a preocupação com a pauta ambiental. A pesquisa, feita entre julho de 2021 e abril de 2022, demonstrou que 33% do plástico que entra em solo brasileiro pode acabar no oceano. Na pesquisa, outro recorte interessante mostra a origem desses resíduos. 80% vêm  de atividades do continente, enquanto apenas 20% vêm de atividades marítimas, como a pesca e transportes marítimos. Reduzir a produção e consumo de resíduos plásticos é uma das principais estratégias para diminuir esse número, é o que diz o vereador Xexéu Tripoli. Segundo o político, é extremamente importante que o poder público tome atitudes que incentivem as práticas sustentáveis, em todo o mundo: “Esse fato mostra a importância do país ou município quanto  ao meio ambiente. Deve, também, adotar práticas para conscientizar  o mal uso do plástico. Com o passar dos anos a expectativa é de que isso se amplie para todo o país e para o mundo”. Em 2019, por exemplo, o vereador viabilizou a assinatura do município de São Paulo, na época, tendo como prefeito Bruno Covas, ao Compromisso Global da Nova Economia do Plástico – até então o maior plano de ações para reverter a crise do consumo de plástico no planeta, liderado pela ONU Meio Ambiente e pela Fundação Ellen MacArthur. O acordo tem como meta estimular a eliminação de embalagens desnecessárias e realizar compras sustentáveis. No mesmo ano, a Lei do Canudo (17.123/2019), proposta pelo vereador, foi aprovada pela Câmara, proibindo o fornecimento de canudos confeccionados em material plástico nos locais que especifica. O político também é autor da Lei  n° 17.261/2020, que proíbe o fornecimento de produtos de plástico de uso único, como copos, pratos, talheres, agitadores para bebidas e varas para balões. A Lei aguarda regulamentação do executivo desde 2021. Para minimizar os danos, em março de 2023, a ONU aprovou um acordo para a criação de um tratado Global da poluição por plástico, considerado “o pacto ambiental mais significativo desde o Acordo de Paris” pela resolução da Assembleia das Nações Unidas para o Meio Ambiente.',
        subtitle2: 'Brasil registra maior alta do nível do mar ',  
        image: require('../assets/images/articles/artigo4.jpg'),
        link:'https://ecoaliza.com.br/meio-ambiente/brasil-e-responsavel-por-344-milhoes-de-toneladas-de-plastico-que-chegam-aos-oceanos/',
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
        {section.link && (
        <Text
          style={[styles.bold, {color: 'blue'}]}
          onPress={() => Linking.openURL(section.link)}
        >
          Leia mais
        </Text>
        )}
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
