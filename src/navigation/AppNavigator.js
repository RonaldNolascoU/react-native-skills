import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/LoginScreen';
import SignupScreen from 'screens/SignupScreen';
import ExerciseSelectionScreen from 'screens/ExerciseSelectionScreen';
import DrAmayaClinicScreen from 'screens/DrAmayaClinicScreen';
import PatientDataScreen from 'screens/PatientDataScreen';
import IPLookupScreen from 'screens/IPLookupScreen';
import TeamManagementScreen from 'screens/TeamManagementScreen';
import TeamListScreen from 'screens/TeamListScreen';
// import PatientDataScreen from '../screens/PatientDataScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ExerciseSelection" component={ExerciseSelectionScreen} options={{ headerBackTitleVisible: false, headerLeft: null, gestureEnabled: false, title: 'Selección de Ejercicio'}} />
      <Stack.Screen name="DrAmayaClinic" component={DrAmayaClinicScreen} options={{ title: 'Clínica del Dr. Amaya'}} />
      <Stack.Screen name="PatientData" component={PatientDataScreen} options={{ title: 'Resultados del Paciente'}} />
      <Stack.Screen name="IPLookup" component={IPLookupScreen} options={{ title: 'Datos de IP'}} />
      <Stack.Screen name="TeamList" component={TeamListScreen} options={{ title: 'Equipos'}} />
      <Stack.Screen name="TeamManagement" component={TeamManagementScreen} options={{ title: 'Registro de Equipos'}} />

      {/* Define other screens and navigation here */}
    </Stack.Navigator>
  );
}

export default AppNavigator;
