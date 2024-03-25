import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";

const QuienesSomos = () => {
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
            <Text style={styles.texto}>Descripción: {empresa.descripcion}</Text>
          </>
        )}
      </View>
      <View style={styles.container}>
        {empresa && (
          <>
            <Text style={styles.texto}>Misión: {empresa.mision}</Text>
          </>
        )}
      </View>
      <View style={styles.container}>
        {empresa && (
          <>
            <Text style={styles.texto}>Visión: {empresa.vision}</Text>
          </>
        )}
      </View>
      <View style={styles.container}>
        {empresa && (
          <>
            <Text style={styles.texto}>Valores: {empresa.valores}</Text>
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
});

export default QuienesSomos;
