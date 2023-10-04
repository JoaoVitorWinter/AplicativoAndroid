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
    flex: 1,
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  cardSelecaoJogo: {
    width: 300,
    height: 75,
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});