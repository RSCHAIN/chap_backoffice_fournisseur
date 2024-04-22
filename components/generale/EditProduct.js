import React, { useState } from 'react'
import { EditIcon } from "@chakra-ui/icons"
import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Table,
    Image,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Textarea,
    Th,
    Thead,
    Tr,
    useDisclosure,
    useToast,
    Link,
  } from "@chakra-ui/react";
import { ref, update } from 'firebase/database';
import { database } from '@/Firebase/Connexion';
import { useRouter } from 'next/router';
import { BsEye } from 'react-icons/bs';
function EditProduct({id,cat, org, name, prix, desc, quantite}) {
  const toast = useToast()
  const router = useRouter()
    const [category,setCategory] = useState(cat);
    const [organization,setOrganization] = useState(org);
    const [names,setNames] = useState(name);
    const [price,setPrice] = useState(prix);
    const [description,setDescription] = useState(desc);
    const [quantity,setQuantity] = useState(quantite);


    const { isOpen, onOpen, onClose } = useDisclosure();

      //enregistrer data
  function writeData() {
    if (names != null) {
      update(ref(database, category + "/" + organization + "/" + id), {
        nom: names,
        prix: parseFloat(price),
        description: description,
        quantite: quantity,
        etat: "Disponible",
        note: "nouveau",
      });
      toast({
        title: "Mise à jour",
        description: "INFORMATION MISE À JOUR AVEC SUCCES",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.replace(router.asPath);
      onClose();
    } else {
      toast({
        title: "VEUILLEZ RELANCER SVP",
        description: "Produit pas enregistre",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }



    return (
        <>
        <EditIcon
            onClick={onOpen}
            color={"cyan.500"}
            fontSize={30}
            cursor={"pointer"}
            mr={5}
            href="#modal2"
        />
        
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset="scale"
            size={["lg", "lg", "lg", "xl", "xl"]}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Modifier produit</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
               
                <Flex>
                  <Box mr={5}>
                    <FormControl isRequired>
                      <FormLabel>Intitulé</FormLabel>
                      <Input
                        value={names}
                        isRequired
                        placeholder="intitulé"
                        onChange={(e) => setNames(e.target.value)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Prix de vente/kilo</FormLabel>
                      <Input
                        isRequired
                        value={price}
                        placeholder="Prix de vente"
                        type="number"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl>
                      <FormLabel>Quantité</FormLabel>
                      <Input
                        value={quantity}
                        type="number"
                        placeholder="Cet champ n'est point obligatoire"
                        onChange={(e) => setQuantity(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>description</FormLabel>
                      <Input
                        minH={"100px"}
                        width={"300px"}
                        isRequired
                        value={description}
                        as={Textarea}
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
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
                    writeData();
                  }}
                >
                  Valider
                </Button>
               
              </ModalFooter>
            </ModalContent>
          </Modal>
          </>
    )
}

export default EditProduct