import React, { useEffect, useState } from 'react'
import { Card, CardBody, Flex, Input, Stack, Text } from '@chakra-ui/react'
import { api } from '../../api/api'

const DayBalance = () => {
    const [data, setData] = useState([])
    const [selectedMonth, setSelectedMonth] = useState('')

    const getInfo = async () => {
        try {
            const response = await api.get(`/get/balance?month=${selectedMonth}`)
            setData(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const currentDate = new Date();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        setSelectedMonth(`${year}-${month}`);
      }, []);
    

    useEffect(() => {
        getInfo()
    }, [selectedMonth])

    return (
        <Flex flexDirection='column' alignItems='center' bg='gray.200' minH="100vh">
            <Flex>
                <Input
                    mt='5%'
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                />
            </Flex>
            <Stack direction='row' m='2%'>
                {data.map((item) => (
                    <Card bg='blue.200' borderRadius='lg' boxShadow='md' p={4} key={item.id}>
                        <CardBody>
                            <Text fontSize='xl' fontWeight='bold' mb={2}>
                                Data: {new Date(item.data).toLocaleDateString('pt-BR')}
                            </Text>
                            <Text fontSize='lg' mb={2}>
                                Saldo: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.saldo)}
                            </Text>
                        </CardBody>
                    </Card>
                ))}
            </Stack>
        </Flex>
    )
}

export default DayBalance
