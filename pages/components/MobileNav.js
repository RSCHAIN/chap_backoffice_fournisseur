import { HamburgerIcon } from '@chakra-ui/icons';
import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import DashBoardPanels from './panels/panelsStruct/DashBoardPanels';


const MobileNav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    return (
        <>
            <Stack
                w={'100%'} h={'3em'} mt={'1em'}
                alignItems={'start'} justifyContent={'start'}
            >
                {/* boutton pour l'ouverture du menu  */}
                <Button
                    ref={btnRef} colorScheme='blue' onClick={onOpen}
                    w={'7em'} h={'3em'} leftIcon={<HamburgerIcon />} variant={'outline'}
                >
                    Open
                </Button>

                <Drawer
                    isOpen={isOpen}
                    placement='right'
                    onClose={onClose}
                    finalFocusRef={btnRef}
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader></DrawerHeader>

                        <DrawerBody>
                            
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </Stack>
            {/* <DashBoardPanels></DashBoardPanels> */}
        </>
    );
};

export default MobileNav;