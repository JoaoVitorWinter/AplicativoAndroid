import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");


  const handleClick = (event) => {
    alert("Click");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Nome Player 1: {player1}</Text>
      <TextInput style={styles.input} placeholder={'Player 1'} onChangeText={setPlayer1}></TextInput>
      <Text>Nome Player 2: {player2}</Text>
      <TextInput style={styles.input} placeholder={'Player 2'} onChangeText={setPlayer2}></TextInput>
      <Button title={"Botão"} onPress={handleClick}>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: "80%",
    height: 20,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
  },
});

function myState(_state) {
  let state = _state;

  function setState(value) {
    state = value;
  }

  function getState() {
    return state;
  }
  
  return [state, setState, getState];
}

const [nome, setNome, getNome] = myState("Bruno");

console.log(nome);
// nome = "Bruno"
setNome("Henrique")
console.log(nome);
// nome = "Henrique"