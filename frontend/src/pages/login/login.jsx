import React, { useContext, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Flex, Link } from '@chakra-ui/react';
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const { login } = useContext(AuthContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password)
    } catch (error) {
      console.error(error)
    }

  };

  return (
    <Flex bg='white' minH='100vh' alignItems='center' justifyContent='center'>
      <Box p={10} bg='red.400' boxShadow='md' borderRadius='5%'>
        <form onSubmit={handleLogin}>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" bg='white' placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input type="password" bg='white' placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Link href='/register'>Registre-se!</Link>
            <Button type="submit" colorScheme="blue">
              Entrar
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Login;
