import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { estilos } from "../Componentes/Estilos";

const RecuperarContraseña = () => {
  const [correo, setCorreo] = useState("");

  const handleRecuperarContraseña = () => {
    // Realizar la solicitud al backend para recuperar la contraseña
    fetch(
      "https://apibackend-one.vercel.app/api/usuarios/solicitar-recuperacion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al solicitar recuperación de contraseña");
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert("Éxito", data.message);
      })
      .catch((error) => {
        console.error("Error al solicitar recuperación de contraseña:", error);
        Alert.alert(
          "Error",
          "Se produjo un error al solicitar recuperación de contraseña. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.subtitulo}>Recuperar Contraseña</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        style={estilos.textinput}
      />
      <TouchableOpacity
        style={estilos.botonConBordeCentrado}
        onPress={handleRecuperarContraseña}
      >
        <Text style={estilos.textoBoton}>Enviar </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RecuperarContraseña;
