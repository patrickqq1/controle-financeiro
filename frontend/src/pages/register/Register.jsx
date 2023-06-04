import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Flex, Link, useToast } from '@chakra-ui/react';
import { api } from '../../api/api';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const toast = useToast()
  const navigate = useNavigate();
  const [ user, setUser ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPasword, setConfirmPasword ] = useState('')
  const handleRegister = async(e) => {
    e.preventDefault();
    if (password !== confirmPasword) {
      alert('A senha e a confirmação de senha não coincidem.');
      return;
    }
    try {
      const response = await api.post('/post/user', { 
        name: user,
        email: email,
        senha: password,
       })
       alert('Criado com sucesso!')
       setUser('')
       setEmail('')
       setPassword('')
       setConfirmPasword('')
       navigate('/login')
    } catch (error) {
      alert(error)
    }
  };

  return (
    <Flex bg='red.400' minH='100vh' alignItems='center' justifyContent='center'>
      <Box p={10} bg='white' boxShadow='md' borderRadius='5%'>
        <form onSubmit={handleRegister}>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>Usuario</FormLabel>
              <Input type="text" placeholder="Digite seu Usuario" value={user} onChange={(e) => setUser(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel>Senha</FormLabel>
              <Input type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel>Digite novamente sua senha:</FormLabel>
              <Input type="password" placeholder="Digite sua senha" value={confirmPasword} onChange={(e) => setConfirmPasword(e.target.value)}/>
            </FormControl>
            <Link href='/login'>Faça o login!</Link>
            <Button type="submit" colorScheme="blue">
              Registrar
            </Button>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
};

export default Register;
