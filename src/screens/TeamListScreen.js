import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, FlatList, RefreshControl } from "react-native";
import {
  TextInput,
  Button,
  Card,
  RadioButton,
  Text,
  Modal,
  Portal,
} from "react-native-paper";
import axios from "axios";

const TeamListScreen = ({ navigation }) => {
  const [teams, setTeams] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getTeams();
    setRefreshing(false);
  }, []);

  const getTeams = async () => {
    try {
      const response = await axios.get(
        "https://app-w5cilp4hoa-uc.a.run.app/getTeams"
      );

      console.log(response.data)
      setTeams(response.data);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

  const handleTeamDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://app-w5cilp4hoa-uc.a.run.app/deleteTeam/${id}`
      );

      console.log(response.data)
      
      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <ScrollView style={styles.container}  refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <FlatList
        data={teams}
        renderItem={({ item }) => (
          <Card style={styles.playerCard} onPress={() => navigation.navigate("TeamManagement", { team: {...item.data, id: item.id} })}>
            <Card.Content>
              <Text style={styles.players}>Name: {item.data.teamName}</Text>
              <Text style={styles.players}>Faculty: {item.data.faculty}</Text>
              <Text style={styles.players}>
                Registration Year: {item.data.registrationYear}
              </Text>
              <Text style={styles.players}>
                Registration Cycle: {item.data.registrationCycle}
              </Text>
              <Text style={styles.players}>
                Tournament Type: {item.data.tournamentType}
              </Text>

              <Text style={styles.players}>Players:</Text>
              <FlatList
                data={item.data.players}
                renderItem={({ item }) => (
                  <Text style={styles.players}>{item.fullName}</Text>
                )}
                keyExtractor={(item) => item}
              />

              <Button mode="contained" style={styles.button} onPress={() => handleTeamDelete(item.id)}>
                Delete Team
              </Button>
              <Button mode="outlined" style={styles.button} onPress={() => navigation.navigate("TeamManagement", { team: {...item.data, id: item.id} })}>
                Edit Team
              </Button>
            </Card.Content>
          </Card>
        )}
        keyExtractor={(item) => item.id}
      />

      {/* Add Team button */}
        <Button
            mode="contained"
            onPress={() => navigation.navigate("TeamManagement")}
            style={styles.button}
        >
            Add Team
        </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  playerCard: {
    marginBottom: 10,
  },
  players: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
});

export default TeamListScreen;
