// UsuarioContext.js
import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null); // Nuevo estado para almacenar el token de autenticación

  // Función para cerrar sesión
  const cerrarSesion = () => {
    setUsuario(null);
    setToken(null);
  };

  return (
    <UsuarioContext.Provider
      value={{ usuario, setUsuario, token, setToken, cerrarSesion }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};
