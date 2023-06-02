
import { Flex, Heading, Text,Image } from '@chakra-ui/react';
import React from 'react';
import ActionStructure from '../../generale/ActionStructure';


const CommandeCorps = ({ items,org,idex,lol }) => {
 
   
  if(items.organisation == org){
    
    const status= items.Status
    
    if (status == "En Cours") {
        return (
            <>      
                <Flex
                    w={'100%'} h={'3em'}
                    borderBottom={'2px'} borderColor={'#e9ecef'}
                >
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.nom}
                    </Flex>
    
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        <Image alt={'image'} w={10}src={items.imageUrl}/>
                    </Flex>
    
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.quantity}
                    </Flex>
    
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.totalPrice}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.receveur}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.lieu}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.numero}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.date}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.Status}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        <ActionStructure ident={idex[lol]}></ActionStructure>
                    </Flex>
    
                   
                </Flex>
            </>
        ); 
    }else{
        return (
            <>
                <Flex
                    w={'100%'} h={'3em'}
                    borderBottom={'2px'} borderColor={'#e9ecef'}
                >
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.nom}
                    </Flex>
    
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        <Image alt={'image'} w={10}src={items.imageUrl}/>
                    </Flex>
    
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.quantity}
                    </Flex>
    
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.totalPrice}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.receveur}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.lieu}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.numero}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.date}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        {items.Status}
                    </Flex>
                    <Flex
                        w={'16.66%'} h={'100%'} bg={'#fff'}
                        alignItems={'center'} justifyContent={'center'}
                    >
                        TRAITEE
                    </Flex>
    
                   
                </Flex>
            </>
        );  
    }
   
  }else {
    <Flex
    w={'100%'} h={'3em'}
    borderBottom={'2px'} borderColor={'#e9ecef'}>
            <Heading>
                PAS DE COMMANDE A AFFICHEE
            </Heading>
    </Flex>

  }
   
};

export default CommandeCorps;
