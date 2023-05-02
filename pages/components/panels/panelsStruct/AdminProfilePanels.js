import { Avatar, Box, Button, Center, Flex, Stack, Text, WrapItem } from '@chakra-ui/react';
import React from 'react';

const AdminProfilePanels = () => {
    return (
        <>
            <Center
                w={'100%'} minH={'100vh'}
            >
                <Center
                    w={{ md: '70%', lg: '40%','2xl':'30%' }} h={{ md: '90vh', lg: '70vh' }} bg={'#f8f9fa'}
                    flexDirection={'column'} borderRadius={'20px'}
                >

                    {/* l'avatar  */}
                    <WrapItem
                        flexDirection={'column'} mb={'2em'}
                    >
                        <Avatar size='2xl' name='Segun Adebayo' src='https://bit.ly/sage-adebayo' />{' '}
                        <Text
                            color={'#c9184a'} fontWeight={'bold'}
                        >Changer la photo</Text>
                    </WrapItem>

                    {/* les coordornnée  */}
                    <Center
                        w={'90%'} h={{md:'40vh',lg:'20vh'}} bg={'#ced4da'}
                        borderRadius={'10px'}
                    >
                        {/* container  */}
                        <Stack
                            w={'95%'} h={'95%'}
                        >
                            <Text
                                fontWeight={'bold'} textAlign={'center'}
                            >Information Personnells</Text>

                            <Box

                            >
                                {/* 1 */}
                                <Flex
                                    justifyContent={'space-between'}
                                    h={'2em'} w={'100%'}
                                >
                                    <Text>ID</Text>
                                    <Text>{'#9497'}</Text>
                                </Flex>

                                {/* 2 */}
                                <Flex
                                    justifyContent={'space-between'}
                                >
                                    <Text>Nom Admin</Text>
                                    <Text>{'GERARD'}</Text>
                                </Flex>

                                {/* 3 */}
                                <Flex
                                    justifyContent={'space-between'}
                                >
                                    <Text>E-MAIL</Text>
                                    <Text>{'helitako16@gmail.com'}</Text>
                                </Flex>
                            </Box>
                        </Stack>

                    </Center>

                    <Button
                        colorScheme='blue' mt={'2em'} w={'70%'}
                        borderRadius={'full'}
                    >Button</Button>
                </Center>
            </Center>
        </>
    );
};

export default AdminProfilePanels;