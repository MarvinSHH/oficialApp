import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";

const AsignarDispositivo = ({ userId }) => {
  const [dispositivoId, setDispositivoId] = useState("");

  const asignarDispositivo = async () => {
    try {
      const response = await fetch(
        `https://apibackend-one.vercel.app/api/usuarios/${userId}/dispositivo/${dispositivoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ObtenerTokenDeAutenticacion()}`, // Aquí deberías obtener el token de autenticación de alguna manera
          },
        }
      );
      if (!response.ok) {
        throw new Error("Error al asignar dispositivo");
      }
      Alert.alert("Dispositivo asignado correctamente");
      // Aquí podrías redirigir al usuario o actualizar la lista de dispositivos
    } catch (error) {
      console.error("Error al asignar dispositivo:", error);
      Alert.alert("Error al asignar dispositivo");
    }
  };

  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
          padding: 5,
        }}
        placeholder="Dispositivo ID"
        value={dispositivoId}
        onChangeText={setDispositivoId}
      />
      <Button title="Asignar Dispositivo" onPress={asignarDispositivo} />
    </View>
  );
};

export default AsignarDispositivo;
