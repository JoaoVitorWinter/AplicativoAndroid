import { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from "react-native";

// Fazer verificação de apenas letras e espaços
export default function Forca(props) {
    const [erros, setErros] = useState(0);
    const [chute, setChute] = useState("");
    const [letrasJogadas, setLetrasJogadas] = useState([""]);
    const [desenho, setDesenho] = useState("+---+\n" +
        "|\t|\n" +
        "\t|\n" +
        "\t|\n" +
        "\t|\n" +
        "\t|\n" +
        "=======")
    let array = props.palavra.split("");
    let input = document.getElementById("input");
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

    useEffect(() => {
        mudarDesenho();
    }, [erros]);

    const mudarDesenho = () => {
        switch (erros) {
            case 1:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    "\t|\n" +
                    "\t|\n" +
                    "\t|\n" +
                    "=======");
                break;
            case 2:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    " |\t|\n" +
                    "\t|\n" +
                    "\t|\n" +
                    "=======");
                break;
            case 3:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    "/|\t|\n" +
                    "\t|\n" +
                    "\t|\n" +
                    "=======");
                break;
            case 4:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    "/|\\\t|\n" +
                    "\t|\n" +
                    "\t|\n" +
                    "=======");
                break;
            case 5:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    "/|\\\t|\n" +
                    "/\t|\n" +
                    "\t|\n" +
                    "=======");
                break;
            case 6:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    "/|\\\t|\n" +
                    "/ \\\t|\n" +
                    "\t|\n" +
                    "=======");

                alert(`Você perdeu! A palavra secreta era ${props.palavra}`);
                voltarHome();
                break;
        }
    }

    const verificarChute = (chute) => {
        var newLetrasJogadas = [...letrasJogadas];
        for (let indice = 0; indice < newLetrasJogadas.length; indice++) {
            if (chute + " " == newLetrasJogadas[indice]) {
                alert("O chute já foi realizado!");
                return false;
            }
        }

        newLetrasJogadas.push(chute + " ");
        setLetrasJogadas(newLetrasJogadas);
        return true;
    }

    const fazerChute = (chute) => {
        input.value = "";
        chute = chute.toUpperCase();
        if (chute.length == 1 && chute.match("[A-z]+")) {
            if (!verificarChute(chute)) {
                return;
            }

            var newLetras = [...letras];
            var possuiLetra = false;
            for (let indice = 0; indice < props.palavra.length; indice++) {
                if (props.palavra.charAt(indice) == chute) {
                    newLetras[indice] = `${props.palavra.charAt(indice)}`;
                    possuiLetra = true;
                }
            }

            if (possuiLetra) {
                setLetras(newLetras);
            } else {
                setErros((erros + 1))
            }
        } else if (chute.length == props.palavra.length) {
            if (chute == props.palavra) {
                setLetras(props.palavra.split(""));
            } else {
                if (!verificarChute(chute)) {
                    return;
                }

                setErros((erros + 1));
            }
        } else {
            return alert("Chute inválido!")
        }
    }

    const verificarVitoria = () => {
        if (!(letras.join("") == props.palavra)) {
            return;
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
                <Text style={styles.texto}>Dica: {props.dica}</Text>
                <Text style={styles.caixaDesenho}>{desenho}</Text>
            </View>
            <View style={styles.divJogo}>
                <Text style={styles.caixaLetras}>{letrasJogadas}</Text>
                <Text style={styles.texto}>{letras}</Text>
            </View>
            <View style={styles.divChute}>
                <TextInput id={"input"} style={styles.input} placeholder={"Seu chute"} onChangeText={setChute}></TextInput>
                <Pressable style={styles.botao} onPress={() => {
                    fazerChute(chute);
                }}><Text>Chutar</Text></Pressable>
                <Pressable style={styles.botao} onPress={voltarHome}><Text>Voltar</Text></Pressable>
            </View>
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
    divForca: {
        gap: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    caixaDesenho: {
        paddingHorizontal: 100,
        paddingVertical: 40,
        borderStyle: "solid",
        borderColor: "#FAFAFA",
        borderWidth: 1,
        borderRadius: 10,
        color: "#FAFAFA",
    },
    divJogo: {
        alignItems: "center",
        justifyContent: "center",
    },
    caixaLetras: {
        width: 300,
        minHeight: 20,
        borderStyle: "solid",
        borderColor: "#FAFAFA",
        borderWidth: 1,
        borderRadius: 10,
        textAlign: "center",
        color: "#FAFAFA",
    },
    divChute: {
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
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
    },
});