import React, { useState } from "react";
import { ScrollView, View, StyleSheet, FlatList } from "react-native";
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

const TeamManagementScreen = ({ navigation, route }) => {
  const { team: teamParam = {} } = route.params || {};

  const [team, setTeam] = useState({
    teamName: teamParam.teamName || "",
    faculty: teamParam.faculty || "",
    registrationYear: teamParam.registrationYear || "",
    registrationCycle: teamParam.registrationCycle || "",
    tournamentType: teamParam.tournamentType || "",
    players: teamParam.players || [],
  });

  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);

  const handleRegisterTeam = async () => {
    // Validate the team data here
    // Ensure there are at least 5 players

    if (!team.teamName) {
      alert("Team name is required.");
      return;
    }

    if (!team.faculty) {
      alert("Faculty is required.");
      return;
    }

    if (!team.registrationYear) {
      alert("Registration year is required.");
      return;
    }

    if (!team.registrationCycle) {
      alert("Registration cycle is required.");
      return;
    }

    if (!team.tournamentType) {
      alert("Tournament type is required.");
      return;
    }

    if (team.players.length < 5) {
      alert("A team must have at least 5 players.");
      return;
    }

    try {
      const functionToRun = teamParam.teamName ? "updateTeam" : "addTeam";
      console.log({teamParam})

      const response =
        functionToRun === "addTeam"
          ? await axios.post(
              `https://app-w5cilp4hoa-uc.a.run.app/addTeam`,
              team
            )
          : await axios.put(
              `https://app-w5cilp4hoa-uc.a.run.app/updateTeam/${teamParam.id}`,
              team
            );

      if (response.status === 200) {
        alert("Team saved successfully!");
        // You might want to navigate to another screen or reset the form here
        navigation.navigate("TeamList");
      }
    } catch (error) {
      console.error("There was an error registering the team", error);
      alert("There was an error registering the team.");
    }
  };

  const handleShowAddPlayerModal = () => {
    setShowAddPlayerModal(true);
  };

  const addPlayerToTeam = () => {
    setTeam({
      ...team,
      players: [
        ...team.players,
        {
          studentId: team.studentId,
          fullName: team.fullName,
          birthDate: team.birthDate,
          position: team.position,
          shirtNumber: team.shirtNumber,
        },
      ],
    });
    setShowAddPlayerModal(false);

  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Content>
          <TextInput
            label="Team Name"
            value={team.teamName}
            onChangeText={(text) => setTeam({ ...team, teamName: text })}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Faculty"
            value={team.faculty}
            onChangeText={(text) => setTeam({ ...team, faculty: text })}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Registration Year"
            value={team.registrationYear}
            onChangeText={(text) =>
              setTeam({ ...team, registrationYear: text })
            }
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Registration Cycle"
            value={team.registrationCycle}
            onChangeText={(text) =>
              setTeam({ ...team, registrationCycle: text })
            }
            mode="outlined"
            style={styles.input}
          />

          <Text style={styles.players}>Tournament Type</Text>
          <View style={{ flexDirection: "row" }}>
            <RadioButton
              value="male"
              status={team.tournamentType === "male" ? "checked" : "unchecked"}
              onPress={() => setTeam({ ...team, tournamentType: "male" })}
            />
            <Text>Male</Text>
            <RadioButton
              value="female"
              status={
                team.tournamentType === "female" ? "checked" : "unchecked"
              }
              onPress={() => setTeam({ ...team, tournamentType: "female" })}
            />
            <Text>Female</Text>
          </View>

          <Button
            mode="outlined"
            onPress={handleShowAddPlayerModal}
            style={styles.button}
          >
            Add Player
          </Button>

          <Text style={styles.players}>Players</Text>

          <Portal>
            <Modal
              visible={showAddPlayerModal}
              onDismiss={() => setShowAddPlayerModal(false)}
            >
              <Card>
                <Card.Content>
                  <TextInput
                    label="Student ID"
                    value={team.studentId}
                    onChangeText={(text) =>
                      setTeam({ ...team, studentId: text })
                    }
                    mode="outlined"
                    style={styles.input}
                  />
                  <TextInput
                    label="Full Name"
                    value={team.fullName}
                    onChangeText={(text) =>
                      setTeam({ ...team, fullName: text })
                    }
                    mode="outlined"
                    style={styles.input}
                  />

                  <TextInput
                    label="Birth Date"
                    value={team.birthDate}
                    onChangeText={(text) =>
                      setTeam({ ...team, birthDate: text })
                    }
                    mode="outlined"
                    style={styles.input}
                  />

                  <TextInput
                    label={"Position"}
                    value={team.position}
                    onChangeText={(text) =>
                      setTeam({ ...team, position: text })
                    }
                    mode="outlined"
                    style={styles.input}
                  />

                  <TextInput
                    label={"Shirt Number"}
                    value={team.shirtNumber}
                    onChangeText={(text) =>
                      setTeam({ ...team, shirtNumber: text })
                    }
                    mode="outlined"
                    style={styles.input}
                  />

                  <Button
                    mode="contained"
                    onPress={addPlayerToTeam}
                    style={styles.button}
                  >
                    Add Player
                  </Button>
                </Card.Content>
              </Card>
            </Modal>
          </Portal>
          {/* Other team details inputs here */}
          {/* <Button mode="contained" onPress={handleAddPlayer} style={styles.button}>
            Add Player
          </Button> */}
          <FlatList
            data={team.players}
            renderItem={({ item }) => (
              <Card style={styles.playerCard}>
                <Card.Content>
                  <Text>{item.fullName}</Text>
                  <Text>{item.position}</Text>
                </Card.Content>
              </Card>
            )}
          />

          <Button
            mode="contained"
            onPress={handleRegisterTeam}
            style={styles.button}
          >
            {teamParam.teamName ? "Update Team" : "Register Team"}
          </Button>
        </Card.Content>
      </Card>
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

export default TeamManagementScreen;
