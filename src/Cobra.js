import { useState, useEffect } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";

export default function Cobra(props) {
    const [cobra, setCobra] = useState([[5, 5], [5, 4]]);
    const [morango, setMorango] = useState([5, 8]);
    const [tabuleiro, setTabuleiro] = useState(
        [
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "cobra", "cobra", "vazio", "vazio", "morango", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
        ]
    );
    const [velX, setVelX] = useState(1);
    const [velY, setVelY] = useState(0);
    const [posicaoAntiga, setPosicaoAntiga] = useState([5, 4]);

    useEffect(() => {
        if (cobra[0][0] == morango[0] && cobra[0][1] == morango[1]) {
            gerarNovoMorango();
        } else {
            mudarTabuleiro();
        }
    }, [cobra]);

    useEffect(() => {
        mudarTabuleiro();
    }, [morango]);

    useEffect(() => {
        setTimeout(() => {
            moverCobra();
        }, 250);
    }, [tabuleiro]);

    const mudarDirecao = (velocidadeX, velocidadeY) => {
        if (velocidadeX * -1 == velX) {
            return;
        }

        if (velocidadeY * -1 == velY) {
            return;
        }

        setVelX(velocidadeX);
        setVelY(velocidadeY);
    }

    const moverCobra = () => {
        verificarDerrota();

        var newCobra = criarSpreadDaCobra();
        setPosicaoAntiga(newCobra[newCobra.length - 1]);
        
        newCobra.unshift([newCobra[0][0] - velY, newCobra[0][1] + velX]);
        newCobra.pop();
        // newCobra = newCobra.map((value, index) => {
        //     return index == 0 ? [value[0] - velY, value[1] + velX] : newCobra[index - 1];
        // });

        for (let indice = 3; indice < newCobra.length; indice++) {
            if (newCobra[indice][0] == newCobra[0][0]) {
                if (newCobra[indice][1] == newCobra[0][1]) {
                    mostrarDerrota();
                }
            }
        }

        setCobra(newCobra);
    }

    const criarSpreadDaCobra = () => {
        var newCobra = [[...cobra[0]]];

        for (let indice = 1; indice < cobra.length; indice++) {
            newCobra.push([...cobra[indice]]);
        }

        return newCobra;
    }

    const mudarTabuleiro = () => {
        var newTabuleiro = [
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
            ["vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio", "vazio"],
        ]

        cobra.forEach((value) => {
            newTabuleiro[value[0]][value[1]] = "cobra";
        });

        newTabuleiro[morango[0]][morango[1]] = "morango";

        setTabuleiro(newTabuleiro);
    }

    const gerarNovoMorango = () => {
        var posicoes = [];

        tabuleiro.forEach((row, indexRow) => {
            row.forEach((column, indexColumn) => {
                if (column != "cobra") {
                    posicoes.push([indexRow, indexColumn]);
                }
            });
        });

        var newCobra = criarSpreadDaCobra();
        newCobra.push(posicaoAntiga);
        setMorango(posicoes[Math.floor(Math.random() * posicoes.length)]);
        setCobra(newCobra);
    }

    const verificarDerrota = () => {
        if (cobra[0][1] + velX < 0 || cobra[0][1] + velX > 10) {
            mostrarDerrota();
            return true;
        }

        if (cobra[0][0] - velY < 0 || cobra[0][0] - velY > 10) {
            mostrarDerrota();
            return true;
        }

        return false;
    }

    const mostrarDerrota = () => {
        alert(`Perdeu. Comprimento da cobra: ${cobra.length}`);
        voltarHome();
    }

    const voltarHome = () => {
        props.changeScreen("Home");
    }


    return (
        <View style={styles.container}>
            <View>
                {
                    tabuleiro.map((row, indexRow) => {
                        return (
                            <View key={indexRow} style={styles.row}>
                                {
                                    row.map((column, indexColumn) => {
                                        return (
                                            <View key={("" + indexRow + indexColumn)} style={column == "vazio" ? styles.vazio : (column == "cobra" ? styles.cobra : styles.morango)}>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        )
                    })
                }
            </View>
            <Pressable onPress={() => [
                mudarDirecao(0, 1)
            ]} style={styles.botao}>
                <Text>CIMA</Text>
            </Pressable>
            <View style={styles.divLados}>
                <Pressable onPress={() => [
                    mudarDirecao(-1, 0)
                ]} style={styles.botaoLados}>
                    <Text>ESQUERDA</Text>
                </Pressable>
                <Pressable onPress={() => [
                    mudarDirecao(1, 0)
                ]} style={styles.botaoLados}>
                    <Text>DIREITA</Text>
                </Pressable>
            </View>
            <Pressable onPress={() => [
                mudarDirecao(0, -1)
            ]} style={styles.botao}>
                <Text>BAIXO</Text>
            </Pressable>
            <View>

            </View>
            <Pressable onPress={voltarHome} style={styles.botao}>
                <Text>Voltar</Text>
            </Pressable>
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
    row: {
        flexDirection: "row",
    },
    vazio: {
        borderStyle: "solid",
        borderColor: "#FAFAFA",
        borderWidth: 1,
        padding: 10,
    },
    cobra: {
        borderStyle: "solid",
        borderColor: "#FAFAFA",
        borderWidth: 1,
        backgroundColor: "green",
        padding: 10,
    },
    morango: {
        borderStyle: "solid",
        borderColor: "#FAFAFA",
        borderWidth: 1,
        backgroundColor: "red",
        padding: 10,
    },
    divLados: {
        gap: 20,
        flexDirection: "row",
    },
    botaoLados: {
        width: 140,
        height: 100,
        backgroundColor: "#FAFAFA",
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