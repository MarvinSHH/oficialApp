import React, { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import { UsuarioContext } from "./UsuarioContext";

const CerrarSesion = () => {
  const { cerrarSesion } = useContext(UsuarioContext);

  const handleCerrarSesion = () => {
    cerrarSesion();
    // Aquí puedes realizar cualquier otra acción después de cerrar la sesión, como navegar a la pantalla de inicio, por ejemplo.
  };

  return (
    <TouchableOpacity onPress={handleCerrarSesion}>
      <Text>Cerrar sesión</Text>
    </TouchableOpacity>
  );
};

export default CerrarSesion;
