import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { useToast } from "@chakra-ui/react";
import jwtDecode from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const toast = useToast()
  const navigate = useNavigate()
  const [ user, setUser ] = useState(null);
  const [ token, setToken ] = useState(null);
  const [ status, setStatus ] = useState(null);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token")
      if(token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setToken(token)
        setIsLoggedIn(true)
        const decodedToken = jwtDecode(token);
        setStatus(decodedToken.status);
        setUser(decodedToken.user);
      } else {
        setIsLoggedIn(false)
      }
    }
    checkAuth()
  }, [token])

  useEffect(() => {
    try {
      if (token) {
        const decodedToken = jwtDecode(token);
        setStatus(decodedToken.status);
      }
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  const expiresIn = () => {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 60 * 60 * 1000);
    return expirationDate
  }

  const setInfo = async (token) => {
    const decodedToken = jwtDecode(token)
    setToken(token)
    setStatus(decodedToken.status)
    setUser(decodedToken.user)
    setIsLoggedIn(true)
  }
  const login = async (email, password) => {
    try {
      const response = await api.post("/post/login", {
        email: email,
        senha: password,
      });
      const { token } = response.data;
      const expiresinhours = expiresIn();
      Cookies.set("token", token, { expires: expiresinhours });
      api.defaults.headers.Authorization = `Bearer ${token}`;
      await setInfo(token)
      navigate("/home")
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
    api.defaults.headers.Authorization = null
    setToken(null);
    setUser(null);
    setStatus(null);
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
        user,
        status,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
