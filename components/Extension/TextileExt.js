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
  import React, { useEffect, useState } from "react";

  import { database, storage } from "@/Firebase/Connexion";
  import {
    child,
    get,
    getDatabase,
    increment,
    push,
    ref,
    remove,
    update,
  } from "firebase/database";
  import { useRouter } from "next/router";
  import { getDownloadURL, ref as sref, uploadBytes } from "firebase/storage";
  import ActionStructure from "@/components/generale/ActionStructure";
  import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
  import { deleteDoc } from "firebase/firestore";
  import EditProduct from "@/components/generale/EditProduct";
  import { BsEye, BsEyeSlash } from "react-icons/bs";
  
  const TextileExt = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [last, setLast] = useState([]);
    const [id, setId] = useState([]);
    const router = useRouter();
  
    const [org, setOrg] = useState();
    const [cat, setCat] = useState();
    const [finish, setFinish] = useState(false);
    const toast = useToast();
  
    useEffect(() => {
      const exist = localStorage.getItem("cat");
      const exist2 = localStorage.getItem("org");
      if (exist) {
        setCat(JSON.parse(exist));
        setOrg(JSON.parse(exist2));
      } else {
        localStorage.clear();
        router.push("/");
      }
      const dbRef = ref(getDatabase());
      get(child(dbRef, cat + "/" + org))
        .then((snapshot) => {
          setId(Object.keys(snapshot.val()));
          if (snapshot.exists()) {
            setLast(snapshot.val());
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }, [setCat, cat, org, router]);
  
    const [image, setImage] = useState([]);
    const [imageuri, setImageuri] = useState([]);
  
    const [name, setName] = useState();
    const [prix, setPrix] = useState();
    const [loader, setLoader] = useState(false);
    const [quantite, setQuantite] = useState(0);
    const [desc, setDesc] = useState();
  
    ///upload image
    const handleImageUpload = async (file, cat, org) => {
      // Upload the image to Firebase Storage
      setLoader(true);
      toast({title:"Upload des fichiers...", status: "warning",description:"si cela prend du temps, veuillez cliquer à nouveau",duration: 15000})
      Object.values(file).slice(0, 3).map(async (details, index) => {
        const imageRef = sref(storage, cat + "/" + org + "/" + details.name);
        await uploadBytes(imageRef, details);
  
        // Get the download URL of the uploaded image
        const downloadURL = await getDownloadURL(imageRef);
  
        // Do something with the downloadURL, such as storing it in a database
        imageuri.push(downloadURL);
      })
      if (imageuri.length > 1) {
        setFinish(true);
      }
  
    };
  
    //enregistrer data
    function writeData(cat, org, name, prix, description, quantite) {
      if (name != null) {
        push(ref(database, cat + "/" + org), {
          nom: name,
          prix: parseFloat(prix),
          description: description,
          quantiteStock: quantite,
          imageUrl: imageuri,
          organisation: org,
          etat: "Disponible",
          note: "nouveau",
        });
        toast({
          title: "SUCCÉS",
          description: "PRODUIT SAUVEGARDÉ AVEC SUCCES",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.reload();
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
  
    const deleteData = (cat, org, id) => {
      remove(ref(database, cat + "/" + org + "/" + id));
      router.reload();
    };
  
    const handleState = (cat, org, id,state) => {
      update(ref(database, cat + "/" + org + "/" + id), {
       
        etat: state,
      
      });
      router.reload();
      toast({
        title: "Mise à jour",
        description: "INFORMATION MISE À JOUR AVEC SUCCES",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      router.replace(router.asPath);
     
   
    };
  
  
    return (
      <>
        <Flex w={"100%"} minH={"100vh"} pb={10} flexDirection={"column"}>
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
              size={["lg", "lg", "lg", "xl", "xl"]}
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
  
                    multiple={true}
                    onChange={(e) => {
                      setImage(e.target.files)
  
                    }}
                  />
                  {image.length > 3 ? <Text color={"red"}>Nous ne prenons que 3 images par produit</Text> : <></>}
                  <Flex>
                    <Box mr={5}>
                      <FormControl isRequired>
                        <FormLabel>Intitulé</FormLabel>
                        <Input
                          value={name}
                          isRequired
                          placeholder="intitulé"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Prix de vente</FormLabel>
                        <Input
                          isRequired
                          value={prix}
                          placeholder="Prix de vente"
                          type={"number"}
                          onChange={(e) => setPrix(e.target.value)}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl>
                        <FormLabel>Quantité totale</FormLabel>
                        <Input
                          value={quantite}
                          type={"number"}
                          placeholder="Cet champ n'est point obligatoire"
                          onChange={(e) => setQuantite(e.target.valueAsNumber)}
                        />
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel>Description</FormLabel>
                        <Input
                          minH={"100px"}
                          width={"300px"}
                          isRequired
                          value={desc}
                          as={Textarea}
                          placeholder="Description"
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
                  {finish == false ? <Button
  
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                      handleImageUpload(image, cat, org);
                    }}
                  >
                    Enregistrer
                  </Button> : <Button
                    colorScheme="blue"
                    mr={3}
                    onClick={() => {
                      writeData(cat, org, name, prix, desc, quantite);
                    }}
                  >
                    Valider
                  </Button>}
  
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
          <Box w={"100%"} overflowY="auto" maxHeight="500px" bg={"#fff"} mt={"2em"} mb={20}>
  
            <Table variant="simple">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead bgColor={"#fff"} borderColor={"#e9ecef"}>
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
              <Tbody padding={0} id="tb14">
                {Object.values(last).map((items, index) => (
                  <Tr key={index}>
                    <Td>{items.nom}</Td>
                    <Td>
                      <Image
                        alt={"images de produit"}
                        src={items.imageUrl}
                        width={40}
                        height={40}
                      />
                    </Td>
                    <Td>
                      <Text width={300} height={20} noOfLines={4}>
                        {items.description}
                      </Text>
                    </Td>
                    <Td>{items.prix}</Td>
                    <Td>{items.quantite}</Td>
                    <Td>
                      <Box display={"grid"} textAlign={"center"}>
                      {items.etat}
                      {items.etat == "Disponible" ?<Button colorScheme="red" onClick={()=>handleState(cat,items.organisation,id[index],"Indisponible")}>En rupture</Button> : <Button colorScheme="blue" onClick={()=>handleState(cat,items.organisation,id[index],"Disponible")}>Disponible</Button> }
                      </Box>
                    </Td>
                    <Td>{items.note}</Td>
                    <Td>
                      <Flex justifyContent={"space-around"} w={10}>
                        <EditProduct id={id[index]} cat={cat} desc={items.description}
                         org={items.organisation} name={items.nom}
                          prix={items.prix}  quantite={items.quantite}/>
                          
                        
                        <DeleteIcon
                          color={"red"}
                          fontSize={30}
                          cursor={"pointer"}
                          onClick={() => deleteData(cat, org, id[index])}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
  
            {/* l'entete de la liste  */}
  
            {/* la liste  */}
          </Box>
        </Flex>
      </>
    );
  };
  
  export default TextileExt;
  