import React, { useContext } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { FontAwesome } from "@expo/vector-icons";
import { UsuarioContext } from "../Componentes/UsuarioContext";

const CerrarSesionScreen = ({ navigation }) => {
  const { setUsuario, setToken } = useContext(UsuarioContext);

  const handleCerrarSesion = () => {
    // Elimina el token de autenticación
    localStorage.removeItem("token"); // o cualquier método que utilices para almacenar el token

    // Limpia los datos del usuario
    setUsuario(null);
    setToken(null);

    // Redirige al usuario a la pantalla de inicio de sesión
    navigation.navigate("Login");
  };

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Cerrar Sesión"
        icon={({ color, size }) => (
          <FontAwesome name="sign-out" size={size} color={color} />
        )}
        onPress={handleCerrarSesion}
      />
    </DrawerContentScrollView>
  );
};

export default CerrarSesionScreen;
