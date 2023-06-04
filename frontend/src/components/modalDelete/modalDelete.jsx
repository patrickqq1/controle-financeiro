import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    Text,
    Flex,
    useToast
} from '@chakra-ui/react';
import { api } from '../../api/api';

const ModalDelete = ({ isOpen, onClose, editItem, setUpdate }) => {
    const toast = useToast()
    const handleDelete = async() => {
        const response = await api.delete(`/delete/financs/${editItem}`)
        .then((res) => {
            toast({
                status: 'success',
                title: 'Deletado com sucesso!',
                isClosable: true,
                duration: 9000,
            })
            setUpdate(true)
            setTimeout(() => {
                setUpdate(false)
            }, 200)
            onClose(false)
        }).catch((err) => {
            console.error(err)
            toast({
                status: 'error',
                title: 'Ocorreu um erro',
                description: err.message,
                isClosable: true,
                duration: 9000,
            })
        });
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader bg='gray.200' borderRadius='md'>Deletar finança</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Tem certeza que quer deletar?</Text>
                </ModalBody>
                <ModalFooter>
                    <Flex dir='row'>
                        <Button colorScheme="green" mr={2} onClick={handleDelete}>Sim</Button>
                        <Button colorScheme="red" ml={2} onClick={() => onClose(false)}>Cancelar</Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalDelete;
