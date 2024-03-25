import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { estilos } from "../Estilos";
import { UsuarioContext } from "../UsuarioContext"; // Importa el contexto de usuario
import { color } from "react-native-elements/dist/helpers";
export const Login = () => {
  const nav = useNavigation();
  const { usuario, setUsuario, setToken } = useContext(UsuarioContext); // Obtener el estado y la función del contexto de usuario

  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

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
        // Actualiza el estado del usuario con los datos recibidos utilizando la función del contexto
        setUsuario(data.user);
        setToken(data.token);

        // Muestra una alerta con los datos del usuario
        Alert.alert(
          "Inicio de sesión exitoso",
          `Bienvenido ${data.user.nombre} ${data.user.apellido}`
        );
        // Realiza una solicitud al endpoint /usuarios/perfil para obtener más detalles del perfil del usuario
        fetch("https://apibackend-one.vercel.app/api/usuarios/perfil", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        })
          .then((response) => response.json())
          .then((profileData) => {
            // Aquí puedes manejar los datos del perfil del usuario
            console.log("Datos del perfil del usuario:", profileData);
          })
          .catch((error) => {
            console.error("Error al obtener el perfil del usuario:", error);
          });
        // Redirige al usuario a la pantalla principal
        nav.navigate("Home");
      })
      .catch((error) => {
        Alert.alert(
          "Error",
          "Se produjo un error al iniciar sesión. Por favor, inténtalo de nuevo más tarde."
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
        onPress={() => setModalVisible(true)}
      >
        <Text>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilos.botonSimpleSinBordeCentrado}
        onPress={() => nav.navigate("Registrarse")}
      >
        <Text>Registrarse</Text>
      </TouchableOpacity>
      {/* Modal para recuperar contraseña */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
            <Text style={estilos.modalTitle}>Recuperar Contraseña</Text>
            <TouchableOpacity
              style={estilos.modalOption}
              onPress={() => {
                setModalVisible(false);
                nav.navigate("RecuperarContraseña");
              }}
            >
              <Text style={estilos.modalOptionText}>
                Por correo electrónico
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={estilos.modalOption}
              onPress={() => {
                setModalVisible(false);
                nav.navigate("RecuperarConstraseñaPregunta");
              }}
            >
              <Text style={estilos.modalOptionText}>
                Por pregunta de recuperación
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
