import React, { useState } from 'react'
import { Box, Card, CardBody, Input, Heading, Stack, Progress, Text, IconButton, Popover, PopoverTrigger, Flex, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody, InputLeftAddon, InputGroup, Button, useDisclosure, Divider, useToast } from '@chakra-ui/react'
import { HiPencilAlt, HiOutlinePlus, HiOutlineMinus } from 'react-icons/hi'
import { api } from '../../api/api'
import { FiTrash } from 'react-icons/fi'

const Goals = ({ meta, myValue, metaValue, type, date, id, setUpdate }) => {
    const [valueAdd, setValueAdd] = useState(myValue)
    const [color, setColor] = useState('blue.800')
    const [alert, setAlert] = useState('')
    const { onOpen, onClose, isOpen } = useDisclosure()
    const toast = useToast()

    const handleSubmit = async (e) => {
        if (!valueAdd) {
            setColor('orange.200')
            setAlert('Preencha todos os campos! 😒😒')
            setTimeout(() => {
                onClose()
            }, 1000)
            setTimeout(() => {
                setColor('blue.800')
                setAlert('')
            }, 1300)
            return;
        }
        const response = await api.put(`/put/goals/add/${id}`, { valueAdd })
            .then(() => {
                setColor('green')
                setUpdate(true)
                setTimeout(() => {
                    onClose()
                    setUpdate(false)
                }, 1000)
                setTimeout(() => {
                    setColor('blue.800')
                }, 1300)
            })
            .catch((err) => {
                alert(err)
            })
    }
    const handleRemove = async (e) => {
        if (!valueAdd) {
            setColor('orange.200')
            setAlert('Preencha todos os campos! 😒😒')
            setTimeout(() => {
                onClose()
            }, 1000)
            setTimeout(() => {
                setColor('blue.800')
                setAlert('')
            }, 1300)
            return;
        }
        const response = await api.put(`/put/goals/remove/${id}`, { valueAdd })
            .then(() => {
                setColor('red')
                setUpdate(true)
                setTimeout(() => {
                    onClose()
                    setUpdate(false)
                }, 1000)
                setTimeout(() => {
                    setColor('blue.800')
                }, 1300)
            })
            .catch((err) => {
                alert(err)
            })
    }
    const handleDelete = async () => {
            const response = await api.delete(`/delete/goals/${id}`)
            .then((res) => {
                toast({
                    title: 'Deletado com sucesso!',
                    status: 'success',
                    duration: 9000,
                    isClosable: 'true',
                })
                setUpdate(true)
                setTimeout(() => {
                    setUpdate(false)
                }, 1000)
            }).catch((err) => {
                toast({
                    title: 'Ocorreu um erro!',
                    status: 'error',
                    duration: 9000,
                    isClosable: 'true',
                })
            });
    }
    const metaPorc = () => {
        return (myValue / metaValue) * 100
    }
    return (
        <Card boxShadow='md' bg='gray.300'>
            <CardBody>
                <Stack mb='3'>
                    <Heading size='md'>{meta}</Heading>
                    <Text>Limite: {new Date(date).toLocaleDateString('pt-BR')}</Text>
                    <Box>
                        <Heading size='xs' mb='2'>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(myValue)} / {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(metaValue)}</Heading>
                        <Progress value={metaPorc()} colorScheme='green' />
                        <Text>{parseInt(metaPorc())}%</Text>
                    </Box>
                    <Text size='xl'>Tipo: {type}</Text>
                </Stack>
                <Stack direction='row' spacing='20'>
                    <IconButton variant='ghost' size='sm' icon={<FiTrash color='black' />} onClick={handleDelete} sx={{
                        "&:hover": {
                            backgroundColor: "#f07067",
                        },
                    }} />
                    <Popover
                        isOpen={isOpen}
                        onOpen={onOpen}
                        onClose={onClose}
                        placement='right'
                        closeOnBlur={false}
                    >
                        <PopoverTrigger>
                            <IconButton variant="ghost" size='sm' icon={<HiPencilAlt />} />
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent color='white ' bg={color}>
                                <PopoverArrow />
                                <PopoverHeader>Adicione dinheiro:</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Box m='1'>
                                        <InputGroup size='sm' color='black' mb='2'>
                                            <InputLeftAddon children='R$' />
                                            <Input
                                                type='number'
                                                bg='white'
                                                placeholder='Adicione uma quantia'
                                                value={valueAdd}
                                                onChange={(e) => setValueAdd(e.target.value)} />

                                        </InputGroup>
                                        <Text m='3'>{alert}</Text>
                                        <Flex justifyContent='center'>
                                            <Stack direction='row'>
                                                <Button
                                                    onClick={handleSubmit}
                                                    leftIcon={<HiOutlinePlus />}
                                                    colorScheme='whatsapp'
                                                    color='black'
                                                    size='sm'>Adicionar
                                                </Button>
                                                <Button
                                                    onClick={handleRemove}
                                                    leftIcon={<HiOutlineMinus />}
                                                    colorScheme='red'
                                                    color='black'
                                                    size='sm'>Remover
                                                </Button>
                                            </Stack>
                                        </Flex>
                                    </Box>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </Stack>
            </CardBody>
        </Card>
    )
}

export default Goals