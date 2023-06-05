import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    Stack,
  } from '@chakra-ui/react'

const ModalSalario = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
        <Button onClick={onOpen} bg='yellow' color='black' _hover={{
            background: '#949b03'
        }}>Cota mensal</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Salario e meta mensal</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack>
                        <Input type='text' placeholder='Digite seu salário' />
                        <Input type='text' placeholder='Digite sua cota mensal' />
                    </Stack>
                </ModalBody>
                <ModalFooter>
                    <Stack direction='row'>
                        <Button colorScheme='green'>Adicionar</Button>
                        <Button onClick={onClose} bg='red' color='white' _hover={{
                            background: "#b10000"
                        }}>Cancelar</Button>
                    </Stack>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
  )
}

export default ModalSalario