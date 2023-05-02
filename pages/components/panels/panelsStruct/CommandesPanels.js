import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import CommandeCorps from '../tableCommande/CommandeCorps';

// liste des entetes 
const ListEntete = [
    {
        id: 1,
        label: 'ID'
    },
    {
        id: 2,
        label: 'TYPE'
    },
    {
        id: 3,
        label: 'QUANTITE'
    },
    {
        id: 4,
        label: 'ETAT'
    },
    {
        id: 5,
        label: 'ACTION'
    },
    {
        id: 6,
        label: 'DATE'
    }
]
// le corps des entetes 
export function EntetItemsCorps({ items }) {
    return (
        <>
            <Flex
                w={'16.66%'} fontWeight={'medium'}
                alignItems={'center'} justifyContent={'center'}
                bg={'#90e0ef'} h={'3em'}
            >
                {items.label}
            </Flex>
        </>
    )
}

// la liste de commandes 
const CommandeListe = [
    {
        id: 1,
        idCmd: '#1091',
        type: 'Oversize',
        quantite: 2155,
        etat: 'Analyse',
        action: '',
        dateOf: '17-11-2022'
    },
]

const CommandesPanels = () => {
    return (
        <>
            <Flex
                w={'100%'} minH={'100vh'}
                flexDirection={'column'}
            >
                <Box>
                    <Text
                        fontWeight={'medium'} fontSize={['sm', 'md', 'lg', 'xl']}
                    >Table des produits</Text>
                </Box>

                <Stack
                    w={'100%'} minH={'90vh'}
                    mt={'2em'} bg={'#fff'}
                >
                    {/* l'entete de la liste  */}
                    <Flex
                        borderBottom={'2px'} borderColor={'#e9ecef'}
                        w={'100%'}
                    >
                        {
                            ListEntete.map((items) => (
                                <EntetItemsCorps key={items.id} items={items}></EntetItemsCorps>
                            ))
                        }
                    </Flex>

                    {/* la liste  */}
                    {
                        CommandeListe.map((items)=>(
                            <CommandeCorps key={items.id} items={items}></CommandeCorps>
                        ))
                    }
                </Stack>
            </Flex>
        </>
    );
};

export default CommandesPanels;