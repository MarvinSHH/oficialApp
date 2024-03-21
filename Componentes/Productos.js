import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

const ProductosPry = () => {
  const [productos, setProductos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [productoActual, setProductoActual] = useState({});

  useEffect(() => {
    fetch("https://apibackend-one.vercel.app/api/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);

  const handleVerMas = (producto) => {
    setProductoActual(producto);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={productos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.producto}>
            <Image source={{ uri: item.ruta }} style={styles.imagen} />
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Text style={styles.precio}>${item.precio}</Text>
            <TouchableOpacity
              onPress={() => handleVerMas(item)}
              style={styles.verMas}
            >
              <Text>Ver más</Text>
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
        <View style={styles.modalView}>
          <Image
            source={{ uri: productoActual.ruta }}
            style={styles.modalImagen}
          />
          <Text style={styles.modalNombre}>{productoActual.nombre}</Text>
          <Text style={styles.modalDescripcion}>
            {productoActual.descripcion}
          </Text>
          <Text style={styles.modalPrecio}>${productoActual.precio}</Text>
          <TouchableOpacity
            style={styles.cerrarModal}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text style={styles.textoCerrarModal}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  producto: {
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    alignItems: "center",
  },
  imagen: {
    width: 100,
    height: 100,
  },
  nombre: {
    fontSize: 18,
    fontWeight: "bold",
  },
  precio: {
    fontSize: 16,
    color: "green",
  },
  verMas: {
    marginTop: 10,
    backgroundColor: "#0CB7F2",
    padding: 10,
    borderRadius: 5,
  },
  modalView: {
    margin: 20,
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
  modalImagen: {
    width: 200,
    height: 200,
    marginBottom: 15,
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
  cerrarModal: {
    marginTop: 15,
    backgroundColor: "lightcoral",
    padding: 10,
    borderRadius: 5,
  },
  textoCerrarModal: {
    color: "white",
  },
});

export default ProductosPry;
