import { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

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
        <View>

            <Button title="Voltar" onPress={voltarAoHome} />
            <View style={styles.jogo}>
                <View style={styles.row}>
                    <Button title={botoes[0][0]} onPress={() => {
                        handleClickBotoes(0, 0);
                    }} />
                    <Button title={botoes[0][1]} onPress={() => {
                        handleClickBotoes(0, 1);
                    }} />
                    <Button title={botoes[0][2]} onPress={() => {
                        handleClickBotoes(0, 2);
                    }} />
                </View>
                <View style={styles.row}>
                    <Button title={botoes[1][0]} onPress={() => {
                        handleClickBotoes(1, 0);
                    }} />
                    <Button title={botoes[1][1]} onPress={() => {
                        handleClickBotoes(1, 1);
                    }} />
                    <Button title={botoes[1][2]} onPress={() => {
                        handleClickBotoes(1, 2);
                    }} />
                </View>
                <View style={styles.row}>
                    <Button title={botoes[2][0]} onPress={() => {
                        handleClickBotoes(2, 0);
                    }} />
                    <Button title={botoes[2][1]} onPress={() => {
                        handleClickBotoes(2, 1);
                    }} />
                    <Button title={botoes[2][2]} onPress={() => {
                        handleClickBotoes(2, 2);
                    }} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
});