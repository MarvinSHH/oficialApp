// DetallesDispositivo.js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const DetallesDispositivo = ({ route, navigation }) => {
  // Recibiendo los detalles del dispositivo
  const { dispositivo } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del Dispositivo</Text>
      {/* Muestra aquí los detalles de tu dispositivo, por ejemplo: */}
      <Text>MAC Address: {dispositivo.macAddress}</Text>
      {/* Agrega más detalles según tu necesidad */}

      {/* Otras opciones */}
      <Button
        title="Otra Acción"
        onPress={() => console.log("Realizando otra acción...")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default DetallesDispositivo;
