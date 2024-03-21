import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { estilos } from "./Estilos";

const Home = () => {
  const [productoEstrella, setProductoEstrella] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    // ID del producto que deseas mostrar
    const productoId = "65fb1753b73bc5d9b6f62b44";

    // Asume que tu API tiene un endpoint /api/productos/:id para obtener un producto por su ID
    fetch(`https://apibackend-one.vercel.app/api/productos/${productoId}`)
      .then((response) => response.json())
      .then((data) => setProductoEstrella(data))
      .catch((error) => console.error(error));
  }, []);

  if (!productoEstrella) {
    return (
      <View style={estilos.container}>
        <Text>Cargando producto...</Text>
      </View>
    );
  }

  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.titulo}>Producto Estrella</Text>
      <Image source={{ uri: productoEstrella.ruta }} style={estilos.imagen} />
      <Text style={estilos.subtitulo}>{productoEstrella.nombre}</Text>
      <Text style={estilos.precio}>{`$${productoEstrella.precio}`}</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Productos", {
            productoId: productoEstrella._id,
          })
        }
        style={estilos.botonConBordeCentrado}
      >
        <Text style={estilos.textoBoton}>Ver más</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
