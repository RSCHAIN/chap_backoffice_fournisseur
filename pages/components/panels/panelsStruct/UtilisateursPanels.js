import { Box, Flex, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import UserCorps from '../tableUser/UserCorps';

// liste des entetes 
const ListEntete = [
    {
        id: 1,
        label: 'ID'
    },
    {
        id: 2,
        label: 'GENRE'
    },
    {
        id: 3,
        label: 'E-mail'
    },
    {
        id: 4,
        label: 'NUMERO TELEPHONE'
    },
]
// le corps des entetes 
export function EntetItemsCorps({ items }) {
    return (
        <>
            <Flex
                w={'25%'} fontWeight={'medium'}
                alignItems={'center'} justifyContent={'center'}
                bg={'#90e0ef'} h={'3em'}
            >
                {items.label}
            </Flex>
        </>
    )
}

const UserListe = [
    {
        id: 1,
        idUser: '#1091',
        genre: 'Homme',
        email:'helitako16@gmail.com',
        phoneNumber:'0787883240'
    }
]

const UtilisateursPanels = () => {
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
                        UserListe.map((items) => (
                        <UserCorps key={items.id} items={items}></UserCorps>
                    ))
                    }
                </Stack>
            </Flex>
        </>
    );
};

export default UtilisateursPanels;