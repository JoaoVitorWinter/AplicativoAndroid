import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

let cartasIniciais = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J", "K", "K", "L", "L", "M", "M", "N", "N", "O", "O", "P", "P", "Q", "Q", "R", "R", "S", "S", "T", "T", "U", "U", "V", "V", "W", "W", "X", "X", "Z", "Z"]
let statusJogo = 0;
let quantidadeTrue = 0;
let linhaJogada1, colunaJogada1;
export default function Memoria(props) {
    let matriz = [[], [], [], [], [], [], [], [], [], []];
    let [vez, setVez] = useState(props.player1);
    let [pontos1, setPontos1] = useState(0)
    let [pontos2, setPontos2] = useState(0)
    for (let indiceY = 0; indiceY < matriz.length; indiceY++) {
        for (let indiceX = 0; indiceX < 5; indiceX++) {
            let numeroRandom = Math.floor(Math.random() * (cartasIniciais.length));
            matriz[indiceY][indiceX] = cartasIniciais[numeroRandom];
            cartasIniciais.splice(numeroRandom, 1);
        }
    }
    
    
    const [cartas, setCartas] = useState(matriz);
    const [cartasMostradas, setCartasMostradas] = useState([
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false],
        [false, false, false, false, false]]);
        
        console.log(cartas);
    const voltarHome = () => {
        props.changeScreen("Home");
    }

    const trocarVez = () => {
        if (vez == props.player1) {
            setVez(props.player2);
        } else {
            setVez(props.player1)
        }
    }
    const handleClickCarta = (linha, coluna) => {
        var newCartasMostradas = [[...cartasMostradas[0]], [...cartasMostradas[1]], [...cartasMostradas[2]], [...cartasMostradas[3]], [...cartasMostradas[4]], [...cartasMostradas[5]], [...cartasMostradas[6]], [...cartasMostradas[7]], [...cartasMostradas[8]], [...cartasMostradas[9]]]
        newCartasMostradas[linha][coluna] = true;
        quantidadeTrue++;
        statusJogo += 1;
        setCartasMostradas(newCartasMostradas);
        if (statusJogo == 1) {
            linhaJogada1 = linha;
            colunaJogada1 = coluna;
        } else {
            verificarJogada(linhaJogada1, colunaJogada1, linha, coluna, newCartasMostradas);
        }

        if (quantidadeTrue == 50) {
            if (pontos1 > pontos2) {
                alert(`Jogador ${props.player1} ganhou!`);
                voltarHome();
            } else if (pontos1 < pontos2) {
                alert(`Jogador ${props.player1} ganhou!`);
                voltarHome();
            } else {
                alert(`Deu empate!`);
                voltarHome();
            }
        }
    }

    const verificarJogada = (linha1, coluna1, linha2, coluna2, cartasBoolean) => {
        statusJogo = 0;
        if (cartas[linha1][coluna1] != cartas[linha2][coluna2]) {
            cartasBoolean[linha1][coluna1] = false;
            cartasBoolean[linha2][coluna2] = false;
            quantidadeTrue -= 2;
            setCartasMostradas(cartasBoolean);
        } else {
            if (vez == props.player1) {
                setPontos1(pontos1 + 1);
            } else {
                setPontos2(pontos2 + 1);
            }
        }
        trocarVez();
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>Player 1: {pontos1}</Text>
                <Text>Player 2: {pontos2}</Text>
            </View>
            <Text>Vez de: {vez}</Text>
            {
                cartasMostradas.map((linha, indexLinha) => {
                    return (
                        <View style={styles.linha} key={indexLinha}>
                            {linha.map((coluna, indexColuna) => {
                                return (
                                    <Pressable onPress={() => {
                                        handleClickCarta(indexLinha, indexColuna);
                                    }} style={styles.cartao} key={indexLinha + indexColuna}>
                                        <Text>{coluna ? cartas[indexLinha][indexColuna] : ""}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    )
                })
            }
            <Pressable style={styles.botao} onPress={voltarHome}><Text style={styles.texto}>Voltar</Text></Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    cartao: {
        justifyContent: "center",
        alignItems: "center",
        width: 30,
        height: 30,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
    },
    linha: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
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