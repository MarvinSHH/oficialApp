import { Text, View, StyleSheet } from "react-native";
import React, { Component } from "react";
import { ScrollView } from "react-native-gesture-handler";

export class AcercaDe extends Component {
  render() {
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.texto}>
            Esta aplicación fue creada como proyecto final por alumnos del
            quinto cuatrimestre grupo "A".
          </Text>
          <Text style={styles.texto}></Text>
          <Text style={styles.texto}>
            Los integrantes del equipo de desarrollo son:
          </Text>
          <Text style={styles.texto}>- Marvin Tristan Sanjuan Hernandez</Text>
          <Text style={styles.texto}>- Carlos Daniel Padilla Espinoza</Text>
          <Text style={styles.texto}>- Carlos Daniel Hernandez Hernandez</Text>
          <Text style={styles.texto}>- Eulogio Medina Félix</Text>
          <Text style={styles.texto}>
            Como objetivo principal: proporcionar una herramienta útil para el
            usuario y la manipulacion IoT de un dispensasdor de alimentos.
          </Text>
          <Text style={styles.texto}>
            Esperamos que disfruten usando de nuestra aplicación tanto como
            nosotros disfrutamos creándola!.
          </Text>

          <Text style={styles.texto}>versión 1</Text>
        </View>
      </ScrollView>
    );
  }
}

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

export default AcercaDe;
