import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { estilos } from "../Componentes/Estilos";

const RecuperarContraseña = ({ navigation }) => {
  const [correo, setCorreo] = useState("");

  const handleRecuperarContraseña = () => {
    // Verificar si se ha ingresado un correo electrónico válido
    if (!correo) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
      return;
    }

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
        // Mostrar mensaje de éxito y navegar a la pantalla VerificarCodigo
        Alert.alert(
          "Éxito",
          "Se ha enviado un correo con el código de verificación."
        );
        navigation.navigate("VerificarCodigo", { correo });
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
        keyboardType="email-address"
        autoCapitalize="none"
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
