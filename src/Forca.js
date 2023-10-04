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
        "=========")
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
                    "=========");
                break;
            case 2:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    " |\t|\n" +
                    "\t|\n" +
                    "\t|\n" +
                    "=========");
                break;
            case 3:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    "/|\t|\n" +
                    "\t|\n" +
                    "\t|\n" +
                    "=========");
                break;
            case 4:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    "/|\\\t|\n" +
                    "\t|\n" +
                    "\t|\n" +
                    "=========");
                break;
            case 5:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    "/|\\\t|\n" +
                    "/\t|\n" +
                    "\t|\n" +
                    "=========");
                break;
            case 6:
                setDesenho("+---+\n" +
                    " |\t|\n" +
                    "O\t|\n" +
                    "/|\\\t|\n" +
                    "/ \\\t|\n" +
                    "\t|\n" +
                    "=========");

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

        newLetrasJogadas.push("" + chute + " ");
        setLetrasJogadas(newLetrasJogadas);
        return true;
    }
    const fazerChute = (chute) => {
        input.value = "";
        chute = chute.toLowerCase();
        if (chute.length == 1) {
            if (!verificarChute(chute)) {
                return;
            }

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
                setErros((erros + 1))
            }
        } else if (chute.length == props.palavra.length) {
            if (chute == props.palavra.toLowerCase()) {
                setLetras(props.palavra.split(""));
            } else {
                if (!verificarChute(chute)) {
                    return;
                }
            }
        } else {
            return alert("Chute inválido!")
        }
    }

    const verificarVitoria = () => {
        for (let indice = 0; indice < props.palavra.length; indice++) {
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
                <Text>{desenho}</Text>
            </View>
            <View style={styles.divJogo}>
                <Text>{letrasJogadas}</Text>
                <Text>{letras}</Text>
            </View>
            <View style={styles.divChute}>
                <TextInput id={"input"}style={styles.input} placeholder={"Seu chute"} onChangeText={setChute}></TextInput>
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