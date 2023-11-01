import {
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
  Flex,
  IconButton,
  DrawerCloseButton,
  Img,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { FiMenu, FiHome, FiX } from "react-icons/fi";
import { FaCoins } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { RiAdminFill } from "react-icons/ri";

const SidebarDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout, status } = useContext(AuthContext);
  return (
    <Flex position="fixed">
      <Flex m="3">
        <IconButton icon={<FiMenu />} variant="ghost" onClick={onOpen}>
          Abrir Drawer
        </IconButton>
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <Flex alignItems="center">
                <Img
                  src="https://gestaoizy.com.br/admin/kcfinder/upload/images/O-que-e-controle-financeiro-e-porque-ele-e-importante.png"
                  boxSize="20"
                />
                Controle financeiro
              </Flex>
            </DrawerHeader>
            <DrawerBody>
              <Stack spacing={3}>
                <Link to="/home">
                  <Button
                    justifyContent="left"
                    color="black"
                    borderRadius="30px"
                    bg="gray.100"
                    _hover={{
                      bg: "#f5f8fd",
                    }}
                    boxShadow="md"
                    leftIcon={<FiHome />}
                    width="100%"
                  >
                    Inicio
                  </Button>
                </Link>
                <Link to="/saldodia">
                  <Button
                  justifyContent="left"
                    color="black"
                      borderRadius="30px"
                      bg="gray.100"
                      _hover={{
                        bg: "#f5f8fd",
                      }}
                      boxShadow="md"
                    leftIcon={<FaCoins />}
                    width="100%"
                  >
                    Gastos por dia
                  </Button>
                </Link>
                {status === "2" && (
                  <Link to="/admin">
                    <Button
                      justifyContent="left"
                      color="black"
                      borderRadius="30px"
                      bg="gray.100"
                      _hover={{
                        bg: "#f5f8fd",
                      }}
                      boxShadow="md"
                      leftIcon={<RiAdminFill />}
                      width="100%"
                    >
                      Painel admin
                    </Button>
                  </Link>
                )}
                <Button
                  justifyContent="left"
                  colorScheme="red"
                  borderRadius="30px"
                  leftIcon={<FiX />}
                  onClick={logout}
                >
                  Sair
                </Button>
                <Divider />
                <Flex justifyContent="center" textTransform="capitalize">
                  <Text>Bem-vindo, {user}</Text>
                </Flex>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Flex>
  );
};

export default SidebarDrawer;
