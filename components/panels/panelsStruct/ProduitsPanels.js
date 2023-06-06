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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProductCorps from "../tableProducts/ProductCorps";
import { database, storage } from "@/Firebase/Connexion";
import { child, get, getDatabase, push, ref } from "firebase/database";
import { useRouter } from "next/router";
import { getDownloadURL, ref as sref, uploadBytes } from "firebase/storage";


function writeData(cat, org, name, image, prix, description, quantite) {
  if (image != null) {
    push(ref(database, cat + "/" + org), {
      nom: name,
      
      price: prix,
      description: description,
      quantity: quantite,
      imageUrl: image,
      organisation: org, 
      etat: "disponible",
      note: "nouveau",
    });
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>PRODUIT SAUVEGARDER AVEC SUCCES</AlertTitle>
    </Alert>;
  } else {
    <Alert status="error">
      <AlertIcon />
      <AlertTitle>VEUILLEZ RELANCER SVP</AlertTitle>
      <AlertDescription>Produit pas enregistre</AlertDescription>
    </Alert>;
  }
}

const ProduitsPanels = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [last, setLast] = useState([]);
  const router = useRouter();

  const [org, setOrg] = useState();
  const [cat, setCat] = useState();

  useEffect(() => {
    const exist = localStorage.getItem("cat");
    const exist2 = localStorage.getItem("org");
    if (exist) {
     

      setCat(JSON.parse(exist));
      setOrg(JSON.parse(exist2));
    }
    const dbRef = ref(getDatabase());
    get(child(dbRef, cat + "/" + org))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setLast(snapshot.val());
        } 
      })
      .catch((error) => {
        console.error(error);
      });
  },[setCat,cat,org]);

  const [image, setImage] = useState();
  const [imageuri, setImageuri] = useState();

  const [name, setName] = useState();
  const [prix, setPrix] = useState();
  const [quantity, setQuantity] = useState('non fourni');
  const [desc, setDesc] = useState();

  ///upload image
  const handleImageUpload = async (file, cat, org) => {
    // Upload the image to Firebase Storage
    const imageRef = sref(storage, cat + "/" + org + "/" + file.name);
    await uploadBytes(imageRef, file);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);

    // Do something with the downloadURL, such as storing it in a database
    setImageuri(downloadURL);
  };

  return (
    <>
      <Flex w={"100%"} minH={"100vh"} flexDirection={"column"}>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Text fontWeight={"medium"} fontSize={["sm", "md", "lg", "xl"]}>
            Table des produits
          </Text>
          <Button
            onClick={onOpen}
            bgColor={"#08566e"}
            _hover={{ bgColor: "blue.400" }}
            color={"white"}
          >
            Ajouter Produit
          </Button>

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
                  value={image}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>{setImage(e.target.files[0]))} }
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
                        value={quantity}
                        type="number"
                        placeholder="Cet champ n'est point obligatoire"
                        onChange={(e) => setQuantity(e.target.value)}
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
                      writeData(cat, org, name, imageuri, prix, desc, quantity);
                  }}
                >
                  VALIDER
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
        <Stack w={"100%"} minH={"90vh"} bg={"#fff"} mt={"2em"}>
          <TableContainer>
            <Table variant='simple'>
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead
                bgColor={"#90e0ef"}
                borderColor={"#e9ecef"}
                borderBottom={"2px"}
              >
                <Tr>
                  <Th> Nom</Th>
                  <Th>Aperçu </Th>
                  <Th>Description</Th>
                  <Th isNumeric>Prix</Th>
                  <Th isNumeric>Quantité</Th>
                  <Th>Etat</Th>
                  <Th>Note</Th>
                  <Th>Actions </Th>
                </Tr>
              </Thead>
              <Tbody padding={0}>
                {Object.values(last).map((items) => (
                  <Tr key={items}>
                    <Td>{items.nom}</Td>
                    <Td>
                      <Image alt={'images de produit'} src={items.imageUrl}  width={40} />
                    </Td>
                    <Td ><Text width={300} noOfLines={1} >{items.description}</Text></Td>
                    <Td>{items.price}</Td>
                    <Td>{items.quantity}</Td>
                    <Td>{items.etat}</Td>
                    <Td>{items.note}</Td>
                    <Td>Actions</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {/* l'entete de la liste  */}

          {/* la liste  */}
        </Stack>
      </Flex>
    </>
  );
};

export default ProduitsPanels;
