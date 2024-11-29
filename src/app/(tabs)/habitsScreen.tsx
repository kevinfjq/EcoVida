import React, { useState, useEffect } from "react";
import Checkbox from 'expo-checkbox';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { fontFamily } from "@/src/styles/fontFamily";
import { colors } from "@/src/styles/colors";
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ProgressBar } from 'react-native-paper';
import { FIREBASE_AUTH, db } from "@/firebaseConfig";
import { collection, doc, addDoc, setDoc, getDoc, updateDoc, deleteDoc, onSnapshot, query, where, Timestamp } from '@firebase/firestore';

// Configuração de Localização para Português Brasileiro
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro','Fevereiro','Março','Abril','Maio','Junho',
    'Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'
  ],
  monthNamesShort: [
    'Jan','Fev','Mar','Abr','Mai','Jun',
    'Jul','Ago','Set','Out','Nov','Dez'
  ],
  dayNames: [
    'Domingo','Segunda-feira','Terça-feira','Quarta-feira',
    'Quinta-feira','Sexta-feira','Sábado'
  ],
  dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'],
  today: 'Hoje'
};
LocaleConfig.defaultLocale = 'pt-br';

interface HabitItem {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: Timestamp | null;
}

const HabitsScreen: React.FC = () => {
  const user = FIREBASE_AUTH.currentUser;
  const [habits, setHabits] = useState<HabitItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [tasksPerDate, setTasksPerDate] = useState<{ [key: string]: number }>({});

  // Função para adicionar um novo hábito
  const addHabit = async () => {
    if (inputText.trim() !== '') {
      try {
        const userId = user?.uid;
        if (!userId) {
          throw new Error('Usuário não autenticado');
        }

        const habitsListRef = doc(db, 'habitsList', userId);
        const habitsListDoc = await getDoc(habitsListRef);
        if (!habitsListDoc.exists()) {
          await setDoc(habitsListRef, {
            userId: userId,
            createdAt: Timestamp.now(),
          });
        }

        await addDoc(collection(db, 'habitsItems'), {
          habitsListId: userId,
          text: inputText,
          completed: false,
          completedAt: null,
          createdAt: Timestamp.now(),
        });

        setInputText('');
      } catch (error) {
        console.error('Erro ao adicionar hábito:', error);
        Alert.alert('Erro', 'Não foi possível adicionar o hábito.');
      }
    }
  };

  // Função para remover um hábito
  const removeHabit = (id: string) => {
    Alert.alert(
      "Remover Hábito",
      "Tem certeza de que deseja remover este hábito?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'habitsItems', id));
            } catch (error) {
              console.error('Erro ao remover hábito:', error);
              Alert.alert('Erro', 'Não foi possível remover o hábito.');
            }
          }
        }
      ],
      { cancelable: true }
    );
  };

  // Função para alternar o estado de conclusão de um hábito
  const toggleHabit = async (id: string) => {
    try {
      const habitRef = doc(db, 'habitsItems', id);
      const habitDoc = await getDoc(habitRef);
      if (habitDoc.exists()) {
        const habitData = habitDoc.data();
        const newCompletedState = !habitData?.completed;

        await updateDoc(habitRef, {
          completed: newCompletedState,
          completedAt: newCompletedState ? Timestamp.now() : null,
        });
      }
    } catch (error) {
      console.error('Erro ao atualizar hábito:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o hábito.');
    }
  };

  // Carregar os hábitos do Firestore quando a tela for montada
  useEffect(() => {
    const userId = user?.uid;
    if (!userId) {
      return;
    }

    const q = query(collection(db, 'habitsItems'), where('habitsListId', '==', userId));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const habitsData: HabitItem[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        habitsData.push({
          id: doc.id,
          text: data.text,
          completed: data.completed,
          completedAt: data.completedAt,
        });
      });
      setHabits(habitsData);
    }, (error) => {
      console.error('Erro ao obter hábitos:', error);
      Alert.alert('Erro', 'Não foi possível carregar os hábitos.');
    });

    return () => unsubscribe();
  }, []);

  // Recalcular tasksPerDate e markedDates sempre que 'habits' mudar
  useEffect(() => {
    const newTasksPerDate: { [key: string]: number } = {};
    const newMarkedDates: { [key: string]: any } = {};

    habits.forEach((habit) => {
      if (habit.completed && habit.completedAt) {
        const completedDate = habit.completedAt.toDate().toISOString().split('T')[0];
        newTasksPerDate[completedDate] = (newTasksPerDate[completedDate] || 0) + 1;
      }
    });

    Object.keys(newTasksPerDate).forEach((date) => {
      newMarkedDates[date] = {
        marked: true,
        dotColor: colors.green['200'],
      };
    });

    setTasksPerDate(newTasksPerDate);
    setMarkedDates(newMarkedDates);
  }, [habits]);

  // Cálculo da porcentagem de conclusão
  const completionRate = habits.length > 0 ? habits.filter(h => h.completed).length / habits.length : 0;

  // Verifica se todas as tarefas estão concluídas
  const allTasksCompleted = habits.length > 0 && habits.every(habit => habit.completed);

  // Função para formatar a data para dd/MM/YYYY
  const formatDateToBrazilian = (dateString: string): string => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  // Função para tratar a seleção de uma data no calendário
  const handleDayPress = (day: any) => {
    const selectedDate = day.dateString;
    const formattedDate = formatDateToBrazilian(selectedDate);
    const tasks = tasksPerDate[selectedDate] || 0;
    Alert.alert(
      `Data: ${formattedDate}`,
      `Tarefas concluídas: ${tasks}`,
      [{ text: "OK" }],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={
              user && user.photoURL && user.photoURL.trim().length > 0
                ? { uri: user.photoURL }
                : require("@/assets/images/userImageTest.jpg")
            }
            style={styles.userImage}
          />
          <View>
            <Text style={styles.textStyle}>{user ? user.displayName : "Usuário"}</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Calendário */}
        <Text style={styles.calendarTitle}>Seu progresso nas últimas semanas:</Text>
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            theme={{
              selectedDayBackgroundColor: colors.green['200'],
              todayTextColor: colors.purple.default,
              arrowColor: colors.green['200'],
              dotColor: colors.green['200'],
              selectedDotColor: colors.purple.default,
              monthTextColor: colors.purple.default,
              textDayFontFamily: fontFamily.pregular,
              textMonthFontFamily: fontFamily.psemibold,
              textDayHeaderFontFamily: fontFamily.psemibold,
            }}
            style={styles.calendar}
          />
        </View>

        {/* Campo de entrada para adicionar novo hábito */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Adicione um novo hábito"
            placeholderTextColor={colors.gray['200']}
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.addButton} onPress={addHabit}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>

        {/* Lista de hábitos */}
        {habits.length > 0 && (
          <FlatList
            data={habits}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.habitItem}>
                <Checkbox
                  value={item.completed}
                  onValueChange={() => toggleHabit(item.id)}
                  color={item.completed ? colors.green['100'] : undefined}
                />
                <Text style={styles.habitText}>{item.text}</Text>
                <TouchableOpacity onPress={() => removeHabit(item.id)} style={styles.deleteButton}>
                  <Ionicons name="trash-outline" size={20} color="#ce2424" />
                </TouchableOpacity>
              </View>
            )}
            style={styles.habitsList}
          />
        )}

        {/* Barra de progresso */}
        {habits.length > 0 && (
          <View style={styles.progressContainer}>
            <ProgressBar
              progress={completionRate}
              color={colors.green['100']}
              style={styles.progressBar}
            />
            <Text style={styles.progressText}>{Math.round(completionRate * 100)}% concluído hoje</Text>
          </View>
        )}

        {/* Frase motivacional */}
        {allTasksCompleted && (
          <Text style={styles.motivationalText}>Você está no caminho certo!</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: colors.green["100"],
    borderColor: '#000',
    borderWidth: 0.6,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Removemos o 'gap' pois não é suportado no React Native
  },
  userImage: {
    borderWidth: 0.5,
    borderColor: '#9E9E9E', // Cor substituída
    width: 54,
    height: 54,
    borderRadius: 99,
    marginRight: 10, // Adicionado para substituir o 'gap'
  },
  textStyle: {
    color: '#FFFFFF', // Cor substituída
    paddingTop: 5,
    fontFamily: fontFamily.pmedium,
    fontSize: 17,
  },
  content: {
    padding: 20,
  },
  calendarContainer: {
    marginBottom: 20,
    borderRadius: 10,
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    overflow: 'hidden', // Evita que o calendário sobreponha outros componentes
  },
  calendarTitle: {
    fontFamily: fontFamily.psemibold,
    marginBottom: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  calendar: {
    width: '100%',
    // Removemos a altura fixa para que o calendário se ajuste automaticamente
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: colors.gray['100'],
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontFamily: fontFamily.pregular,
    fontSize: 12,
    color: '#000',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: colors.green['100'],
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontFamily: fontFamily.pmedium,
    fontSize: 16,
  },
  habitsList: {
    marginBottom: 20,
  },
  habitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#F5F5F5', // Cor substituída
    borderRadius: 5,
  },
  habitText: {
    marginLeft: 10,
    fontFamily: fontFamily.pregular,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    padding: 5,
  },
  progressContainer: {
    marginBottom: 20,

  },
  progressBar: {
    height: 15,
    borderRadius: 5,
    marginBottom: 5,
  },
  progressText: {
    fontFamily: fontFamily.pmedium,
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
  },
  motivationalText: {
    fontSize: 18,
    textAlign: 'center',
    color: colors.purple.default,
    fontFamily: fontFamily.pbold,
    marginBottom: 20,
  },
});

export default HabitsScreen;
