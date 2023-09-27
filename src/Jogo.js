import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

export default function Jogo(props) {
    const [botoes, setBotoes] = useState([
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ]);
    const [vez, setVez] = useState("X");

    const trocarVez = () => {
        if (vez == "X") {
            setVez("O")
        } else {
            setVez("X")
        }
    }

    const verificarVitoria = () => {

        if (botoes[0][0] == botoes[1][1] && botoes[1][1] == botoes[2][2] && botoes[0][0] != " ") {
            return mostrarVitoria(botoes[0][0])
        }

        if (botoes[0][2] == botoes[1][1] && botoes[1][1] == botoes[2][0] && botoes[0][2] != " ") {
            return mostrarVitoria(botoes[1][1])
        }

        for (let i = 0; i < botoes.length; i++) {
            if (botoes[i][0] == botoes[i][1] && botoes[i][1] == botoes[i][2] && botoes[i][0] != " ") {
                return mostrarVitoria(botoes[i][0])
            }

            if (botoes[0][i] == botoes[1][i] && botoes[1][i] == botoes[2][i] && botoes[0][i] != " ") {
                return mostrarVitoria(botoes[0][i])
            }
        }
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
            var novaMatriz = botoes;
            novaMatriz[x][y] = vez;
            setBotoes(novaMatriz);
            verificarVitoria();
            trocarVez();
        }
    }

    return (
        <View style={styles.component}>

            <Button title="Voltar" onPress={voltarAoHome} />
            <View style={styles.row}>
                <Button title={botoes[0][0]} onPress={() => {
                    handleClickBotoes(0, 0)
                }} />
                <Button title={botoes[0][1]} onPress={() => {
                    handleClickBotoes(0, 1)
                }} />
                <Button title={botoes[0][2]} onPress={() => {
                    handleClickBotoes(0, 2)
                }} />
            </View>
            <View style={styles.row}>
                <Button title={botoes[1][0]} onPress={() => {
                    handleClickBotoes(1, 0)
                }} />
                <Button title={botoes[1][1]} onPress={() => {
                    handleClickBotoes(1, 1)
                }} />
                <Button title={botoes[1][2]} onPress={() => {
                    handleClickBotoes(1, 2)
                }} />
            </View>
            <View style={styles.row}>
                <Button title={botoes[2][0]} onPress={() => {
                    handleClickBotoes(2, 0)
                }} />
                <Button title={botoes[2][1]} onPress={() => {
                    handleClickBotoes(2, 1)
                }} />
                <Button title={botoes[2][2]} onPress={() => {
                    handleClickBotoes(2, 2)
                }} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: "row",
    },
});