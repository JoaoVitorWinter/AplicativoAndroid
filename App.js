import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './src/Home';
import Jogo from './src/Jogo';

export default function App() {
  const [screen, setScreen] = useState("Home");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const checkScreen = (checkScreen) => checkScreen === screen;

  const setJogadores = (nome1, nome2) => {
    setPlayer1(nome1);
    setPlayer2(nome2);
  }

  const changeScreen = (newScreen) => setScreen(newScreen);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {checkScreen("Home") && <Home mudarNomeJogadores={setJogadores} changeScreen = {changeScreen} />}
      {checkScreen("Jogo") && <Jogo player1={player1} player2={player2} changeScreen = {changeScreen} />}
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