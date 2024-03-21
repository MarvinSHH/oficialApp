import React from "react";
import { View, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { estilos } from "./Estilos";
import { TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import flechaDelgada from "../assets/flechaDelgada.png";

const Bienvenida = () => {
  const navigation = useNavigation();

  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.textoBienvenidaTitulo}>¡Hola!</Text>
      <Text style={estilos.subtitulo}>Un gusto saludarte!</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={estilos.botonSimpleSinBordeCentrado}>Siguiente</Text>
        <Image style={estilos.flecha} source={flechaDelgada}></Image>
      </TouchableOpacity>
    </View>
  );
};

export default Bienvenida;
