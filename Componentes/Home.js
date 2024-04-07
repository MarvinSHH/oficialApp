import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import perro1 from "../assets/perro1.jpg";
import perro2 from "../assets/perro2.jpg";
import perro3 from "../assets/perro3.jpg";
import perro4 from "../assets/perro4.jpg";

import { estilos } from "./Estilos";
import perro from "../assets/perro.jpg";

const Home = () => {
  const [productoEstrella, setProductoEstrella] = useState(null);
  const navigation = useNavigation();

  // Imágenes para el carrusel
  const imagenesCarrusel = [
    { uri: perro1 },
    { uri: perro2 },
    { uri: perro3 },
    { uri: perro4 },

    // Agrega más imágenes según necesites
  ];

  useEffect(() => {
    // ID del producto que deseas mostrar
    const productoId = "65fcdf36259e727fecb2393e";

    // Asume que tu API tiene un endpoint /api/productos/:id para obtener un producto por su ID
    fetch(`https://apibackend-one.vercel.app/api/productos/${productoId}`)
      .then((response) => response.json())
      .then((data) => setProductoEstrella(data))
      .catch((error) => console.error(error));
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.itemCarrusel}>
        <Image source={item.uri} style={styles.imagenCarrusel} />
      </View>
    );
  };

  if (!productoEstrella) {
    return (
      <View style={estilos.container}>
        <Text>Cargando producto...</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={perro} style={estilos.containerBienvenida}>
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
    </ImageBackground>
  );
};

export default Home;
