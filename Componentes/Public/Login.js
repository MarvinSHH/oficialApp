import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { estilos } from "../Estilos";

export const Login = () => {
  const nav = useNavigation();
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    // Realiza la llamada a la API para autenticar al usuario
    fetch("https://apibackend-one.vercel.app/api/usuarios/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correo, contraseña }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al iniciar sesión");
        }
        return response.json();
      })
      .then((data) => {
        alert("inicio de exitoso!", data);
        // Aquí puedes almacenar el token y los datos del usuario donde prefieras (p.ej., contexto, almacenamiento local)
        // Por ejemplo: localStorage.setItem('token', data.token);
        // Redirige al usuario a la pantalla principal
        // El inicio de sesión es exitoso, navega a la pantalla de inicio
        nav.navigate("Home");
      })
      .catch((error) => {
        console.error("Error al iniciar sesión:", error);
        alert(
          "Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.subtitulo}>inicia sesión para tener acceso!</Text>
      <TextInput
        placeholder="e-mail"
        /*cursorColor={"black"}
        autoComplete="off"
        autoCompleteType="correo"
        autoCapitalize="none"*/
        value={correo}
        onChangeText={setCorreo}
        style={estilos.textinput}
      />
      <TextInput
        placeholder="Password"
        cursorColor={"black"}
        secureTextEntry={true}
        value={contraseña}
        onChangeText={setContraseña}
        style={estilos.textinput}
      />
      <TouchableOpacity
        style={estilos.botonConBordeCentrado}
        //onPress={handleLogin}               oficial para iniciar sesion
        onPress={() => nav.navigate("Home")} //sesion directa no oficial
      >
        <Text style={estilos.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilos.botonSimpleSinBordeCentrado}
        onPress={() => nav.navigate("k")}
      >
        <Text>olvidaste tu Contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilos.botonSimpleSinBordeCentrado}
        onPress={() => nav.navigate("Registrarse")}
      >
        <Text>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};
