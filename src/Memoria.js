import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

export default function Memoria(props) {
    let cartasIniciais = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "J", "J", "K", "K", "L", "L", "M", "M", "N", "N", "O", "O", "P", "P", "Q", "Q", "R", "R", "S", "S", "T", "T", "U", "U", "V", "V", "W", "W", "X", "X", "Z", "Z"];
    let matriz = [[], [], [], [], [], [], [], [], [], []];
    for (let indiceY = 0; indiceY < matriz.length; indiceY++) {
        for (let indiceX = 0; indiceX < 5; indiceX++) {
            let numeroRandom = Math.floor(Math.random() * (cartasIniciais.length));
            matriz[indiceY][indiceX] = cartasIniciais[numeroRandom];
            cartasIniciais.splice(numeroRandom, 1);
        }
    }

    const [vez, setVez] = useState(props.player1);
    const [statusJogo, setStatusJogo] = useState(0);
    const [quantidadeTrue, setQuantidadeTrue] = useState(0);
    const [pontos1, setPontos1] = useState(0)
    const [pontos2, setPontos2] = useState(0)
    const [linhaJogada1, setLinhaJogada1] = useState(0);
    const [colunaJogada1, setColunaJogada1] = useState(0);
    const [linha, setLinha] = useState(0);
    const [coluna, setColuna] = useState(0);
    const [podeJogar, setPodeJogar] = useState(true);
    const [situacao, setSituacao] = useState("Jogue!")

    useEffect(() => {
        if (statusJogo == 1) {
            setLinhaJogada1(linha);
            setColunaJogada1(coluna);
        } else if (statusJogo == 2) {
            setPodeJogar(false);
            setSituacao("Atenção!")
            setTimeout(() => {
                verificarJogada(linhaJogada1, colunaJogada1, linha, coluna, [[...cartasMostradas[0]], [...cartasMostradas[1]], [...cartasMostradas[2]], [...cartasMostradas[3]], [...cartasMostradas[4]], [...cartasMostradas[5]], [...cartasMostradas[6]], [...cartasMostradas[7]], [...cartasMostradas[8]], [...cartasMostradas[9]]]);
            }, 1000);
        }
    }, [statusJogo]);

    console.log("status jogo:" + statusJogo);
    console.log("quantidade true:" + quantidadeTrue);

    useEffect(() => {
        if (quantidadeTrue == 50) {
            if (pontos1 > pontos2) {
                alert(`Jogador ${props.player1} ganhou!`);
                voltarHome();
            } else {
                alert(`Jogador ${props.player2} ganhou!`);
                voltarHome();
            }
        }
    }, [quantidadeTrue]);

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
    console.log(cartasMostradas);
  
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

    const handleClickCarta = (linhaClicada, colunaClicada) => {
        if (cartasMostradas[linhaClicada][colunaClicada] == false && podeJogar) {
            var newCartasMostradas = [[...cartasMostradas[0]], [...cartasMostradas[1]], [...cartasMostradas[2]], [...cartasMostradas[3]], [...cartasMostradas[4]], [...cartasMostradas[5]], [...cartasMostradas[6]], [...cartasMostradas[7]], [...cartasMostradas[8]], [...cartasMostradas[9]]];
            newCartasMostradas[linhaClicada][colunaClicada] = true;
            setLinha(linhaClicada);
            setColuna(colunaClicada);
            setStatusJogo((statusJogo + 1));
            setQuantidadeTrue((quantidadeTrue + 1));
            setCartasMostradas(newCartasMostradas);
        }
    }

    const verificarJogada = (linha1, coluna1, linha2, coluna2, cartasBoolean) => {
        setStatusJogo(0);
        if (cartas[linha1][coluna1] != cartas[linha2][coluna2]) {
            cartasBoolean[linha1][coluna1] = false;
            cartasBoolean[linha2][coluna2] = false;
            setQuantidadeTrue((quantidadeTrue - 2));
            setCartasMostradas(cartasBoolean);
            setSituacao("Errou!")
            trocarVez();
        } else {
            if (vez == props.player1) {
                setPontos1(pontos1 + 1);
            } else {
                setPontos2(pontos2 + 1);
            }
            setSituacao(`Acertou! Ponto para ${vez}`)
        }
        setTimeout(() => {
            setSituacao("Jogue!")
            setPodeJogar(true);
        }, 1000);
    }

    return (
        <View style={styles.container}>
            <View>
                <Text>Player 1: {pontos1}</Text>
                <Text>Player 2: {pontos2}</Text>
            </View>
            <Text>Vez de: {vez}</Text>
            <Text style={styles.situacao}>{situacao}</Text>
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
    situacao: {
        fontSize: 20,
    }
});