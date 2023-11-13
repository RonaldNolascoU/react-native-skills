import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Title } from 'react-native-paper';
import { logoutUser } from 'services/FirebaseService';

function ExerciseSelectionScreen({ navigation }) {

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.navigate('Login')
    } catch (error) {
      console.log({error})
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('DrAmayaClinic')}
            style={styles.button}
          >
            Dr. Amaya Clinic
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('IPLookup')}
            style={styles.button}
          >
            IP Lookup
          </Button>

          <Button
            mode="contained"
            onPress={() => navigation.navigate('TeamList')}
            style={styles.button}
          >
            Team Management
          </Button>
          
          {/* Logout  */}
          <Button
            mode='outlined'
            onPress={() => handleLogout()}
            style={styles.button}
          >
            Logout
          </Button>

        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    elevation: 4,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default ExerciseSelectionScreen;
