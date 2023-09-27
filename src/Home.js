import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default function Home(props) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");


  const handleClick = (event) => {
    if (player1 != "" && player2 != "") {
        props.mudarNomeJogadores(player1, player2);
        props.changeScreen("Jogo");
    }
  } 

  return (
    <View style={styles.container}>
      <Text>Nome Player 1 - X: {player1}</Text>
      <TextInput style={styles.input} placeholder={'Player 1'} onChangeText={setPlayer1}></TextInput>
      <Text>Nome Player 2 - O: {player2}</Text>
      <TextInput style={styles.input} placeholder={'Player 2'} onChangeText={setPlayer2}></TextInput>
      <Button style={styles.input} title={"Botão"} onPress={handleClick}>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    gap: 20,
    backgroundColor: '#FFF',
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