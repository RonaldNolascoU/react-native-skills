import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Title } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { loginUser } from 'services/FirebaseService';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await loginUser(email.toLowerCase(), password);
      console.log({response})
      navigation.navigate('ExerciseSelection')
      Toast.show({
        text1: 'Login Successful',
        text2: 'Welcome back!',
        type: 'success',
      });
      setEmail('');
      setPassword('');
      
    } catch (error) {
      console.log({error})
      // Handle login error
      if (error.code === 'auth/invalid-email') {
        Toast.show({
          text1: 'Invalid Email',
          text2: 'Please enter a valid email address.',
          type: 'error',
        });
      }

      if (error.code === 'auth/user-not-found') {
        Toast.show({
          text1: 'User Not Found',
          text2: 'Please check your credentials and try again.',
          type: 'error',
        });
      }


    }
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Title style={styles.title}>Welcome Back!</Title>
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
          <Button 
            mode="contained" 
            onPress={handleLogin} 
            style={styles.button}
          >
            Login
          </Button>
          <Button 
            mode="text" 
            onPress={() => navigation.navigate('Signup')}
            style={styles.buttonText}
          >
            Don't have an account? Sign Up
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

export default LoginScreen;
