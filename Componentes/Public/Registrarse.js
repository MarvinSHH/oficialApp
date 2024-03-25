import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { estilos } from "../Estilos";

export const Registro = () => {
  const nav = useNavigation();
  // Asegúrate de inicializar todos los estados correctamente, especialmente para 'tipo' si es requerido en tu esquema
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [telefono, setTelefono] = useState("");
  const [preguntaRecuperacion, setPreguntaRecuperacion] =
    useState("colorFavorito");
  const [respuestaPregunta, setRespuestaPregunta] = useState("");

  const validarEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validarTelefono = (telefono) => {
    return /^[0-9]{10}$/.test(telefono);
  };

  const handleRegistro = () => {
    if (!nombre || !apellido || !correo || !contraseña || !telefono) {
      Alert.alert("Error", "Por favor, completa todos los campos.");
      return;
    }

    if (!validarEmail(correo)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!validarTelefono(telefono)) {
      Alert.alert(
        "Error",
        "Por favor, ingresa un número de teléfono válido (10 dígitos)."
      );
      return;
    }

    // Valida los campos aquí si es necesario
    const usuarioData = {
      nombre,
      apellido,
      correo,
      contraseña,
      telefono,
      tipo: "usuario", // Asegúrate de que este campo sea aceptado por tu API
      preguntaRecuperacion,
      respuestaPregunta,
    };

    fetch("https://apibackend-one.vercel.app/api/usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuarioData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Respuesta de red no ok.");
        }
        return response.json();
      })
      .then((data) => {
        alert("Usuario registrado correctamente");
        nav.navigate("Login");
      })
      .catch((error) => {
        console.error("Error al registrar el usuario:", error);
        alert(
          "Se produjo un error al registrar el usuario. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.subtitulo}>Registro de usuario</Text>
      <View style={styles.form}>
        <Text>Nombre:</Text>
        <TextInput
          style={estilos.textinput}
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <Text>Apellido:</Text>
        <TextInput
          style={estilos.textinput}
          placeholder="Ingresa tu apellido"
          value={apellido}
          onChangeText={setApellido}
        />
        <Text>Email:</Text>
        <TextInput
          style={estilos.textinput}
          placeholder="Ingresa tu email"
          value={correo}
          onChangeText={setCorreo}
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <Text>Contraseña:</Text>
        <TextInput
          style={estilos.textinput}
          placeholder="Ingresa tu contraseña"
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry={true}
        />
        <Text>Teléfono:</Text>
        <TextInput
          style={estilos.textinput}
          placeholder="Ingresa tu teléfono"
          value={telefono}
          onChangeText={setTelefono}
          maxLength={10}
        />
        <Text> pregunta de recuperacion por:</Text>
        <Picker
          selectedValue={preguntaRecuperacion}
          onValueChange={(itemValue, itemIndex) =>
            setPreguntaRecuperacion(itemValue)
          }
          style={estilos.textinput}
        >
          <Picker.Item label="Color Favorito" value="colorFavorito" />
          <Picker.Item label="Nombre de Mascota" value="nombreMascota" />
          <Picker.Item label="Mejor Amigo" value="mejorAmigo" />
        </Picker>
        <TextInput
          style={estilos.textinput}
          placeholder="Ingresa su respuesta"
          value={respuestaPregunta}
          onChangeText={setRespuestaPregunta}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={estilos.botonConBordeCentrado}
          onPress={handleRegistro}
        >
          <Text style={estilos.textoBoton}>Registrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate("Login")}>
          <Text style={estilos.botonSimpleSinBordeCentrado}>
            ¿Ya tienes cuenta?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEF7E1",
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  form: {
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#666",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#E2AA87",
    color: "#FFF",
    textAlign: "center",
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
  },
  registerLink: {
    color: "#E2AA87",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Registro;
