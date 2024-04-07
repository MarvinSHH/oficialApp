import { ImageBackground, StyleSheet } from "react-native";
export const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  containeriot: {},
  //estilos del componente Bienvenida:
  containerBienvenida: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contenedorBoton: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 20, // Ajusta el margen inferior según tu preferencia
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
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  contenedorMensaje: {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Fondo semi-transparente
    borderRadius: 10, // Bordes redondeados
    padding: 20, // Espaciado interno
  },

  //estilos del componente Login:
  //estilo de textinput
  textinput: {
    borderWidth: 1,
    borderColor: "#000",
    height: "5%",
    width: "80%",
    textAlign: "center",
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: "#fff",

    //paddingStart: 20,
  },
  form: {
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 20,
  },
  //estilos de boton
  botonConBordeCentrado: {
    margin: 30,
    padding: 10,
    backgroundColor: "#00b4e6",
    borderRadius: 20,
    width: "40%",
  },
  botonConBordeCentradoRojo: {
    margin: 30,
    padding: 10,
    backgroundColor: "#Ef5335",
    borderRadius: 20,
    width: "40%",
  },
  inputBusqueda: {
    flex: 1, // Ajusta el ancho para que ocupe todo el espacio disponible
    marginHorizontal: 12, // Cambia 'margin' a 'marginHorizontal' para agregar espacio horizontal
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    borderRadius: 20,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 16,
    textAlign: "center",
  },
  itemCarrusel: {
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: "center",
    justifyContent: "center",
  },
  imagenCarrusel: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
});
