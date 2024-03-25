// UsuarioContext.js
import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null); // Nuevo estado para almacenar el token de autenticación

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario, token, setToken }}>
      {children}
    </UsuarioContext.Provider>
  );
};
