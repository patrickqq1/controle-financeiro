import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useToast } from "@chakra-ui/react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const toast = useToast()
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const recoveredUser = Cookies.get("user");
    const recoveredStatus = Cookies.get("status");

    if (recoveredUser && recoveredStatus) {
      setUser(JSON.parse(recoveredUser));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const token = Cookies.get("token");
    if (isLoggedIn) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      api.defaults.headers.Authorization = null;
    }
  }, [isLoggedIn]);

  const expiresIn = () => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000);
    return expirationDate
  }
  const login = async (email, password) => {
    try {
      const response = await api.post("/post/login", {
        email: email,
        senha: password,
      });
      const { token, user, status } = response.data;
      
      const expiresinhours = expiresIn()
      Cookies.set("token", token, { expires: expiresinhours });
      Cookies.set("user", JSON.stringify(user));
      Cookies.set("status", status);

      api.defaults.headers.Authorization = `Bearer ${token}`
      setUser(user);
      setIsLoggedIn(true);

      navigate("/home");
    } catch (error) {
      console.error(error);

      if (error.response) {
        const statusCode = error.response.status;

        if (statusCode === 404) {
          toast({
            title: "Usuario não existe",
            description: "O usuario não existe! Verifique suas credenciais.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        } else if (statusCode === 401) {
          toast({
            title: "Senha Incorreta",
            description: "Verifique sua senha!",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "Login Failed",
          description: "An error occurred during login.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    Cookies.remove("status");
    api.defaults.headers.Authorization = null

    setUser(null);
    setIsLoggedIn(false);

    navigate("/login");
  };

  const isAutenticated = () => {
    return Cookies.get('token') ? true : false
  }

  return (
    <AuthContext.Provider
      value={{
        authenticated:
          isAutenticated(),
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
