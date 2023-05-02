import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import ProductCorps from '../tableProducts/ProductCorps';

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
        label: 'GENRE'
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

/*const Liste des produits */
const ProductsListe = [
    {
        id: 1,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 2,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 3,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 4,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 5,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 6,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 7,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 8,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 9,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 10,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 11,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
    {
        id: 12,
        idPrdt: '#1091',
        type: 'Oversize',
        genre: 'Homme',
        etat: 'Disponible',
        action: '',
        dateOf: '17-11-2022'
    },
]



const ProduitsPanels = () => {
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
                    bg={'#fff'} mt={'2em'}
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
                        ProductsListe.map((items) => (
                            <ProductCorps key={items.id} items={items} ></ProductCorps>
                        ))
                    }
                </Stack>
            </Flex>
        </>
    );
};

export default ProduitsPanels;