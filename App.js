import { StyleSheet, Text, View } from "react-native";
import Home from "./Componentes/Home";
import { NavigationContainer } from "@react-navigation/native";
import { NavHome } from "./Componentes/Navegacion";

export default function App() {
  return (
    <NavigationContainer>
      <NavHome />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a7d9f3",
    alignItems: "stretch",
    justifyContent: "center",
  },
  texto: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  encabezado: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#227edb",
  },
  cuerpo: {
    flex: 8,
  },
  pie: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#227edb",
  },
});
