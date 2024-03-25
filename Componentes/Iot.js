import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Iot = () => {
  const [macAddress, setMacAddress] = useState("");
  const [dispositivosRegistrados, setDispositivosRegistrados] = useState([]);
  const navigation = useNavigation();

  const registrarDispositivo = async () => {
    try {
      const url = "https://apibackend-one.vercel.app/api/usuarios";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dispositivo: macAddress,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "No se pudo registrar el dispositivo."
        );
      }

      const data = await response.json();
      setDispositivosRegistrados((current) => [...current, data]);

      //setDispositivosRegistrados((current) => [...current, data]);

      Alert.alert(
        "Registro Exitoso",
        "El dispositivo se ha registrado correctamente."
      );
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ingrese la dirección MAC del dispositivo"
        value={macAddress}
        onChangeText={setMacAddress}
      />
      <Button title="Registrar Dispositivo" onPress={registrarDispositivo} />
      <Button
        title="Ver dispositivos"
        onPress={() => navigation.navigate("DetallesDispositivo")}
      />

      <View style={styles.listContainer}>
        {dispositivosRegistrados.map((dispositivo, index) => (
          <Text key={index} style={styles.dispositivoText}>
            Dispositivo {index + 1}: {dispositivo.dispositivo}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  listContainer: {
    marginTop: 20,
    width: "100%",
  },
  dispositivoText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default Iot;
