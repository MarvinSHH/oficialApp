import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { estilos } from "../Estilos";
import { UsuarioContext } from "../UsuarioContext";

export const Login = () => {
  const nav = useNavigation();
  const { setUsuario, setToken } = useContext(UsuarioContext);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");

  const handleLogin = () => {
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
        setUsuario(data.user);
        setToken(data.token);
        Alert.alert(
          "Inicio de sesión exitoso",
          `Bienvenido ${data.user.nombre} ${data.user.apellido}`
        );
        nav.navigate("Home");
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  const handleForgotPassword = () => {
    // Aquí maneja la lógica para solicitar la recuperación de contraseña por correo electrónico
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
          throw new Error("Error al solicitar la recuperación de contraseña");
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert("Éxito", data.message);
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "Se produjo un error al solicitar la recuperación de contraseña. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.subtitulo}>Inicia sesión para tener acceso!</Text>
      <TextInput
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        style={estilos.textinput}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry={true}
        value={contraseña}
        onChangeText={setContraseña}
        style={estilos.textinput}
      />
      <TouchableOpacity
        style={estilos.botonConBordeCentrado}
        onPress={handleLogin}
      >
        <Text style={estilos.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilos.botonSimpleSinBordeCentrado}
        onPress={() => nav.navigate("RecuperarContraseña")}
      >
        <Text>¿Olvidaste tu contraseña?</Text>
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
