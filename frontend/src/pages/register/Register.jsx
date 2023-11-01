import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Flex,
  Link,
  useToast,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { api } from "../../api/api";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; // Importe os ícones que deseja usar

const Register = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Corrigi o nome da variável

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!user || !email || !password || !confirmPassword) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      alert("A senha e a confirmação de senha não coincidem.");
      return;
    }
    try {
      const response = await api.post("/post/user", {
        name: user,
        email: email,
        senha: password,
      });
      toast({
        title: "Sucesso!",
        description: "Usuário cadastrado com sucesso.",
        status: "success",
        duration: 5000,
      });
      setUser("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message ??
          "Ocorreu um erro ao tentar realizar o cadastro.",
        status: "error",
        duration: 2000,
      });
    }
  };

  return (
    <Flex
      bg="whitesmoke"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Box p={10} bg="gray.200" boxShadow="md" borderRadius="10px">
        <form onSubmit={handleRegister}>
          <FormControl>
            <Stack spacing={3}>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaUser />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Digite seu Usuário"
                  value={user}
                  bg="white"
                  onChange={(e) => setUser(e.target.value)}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaEnvelope />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  bg="white"
                  onChange={(e) => setEmail(e.target.value)}
                  leftIcon={<FaEnvelope />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaLock />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  bg="white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<FaLock />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <FaLock />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Digite sua senha novamente"
                  bg="white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  leftIcon={<FaLock />}
                />
              </InputGroup>
            </Stack>
          </FormControl>
          <Flex direction="column" mt="10px">
            <Link href="/login">Faça o login!</Link>
            <Button type="submit" bg="green.400" color="white">
              Registrar
            </Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
