import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import EntradaJogadores from './src/EntradaJogadores';
import Velha from './src/Velha';
import Home from './src/Home';
import EntradaPalavra from './src/EntradaPalavra';
import Forca from './src/Forca';
import Memoria from './src/Memoria';

export default function App() {
  const [screen, setScreen] = useState("Home");
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [palavra, setPalavra] = useState("");
  const [jogo, setJogo] = useState("");

  const checkScreen = (checkScreen) => checkScreen === screen;

  const setJogadores = (nome1, nome2) => {
    setPlayer1(nome1);
    setPlayer2(nome2);
  }

  const changeScreen = (newScreen) => setScreen(newScreen);
  const changeJogo = (newJogo) => setJogo(newJogo);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {checkScreen("Home") && <Home changeJogo={changeJogo} changeScreen = {changeScreen} />}
      {checkScreen("Velha") && <Velha player1={player1} player2={player2} changeScreen = {changeScreen} />}
      {checkScreen("EntradaJogadores") && <EntradaJogadores jogo={jogo} mudarNomeJogadores={setJogadores} changeScreen = {changeScreen} />}
      {checkScreen("EntradaPalavra") && <EntradaPalavra setPalavra={setPalavra} changeScreen = {changeScreen}/>}
      {checkScreen("Forca") && <Forca palavra={palavra} changeScreen = {changeScreen}/>}
      {checkScreen("Memoria") && <Memoria player1={player1} player2={player2} changeScreen = {changeScreen}/>}
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
});