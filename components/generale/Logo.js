import { Center, Text,Image} from '@chakra-ui/react';
import React from 'react';

const Logo = () => {
    return (
        <>
            <Center
                
                height={["8em","8em","8em","8em","8em"]}
                width={["14em","14em","14em","20em","20em"]}
                color={'#fff'} 
            >
                <Image alt={'logo de rschain'} src={'logo1.png'} />
            </Center>
        </>
    );
};

export default Logo;
