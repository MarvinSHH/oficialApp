import React, { useState, useEffect } from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBone } from "@fortawesome/free-solid-svg-icons";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import { estilos } from "./Estilos";

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

  useEffect(() => {
    const interval = setInterval(() => {
      fetchDispositivos();
    }, 1000); // Consulta los dispositivos cada 3 segundos (3000 milisegundos)

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, []);

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
      //Alert.alert(`Comando "${comando}" enviado.`);
    } catch (error) {
      //console.error("Error al enviar comando: ", error);
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
    <View style={styles.container}>
      <Text style={styles.title}>Control de Dispositivos IoT</Text>

      {dispositivos.map((dispositivo) => (
        <View key={dispositivo._id} style={styles.deviceContainer}>
          <Text>{dispositivo.nombre}</Text>
          <View style={styles.infoContainer}>
            <FontAwesomeIcon icon={faBone} size={50} color="#DE9967" />
            <View style={styles.textContainer}>
              <Text>{dispositivo.nivelAlimento}%</Text>
            </View>
            <FontAwesomeIcon icon={faTint} size={50} color="#6abce2" />
            <View style={styles.textContainer}>
              <Text>{dispositivo.nivelAgua}%</Text>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.centeredButton}>
              <Button
                onPress={() => enviarComando(dispositivo._id, "dispensar")}
                title="Dar Alimento"
              />
            </View>
            <View style={styles.centeredButton}>
              <Button
                onPress={() => toggleBomba(dispositivo._id)}
                title="Dar Agua"
                color={bombaEstado[dispositivo._id] ? "green" : "black"}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: "center",
    marginRight: 20,
    width: 450,
    backgroundColor: "#daebff",
    paddingTop: 40,
  },

  centeredButton: {
    flex: 1, // Permite que el contenedor del botón se expanda
    alignItems: "center", // Alinea el contenido al centro
  },
  textContainer: {
    marginLeft: -60, // Margen izquierdo negativo para superponer los textos sobre los iconos
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 50,
    paddingLeft: 40,
  },
  deviceContainer: {
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
    marginLeft: 20,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-around", // Alinea los elementos horizontalmente
  },
  buttonContainer: {
    flexDirection: "row",
    //justifyContent: "space-around",
    justifyContent: "space-between", // Distribuye el espacio entre los botones
    paddingHorizontal: 20, // Añade espacio horizontal dentro del contenedor
    marginTop: 10, // Añade margen superior para separarlos del resto del contenido
    marginBottom: 20,
  },
  button: {
    borderRadius: 50, // Radio de borde para los botones
  },
});

export default Dispositivoiot;
