import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

export default function EntradaJogadores(props) {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");


  const handleClickComecar = () => {
    if (player1 != "" && player2 != "" && player1 != player2) {
      props.mudarNomeJogadores(player1, player2);
      props.changeScreen(props.jogo);
    } else {
      alert("Falta informações para continuar ou os nomes são iguais!");
    }
  }

  const handleClickVoltar = () => {
    props.changeScreen("Home");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{props.jogo}</Text>
      <Text style={styles.texto}>Player 1: {player1}</Text>
      <TextInput style={styles.input} placeholderTextColor={"#FAFAFA"} placeholder={'Player 1'} onChangeText={setPlayer1}></TextInput>
      <Text style={styles.texto}>Player 2: {player2}</Text>
      <TextInput style={styles.input} placeholderTextColor={"#FAFAFA"} placeholder={'Player 2'} onChangeText={setPlayer2}></TextInput>
      <Pressable style={styles.botao} onPress={handleClickComecar}><Text>Começar</Text></Pressable>
      <Pressable style={styles.botao} onPress={handleClickVoltar}><Text>Voltar</Text></Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#393E41",
  },
  input: {
    width: 300,
    height: 30,
    backgroundColor: "#393E41",
    borderStyle: "solid",
    borderColor: "#FAFAFA",
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    color: "#FAFAFA",
  },
  titulo: {
    fontSize: 30,
    color: "#FAFAFA",
  },
  botao: {
    width: 300,
    height: 50,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
},
texto: {
  color: "#FAFAFA",
},
});