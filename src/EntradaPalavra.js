import { useState } from "react";
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";

export default function EntradaPalavra(props) {
    const [palavra, setPalavra] = useState("");
    const [dica, setDica] = useState("");

    const handleClickComecar = () => {
        if (palavra.length > 2 && palavra.match("[A-z\s]+")) {
            props.setPalavra(palavra.toUpperCase());
            props.setDica(dica);
            props.changeScreen("Forca");
        } else {
            alert("Palavra inválida! Ela precisa ter mais de dois caracteres e se manter dentro de letras e espaço!");
        }
    }

    const handleClickVoltar = () => {
        props.changeScreen("Home");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Digite a palavra secreta da forca! Apenas letras sem acento e espaços!</Text>
            <TextInput style={styles.input} placeholderTextColor={"#FAFAFA"} placeholder={"Palavra secreta"} onChangeText={setPalavra}></TextInput>
            <TextInput style={styles.input} placeholderTextColor={"#FAFAFA"} placeholder={"Dica (opcional)"} onChangeText={setDica}></TextInput>
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
        alignItems: "center",
        justifyContent: "center",
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
        color: "white",
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
        textAlign: "center",
    },
});