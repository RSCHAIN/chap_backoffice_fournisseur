import { Center, Text } from '@chakra-ui/react';
import React from 'react';

const Logo = () => {
    return (
        <>
            <Center
                h={'4em'} w={'7em'} 
                color={'#fff'} 
            >
                <Image alt={'logo de rschain'} src={'logo1.png'} />
            </Center>
        </>
    );
};

export default Logo;
