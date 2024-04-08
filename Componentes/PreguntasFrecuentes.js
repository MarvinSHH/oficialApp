import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const PreguntasFrecuentes = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://apibackend-one.vercel.app/api/empresas/preguntas-frecuentes")
      .then((res) => res.json())
      .then((data) => {
        setPreguntas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener las preguntas frecuentes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      {preguntas.map((pregunta, index) => (
        <View key={index} style={styles.container}>
          <Text>Pregunta {index + 1}</Text>
          <Text style={styles.texto}>Pregunta: {pregunta.pregunta}</Text>
          <Text style={styles.texto}>Respuesta: {pregunta.respuesta}</Text>
        </View>
      ))}
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
  },
  titulo: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#005f73",
  },
  texto: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    color: "#001219",
  },
});

export default PreguntasFrecuentes;
