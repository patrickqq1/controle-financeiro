import React, { useEffect, useState } from 'react'
import {
    Select,
    IconButton,
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    Alert,
    AlertIcon,
    AlertDescription,
    Stack,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Button,
    Spinner,
    FormLabel
} from '@chakra-ui/react';
import { GoPlus } from 'react-icons/go'
import { FcMoneyTransfer } from 'react-icons/fc'
import { api } from '../../api/api';
import TableItens from '../../components/table/table';
import CardValues from '../../components/cards/card';
import FormMetas from '../../components/formMetas/form';
import Goals from '../../components/cardGoals/goals';
import ModalSalario from '../../components/modalsalario/Index';

const Index = () => {
    const [loading, setLoading] = useState(true)
    const obterDataSubtraida = () => {
        const dataAtual = new Date();
        dataAtual.setHours(dataAtual.getHours() - 3);
        const novaData = dataAtual.toISOString().substr(0, 10);
        return novaData;
    }
    const getInitialMonth = () => {
        const dataAtual = new Date();
        const primeiroDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 1);
        const novaData = primeiroDia.toISOString().slice(0, 10);
        return novaData;
    };
    const getLastDayMonth = () => {
        const dataAtual = new Date();
        const primeiroDiaProximoMes = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 1);
        const ultimoDiaMesAtual = new Date(primeiroDiaProximoMes.getTime() - 1);
        const novaData = ultimoDiaMesAtual.toISOString().slice(0, 10);
        return novaData;
    };

    const initialMonth = getInitialMonth()
    const lastDayMonth = getLastDayMonth()
    const obterdiaHj = obterDataSubtraida()
    const [desc, setDesc] = useState()
    const [value, setValue] = useState()
    const [date, setDate] = useState(obterdiaHj)
    const [type, setType] = useState()
    const [showAlert, setShowAlert] = useState(false)
    const [getInfo, setGetInfo] = useState([])
    const [inputs, setInputs] = useState([])
    const [outputs, setOutputs] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [openMetas, setOpenMetas] = useState(false)
    const [initMonth, setInitMonth] = useState(initialMonth)
    const [finalMonth, setFinalMonth] = useState(lastDayMonth)
    const [goals, setGoals] = useState([])
    const [update, setUpdate] = useState(false)

    const getSomasInputs = () => {
        api.get(`/financssoma?startDate=${initMonth}&&endDate=${finalMonth}`)
            .then((res) => {
                const inputs = res.data.map(obj => { return obj.entradas ? parseFloat(obj.entradas) : 0 });
                setOutputs(inputs);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getSomasOutputs = () => {
        api.get(`/minussoma?startDate=${initMonth}&&endDate=${finalMonth}`)
            .then((res) => {
                const outputs = res.data.map(obj => { return obj.entradas ? parseFloat(obj.entradas) : 0 });
                setInputs(outputs);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getGoalsData = () => {
        api.get('/get/goals')
            .then((res) => {
                setGoals(res.data);
            }).catch((err) => {
                console.error(err);
            });
    }

    useEffect(() => {

        getSomasInputs();
        getSomasOutputs();
        getGoalsData();
        api.get(`/get/renderFinancs?startDate=${initMonth}&&endDate=${finalMonth}`).then((res) => {
            setGetInfo(res.data);
            setLoading(false)
        })
            .catch((err) => {
                console.error(err);
            });

    }, [initMonth, finalMonth, update]);

    const somaSalario = () => {
        const salarioMes = 2400
        return (outputs / salarioMes) * 100
    }
    const qdGastar = () => {
        const salarioMes = 1000
        return (inputs / salarioMes) * 100
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await api.post("/registerfinanc", { desc, value, date, type })
            .then(() => {
                setShowAlert(true);
                setDesc('');
                setValue('');
                setDate(obterdiaHj);
                setType('');
                setUpdate(true)
                setTimeout(() => {
                    setUpdate(false)
                    setShowAlert(false)
                }, 2000)
                setTimeout(() => {
                    setIsOpen(false)
                }, 500)
            })
            .catch((err) => {
                alert(`deu erro: ` + err)
            })
    }

    return (
        <Flex 
            direction='column'
            alignItems='center'
            justifyContent='center'
            bg='green.200'
            minH='100vh'
        >
            <Flex mt={3} dir='row'>
                <InputGroup mr={2} alignItems='center'>
                    <FormLabel>De:</FormLabel>
                    <Input bg='white' type='date' value={initMonth} onChange={(e) => setInitMonth(e.target.value)} />
                </InputGroup>
                <InputGroup ml={2} alignItems='center'>
                    <FormLabel>Até:</FormLabel>
                    <Input bg='white' type='date' value={finalMonth} onChange={(e) => setFinalMonth(e.target.value)} />
                </InputGroup>
            </Flex>
            <Stack m={3} direction='row'>
                <ModalSalario />
                <Button color='black' onClick={() => setIsOpen(true)} colorScheme='blue' isLoading={loading}>Lançar Entradas/Saídas</Button>
                <Button color='black' onClick={() => setOpenMetas(true)} colorScheme='green' isLoading={loading}>Lançar Metas</Button>
            </Stack>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Adicionar entrada/saida</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Box mb={2}>
                                <form onSubmit={handleSubmit}>
                                    <Input
                                        type='text'
                                        bg='white'
                                        isRequired
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        placeholder='Insira a descrição'
                                        mb='3'
                                    />
                                    <InputGroup>
                                        <InputLeftElement children={<FcMoneyTransfer size={25} />}
                                            bg='white' />
                                        <Input
                                            type='number'
                                            isRequired
                                            bg='white'
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            placeholder='Insira um valor'
                                            mb='3'
                                        />
                                    </InputGroup>
                                    <Input
                                        type='date'
                                        isRequired
                                        bg='white'
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        mb='3'
                                    />
                                    <Select bg='white'
                                        placeholder='Tipo'
                                        isRequired
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                        mb='3'
                                    >
                                        <option value="entry">Entrada</option>
                                        <option value="output">Saida</option>
                                    </Select>
                                    <IconButton type='submit'
                                        icon={<GoPlus />}
                                        colorScheme='green'
                                    />
                                </form>
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
                </ModalContent>
            </Modal>
            <FormMetas openDesp={openMetas} update={setUpdate} setOpenDesp={setOpenMetas} />
            <Stack direction='row' mb='10px'>
                {goals.map((item) => (
                    <Goals
                        meta={item.descricao}
                        myValue={item.valor_atual}
                        metaValue={item.meta_valor}
                        type={item.tipo === 'home' ? 'Moradia' :
                            item.tipo === 'transport' ? 'Transporte' :
                                item.tipo === 'entertainment' ? 'Entretenimento' :
                                    item.tipo === 'hobby' ? 'Hobbies' : ''}
                        date={item.data}
                        key={item.id}
                        setUpdate={setUpdate}
                        id={item.id}
                    />
                ))}
            </Stack>
            {loading ? <Spinner size='xl' /> : <Stack direction='row' mb='10px' spacing='50px'>
                <CardValues textin='Valor gasto' color="red.400" gasto={qdGastar()} valor={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(inputs)} />
                <CardValues textin='Valor recebido' color="green.400" gasto={somaSalario()} valor={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(outputs)} />
                <CardValues textin='Valor Total' color="orange.400" valor={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(outputs - inputs)} gasto='100' />
            </Stack>}
                <Flex mb='2%' flexDirection='column'>
                    <TableItens getInfo={getInfo} setUpdate={setUpdate}/>
                </Flex>
        </Flex>
    )
}

export default Index