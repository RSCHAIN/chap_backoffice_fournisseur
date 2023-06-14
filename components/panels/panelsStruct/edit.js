import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

export default function Edit(items)

{
    const { isOpen, onOpen, onClose } = useDisclosure();
    return(
        <>
        <EditIcon  color={"cyan.500"}fontSize={30} mr={5} onClick={onOpen} href="#modal2"/>
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset="scale"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>AJOUT DE PRODUIT</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Image du produit</Text>
                <Input
                  
                  type="file"
                  accept="image/*"
                  onChange={(e) =>{setImage(e.target.files[0])} }
                />
                <Flex>
                  <Box mr={5}>
                   
                    <FormControl isRequired>
                      <FormLabel>Intitulé</FormLabel>
                      <Input
value={name}
                        isRequired
                        placeholder="intitulé du produit"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Prix de vente/kilo</FormLabel>
                      <Input
                        isRequired
                        value={prix}
                        placeholder="Prix de vente"
                        type="number"
                        onChange={(e) => setPrix(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl >
                      <FormLabel>Quantité</FormLabel>
                      <Input
                        value={quantite}
                        type="number"
                        placeholder="Cet champ n'est point obligatoire"
                        onChange={(e) => setQuantite(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>description</FormLabel>
                      <Input
                        isRequired
                        value={desc}
                        as={Textarea}
                        placeholder="Description du produit"
                        onChange={(e) => setDesc(e.target.value)}
                      />
                    </FormControl>
                    <Input type="hidden" value={org} />
                  </Box>
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={onClose}>
                  FERMER
                </Button>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                      handleImageUpload(image, cat, org),
                      writeData(cat, org, name, imageuri, prix, desc, quantite);
                  }}
                >
                  VALIDER
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
    )
    
}