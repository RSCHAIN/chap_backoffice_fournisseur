import { DownloadIcon, ViewIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ActionStructure = () => {
    return (
        <>
            <Flex
                flexDirection={'row'} w={'100%'} h={'100%'}
                alignItems={'center'} justifyContent={'space-around'}
            >
                <ViewIcon color={'#0077b6'}></ViewIcon>
                <DownloadIcon color={'#faa307'}></DownloadIcon>
                <FontAwesomeIcon icon={faPrint} color='#9d0208' />
            </Flex>
        </>
    );
};

export default ActionStructure;