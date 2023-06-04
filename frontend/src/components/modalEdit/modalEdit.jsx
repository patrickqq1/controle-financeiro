import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Input,
    Button,
    useToast,
} from '@chakra-ui/react'
import { api } from '../../api/api'

const ModalEdit = ({isOpen, onClose, editItem, descItem, setUpdate, oldValue}) => {
    const toast = useToast()
    const [desc, setDesc] = useState(descItem)
    const [value, setValue] = useState(oldValue)
    const handleSubmit = async () => {
        const response = await api.put(`/put/editfinancs/${editItem}`, {desc: desc, value: value})
        .then((res) => {
            toast({
                title: 'Editado com sucesso',
                status: 'success',
                duration: 9000,
                isClosable: 'true',
            })
            onClose()
            setUpdate(true)
            setTimeout(() => {
                setUpdate(false)
            }, 200)
        }).catch((err) => {
            toast({
                title: 'Ocorreu um erro ao editar!',
                status: 'error',
                duration: 9000,
                isClosable: 'true',
            })
            onClose()
        });
    }
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Editar Informações</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        type='text'
                        placeholder="Descrição"
                        value={desc}
                        mb={2}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <Input 
                        type='number'
                        value={value}
                        placeholder="Valor"
                        mb={2}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <ModalFooter>
                        <Button colorScheme="green" mr={3} onClick={handleSubmit}>Salvar</Button>
                        <Button colorScheme="red" mr={3}onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default ModalEdit