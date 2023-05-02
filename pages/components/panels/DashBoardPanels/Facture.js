import { Box, Center, Flex, Link, Text } from '@chakra-ui/react';
import React from 'react';

const itemsFacture = [
    {
        id: 1,
        title: 'Dépot',
        price: 2000000
    },
    {
        id: 2,
        title: 'Exposer',
        price: 500000
    },
    {
        id: 3,
        title: 'Payer',
        price: 300000
    },
]
export function ItemRow({ item }) {
    return (
        <>
            <Flex
                direction={'row'} fontWeight={'medium'}
                w={'90%'} fontSize={'lg'}
                align={'center'} justifyContent={'space-between'}
            >
                <Text
                    color={'#0077b6'}

                >{item.title}:</Text>
                <Text>{item.price}</Text>
            </Flex>
        </>
    )
}
const Facture = () => {
    return (
        <>
            <Center
                w={{ md: '100%', xl: '30%' }} h={'100%'}
                mt={{ md: '2em', xl: '0em' }}
            >
                <Flex
                    w={'90%'} h={{ md: '20em', xl: '30em' }} bg={'#fff'} borderRadius={'10px'}
                    boxShadow={' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
                    flexDirection={'column'}
                >

                    {/* title  */}
                    <Center
                        h={'15%'} w={'100%'}
                    >
                        <Flex
                            w={'90%'} h={'90%'}
                            alignItems={'center'} justifyContent={'space-between'}
                        >
                            <Text
                                fontSize={'2xl'} fontWeight={'bold'}
                                color={'#0077b6'}
                            >Facture</Text>

                            <Link
                                fontSize={'small'} color={'#0077b6'}
                                textDecoration={'underline'}
                            >View all</Link>
                        </Flex>
                    </Center>

                    {/* graphique */}
                    <Flex
                        w={'100%'} h={'85%'}
                        flexDirection={'column'}
                    >
                        <Center w={'100%'} h={'60%'} >
                            <Text>Le graphique ici</Text>
                        </Center>
                        <Center
                            w={'100%'} h={'40%'}
                            flexDirection={'column'}
                        >
                            {
                                itemsFacture.map((item) => (
                                    <ItemRow key={item.id} item={item}></ItemRow>
                                ))
                            }
                        </Center>
                    </Flex>

                </Flex>
            </Center>
        </>
    );
};

export default Facture;