import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card } from "react-native-paper";

const getAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const m = today.getMonth() - birthDateObj.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }
  return age;
};

const getAgeGroup = (age) => {
  if (age < 6) return "Primera infancia";
  if (age >= 6 && age <= 11) return "Infancia";
  if (age >= 12 && age <= 18) return "Adolescencia";
  if (age >= 19 && age <= 26) return "Juventud";
  if (age >= 27 && age <= 59) return "Adultez";
  return "Persona mayor";
};

function PatientDataScreen({ route }) {
  const { patientData } = route.params;
  const age = getAge(patientData.birthDate);
  const ageGroup = getAgeGroup(age);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Text style={styles.text}>Patient's Age: {age}</Text>
          <Text style={styles.text}>Age Group: {ageGroup}</Text>
          {/* Display additional patient data here if necessary */}
          <Text style={styles.text}>First Name: {patientData.firstName}</Text>
          <Text style={styles.text}>Last Name: {patientData.lastName}</Text>
          <Text style={styles.text}>Gender: {patientData.gender}</Text>
          <Text style={styles.text}>DUI: {patientData.dui}</Text>
          <Text style={styles.text}>NIT: {patientData.nit}</Text>
          <Text style={styles.text}>
            Mobile Phone: {patientData.mobilePhone}
          </Text>
          <Text style={styles.text}>Home Phone: {patientData.homePhone}</Text>
          <Text style={styles.text}>Email: {patientData.email}</Text>
          <Text style={styles.text}>Address: {patientData.address}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default PatientDataScreen;
