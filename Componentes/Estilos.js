import { StyleSheet } from "react-native";

export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  //estilos del componente Bienvenida:
  containerBienvenida: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textoBienvenidaTitulo: {
    fontSize: 80,
    fontWeight: "bold",
  },

  subtitulo: {
    fontSize: 20,
    paddingBottom: 40,
  },
  botonSimpleSinBordeCentrado: {
    textAlign: "center",
    paddingBottom: 5,
  },
  flecha: {
    height: 20,
    width: 80,
  },
  imagen: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },

  //estilos del componente Login:
  //estilo de textinput
  textinput: {
    borderWidth: 1,
    borderColor: "#000",
    height: "5%",
    width: "80%",
    textAlign: "center",
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    //paddingStart: 20,
  },
  //estilos de boton
  botonConBordeCentrado: {
    margin: 30,
    padding: 10,
    backgroundColor: "#00b4e6",
    borderRadius: 20,
    width: "40%",
  },
  textoBoton: {
    fontSize: 18,
    textAlign: "center",
    color: "white",
  },

  //Estilos del boton
  boton: {
    //backgroundColor:'#5affcc',
    padding: 5,
    borderRadius: 5,
    borderColor: "black",
    borderWidth: 2,
    //margin:3,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  textoB: {
    color: "white",
    fontSize: 20,
  },
  logoB: {
    height: 35,
    width: 35,
    marginRight: 7,
  },
  //Estilos de la caja
  boxContainer: {
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 5,
    height: 70,
    margin: 15,
    alignItems: "flex-end",
    justifyContent: "center",
    padding: 5,
  },
  TextBox: {
    fontSize: 30,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  precio: {
    fontSize: 18,
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  //estilo de contenedor de los botones
  botonescontainer: {
    padding: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  formulario: {},
});
