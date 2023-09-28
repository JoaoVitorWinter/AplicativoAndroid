import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

export default function Forca(props) {
    let erros = 0;
    const [chute, setChute] = useState("");
    const [letrasJogadas, setLetrasJogadas] = useState("");
    let array = props.palavra.split("");
    array = array.map((letra) => {
        if (letra != " ") {
            return "_ "
        }

        return "  "
    });
    const [letras, setLetras] = useState(array);

    useEffect(() => {
        verificarVitoria();
    }, [letras]);

    const fazerChute = (chute) => {
        chute = chute.toLowerCase();
        if (chute.length == 1)) {
            setLetrasJogadas(letrasJogadas + ` ${chute} `)
            var newLetras = [...letras];
            var possuiLetra = false;
            for (let indice = 0; indice < props.palavra.length; indice++) {
                if (props.palavra.charAt(indice).toLowerCase() == chute) {
                    newLetras[indice] = `${props.palavra.charAt(indice)}`;
                    possuiLetra = true;
                }
            }

            if (possuiLetra) {
                setLetras(newLetras);
            } else {
                erros++;
                console.log(`Quantidade de erros: ${erros}`);
                if (erros == 6) {
                    alert(`Você perdeu! A palavra secreta era ${props.palavra}`)
                }
            }
        } else if (chute.length == props.palavra.length) {
            if (chute == props.palavra.toLowerCase()) {
                setLetras(props.palavra.split(""));
            }
        }
    }

    const verificarVitoria = () => {
        for(let indice = 0; indice < props.palavra.length; indice++) {
            if (letras[indice] == "_ ") {
                return;
            }
        }

        alert(`Você ganhou! A palavra secreta era ${props.palavra}`);
        voltarHome();
    }

    const voltarHome = () => {
        props.changeScreen("Home");
    }

    return (
        <View style={styles.container}>
            <View style={styles.divForca}>

            </View>
            <View style={styles.divJogo}>
                <Text>{letrasJogadas}</Text>
                <Text>{letras}</Text>
            </View>
            <View style={styles.divChute}>
                <TextInput style={styles.input} placeholder={"Seu chute"} onChangeText={setChute}></TextInput>
                <Pressable style={styles.botao} onPress={() => {
                    fazerChute(chute);
                }}><Text style={styles.texto}>Chutar</Text></Pressable>
                <Pressable style={styles.botao} onPress={voltarHome}><Text style={styles.texto}>Voltar</Text></Pressable>
            </View>
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
    divForca: {

    },
    divJogo: {
        alignItems: "center",
        justifyContent: "center",
    },
    divChute: {
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
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