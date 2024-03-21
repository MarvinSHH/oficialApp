import { View, Text, Button, TextInput, TouchableOpacity } from "react-native";
import { Boton, Caja } from "../Atomicos";
import { useNavigation } from "@react-navigation/native";
import { estilos } from "../Estilos";

export const Login = () => {
  const nav = useNavigation();
  return (
    <View style={estilos.containerBienvenida}>
      <Text style={estilos.subtitulo}>inicia sesión para tener acceso!</Text>
      <TextInput
        placeholder="e-mail"
        cursorColor={"black"}
        autoComplete="off"
        style={estilos.textinput}
      />
      <TextInput
        placeholder="Password"
        cursorColor={"black"}
        secureTextEntry={true}
        style={estilos.textinput}
      />
      <TouchableOpacity
        style={estilos.botonConBordeCentrado}
        onPress={() => nav.navigate("Home")}
      >
        <Text style={estilos.textoBoton}>Iniciar sesión</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilos.botonSimpleSinBordeCentrado}
        onPress={() => nav.navigate("k")}
      >
        <Text>olvidaste tu Contraseña?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={estilos.botonSimpleSinBordeCentrado}
        onPress={() => nav.navigate("Registrarse")}
      >
        <Text>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};
