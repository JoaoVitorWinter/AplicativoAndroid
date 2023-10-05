import { useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

export default function Home(props) {

  return (
    <View style={styles.container}>
      <Pressable onPress={() => {
        props.changeJogo("Velha");
        props.changeScreen("EntradaJogadores");
      }} style={styles.cardSelecaoJogo} ><Text>Jogo da Velha</Text></Pressable>
      <Pressable onPress={() => {
        props.changeScreen("EntradaPalavra");
      }} style={styles.cardSelecaoJogo} ><Text>Jogo da Forca</Text></Pressable>
      <Pressable onPress={() => {
        props.changeJogo("Memoria");
        props.changeScreen("EntradaJogadores");
      }} style={styles.cardSelecaoJogo} ><Text>Jogo da Memória</Text></Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#393E41",
  },
  cardSelecaoJogo: {
    width: 300,
    height: 75,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  texto: {
    color: "#FAFAFA",
  },
});