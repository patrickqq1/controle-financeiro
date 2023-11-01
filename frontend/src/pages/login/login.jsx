import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Stack,
  Flex,
  Link,
  InputGroup,
  InputLeftElement,
  Img,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/authContext";
import { IoEnter } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { MdPassword } from "react-icons/md";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setError(
        "Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex
      bg="whitesmoke"
      minH="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Box p={10} bg="gray.200" boxShadow="md" borderRadius="5%">
        <Flex justifyContent="center">
          <Img boxSize="150px" src="undraw_savings_re_eq4w.svg" m="2%" />
        </Flex>
        <Flex mb="5%" direction="column">
          <Heading fontFamily="arial" fontStyle="italic">
            Controle Financeiro
          </Heading>
          <p>
            By{" "}
            <a
              href="https://github.com/patrickqq1"
              target="_blank"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                color: "#3B82F6",
                textDecoration: isHover ? "underline" : "none",
              }}
            >
              Patrick
            </a>
            .
          </p>
        </Flex>
        <form onSubmit={handleLogin}>
          <Stack spacing={3}>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <AiOutlineUser />
                </InputLeftElement>
                <Input
                  type="email"
                  bg="white"
                  placeholder="Digite seu email"
                  borderRadius="30px"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <MdPassword />
                </InputLeftElement>
                <Input
                  type="password"
                  bg="white"
                  placeholder="Digite sua senha"
                  borderRadius="30px"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            {error && <Box color="red.500">{error}</Box>}
            <Link href="/register" color="black">
              Registre-se!
            </Link>
            <Flex justifyContent="center">
              <Button
                type="submit"
                bg="green.300"
                color="white"
                w="100%"
                _hover={{
                  backgroundColor: "green.400",
                }}
                leftIcon={<IoEnter />}
                isLoading={loading}
              >
                Entrar
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
