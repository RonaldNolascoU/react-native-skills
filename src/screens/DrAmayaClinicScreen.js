import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { TextInput, Button, Card, RadioButton, Text } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

function DrAmayaClinicScreen({ navigation }) {
  const [patientData, setPatientData] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    dui: '',
    nit: '',
    birthDate: new Date(),
    mobilePhone: '',
    homePhone: '',
    email: '',
    address: '',
  });

  const isValidName = (name) => /^[a-zA-Z ]+$/.test(name);

const isValidDUI = (dui) => /^\d{8}-\d{1}$/.test(dui);

const isValidNIT = (nit) => /^\d{4}-\d{6}-\d{3}-\d{1}$/.test(nit);

const isValidPhone = (phone) => /^\d{8}$/.test(phone) && (phone.startsWith('6') || phone.startsWith('7'));

const isValidHomePhone = (phone) => /^\d{8}$/.test(phone) && phone.startsWith('2');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


  const setPatientField = (field, value) => {
    setPatientData({ ...patientData, [field]: value });
  };

  const handleSubmit = () => {
    const { firstName, lastName, dui, nit, mobilePhone, homePhone, email } = patientData;

    if (!firstName || !isValidName(firstName)) {
        return alert('Please enter a valid first name');
    }

    if (!lastName || !isValidName(lastName)) {
        return alert('Please enter a valid last name');
    }

    if (!dui || !isValidDUI(dui)) {
        return alert('Please enter a valid DUI');
    }

    if (!nit || !isValidNIT(nit)) {
        return alert('Please enter a valid NIT');
    }

    if (!mobilePhone || !isValidPhone(mobilePhone)) {
        return alert('Please enter a valid mobile phone number');
    }

    if (!homePhone || !isValidHomePhone(homePhone)) {
        return alert('Please enter a valid home phone number');
    }

    if (!email || !isValidEmail(email)) {
        return alert('Please enter a valid email');
    }

    navigation.navigate('PatientData', { patientData });
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || patientData.birthDate;
    setPatientField('birthDate', currentDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Content>
          <TextInput
            label="First Name"
            value={patientData.firstName}
            onChangeText={(text) => setPatientField('firstName', text)}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={patientData.lastName}
            onChangeText={(text) => setPatientField('lastName', text)}
            mode="outlined"
            style={styles.input}
          />
          <RadioButton.Group
            onValueChange={(value) => setPatientField('gender', value)}
            value={patientData.gender}
          >
            <RadioButton.Item label="Male" value="male" />
            <RadioButton.Item label="Female" value="female" />
          </RadioButton.Group>
          <TextInput
            label="DUI (Format: 00000000-0)"
            value={patientData.dui}
            onChangeText={(text) => setPatientField('dui', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            label="NIT (Format: 0000-000000-000-0)"
            value={patientData.nit}
            onChangeText={(text) => setPatientField('nit', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
          />
          <TextInput
            label="Dirección"
            value={patientData.address}
            onChangeText={(text) => setPatientField('nit', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
          />
          <Text>Date of Birth:</Text>
          <DateTimePicker
            style={styles.datePicker}
            value={patientData.birthDate}
            placeholder="Select date"
            onChange={onDateChange}
            maximumDate={new Date()}
          />
          <TextInput
            label="Mobile Phone"
            value={patientData.mobilePhone}
            onChangeText={(text) => setPatientField('mobilePhone', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            />
            <TextInput
            label="Home Phone"
            value={patientData.homePhone}
            onChangeText={(text) => setPatientField('homePhone', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
            />
            <TextInput
            label="Email"
            value={patientData.email}
            onChangeText={(text) => setPatientField('email', text)}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            />
          <Button 
            mode="contained" 
            onPress={handleSubmit} 
            style={styles.button}
          >
            Submit
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  datePicker: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default DrAmayaClinicScreen;
