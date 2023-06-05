import React from 'react'
import { Card, CircularProgressLabel, CardBody, CircularProgress, Text, Flex } from '@chakra-ui/react'

const CardValues = ({ textin, color, valor, isIndeterminate, gasto }) => {
    return (
        <Card boxShadow="lg">
            <CardBody>
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    direction='column'
                >
                    <CircularProgress value={gasto} color={color} size='130px'>
                        <CircularProgressLabel fontSize='20px'>{valor}</CircularProgressLabel>
                    </CircularProgress>
                    <Text>{textin}</Text>
                </Flex>
            </CardBody>
        </Card>
    )
}

export default CardValues