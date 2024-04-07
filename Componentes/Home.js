import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Carousel from "react-native-snap-carousel";
import { estilos } from "./Estilos";
import perro from "../assets/perro.jpg";
import perro1 from "../assets/perro1.jpg";
import perro2 from "../assets/perro2.jpg";
import perro3 from "../assets/perro3.jpg";
import perro4 from "../assets/perro4.jpg";

const Home = () => {
  const [productoEstrella, setProductoEstrella] = useState(null);
  const navigation = useNavigation();

  // Imágenes para el carrusel
  const imagenesCarrusel = [
    { uri: perro1 },
    { uri: perro2 },
    { uri: perro3 },
    { uri: perro4 },
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
      <View style={estilos.itemCarrusel}>
        <ImageBackground source={item} style={estilos.imagenCarrusel}>
          <Text style={estilos.textoCarrusel}>
            Producto Estrella {index + 1}
          </Text>
        </ImageBackground>
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
      <Text style={estilos.titulo}>Productos Destacados</Text>
      <Carousel
        data={imagenesCarrusel}
        renderItem={renderItem}
        sliderWidth={300}
        itemWidth={300}
        layout="default"
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
      />
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
