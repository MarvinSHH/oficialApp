import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker } from "react-native-maps";

const Contacto = () => {
  const [empresa, setEmpresa] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("https://apibackend-one.vercel.app/api/empresas")
      .then((res) => res.json())
      .then((data) => {
        setEmpresa(data[0]); // Asumiendo que la API devuelve un arreglo y quieres el primer objeto
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la empresa:", error);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {empresa && (
          <>
            <Text style={styles.texto}> {empresa.contacto}</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825, // Latitud inicial (debes obtenerla de tus datos de empresa)
                longitude: -122.4324, // Longitud inicial (debes obtenerla de tus datos de empresa)
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: 37.78825, // Latitud del marcador (debes obtenerla de tus datos de empresa)
                  longitude: -122.4324, // Longitud del marcador (debes obtenerla de tus datos de empresa)
                }}
                title={"Ubicación de la empresa"}
                description={"Descripción de la ubicación de la empresa"}
              />
            </MapView>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: "#daebff",
  },
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    //minHeight: 300, // Establece una altura mínima para todas las cajas
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#005f73",
  },
  texto: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 24,
    color: "#001219",
  },
  map: {
    width: "100%",
    height: 400, // Altura deseada del mapa
  },
});

export default Contacto;
