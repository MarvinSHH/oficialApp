import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

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
  const [dispositivo, setDispositivo] = useState("");

  const handleRegistro = () => {
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
      dispositivo,
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
    <View style={styles.container}>
      <Text style={styles.header}>Registro de usuario</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <Text style={styles.label}>Apellido:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu apellido"
          value={apellido}
          onChangeText={setApellido}
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu email"
          value={correo}
          onChangeText={setCorreo}
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu contraseña"
          value={contraseña}
          onChangeText={setContraseña}
          secureTextEntry={true}
        />
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu teléfono"
          value={telefono}
          onChangeText={setTelefono}
          maxLength={10}
          keyboardType="phone-pad"
        />
        <Text style={styles.label}> pregunta de recuperacion por:</Text>
        <Picker
          selectedValue={preguntaRecuperacion}
          onValueChange={(itemValue, itemIndex) =>
            setPreguntaRecuperacion(itemValue)
          }
          style={styles.input}
        >
          <Picker.Item label="Color Favorito" value="colorFavorito" />
          <Picker.Item label="Nombre de Mascota" value="nombreMascota" />
          <Picker.Item label="Mejor Amigo" value="mejorAmigo" />
        </Picker>
        <TextInput
          style={styles.input}
          placeholder="Ingresa su respuesta"
          value={respuestaPregunta}
          onChangeText={setRespuestaPregunta}
          secureTextEntry={true}
        />

        <Text style={styles.label}>Dispositivo:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu dispositivo"
          value={dispositivo}
          onChangeText={setDispositivo}
          secureTextEntry={true}
          maxLength={10}
        />
        <TouchableOpacity onPress={handleRegistro}>
          <Text style={styles.loginButton}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => nav.navigate("Login")}>
          <Text style={styles.registerLink}>
            ¿Ya tienes cuenta? Presiona aquí para iniciar sesión
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
    width: "100%",
    maxWidth: 400,
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
