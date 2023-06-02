import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import UserCorps from "../tableUser/UserCorps";
import EmplyeCorps from "../tableEmploye/EmployeCorp";
import { MdOutlineGpsFixed } from "react-icons/md";
import { AiOutlineFieldTime } from "react-icons/ai";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/Firebase/Connexion";
import { getDatabase } from "firebase/database";

// liste des entetes
const ListEntete = [
  {
    id: 1,
    label: "ID",
  },
  // {
  //     id: 2,
  //     label: 'NOM'
  // },
  {
    id: 2,
    label: "LIEU/COMMUNE",
  },
  {
    id: 3,
    label: "TEMPS DE LIVRAISON",
  },
];
// le corps des entetes
export function EntetItemsCorps({ items }) {
  return (
    <>
      <Flex
        w={"100%"}
        fontWeight={"medium"}
        alignItems={"center"}
        justifyContent={"center"}
        bg={"#90e0ef"}
        h={"3em"}
      >
        {items.label}
      </Flex>
    </>
  );
}

// liste des employe

const EmployePanels = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [lieu, setLieu] = useState();
  const [time, setTime] = useState();
  const toast = useToast();
  const [org, setOrg] = useState();
  const [mag, setMag] = useState([]);

  const Login = async (orga) => {
    const docRef = doc(db, orga + "/cocody");
    const docSnap = await getDoc(docRef);
    console.log(mag);
    if (docSnap.exists()) {
      console.log(docSnap.data());
    } else {
      console.log("passse pas");
    }
    // localStorage.setItem("categories","")
  };

  const fetchMag = async () => {
    const querySnapshot = await getDocs(collection(db, org));
    setMag(querySnapshot);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      // setMag(doc.data()

      localStorage.setItem(doc.id, JSON.stringify(doc.data()));
    });
  };

  useEffect(() => {
    const exist = localStorage.getItem("org");
    Login(JSON.parse(exist));
    fetchMag();
    if (exist) {
      setOrg(JSON.parse(exist));
    }
  }, [Login,fetchMag]);

  const createUSer = async () => {
    //hachage ici

    //fin hachage

    // create a pointer to our Document
    const _user = doc(db, `${org}/${lieu}`);
    // structure the todo data
    const Users = {
      lieu,
      time,
    };
    await setDoc(_user, Users)
      .then(() => {
        toast({
          title: "MAGASIN ENREGISTRÉ",
          // description: "veuillez vous connecter",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: "ERREUR LORS DE L'ENREGIQTREMENT",
          description: "SVP VERIFIER VOS DONNEES ",
          status: "error",
          duration: 7000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Flex w={"100%"} minH={"100vh"} flexDirection={"column"}>
        <Flex flexDirection={"row"} justifyContent={"space-between"}>
          <Text fontWeight={"medium"} fontSize={["sm", "md", "lg", "xl"]}>
            Table des Magasins
          </Text>
          <Button
            bgColor={"#08568f"}
            _hover={{ bgColor: "blue.600" }}
            color={"white"}
            onClick={onOpen}
          >
            Ajouter magasin
          </Button>
        </Flex>

        {/* modal ajout de magasin  */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Ajouter Un Magasin</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex>
                <Flex justifyContent={"space-around"} flexDir={"column"} mr={5}>
                  <Text>Emplacement du magasin</Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={MdOutlineGpsFixed} />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Emplacement du magasin"
                      onChange={(e) => setLieu(e.target.value)}
                    />
                  </InputGroup>
                </Flex>
                <Flex flexDir={"column"}>
                  <Text>Temps de livraison</Text>
                  <InputGroup>
                    <InputLeftElement>
                      <Icon as={AiOutlineFieldTime} />
                    </InputLeftElement>
                    <Input
                      type="text"
                      placeholder="Entrez une marge"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </InputGroup>
                </Flex>
              </Flex>

              <InputGroup></InputGroup>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={() => createUSer()}>
                Ajouter
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Fermer
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Stack w={"100%"} minH={"90vh"} mt={"2em"} bg={"#fff"}>
          {/* l'entete de la liste  */}
          <Flex borderBottom={"2px"} borderColor={"#e9ecef"} w={"100%"}>
            {ListEntete.map((items) => (
              <EntetItemsCorps key={items.id} items={items}></EntetItemsCorps>
            ))}
          </Flex>

          {/* la liste  */}
          {
            mag.forEach((items) => (
              <TableContainer>
  <Table variant='simple'>
    <TableCaption>Imperial to metric conversion factors</TableCaption>
    <Thead>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td>{items.id}</Td>
        <Td>millimetres (mm)</Td>
        <Td isNumeric>25.4</Td>
      </Tr>
      <Tr>
        <Td>feet</Td>
        <Td>centimetres (cm)</Td>
        <Td isNumeric>30.48</Td>
      </Tr>
      <Tr>
        <Td>yards</Td>
        <Td>metres (m)</Td>
        <Td isNumeric>0.91444</Td>
      </Tr>
    </Tbody>
    {/* <Tfoot>
      <Tr>
        <Th>To convert</Th>
        <Th>into</Th>
        <Th isNumeric>multiply by</Th>
      </Tr>
    </Tfoot> */}
  </Table>
</TableContainer>
            ))
            //   console.log(items.id)
            //   // <Flex
            //   //   key={items.id}
            //   //   w={"100%"}
            //   //   h={"3em"}
            //   //   borderBottom={"2px"}
            //   //   borderColor={"#e9ecef"}
            //   // >
            //   //   <Flex
            //   //     w={"100%"}
            //   //     h={"100%"}
            //   //     bg={"#fff"}
            //   //     alignItems={"center"}
            //   //     justifyContent={"center"}
            //   //   >
            //   //     {items.data().lieu}
            //   //   </Flex>

            //   //   <Flex
            //   //     w={"100%"}
            //   //     h={"100%"}
            //   //     bg={"#fff"}
            //   //     alignItems={"center"}
            //   //     justifyContent={"center"}
            //   //   >
            //   //     {items.data().lieu}
            //   //   </Flex>

            //   //   <Flex
            //   //     w={"100%"}
            //   //     h={"100%"}
            //   //     bg={"#fff"}
            //   //     alignItems={"center"}
            //   //     justifyContent={"center"}
            //   //   >
            //   //     {items.data().time}
            //   //   </Flex>
            //   // </Flex>
            // ))
            // console.log(mag)
          }
        </Stack>
      </Flex>
    </>
  );
};

export default EmployePanels;
