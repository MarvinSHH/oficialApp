import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import { Calculadora } from "./Calculadora";
import Carrito from "./Carrito";
import Iot from "./Iot";
import Producto from "./Producto";
import { Login } from "./Public/Login";
import Productos from "./Productos";
import Imc from "./imc";
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Bienvenida from "./Bienvenida";
import Registrarse from "../Componentes/Public/Registrarse";
import QuienesSomos from "./QuienesSomos";
import Politicas from "./Politicas";
import PreguntasFrecuentes from "./PreguntasFrecuentes";
import Contacto from "./Contacto";
import AcercaDe from "./AcercaDe";

const Stack = createNativeStackNavigator();
const TabsH = createBottomTabNavigator();
const StackP = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

//navegacion principal (de login a home)
export const NavHome = () => {
  return (
    <Stack.Navigator initialRouteName="Bienvenida">
      <Stack.Screen
        name="Bienvenida"
        component={Bienvenida}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registrarse"
        component={Registrarse}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={MiDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

//navegacion secundaria (tabs de home) no se usa:
export const NavTabsHome = () => {
  return (
    <TabsH.Navigator>
      <TabsH.Screen
        name={"Principal"}
        component={Home}
        options={{
          headerStyle: {
            backgroundColor: "#9ad4ff", // Establece el color de fondo del header
          },
          tabBarIcon: () => (
            <FontAwesome name="home" size={30} color={"#001449"} />
          ),
        }}
      />
      <TabsH.Screen
        name={"Productos"}
        component={Productos}
        options={{
          headerStyle: {
            backgroundColor: "#9ad4ff",
          },
          tabBarIcon: () => (
            <FontAwesome name="shopping-bag" size={30} color={"#001449"} />
          ),
        }}
      />
      <TabsH.Screen
        name="Dispensador"
        component={Iot}
        options={{
          headerStyle: {
            backgroundColor: "#9ad4ff",
          },
          tabBarIcon: () => (
            <FontAwesome name="android" size={30} color={"#001449"} />
          ),
        }}
      />
      <TabsH.Screen
        name="Cuenta"
        component={StackProductos}
        options={{
          headerStyle: {
            backgroundColor: "#9ad4ff",
          },
          tabBarIcon: () => (
            <FontAwesome name="user" size={30} color={"#001449"} />
          ),
        }}
      />
    </TabsH.Navigator>
  );
};

//navegacion de productos a producto detalle
export const StackProductos = () => {
  return (
    <StackP.Navigator>
      <StackP.Screen
        name="Productos2"
        component={Productos}
        options={{ headerShown: false }}
      />
      <StackP.Screen name="Producto" component={Producto} />
    </StackP.Navigator>
  );
};

export const MiDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        options={{
          headerShown: false,
          drawerIcon: () => <FontAwesome name="home" size={30} />,
        }}
        component={NavTabsHome}
      />

      <Drawer.Screen name="Quienes somos" component={QuienesSomos} />
      <Drawer.Screen name="Politicas" component={Politicas} />
      <Drawer.Screen
        name="Preguntas frecuentes"
        component={PreguntasFrecuentes}
      />
      <Drawer.Screen name="Contacto" component={Contacto} />
      <Drawer.Screen name="Acerca de" component={AcercaDe} />
    </Drawer.Navigator>
  );
};
