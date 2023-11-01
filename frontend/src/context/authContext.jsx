import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useToast } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();
    return currentTime > expirationTime;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");
      if (token) {
        if (isTokenExpired(token)) {
          toast({
            title: "Sessão expirada",
            description: "Sua sessão expirou. Faça login novamente.",
            status: "warning",
            duration: 3000,
            isClosable: true,
          });
          logout();
        } else {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          setIsLoggedIn(true);
          const decodedToken = jwtDecode(token);
          setStatus(decodedToken.status);
          setUser(decodedToken.user);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [toast]);

  const getExpirationDate = () => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000);
    return expirationDate;
  };

  const setInfo = (token, decodedToken) => {
    setToken(token);
    setStatus(decodedToken.status);
    setUser(decodedToken.user);
    setIsLoggedIn(true);
  };

  const login = async (email, password) => {
    try {
      const response = await api.post("/post/login", {
        email: email,
        senha: password,
      });
      const { token } = response.data;
      const expirationDate = getExpirationDate();
      Cookies.set("token", token, { expires: expirationDate });
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const decodedToken = jwtDecode(token);
      await setInfo(token, decodedToken);
      navigate("/home");
    } catch (error) {
      console.error(error);
      toast({
        title: "Erro na autenticação!",
        description: error?.response?.data?.message || "",
        status: "error",
        duration: 2000,
      })
    }
  };

  const logout = () => {
    Cookies.remove("token");
    api.defaults.headers.Authorization = null;
    setToken(null);
    setUser(null);
    setStatus(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  const isAuthenticated = () => {
    return Cookies.get("token") ? true : false;
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: isAuthenticated(),
        isLoggedIn,
        login,
        logout,
        user,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
