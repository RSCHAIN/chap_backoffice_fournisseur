import { Flex } from '@chakra-ui/react';
import React from 'react';

const UserCorps = ({ items }) => {
    return (
        <>
            <Flex
                w={'100%'} h={'3em'}
                borderBottom={'2px'} borderColor={'#e9ecef'}
            >
                <Flex
                    w={'25%'} h={'100%'} bg={'#fff'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    {items.idUser}
                </Flex>

                <Flex
                    w={'25%'} h={'100%'} bg={'#fff'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    {items.genre}
                </Flex>

                <Flex
                    w={'25%'} h={'100%'} bg={'#fff'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    {items.email}
                </Flex>

                <Flex
                    w={'25%'} h={'100%'} bg={'#fff'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    {items.phoneNumber}
                </Flex>
            </Flex>
        </>
    );
};

export default UserCorps;