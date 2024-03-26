// EstablecerNuevaContraseña.js

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { estilos } from "../Componentes/Estilos";

const EstablecerNuevaContraseña = ({ navigation, route }) => {
  const [nuevaContraseña, setNuevaContraseña] = useState("");
  const { correo } = route.params;

  const handleEstablecerNuevaContraseña = () => {
    // Realizar la solicitud al backend para establecer la nueva contraseña
    fetch(
      "https://apibackend-one.vercel.app/api/usuarios/restablecer-contrasena",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, nuevaContrasena: nuevaContraseña }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al establecer la nueva contraseña");
        }
        return response.json();
      })
      .then(() => {
        Alert.alert(
          "Éxito",
          "Tu contraseña ha sido restablecida exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña."
        );
        // Redirigir al usuario a la pantalla de inicio de sesión
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.error("Error al establecer la nueva contraseña:", error);
        Alert.alert(
          "Error",
          "Se produjo un error al establecer la nueva contraseña. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.subtitulo}>Establecer Nueva Contraseña</Text>
      <TextInput
        placeholder="Nueva Contraseña"
        value={nuevaContraseña}
        onChangeText={setNuevaContraseña}
        style={estilos.textinput}
      />
      <TouchableOpacity
        style={estilos.botonConBordeCentrado}
        onPress={handleEstablecerNuevaContraseña}
      >
        <Text style={estilos.textoBoton}>Establecer </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EstablecerNuevaContraseña;
