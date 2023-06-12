import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const ErrorPage = () => {
  return (
    <Box textAlign="center" mt={8}>
      <Heading as="h1" size="2xl" mb={4}>
        404 - Página não encontrada
      </Heading>
      <Text fontSize="xl">
        A página que você está procurando não existe.
      </Text>
    </Box>
  );
};

export default ErrorPage;
