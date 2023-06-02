import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ProduitsCorp({ item }) {
    return (
        <>
            <Flex
                w={'100%'} h={'25%'} flexDirection={'row'}
                alignItems={'center'} justifyContent={'center'}
                borderTop={'2px'} borderColor={'#e9ecef'}
            >
                <Flex
                    w={'90%'} h={'100%'}
                    alignItems={'center'} justifyContent={'space-between'}
                >
                    <Box>
                        <Text fontWeight={'medium'}>{item.title}</Text>
                        <Text color={'#0077b6'}>Total Achat: {item.totalAchat}</Text>
                    </Box>
                    <Text>{item.price}</Text>
                </Flex>
            </Flex>
        </>
    )
}
const ProduitsLesPlusVenndus = () => {
    const produitsListeItems = [
        {
            id: 1,
            title: 'Oversize',
            totalAchat: 300,
            price: `${16.232323}`
        },
        {
            id: 2,
            title: 'Beachwear',
            totalAchat: 400,
            price: `${16.232323}`
        },
        {
            id: 3,
            title: 'Bags',
            totalAchat: 700,
            price: `${16.232323}`
        },
    ]
    return (
        <>
            <Flex

                w={{ md: '70%', xl: '50%' }} h={'20em'} bg={'#fff'} borderRadius={'10px'}
                flexDirection={'column'}
                boxShadow={' rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
            >
                {/* title premier elements */}
                <Flex
                    w={'100%'} h={'25%'}
                    borderTopRightRadius={'10px'}
                    borderTopLeftRadius={'10px'}
                    flexDirection={'column'}
                    alignItems={'center'} justifyContent={'center'}
                >
                    <Flex
                        w={'90%'}
                        justifyContent={'space-between'}
                    >
                        <Text
                            fontWeight={'medium'} fontStyle={'italic'}
                            fontSize={'lg'}
                        >
                            <FontAwesomeIcon icon={faChartLine} /> Produits les Plus vendus
                        </Text>
                        <Link
                            fontSize={'small'} textDecoration={'underline'}
                            color={'#0077b6'}
                        >View all</Link>
                    </Flex>
                </Flex>

                {
                    produitsListeItems.map((item) => (
                        <ProduitsCorp key={item.id} item={item}></ProduitsCorp>
                    ))
                }
            </Flex>
        </>
    );
};

export default ProduitsLesPlusVenndus;