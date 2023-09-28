import { useState } from "react";
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";

export default function EntradaPalavra(props) {
    const [palavra, setPalavra] = useState("");

    const handleClickComecar = () => {
        if (palavra.length > 2) {
            props.setPalavra(palavra);
            props.changeScreen("Forca");
        }
    }

    const handleClickVoltar = () => {
        props.changeScreen("Home");
    }

    return (
        <View style={styles.container}>
            <Text>Digite a palavra secreta da forca!</Text>
            <TextInput style={styles.input} placeholder={"Palavra secreta"} onChangeText={setPalavra}></TextInput>
            <Pressable style={styles.botao} onPress={handleClickComecar}><Text style={styles.texto}>Começar</Text></Pressable>
            <Pressable style={styles.botao} onPress={handleClickVoltar}><Text style={styles.texto}>Voltar</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        width: 300,
        height: 30,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        padding: 5,
    },
    botao: {
        padding: 15,
        width: 100,
        backgroundColor: "#0050FF",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    texto: {
        color: "#FAFAFA",
    },
});