import React, { useState } from 'react'
import {
  Select,
  IconButton,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Img,
  Text,
  Flex,
  Alert,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react';
import { GoPlus } from 'react-icons/go'
import Despimage from '/3580135.png'
import { FcMoneyTransfer } from 'react-icons/fc'
import { api } from '../../api/api';

const FormMetas = ({ openDesp, setOpenDesp, update }) => {
  const obterDataSubtraida = () => {
    const dataAtual = new Date();
    dataAtual.setHours(dataAtual.getHours() - 3);
    const novaData = dataAtual.toISOString().substr(0, 10);
    return novaData;
  }
  const obterdiaHj = obterDataSubtraida()
  const [desc, setDesc] = useState()
  const [value, setValue] = useState()
  const [initialValue, setInitialValue] = useState()
  const [date, setDate] = useState(obterdiaHj)
  const [showAlert, setShowAlert] = useState(false)
  const [type, setType] = useState()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await api.post('/post/goals', { desc, value, initialValue, date, type })
      .then(() => {
        setShowAlert(true);
        setDesc('')
        setValue('')
        setInitialValue('')
        setDate(obterdiaHj)
        setType('')
        update(true)
        setTimeout(() => {
          setOpenDesp(false)
          update(false)
        }, 1000)
        setTimeout(() => {
          setShowAlert(false)
        }, 500)

      }).catch((err) => {
        alert('ocorreu um erro ' + err)
      });
  }
  return (
    <>
      <Modal isOpen={openDesp} onClose={() => setOpenDesp(false)} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalHeader>
            <Flex direction='row' alignItems='center'>
              <Text>Lançamento Metas
              </Text>
              <Img src={Despimage} boxSize='34' ml='2' />
            </Flex>
          </ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Box>
                <Box mb={2}>
                  <Input
                    type='text'
                    bg='white'
                    isRequired
                    placeholder='Insira a descrição'
                    mb='3'
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <InputGroup>
                    <InputLeftElement>
                      <FcMoneyTransfer size={25} />
                    </InputLeftElement>
                    <Input
                      type='number'
                      isRequired
                      bg='white'
                      placeholder='Insira valor inicial'
                      mb='3'
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement>
                      <FcMoneyTransfer size={25} />
                    </InputLeftElement>
                    <Input
                      type='number'
                      isRequired
                      bg='white'
                      placeholder='Insira valor da meta'
                      mb='3'
                      value={initialValue}
                      onChange={(e) => setInitialValue(e.target.value)}
                    />
                  </InputGroup>
                  <Input
                    type='date'
                    isRequired
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    bg='white'
                    mb='3'
                  />
                  <Select bg='white'
                    placeholder='Tipo de meta'
                    isRequired
                    mb='3'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="home">Moradia</option>
                    <option value="transport">Transporte</option>
                    <option value="entertainment">Entretenimento</option>
                    <option value="hobby">Hobbies</option>
                  </Select>
                  <IconButton type='submit'
                    icon={<GoPlus />}
                    colorScheme='green'
                  />
                  {showAlert && (
                    <Alert
                      status="success"
                      isOpen={showAlert}
                      mt='3'
                    >
                      <AlertIcon />
                      <AlertDescription>Adicionado com sucesso!</AlertDescription>
                    </Alert>
                  )}
                </Box>
              </Box>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default FormMetas