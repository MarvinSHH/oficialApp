import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { estilos } from "../Componentes/Estilos";

const VerificarCodigo = ({ navigation, route }) => {
  const [codigo, setCodigo] = useState("");
  const { correo } = route.params;

  const handleVerificarCodigo = () => {
    // Realizar la solicitud al backend para verificar el código de verificación
    fetch(
      "https://apibackend-one.vercel.app/api/usuarios/solicitar-recuperacion",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, codigo }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Código de verificación incorrecto");
        }
        return response.json();
      })
      .then((data) => {
        // Si el código es correcto, redirigir al usuario a la pantalla para establecer la nueva contraseña
        navigation.navigate("EstablecerNuevaContraseña", { correo });
      })
      .catch((error) => {
        console.error("Error al verificar el código de verificación:", error);
        Alert.alert(
          "Error",
          "El código de verificación es incorrecto. Por favor, inténtalo de nuevo."
        );
      });
  };

  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.subtitulo}>Verificar Código de Verificación</Text>
      <TextInput
        placeholder="Código de Verificación"
        value={codigo}
        onChangeText={setCodigo}
        style={estilos.textinput}
      />
      <TouchableOpacity
        style={estilos.botonConBordeCentrado}
        onPress={handleVerificarCodigo}
      >
        <Text style={estilos.textoBoton}>Verificar </Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificarCodigo;
