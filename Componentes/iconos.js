import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert } from "react-native";
import axios from "axios";
import { ProgressBar, Colors } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorage } from "react-native";

import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

function Dispositivoiot() {
  const [dispositivos, setDispositivos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bombaEstado, setBombaEstado] = useState(
    JSON.parse(localStorage.getItem("bombaEstado")) || {}
  );

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
      if (!localStorage.getItem("bombaEstado")) {
        const estadoInicialBomba = response.data.reduce((acc, dispositivo) => {
          acc[dispositivo._id] = false;
          return acc;
        }, {});
        setBombaEstado(estadoInicialBomba);
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

  return (
    <View style={{ flex: 1, alignItems: "center", marginTop: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>
        Control de Dispositivos IoT
      </Text>
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
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            {dispositivo.nombre}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <FontAwesome5
              name="dog"
              size={40}
              color={getColorPorNivelAlimento(dispositivo.nivelAlimento)}
            />
            <ProgressBar
              progress={dispositivo.nivelAlimento / 100}
              color={getColorPorNivelAlimento(dispositivo.nivelAlimento)}
              style={{ flex: 1, marginLeft: 10 }}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <MaterialCommunityIcons
              name="water-percent"
              size={40}
              color={getColorPorNivelAgua(dispositivo.nivelAgua)}
            />
            <ProgressBar
              progress={dispositivo.nivelAgua / 100}
              color={getColorPorNivelAgua(dispositivo.nivelAgua)}
              style={{ flex: 1, marginLeft: 10 }}
            />
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
              color={
                bombaEstado[dispositivo._id] ? Colors.green500 : Colors.black
              }
            />
          </View>
        </View>
      ))}
    </View>
  );
}

export default Dispositivoiot;
