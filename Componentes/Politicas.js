import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

const Politicas = () => {
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
    <View style={styles.container}>
      <Text style={styles.titulo}>Politicas y términos de privacidad</Text>
      {empresa && (
        <>
          <Text>Políticas: {empresa.politicas}</Text>
          <Text>Términos: {empresa.terminos}</Text>
          <Text>Privacidad: {empresa.privacidad}</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default Politicas;
