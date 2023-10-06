import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

// Mudar para Pressable
export default function Velha(props) {
    const [botoes, setBotoes] = useState([
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ]);
    const [vez, setVez] = useState("X");

    useEffect(() => {
        verificarVitoria();
    }, [botoes]);

    const trocarVez = () => {
        if (vez == "X") {
            setVez("O");
        } else {
            setVez("X");
        }
    }

    const verificarVitoria = () => {

        if (botoes[0][0] == botoes[1][1] && botoes[1][1] == botoes[2][2] && botoes[0][0] != " ") {
            return mostrarVitoria(botoes[0][0]);
        }

        if (botoes[0][2] == botoes[1][1] && botoes[1][1] == botoes[2][0] && botoes[0][2] != " ") {
            return mostrarVitoria(botoes[1][1]);
        }

        for (let i = 0; i < botoes.length; i++) {
            if (botoes[i][0] == botoes[i][1] && botoes[i][1] == botoes[i][2] && botoes[i][0] != " ") {
                return mostrarVitoria(botoes[i][0]);
            }

            if (botoes[0][i] == botoes[1][i] && botoes[1][i] == botoes[2][i] && botoes[0][i] != " ") {
                return mostrarVitoria(botoes[0][i]);
            }
        }

        for (let i = 0; i < botoes.length; i++) {
            for (let j = 0; j < botoes[0].length; j++) {
                if (botoes[i][j] == " ") {
                    return;
                }
            }
        }

        alert("Deu velha!");
        voltarAoHome();
    }

    const mostrarVitoria = (vencedor) => {
        if (vencedor == "X") {
            alert(`O vencedor é: ${props.player1}`)
        } else {
            alert(`O vencedor é: ${props.player2}`)
        }

        voltarAoHome();
    }

    const voltarAoHome = () => {
        props.changeScreen("Home");
    }

    function handleClickBotoes(x, y) {
        if (botoes[x][y] == " ") {
            var novaMatriz = [[...botoes[0]], [...botoes[1]], [...botoes[2]]];
            novaMatriz[x][y] = vez;
            setBotoes(novaMatriz);
            trocarVez();
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Vez de: {vez} - {vez == "X" ? props.player1 : props.player2}</Text>
            <View style={styles.jogo}>
                {
                    botoes.map((linha, indexLinha) => {
                        return (
                            <View style={styles.row} key={indexLinha}>
                                {
                                    linha.map((coluna, indexColuna) => {
                                        return (
                                            <Pressable style={styles.celula} onPress={() => {
                                                handleClickBotoes(indexLinha, indexColuna);
                                            }} key={(indexLinha + indexColuna)}>
                                                <Text style={styles.texto}>{coluna}</Text>
                                            </Pressable>
                                        );
                                    })
                                }
                            </View>
                        );
                    })
                }
            </View>
            <Pressable style={styles.botao} onPress={voltarAoHome}>
                <Text>Voltar</Text>
            </Pressable>
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
    jogo: {
        marginTop: 10,
        gap: 5,
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
    },
    celula: {
        width: 100,
        height: 100,
        borderStyle: "solid",
        borderColor: "#FAFAFA",
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
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