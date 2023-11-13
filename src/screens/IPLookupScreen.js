import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, FlatList, Text, Image } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SvgUri } from 'react-native-svg';


const IPLookupScreen = () => {
  const [ip, setIp] = useState('');
  const [ipData, setIpData] = useState(null);
  const [history, setHistory] = useState([]);
  const [time, setTime] = useState(null);

  useEffect(() => {
    let time = getCurrentTime();
    setTime(time);
  }, []);

  const handleLookupIp = async () => {
    try {
      const response = await axios.get(`http://ipwhois.app/json/${ip}`);
      console.log({response: response.data.country_flag})
      setIpData(response.data);

      // Add to history
      const newHistory = [...history, response.data];
      setHistory(newHistory);
      await AsyncStorage.setItem('IP_LOOKUP_HISTORY', JSON.stringify(newHistory));
    } catch (error) {
      console.error(error);
    }
  };

  const loadHistory = async () => {
    const historyData = await AsyncStorage.getItem('IP_LOOKUP_HISTORY');
    if (historyData) {
      setHistory(JSON.parse(historyData));
    }
  };

  const clearHistory = async () => {
    await AsyncStorage.removeItem('IP_LOOKUP_HISTORY');
    setHistory([]);
    setIpData(null);
  };

  const getCurrentTime = () => {
    let today = new Date();
    let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
    let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
  }

  React.useEffect(() => {
    loadHistory();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Content>
          <TextInput
            label="Enter IP Address"
            value={ip}
            onChangeText={setIp}
            mode="outlined"
            style={styles.input}
            keyboardType="numeric"
          />
          <Button mode="contained" onPress={handleLookupIp} style={styles.button}>
            Lookup IP
          </Button>

          {ipData && (
            <View style={styles.resultsContainer}>
              {/* Display the IP details */}
              <Text>Type of IP: {ipData.type}</Text>
              <Text>Continent: {ipData.continent}</Text>
              <Text>Country: {ipData.country}</Text>
              <Text>Country Code: {ipData.country_code}</Text>
              <Text>Region: {ipData.region}</Text>
              <Text>City: {ipData.city}</Text>
              <Text>Country Capital: {ipData.country_capital}</Text>
              <Text>Country Flag: </Text>
              <SvgUri uri={ipData.country_flag}  />
              <Text>Time: {time}</Text>
              <Text>Connection Data: {ipData.org} - {ipData.isp}</Text>
            </View>
          )}
          {/* Add title "Requests" */}
          <Text style={styles.requests}>Requests</Text>

          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text>{item.ip} - {item.country}</Text>
            )}
          />

          <Button mode="outlined" onPress={clearHistory} style={styles.button}>
            Clear History
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  resultsContainer: {
    marginTop: 20,
  },
  requests: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  }
});

export default IPLookupScreen;
