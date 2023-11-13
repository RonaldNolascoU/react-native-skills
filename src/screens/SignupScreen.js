import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { registerUser } from 'services/FirebaseService';

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');p
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {

      if (password !== confirmPassword) {
        Toast.show({
          text1: 'Passwords Do Not Match',
          text2: 'Please check your passwords and try again.',
          type: 'error',
        });
        return;
      }

        const response = await registerUser(email.toLowerCase(), password);
        console.log({response})
        navigation.navigate('ExerciseSelection')
        Toast.show({
          text1: 'Account Created',
          text2: 'Welcome!',
          type: 'success',
        });
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } catch (error) {
        console.log({error})
        // Handle login error
      }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title style={styles.title}>Create Account</Title>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />
          <Button 
            mode="contained" 
            onPress={handleSignUp} 
            style={styles.button}
          >
            Sign Up
          </Button>
          <Button 
            mode="text" 
            onPress={() => navigation.goBack()}
            style={styles.buttonText}
          >
            Already have an account? Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    marginTop: 10,
  },
});

export default SignupScreen;
