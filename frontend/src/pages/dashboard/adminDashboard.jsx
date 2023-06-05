import { Flex, Heading, IconButton, Stack, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../api/api'
import { RiEdit2Line, RiLockUnlockLine, RiRepeatLine } from 'react-icons/ri';

const AdminDashboard = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    try {
      const response = await api.get('/getusers')
      setUsers(response.data)
    } catch (error) {
      console.error
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <Flex alignItems='center' justifyContent='center' direction='column' minH='100vh' bg='blue.400'>
      <Heading>USUARIOS</Heading>
      <TableContainer borderRadius='3%'>
        <Table>
          <Thead bg='#ccc'>
            <Tr>
              <Th>Usuario</Th>
              <Th>Email</Th>
              <Th>Nivel</Th>
              <Th>Ação</Th>
            </Tr>
          </Thead>
          <Tbody bg='#89ff74ca'>
            {users.map((user) => (
              <Tr key={user.id}>
                <Th p='3'>{user.nome}</Th>
                <Th p='3'>{user.email}</Th>
                <Th p='3'>{user.status === '1' ? 'Usuário' : 'Administrador'}</Th>
                <Th>
                  <Stack direction='row'>
                    <IconButton
                      size='sm'
                      aria-label='Editar senha'
                      bg='red.300'
                      icon={<RiLockUnlockLine />}
                    />
                    <IconButton
                      size='sm'
                      aria-label='Trocar função'
                      bg='blue.300'
                      icon={<RiRepeatLine />}
                    />
                  </Stack>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  )
}

export default AdminDashboard