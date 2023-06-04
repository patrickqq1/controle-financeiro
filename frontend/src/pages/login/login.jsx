import React, { useContext, useState } from 'react';
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
} from '@chakra-ui/react';
import { AuthContext } from '../../context/authContext';
import { IoEnter } from 'react-icons/io5';
import { AiOutlineUser } from 'react-icons/ai';
import { MdPassword } from 'react-icons/md';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      setError('Ocorreu um erro ao fazer login. Verifique suas credenciais e tente novamente.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex bg="green.200" minH="100vh" alignItems="center" direction="column">
      <Img boxSize="150px" objectFit="cover" src="login.png" borderRadius="full" m="2%" bg="gray.200" border="2px" />
      <Heading mb="2%">Controle Financeiro</Heading>
      <Box p={10} bg="black" boxShadow="md" borderRadius="5%">
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            {error && <Box color="red.500">{error}</Box>}
            <Link href="/register" color="white">
              Registre-se!
            </Link>
            <Flex justifyContent="center">
              <Button type="submit" bg="red" color="white" w="40%" leftIcon={<IoEnter />} disabled={loading}>
                {loading ? <Spinner size="sm" color="white" /> : 'Entrar'}
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
