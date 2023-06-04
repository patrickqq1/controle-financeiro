import { Text, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, useDisclosure, Button, Flex, IconButton, DrawerCloseButton, Img, Stack, Divider } from "@chakra-ui/react";
import { FiMenu, FiHome, FiX } from "react-icons/fi";
import { FaCoins } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Cookies from "js-cookie";

const SidebarDrawer = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { authenticated , logout } = useContext(AuthContext)
    const user = () => {
        const userCookie = Cookies.get("user");
        if (userCookie) {
          let user = JSON.parse(userCookie);
          return user;
        } else {
          return null;
        }
      };
      

    return (
        <Flex
            position='fixed'
        >
            <Flex m='3'><IconButton icon={<FiMenu />} variant='ghost' onClick={onOpen}>Abrir Drawer</IconButton></Flex>
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay>
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader>
                            <Flex alignItems='center'>
                                <Img
                                    src="https://gestaoizy.com.br/admin/kcfinder/upload/images/O-que-e-controle-financeiro-e-porque-ele-e-importante.png"
                                    boxSize='20'
                                />
                                Controle financeiro

                            </Flex>
                        </DrawerHeader>
                        <DrawerBody>
                            <Stack spacing={3}>
                                <Link to='/home'>
                                    <Button
                                        colorScheme="green"
                                        leftIcon={<FiHome />}
                                        width='100%'
                                    >Inicio</Button>
                                </Link>
                                <Link to='/saldodia'>
                                    <Button colorScheme="yellow"
                                        leftIcon={<FaCoins />}
                                        width='100%'
                                    >Gastos por dia</Button>
                                </Link>
                                <Button colorScheme="red" leftIcon={<FiX />} onClick={logout}>Sair</Button>
                                <Divider />
                                <Flex justifyContent='center' textTransform='capitalize'><Text>Bem-vindo, {user()}</Text>
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
