import { Flex, Heading, Table } from '@chakra-ui/react'
import React from 'react'

const AdminDashboard = () => {
  return (
    <Flex alignItems='center' justifyContent='center' direction='column' minH='100vh'>
        <Heading>USUARIOS</Heading>
        <Table>
        </Table>
    </Flex>
  )
}

export default AdminDashboard