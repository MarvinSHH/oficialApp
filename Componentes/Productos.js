import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import { estilos } from "./Estilos";
import { Icon } from "react-native-elements";

const ProductosPry = () => {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoActual, setProductoActual] = useState({});
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = () => {
    fetch("https://apibackend-one.vercel.app/api/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  };

  const handleBusqueda = (text) => {
    setBusqueda(text);
    if (text.trim() === "") {
      fetchProductos();
    } else {
      const filteredProductos = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(text.toLowerCase())
      );
      setProductos(filteredProductos);
    }
  };

  const handleVerMas = (producto) => {
    setProductoActual(producto);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={estilos.inputBusqueda}
          onChangeText={handleBusqueda}
          value={busqueda}
          placeholder="Buscar producto..."
        />
        <Icon
          name="search"
          type="font-awesome"
          style={{ marginRight: 10 }}
          onPress={() => handleBusqueda(busqueda)}
        />
      </View>

      <FlatList
        data={productos}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.producto}>
            <Image source={{ uri: item.ruta }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
            <TouchableOpacity
              onPress={() => handleVerMas(item)}
              style={estilos.botonConBordeCentrado}
            >
              <Text style={estilos.textoBoton}>Ver detalles</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalNombre}>{productoActual.nombre}</Text>
            <Text style={styles.modalDescripcion}>
              {productoActual.descripcion}
            </Text>
            <Text style={styles.modalPrecio}>${productoActual.precio}</Text>
            <TouchableOpacity
              style={estilos.botonConBordeCentradoRojo}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={estilos.textoBoton}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#daebff",
    paddingTop: 20,
  },
  producto: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
    borderRadius: 20,
  },
  imagen: {
    width: 300,
    height: 300,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  precio: {
    fontSize: 16,
    color: "green",
  },
  modalView: {
    marginTop: 200,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalNombre: {
    fontSize: 22,
    fontWeight: "bold",
  },
  modalDescripcion: {
    fontSize: 16,
  },
  modalPrecio: {
    fontSize: 18,
    color: "green",
  },
});

export default ProductosPry;
