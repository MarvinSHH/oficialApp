import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";
import { faTint } from "@fortawesome/free-solid-svg-icons";

function Dispositivoiot() {
  const [dispositivos, setDispositivos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bombaEstado, setBombaEstado] = useState({});

  useEffect(() => {
    fetchDispositivos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("bombaEstado", JSON.stringify(bombaEstado));
  }, [bombaEstado]);

  const fetchDispositivos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://apibackend-one.vercel.app/api/dispositivo/"
      );
      setDispositivos(response.data);
      const storedBombaEstado = await AsyncStorage.getItem("bombaEstado");
      if (!storedBombaEstado) {
        const estadoInicialBomba = response.data.reduce((acc, dispositivo) => {
          acc[dispositivo._id] = false;
          return acc;
        }, {});
        setBombaEstado(estadoInicialBomba);
      } else {
        setBombaEstado(JSON.parse(storedBombaEstado));
      }
    } catch (error) {
      console.error("Error al obtener dispositivos: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleBomba = async (id) => {
    const estadoActual = bombaEstado[id];
    const nuevoEstado = !estadoActual;
    setBombaEstado({ ...bombaEstado, [id]: nuevoEstado });
    const comando = nuevoEstado ? "bombaOn" : "bombaOff";
    enviarComando(id, comando);
  };

  const enviarComando = async (id, comando) => {
    setIsLoading(true);
    try {
      await axios.post(
        `https://apibackend-one.vercel.app/api/dispositivo/comando/${id}`,
        { comando }
      );
      Alert.alert(`Comando "${comando}" enviado.`);
    } catch (error) {
      console.error("Error al enviar comando: ", error);
      Alert.alert("Error al enviar comando.");
    } finally {
      setIsLoading(false);
    }
  };

  const getColorPorNivelAlimento = (nivelAlimento) => {
    if (nivelAlimento < 20) return "red";
    if (nivelAlimento >= 20 && nivelAlimento < 60) return "yellow";
    return "green";
  };

  const getColorPorNivelAgua = (nivelAgua) => {
    if (nivelAgua < 20) return "blue";
    if (nivelAgua >= 20 && nivelAgua < 60) return "lightblue";
    return "cyan";
  };

  const ProgressBar = ({ percentage, color }) => {
    return (
      <View
        style={{
          width: "100%",
          backgroundColor: "#e0e0de",
          borderRadius: 20,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            height: "100%",
            width: `${percentage}%`,
            backgroundColor: color,
            borderRadius: "inherit",
            textAlign: "right",
            transition: "width 0.6s ease-in-out",
          }}
        >
          <Text
            style={{
              padding: 5,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {`${percentage}%`}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
      <Text>Control de Dispositivos IoT</Text>
      {dispositivos.map((dispositivo) => (
        <View
          key={dispositivo._id}
          style={{
            backgroundColor: "white",
            width: "70%",
            marginBottom: 20,
            padding: 10,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Text>{dispositivo.nombre}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={styles.infoContainer}>
              <FontAwesomeIcon icon={faBone} size={40} color="blue" />
              <Text>Alimento: {dispositivo.nivelAlimento}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View style={styles.infoContainer}>
              <FontAwesomeIcon icon={faTint} size={40} color="blue" />
              <Text>Agua: {dispositivo.nivelAgua}%</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              padding: 20,
            }}
          >
            <Button
              onPress={() => enviarComando(dispositivo._id, "dispensar")}
              title="Dar Alimento"
            />
            <Button
              onPress={() => toggleBomba(dispositivo._id)}
              title="Dar Agua"
              color={bombaEstado[dispositivo._id] ? "green" : "black"}
            />
          </View>
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});

export default Dispositivoiot;
