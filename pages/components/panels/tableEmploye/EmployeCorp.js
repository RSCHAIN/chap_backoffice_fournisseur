import { Flex } from '@chakra-ui/react';
import React from 'react';

const EmplyeCorps = ({items}) => {
    return (
        <>
            <Flex
                w={'100%'} h={'3em'}
                borderBottom={'2px'} borderColor={'#e9ecef'}
            >
                <Flex
                    w={'100%'} h={'100%'} bg={'#fff'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    {items.data().lieu}
                </Flex>

                <Flex
                    w={'100%'} h={'100%'} bg={'#fff'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    {items.data().lieu}
                </Flex>

                <Flex
                    w={'100%'} h={'100%'} bg={'#fff'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    {items.data().time}
                </Flex>

              
            </Flex>
        </>
    );
};

export default EmplyeCorps;