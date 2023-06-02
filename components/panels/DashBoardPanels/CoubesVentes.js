import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Center, Flex, IconButton, Text } from '@chakra-ui/react';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const CourbesVentes = () => {
    return (
        <>
            <Flex
                w={{md:'95%',xl:'90%'}} h={{md:'20em',xl:'25em'}} bg={'#fff'}
                mt={'3em'} borderRadius={'10px'}
                boxShadow={' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
                flexDirection={'column'}
            >
                <Flex
                    w={'100%'} h={'15%'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    <Flex
                        w={'90%'}
                        alignItems={'center'} justifyContent={'space-between'}
                    >
                        <Text color={'#0077b6'} fontWeight={'medium'} fontSize={'lg'}>
                            <FontAwesomeIcon icon={faChartLine} color='#000' />  Ventes au cours des derniers jours
                        </Text>
                        <Text ><ArrowForwardIcon fontSize={'3xl'}/></Text>
                    </Flex>
                </Flex>
                <Center w={'100%'} h={'85%'}>Le graphique ici</Center>
            </Flex>
        </>
    );
};

export default CourbesVentes;