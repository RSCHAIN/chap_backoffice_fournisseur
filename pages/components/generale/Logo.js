import { Center, Text } from '@chakra-ui/react';
import React from 'react';

const Logo = () => {
    return (
        <>
            <Center
                h={'4em'} w={'7em'} borderRadius={'70%'} bg={'#0077b6'}
                color={'#fff'} 
            >
                <Text>Chap</Text>
            </Center>
        </>
    );
};

export default Logo;