
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Platform,} from 'react-native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function HomeScreen() {
  const [enviando, setEnviando] = useState(false);
  async function enviarNotificacao() { try { setEnviando(true);
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } =await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
         Alert.alert( 'Permissão necessária', 'Autorize as notificações nas configurações do dispositivo.' );
        return;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Notificações',
          importance: Notifications.AndroidImportance.HIGH,
        });
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Receba sua Notificação',"Se a educação sozinha não transforma a sociedade, sem ela tampouco a sociedade muda.- Paulo Freire"',
          sound: true,
        },
        trigger: null,
      });

     
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível enviar a notificação.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <Text style={styles.description}> Clique no botão para receber uma notificação. </Text>
      <TouchableOpacity style={styles.button} onPress={enviarNotificacao} disabled={enviando} >
     <Text style={styles.buttonText}>  {enviando ? 'Enviando...' : 'Enviar notificação'} </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
