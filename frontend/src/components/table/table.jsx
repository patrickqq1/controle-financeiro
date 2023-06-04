import React, { useState } from 'react'
import {
    Box,
    Flex,
    Text,
    IconButton,
} from '@chakra-ui/react'
import { FiArrowDownCircle, FiArrowUpCircle, FiTrash, FiEdit } from "react-icons/fi"
import ModalEdit from '../modalEdit/modalEdit'
import ModalDelete from '../modalDelete/modalDelete'

const TableItens = ({ getInfo, setUpdate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [editItem, setEditItem] = useState('')

    return (
        <>
            {getInfo.map((item) => (
                <Flex
                    w='600px'
                    bg='white'
                    mt='3%'
                    key={item.id}
                    p={4}
                    justifyContent='space-between'
                    boxShadow='md'
                    borderRadius='lg'
                >
                    <Box>
                        <Text fontSize='19px' fontWeight="bold" mb={2}>{item.descricao}</Text>
                        <Text fontSize='16px' color="gray.500">
                            Valor: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.valor)}
                        </Text>
                        <Text fontSize='16px' color="gray.500">
                            Data: {new Date(item.data_acrescimo).toLocaleDateString('pt-BR')}
                        </Text>
                        <Flex mt={2}>{item.tipo === 'output' ? <FiArrowDownCircle color='red' size='8%' /> : <FiArrowUpCircle color='green' size='8%' />}</Flex>
                    </Box>
                    <Flex alignItems="center">
                        <IconButton
                            icon={<FiTrash />}
                            colorScheme='red'
                            mr={2}
                            onClick={() => {
                                setOpen(true)
                                setEditItem(item.id)
                            }}
                        />
                        <IconButton
                            icon={<FiEdit />}
                            onClick={() => {
                                setIsOpen(true)
                                setEditItem(item.id)
                            }}
                            colorScheme='twitter'
                            ml={2}
                        />
                        <ModalDelete isOpen={open} onClose={() => {
                            setOpen(false)
                            setEditItem('')
                        }} editItem={editItem} setUpdate={setUpdate} />
                        <ModalEdit isOpen={isOpen} onClose={() => {
                            setIsOpen(false)
                        }} editItem={item.id} descItem={item.descricao} setUpdate={setUpdate} oldValue={item.valor}/>
                    </Flex>
                </Flex>
            ))}

        </>
    )
}

export default TableItens
