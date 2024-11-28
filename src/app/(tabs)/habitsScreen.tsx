// src/screens/HabitsScreen.tsx

import React, { useState } from "react";
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
import { Ionicons } from '@expo/vector-icons'; // Importação de ícones
import { fontFamily } from "@/src/styles/fontFamily";
import { colors } from "@/src/styles/colors"; // Certifique-se de que o objeto colors está corretamente definido
import { Calendar, LocaleConfig } from 'react-native-calendars'; // Importação do calendário com LocaleConfig
import { ProgressBar } from 'react-native-paper';
import { FIREBASE_AUTH } from "@/firebaseConfig";

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
  id: number;
  text: string;
  completed: boolean;
}

const HabitsScreen: React.FC = () => {
  const user = FIREBASE_AUTH.currentUser;
  const [habits, setHabits] = useState<HabitItem[]>([]);
  const [inputText, setInputText] = useState('');
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});
  const [tasksPerDate, setTasksPerDate] = useState<{ [key: string]: number }>({});

  // Função para adicionar um novo hábito
  const addHabit = () => {
    if (inputText.trim() !== '') {
      const newHabit: HabitItem = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };
      setHabits([...habits, newHabit]);
      setInputText('');
    }
  };

  // Função para remover um hábito
  const removeHabit = (id: number) => {
    Alert.alert(
      "Remover Hábito",
      "Tem certeza de que deseja remover este hábito?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            const updatedHabits = habits.filter(habit => habit.id !== id);
            setHabits(updatedHabits);
          }
        }
      ],
      { cancelable: true }
    );
  };

  // Função para alternar o estado de conclusão de um hábito
  const toggleHabit = (id: number) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === id) {
        const updatedHabit = { ...habit, completed: !habit.completed };
        // Atualizar as tarefas por data
        const today = new Date().toISOString().split('T')[0];
        const updatedTasks = updatedHabit.completed
          ? (tasksPerDate[today] || 0) + 1
          : (tasksPerDate[today] || 1) - 1;
        setTasksPerDate(prev => ({
          ...prev,
          [today]: updatedTasks > 0 ? updatedTasks : 0,
        }));
        // Atualizar as datas marcadas com base na conclusão do hábito
        setMarkedDates(prevDates => ({
          ...prevDates,
          [today]: {
            marked: updatedTasks > 0,
            dotColor: updatedTasks > 0 ? colors.green['200'] : undefined,
          },
        }));
        return updatedHabit;
      }
      return habit;
    });
    setHabits(updatedHabits);
  };

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
      {/* Cabeçalho Inlined */}
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
            keyExtractor={(item) => item.id.toString()}
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
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 10,
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
