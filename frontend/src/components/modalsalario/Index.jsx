import React, { useEffect, useState } from 'react';
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
  Text,
} from '@chakra-ui/react';
import { api } from '../../api/api';

const ModalSalario = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [salary, setSalary] = useState('');
  const [quote, setQuote] = useState('');
  const [info, setInfo] = useState([]);

  const getInfo = async () => {
    try {
      const response = await api.get('/getsalary');
      const data = response.data[0];
      setInfo(response.data);
      if (data) {
        const { salario, cota_mensal } = data;
        setSalary(salario);
        setQuote(cota_mensal);
      } else {
        setSalary('0');
        setQuote('0');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addSalaryQuote = async () => {
    try {
      const existingSalary = info[0]?.salario;
      const id = info[0]?.id;
      if (existingSalary) {
        await api.put(`/updatesalary/${id}`, { salary, quote });
      } else {
        await api.post('/createsalary', { salary, quote });
      }
      setSalary('');
      setQuote('');
      getInfo();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <Button
        onClick={onOpen}
        bg="gray.500"
        color="white"
        _hover={{
          background: '#949b03',
        }}
      >
        Cota mensal
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Salário e meta mensal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {info.length > 0 ? (
              info.map((item) => (
                <Stack key={item.id} mb="2">
                  <Text>
                    Seu salário é:{' '}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.salario)}
                  </Text>
                  <Text>
                    Sua cota é:{' '}
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.cota_mensal)}
                  </Text>
                </Stack>
              ))
            ) : (
              <Text mb="5">Não há informações de salário disponíveis.</Text>
            )}
            <Stack>
              <Input
                type="text"
                placeholder="Digite seu salário"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Digite sua cota mensal"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Stack direction="row">
              <Button colorScheme="green" onClick={addSalaryQuote}>
                {salary === 0 ? 'Ajustar' : 'Adicionar'}
              </Button>
              <Button
                onClick={onClose}
                bg="red"
                color="white"
                _hover={{
                  background: '#b10000',
                }}
              >
                Cancelar
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalSalario;
