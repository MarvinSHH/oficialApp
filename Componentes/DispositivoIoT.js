import React, { useState, useEffect } from "react";
import { View, Text, Button, ActivityIndicator, Alert } from "react-native";
import axios from "axios";

const DispositivoIoT = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDispositivos();
  }, []);

  const fetchDispositivos = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://apibackend-one.vercel.app/api/dispositivo/"
      );
      setDispositivos(response.data);
    } catch (error) {
      console.error("Error al obtener dispositivos: ", error);
      Alert.alert("Error", "Error al obtener dispositivos");
    } finally {
      setIsLoading(false);
    }
  };

  const enviarComando = async (id, comando) => {
    setIsLoading(true);
    try {
      await axios.post(
        `https://apibackend-one.vercel.app/api/dispositivo/comando/${id}`,
        { comando }
      );
      Alert.alert("Comando enviado", `Comando "${comando}" enviado.`);
    } catch (error) {
      console.error("Error al enviar comando: ", error);
      Alert.alert("Error", "Error al enviar comando.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20 }}>
        Control de Dispositivos IoT
      </Text>
      {dispositivos.map((dispositivo) => (
        <View key={dispositivo._id} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {dispositivo.nombre}
          </Text>
          <Text>Nivel Alimento: {dispositivo.nivelAlimento}%</Text>
          <Text>Nivel Agua: {dispositivo.nivelAgua}%</Text>
          {/* Aquí se agregan los botones de control para cada dispositivo */}
          <Button
            title="DISPENSAR"
            onPress={() => enviarComando(dispositivo._id, "dispensar")}
          />
          <Button
            title="ENCENDER BOMBA"
            onPress={() => enviarComando(dispositivo._id, "bombaOn")}
          />
          <Button
            title="APAGAR BOMBA"
            onPress={() => enviarComando(dispositivo._id, "bombaOff")}
          />
          <Button
            title="PRENDER LED"
            onPress={() => enviarComando(dispositivo._id, "prenderLed")}
          />

          {/* Suponiendo que tengas una forma de identificar si el dispositivo puede "empezar motor", añade un botón si es necesario */}
          {/* <Button title="Iniciar Motor" onPress={() => enviarComando(dispositivo._id, 'motorStart')} /> */}
        </View>
      ))}
    </View>
  );
};

export default DispositivoIoT;
