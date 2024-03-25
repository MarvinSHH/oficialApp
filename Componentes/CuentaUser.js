import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { estilos } from "../Componentes/Estilos";
import { UsuarioContext } from "../Componentes/UsuarioContext"; // Importa el contexto de usuario
import { Picker } from "@react-native-picker/picker"; // Importa el componente Picker

const CuentaUser = ({ route }) => {
  const { usuario, token } = useContext(UsuarioContext); // Obtener los datos del usuario y el token del contexto de usuario

  // Inicializa datosUsuario con un objeto que contiene todas las propiedades esperadas, incluido el teléfono
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    contraseña: "",
    preguntaRecuperacion: "colorFavorito", // Valor predeterminado para la pregunta de recuperación
    respuestaPregunta: "",
    dispositivo: "",
  });

  useEffect(() => {
    // Obtener el perfil completo del usuario al cargar el componente
    obtenerPerfilUsuario();
  }, []);

  // Función para obtener el perfil completo del usuario
  const obtenerPerfilUsuario = () => {
    fetch("https://apibackend-one.vercel.app/api/usuarios/perfil", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener el perfil del usuario");
        }
        return response.json();
      })
      .then((profileData) => {
        // Actualizar los datos del usuario con los datos del perfil completo obtenido
        setDatosUsuario(profileData);
      })
      .catch((error) => {
        console.error("Error al obtener el perfil del usuario:", error);
      });
  };

  // Función para manejar la actualización de datos
  const handleUpdate = () => {
    // Validar los campos del formulario antes de actualizar los datos
    if (!validarFormulario()) {
      return;
    }

    // Realizar la solicitud PUT para actualizar los datos del usuario
    fetch(
      `https://apibackend-one.vercel.app/api/usuarios/${datosUsuario._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosUsuario),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar los datos");
        }
        return response.json();
      })
      .then((data) => {
        // Manejar la respuesta de la API, por ejemplo, mostrar un mensaje de éxito
        console.log("Datos actualizados:", data);
        Alert.alert("Éxito", "Datos actualizados correctamente");
      })
      .catch((error) => {
        // Manejar cualquier error que ocurra durante la solicitud
        console.error("Error al actualizar los datos:", error);
        Alert.alert(
          "Error",
          "Se produjo un error al actualizar los datos. Por favor, inténtalo de nuevo más tarde."
        );
      });
  };

  // Función para validar los campos del formulario
  const validarFormulario = () => {
    if (!validarNombreApellido(datosUsuario.nombre)) {
      Alert.alert("Error", "El nombre solo puede contener letras.");
      return false;
    }

    if (!validarNombreApellido(datosUsuario.apellido)) {
      Alert.alert("Error", "El apellido solo puede contener letras.");
      return false;
    }

    if (!validarCorreo(datosUsuario.correo)) {
      Alert.alert("Error", "Por favor, ingresa un correo electrónico válido.");
      return false;
    }

    if (!validarContraseña(datosUsuario.contraseña)) {
      Alert.alert("Error", "La contraseña no cumple con los requisitos.");
      return false;
    }

    if (!validarTelefono(datosUsuario.telefono)) {
      Alert.alert(
        "Error",
        "Por favor, ingresa un número de teléfono válido (10 dígitos)."
      );
      return false;
    }

    return true;
  };
  // Función para validar el nombre y el apellido (solo letras)
  const validarNombreApellido = (texto) => {
    return /^[A-Za-z]+$/.test(texto);
  };

  // Función para validar el correo electrónico
  const validarCorreo = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Función para validar la contraseña
  const validarContraseña = (contraseña) => {
    // Agrega aquí tus reglas de validación para la contraseña
    // Por ejemplo, longitud mínima, caracteres especiales, etc.
    return contraseña.length >= 8;
  };

  // Función para validar el número de teléfono (10 dígitos)
  const validarTelefono = (telefono) => {
    return /^[0-9]{10}$/.test(telefono);
  };

  // Función para alternar la visibilidad de la contraseña
  const alternarVisibilidadContraseña = () => {
    setMostrarContraseña((prevState) => !prevState);
  };

  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.subtitulo}>Edita tus datos</Text>
      <View style={estilos.form}>
        <Text>Nombre:</Text>
        <TextInput
          placeholder="Nombre"
          value={datosUsuario.nombre}
          onChangeText={(nombre) =>
            setDatosUsuario({ ...datosUsuario, nombre })
          }
          style={estilos.textinput}
        />

        <Text>Apellido:</Text>
        <TextInput
          placeholder="Apellido"
          value={datosUsuario.apellido}
          onChangeText={(apellido) =>
            setDatosUsuario({ ...datosUsuario, apellido })
          }
          style={estilos.textinput}
        />

        <Text>Correo electrónico:</Text>
        <TextInput
          placeholder="Correo electrónico"
          value={datosUsuario.correo}
          onChangeText={(correo) =>
            setDatosUsuario({ ...datosUsuario, correo })
          }
          style={estilos.textinput}
        />

        <Text>Contraseña:</Text>
        <TextInput
          placeholder="Contraseña"
          value={datosUsuario.contraseña}
          onChangeText={(contraseña) =>
            setDatosUsuario({ ...datosUsuario, contraseña })
          }
          style={estilos.textinput}
        />

        <Text>Télefono:</Text>
        <TextInput
          placeholder="Teléfono"
          maxLength={10}
          value={datosUsuario.telefono}
          onChangeText={(telefono) =>
            setDatosUsuario({ ...datosUsuario, telefono })
          }
          style={estilos.textinput}
        />
        <Text style={estilos.label}>Pregunta de recuperación:</Text>
        <Picker
          selectedValue={datosUsuario.preguntaRecuperacion}
          onValueChange={(itemValue, itemIndex) =>
            setDatosUsuario({
              ...datosUsuario,
              preguntaRecuperacion: itemValue,
            })
          }
          style={estilos.textinput}
        >
          <Picker.Item label="Color Favorito" value="colorFavorito" />
          <Picker.Item label="Nombre de Mascota" value="nombreMascota" />
          <Picker.Item label="Mejor Amigo" value="mejorAmigo" />
        </Picker>
        <TextInput
          placeholder="Respuesta pregunta"
          value={datosUsuario.respuestaPregunta}
          onChangeText={(respuestaPregunta) =>
            setDatosUsuario({ ...datosUsuario, respuestaPregunta })
          }
          style={estilos.textinput}
        />

        <Text>Dispositivo:</Text>
        <TextInput
          placeholder="Dispositivo"
          value={datosUsuario.dispositivo}
          onChangeText={(dispositivo) =>
            setDatosUsuario({ ...datosUsuario, dispositivo })
          }
          style={estilos.textinput}
        />

        {/*<Button title="Actualizar" onPress={handleUpdate} />*/}
        <TouchableOpacity
          style={estilos.botonConBordeCentrado}
          onPress={handleUpdate}
        >
          <Text style={estilos.textoBoton}>Actualizar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CuentaUser;
