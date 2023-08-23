import { Center, Text,Image} from '@chakra-ui/react';
import React from 'react';

const Logo = () => {
    return (
        <>
            <Center
                h={'4em'} 
                height={["4em","4em","4em","8em","8em"]}
                width={["7em","7em","7em","14em","14em"]}
                color={'#fff'} 
            >
                <Image alt={'logo de rschain'} src={'logo1.png'} />
            </Center>
        </>
    );
};

export default Logo;
