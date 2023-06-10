import { Box, Center, Container, Flex, Heading, Link, Stack, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import ProduitsLesPlusVenndus from '../DashBoardPanels/ProduitsLesPlusVenndus';
import CourbesVentes from '../DashBoardPanels/CoubesVentes';
import Facture from '../DashBoardPanels/Facture';

export function RecapItemsCorp({ items }) {

    return (
        <>
            <Flex
                w={{ md: '40%', xl: '20%' }} h={'auto'} bg={'#fff'}
                mb={{ md: '2em', xl: '0em' }}
                borderRadius={'10px'} alignItems={'center'}
                justifyContent={'center'} flexDirection={'row'}
                boxShadow={'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}
            >
                {/* le container  */}
                <Flex
                    w={'90%'} h={'100%'}
                >
                    {/* les stats  */}
                    <Flex
                        w={'80%'} h={'100%'}
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                    >
                        <Stat
                            w={'100%'} h={'100%'}
                            display={'flex'} flexDirection={'row'}
                            justifyContent={'space-between'}
                        >
                            <StatLabel>{items.tittle}</StatLabel>
                            <StatNumber fontSize={['sm', 'md', 'lg', 'xl']} fontWeight={'bold'}>{items.number}</StatNumber>
                            <StatHelpText
                                color={'#0077b6'} display={'flex'} flexDirection={'row'}
                                justifyContent={'center'} alignItems={'center'} w={'100%'}
                            >
                                <StatArrow type="increase" />
                                {items.secondNumber} <Text fontWeight={'semibold'} ml={'1em'} >{items.DaysMonth}</Text>
                            </StatHelpText>
                        </Stat>
                    </Flex>

                    {/* la couleurs  */}
                    <Box
                        w={'20%'} h={'100%'}
                    >
                        <Box w={'95%'} h={'2.5em'} bg={items.colorsDecor} borderRadius={'5px'}></Box>
                    </Box>
                </Flex>
            </Flex>
        </>
    )
}

const recapItems = [
    {
        id: 1,
        tittle: 'Total de Ventes',
        number: `${10000} XOF`,
        secondNumber: `${+2.5}%`,
        DaysMonth: "Pour Aujoud'hui",
        colorsDecor: '#b5179e'
    },
    {
        id: 2,
        tittle: 'Total de Commandes',
        number: `${5000} XOF`,
        secondNumber: `${+3.0}%`,
        DaysMonth: "Pour Aujoud'hui",
        colorsDecor: '#0077b6'
    },
    {
        id: 3,
        tittle: 'Reduction',
        number: `${860} XOF`,
        secondNumber: `${+2.5}%`,
        DaysMonth: "Pour Aujoud'hui",
        colorsDecor: '#ffba08'
    },
    {
        id: 4,
        tittle: 'Commandes Annuler',
        number: `${500} XOF`,
        secondNumber: `${+2.5}%`,
        DaysMonth: "Pour Aujoud'hui",
        colorsDecor: '#4cc9f0'
    },
]

const DashBoardPanels = () => {

    return (
        <>

            <Flex
                w={'100%'} minH={'100vh'}
                flexDirection={'column'}
            >
                {/* première partie  */}
                <Flex
                    w={'100%'}
                    flexDirection={'row'} justifyContent={'space-between'}
                    flexWrap={{ md: 'wrap', xl: 'nowrap' }}
                >
                    {
                        recapItems.map((items) => (
                            <RecapItemsCorp key={items.id} items={items}></RecapItemsCorp>
                        ))
                    }
                </Flex>

                {/* deuxime partie avec les deux graphes  */}
                <Flex
                    w={'100%'} mt={'1em'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    {/* container  */}
                    <Flex
                        w={'97%'} h={'90%'}
                        flexDirection={{ md: 'column', xl: 'row' }}
                    >

                        {/* partie1 */}
                        <Flex
                            w={{ md: '100%', xl: '70%' }} h={'100%'}
                            alignItems={'center'} justifyContent={'center'}
                            flexDirection={'column'}
                        >
                            {/* produits les plus vendus  */}
                            <ProduitsLesPlusVenndus></ProduitsLesPlusVenndus>

                            {/* courbes de ventes  */}
                            <CourbesVentes></CourbesVentes>
                        </Flex>

                        {/* partie 2 */}
                        <Facture></Facture>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default DashBoardPanels;