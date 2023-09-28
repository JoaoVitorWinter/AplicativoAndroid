import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

export default function Forca(props) {
    const [chute, setChute] = useState("");
    let array = props.palavra.split("");
    array = array.map((letra) => {
        if (letra != " ") {
            return "_ "
        }

        return "  "
    });

    const [letras, setLetras] = useState(array);


    const fazerChute = (chute) => {
        if (chute.length == 1) {
            for (let indice = 0; indice < props.palavra.length; indice++) {
                console.log("Teste");
            }
        } else if (chute.length == props.palavra.length) {

        }
    }
    return (
            <View>
                <View>

                </View>
                <View>
                    <Text>{letras}</Text>
                </View>
                <View>
                    <TextInput style={styles.input} placeholder={"Seu chute"} onChangeText={setChute}></TextInput>
                    <Pressable style={styles.botao} onPress={() => {
                        fazerChute(chute);
                    }}><Text style={styles.texto}>Chutar</Text></Pressable>
                </View>
            </View>
        );
    
}

const styles = StyleSheet.create({
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