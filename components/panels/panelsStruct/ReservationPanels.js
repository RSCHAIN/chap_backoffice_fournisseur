import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";


import { onValue, ref, update } from "firebase/database";
import { database } from "@/Firebase/Connexion";

import { useRouter } from "next/router";
import axios from "axios";
// liste des entetes
const ListEntete = [
  {
    id: 1,
    label: "NOM DU PRODUIT",
  },
  {
    id: 2,
    label: "IMAGE DU PRODUIT",
  },
  {
    id: 3,
    label: "QUANTITE",
  },
  {
    id: 4,
    label: "TOTAL(prix)",
  },
  {
    id: 5,
    label: "CLIENT",
  },
  {
    id: 6,
    label: "LIEU",
  },
  {
    id: 7,
    label: "NUMERO",
  },
  {
    id: 8,
    label: "DATE",
  },
  {
    id: 9,
    label: "STATUS",
  },
  {
    id: 10,
    label: "ACTIONS",
  },
];


// le corps des entetes
export function EntetItemsCorps({ items }) {
  return (
    <>
      <Flex
        w={"33%"}
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

// la liste de commandes

const ReservationPanels = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [ReservationListe, setReservationListe] = useState([]);
  const [ReservationId, setReservationId] = useState([]);
  const [livreur, setLivreur] = useState([]);
  const [page, setPage] = useState(0);
  const router = useRouter()
  const [org, setOrg] = useState();

  const Getall = async () => {
    const starCountRef = ref(database, "Reservation");
    onValue(starCountRef, (snapshot) => {
      if (snapshot.val() != null && snapshot.val() != undefined) {
        setReservationListe(snapshot.val());
        console.log("Reservation", snapshot.val());
        setReservationId(Object.keys(snapshot.val()));
      }
    });
  };

  function Cancel(id, state) {
    update(ref(database, "Reservation/" + String(id)), {
      reponseResto: state,
    });
  }

  const sendmail = async (items) => {
    await axios.post('/api/sendmail', {
      message: items.description,
      email: items.initiateur,
      subject: `Validation de Commande ${items.nom}`,
      nom: items.nom,
      image: items.imageUrl,
      price: items.totalPrix,
      quantity: items.quantite,
    }).then((response) => { alert("okay") })
  }
  useEffect(() => {
    Getall();
    setOrg(JSON.parse(sessionStorage.getItem("org")));

  }, []);

  return (
    <>
      <Flex w={"100%"} flexDirection={"column"}>


        <Tabs>
          <TabList>
            <Tab>En attentes</Tab>
            <Tab>Validées</Tab>
            <Tab>Annulées</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Box w={"100%"} overflowY="auto" maxHeight="500px" mt={"2em"} mb={20}>
                <Table display={["none", "none", "none", "block", "block"]} variant="simple" id="table42">
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Thead bgColor={"#fff"} position="sticky" borderColor={"#e9ecef"}>
                    <Tr>
                      <Th> E-mail</Th>
                      <Th>Nom </Th>
                      <Th>Couverts</Th>
                      <Th>Jour</Th>
                      <Th>heure</Th>


                      <Th>Numero</Th>

                      <Th>Status</Th>
                      <Th>Actions</Th>

                    </Tr>
                  </Thead>
                  <Tbody padding={0} id="tb13">
                    {Object.values(ReservationListe).map((items, index) => {

                      if (items.status == "En attente" && items.organisation == org  && items.reponseResto == "") {
                        return (
                          <Tr key={items}>
                            <Td>{items.email}</Td>

                            <Td>{items.nom}</Td>
                            <Td>{items.personnes}</Td>
                            <Td>{items.journée}</Td>
                            <Td>{items.heures}</Td>


                            <Td>{items.numero}</Td>
                            <Td>{items.status}</Td>
                            <Td> <Flex display={"grid"}   >
                              <Button mb={2} colorScheme="red" onClick={() => Cancel(ReservationId[index], "Refusée")}
                              >Refuser</Button>
                              <Button colorScheme="green"
                                onClick={() => Cancel(ReservationId[index], "Acceptée")}>Valider</Button>
                            </Flex></Td>

                          </Tr>
                        );
                      }

                    })}
                  </Tbody>
                </Table>
                {Object.values(ReservationListe).map((items, index) => {

                  if (items.status == "En attente" && items.organisation == org  && items.reponseResto == "") {
                    return (
                      <>
                        <Flex display={["flex", "flex", "flex", "none", "none"]}>
                          <Box mb={5} textAlign={"center"} borderRadius={"25px"} width={"70%"} px={4} py={2} bgColor={"white"}>
                            {/* <Center display={"grid"}> */}
                            <Flex ><Text mr={2} fontWeight={700}>Client : </Text>{items.nom}</Flex>
                            <Flex><Text mr={2} fontWeight={700}>Email : </Text>{items.email}</Flex>

                            <Flex><Text mr={2} fontWeight={700}>Couverts : </Text>{items.personnes}</Flex>
                            <Flex><Text mr={2} fontWeight={700}>Date : </Text>{items.journée}</Flex>
                            <Flex><Text mr={2} fontWeight={700}>Créneau : </Text>{items.heures}</Flex>
                            {/* </Center> */}

                            <Flex mt={5} pt={2} justifyContent={"space-between"} mb={5} borderTop={"2px solid black"}>
                              {/* <Button colorScheme="red">Refuser</Button>
                          <Button colorScheme="blue">Valider</Button> */}
                            </Flex>
                          </Box>
                          <Flex mt={5} display={"grid"} pt={2} justifyContent={"space-between"} mb={5} >
                            <Button colorScheme="red" onClick={() => Cancel(ReservationId[index], "Refusée")}
                            >Refuser</Button>
                            <Button colorScheme="green"
                              onClick={() => Cancel(ReservationId[index], "Acceptée")}>Valider</Button>
                          </Flex>
                        </Flex>

                      </>
                    );
                  }

                })}






              </Box>
            </TabPanel>
            <TabPanel>

              <Box w={"100%"} overflowY="auto" maxHeight="500px" mt={"2em"} mb={20}>
                <Table display={["none", "none", "none", "block", "block"]} variant="simple" id="table42">
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Thead bgColor={"#fff"} position="sticky" borderColor={"#e9ecef"}>
                    <Tr>
                      <Th> E-mail</Th>
                      <Th>Nom </Th>
                      <Th>Couverts</Th>
                      <Th>Jour</Th>
                      <Th>heure</Th>


                      <Th>Numero</Th>

                      <Th>Status</Th>

                    </Tr>
                  </Thead>
                  <Tbody padding={0} id="tb13">
                    {Object.values(ReservationListe).map((items, index) => {

                      if (items.reponseResto == "Acceptée" && items.organisation == org) {
                        return (
                          <Tr key={items}>
                            <Td>{items.email}</Td>

                            <Td>{items.nom}</Td>
                            <Td>{items.personnes}</Td>
                            <Td>{items.journée}</Td>
                            <Td>{items.heures}</Td>


                            <Td>{items.numero}</Td>
                            <Td>{items.reponseResto}</Td>


                          </Tr>
                        );
                      }

                    })}
                  </Tbody>
                </Table>
                {Object.values(ReservationListe).map((items, index) => {

                  if (items.reponseResto == "Acceptée" && items.organisation == org) {
                    return (
                      <>
                        <Flex display={["flex", "flex", "flex", "none", "none"]}>
                          <Box mb={5} textAlign={"center"} borderRadius={"25px"} width={"100%"} px={4} py={2} bgColor={"white"}>
                            {/* <Center display={"grid"}> */}
                            <Flex ><Text mr={2} fontWeight={700}>Client : </Text>{items.nom}</Flex>
                            <Flex><Text mr={2} fontWeight={700}>Email : </Text>{items.email}</Flex>

                            <Flex><Text mr={2} fontWeight={700}>Couverts : </Text>{items.personnes}</Flex>
                            <Flex><Text mr={2} fontWeight={700}>Date : </Text>{items.journée}</Flex>
                            <Flex><Text mr={2} fontWeight={700}>Créneau : </Text>{items.heures}</Flex>
                            {/* </Center> */}

                            <Flex mt={5} pt={2} justifyContent={"space-between"} mb={5} borderTop={"2px solid black"}>
                              {/* <Button colorScheme="red">Refuser</Button>
                          <Button colorScheme="blue">Valider</Button> */}
                            </Flex>
                          </Box>
                          {/* <Flex mt={5} display={"grid"}  pt={2} justifyContent={"space-between"} mb={5} >
                          <Button colorScheme="red">Refuser</Button>
                          <Button colorScheme="green">Valider</Button>
                        </Flex> */}
                        </Flex>

                      </>
                    );
                  }

                })}






              </Box>
            </TabPanel>
            <TabPanel>
              <Box w={"100%"} overflowY="auto" maxHeight="500px" mt={"2em"} mb={20}>
                <Table display={["none", "none", "none", "block", "block"]} variant="simple" id="table42">
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Thead bgColor={"#fff"} position="sticky" borderColor={"#e9ecef"}>
                    <Tr>
                      <Th> E-mail</Th>
                      <Th>Nom </Th>
                      <Th>Couverts</Th>
                      <Th>Jour</Th>
                      <Th>heure</Th>


                      <Th>Numero</Th>

                      <Th>Status</Th>

                    </Tr>
                  </Thead>
                  <Tbody padding={0} id="tb13">
                    {Object.values(ReservationListe).map((items, index) => {

                      if (items.reponseResto == "Refusée" && items.organisation == org) {
                        return (
                          <Tr key={items}>
                            <Td>{items.email}</Td>

                            <Td>{items.nom}</Td>
                            <Td>{items.personnes}</Td>
                            <Td>{items.journée}</Td>
                            <Td>{items.heures}</Td>


                            <Td>{items.numero}</Td>
                            <Td>{items.reponseResto}</Td>


                          </Tr>
                        );
                      }

                    })}
                  </Tbody>
                </Table>
                {Object.values(ReservationListe).map((items, index) => {

                  if (items.reponseResto == "Refusée" && items.organisation == org) {
                    return (
                      <>
                        <Flex display={["flex", "flex", "flex", "none", "none"]}>
                          <Box mb={5} textAlign={"center"} borderRadius={"25px"} width={"100%"} px={4} py={2} bgColor={"white"}>
                            {/* <Center display={"grid"}> */}
                            <Flex ><Text mr={2} fontWeight={700}>Client : </Text>{items.nom}</Flex>
                            <Flex><Text mr={2} fontWeight={700}>Email : </Text>{items.email}</Flex>

                            <Flex><Text mr={2} fontWeight={700}>Couverts : </Text>{items.personnes}</Flex>
                            <Flex><Text mr={2} fontWeight={700}>Date : </Text>{items.journée}</Flex>
                            <Flex><Text mr={2} fontWeight={700}>Créneau : </Text>{items.heures}</Flex>
                            {/* </Center> */}

                            <Flex mt={5} pt={2} justifyContent={"space-between"} mb={5} borderTop={"2px solid black"}>
                              {/* <Button colorScheme="red">Refuser</Button>
                          <Button colorScheme="blue">Valider</Button> */}
                            </Flex>
                          </Box>
                          {/* <Flex mt={5} display={"grid"}  pt={2} justifyContent={"space-between"} mb={5} >
                          <Button colorScheme="red">Refuser</Button>
                          <Button colorScheme="green">Valider</Button>
                        </Flex> */}
                        </Flex>

                      </>
                    );
                  }

                })}


                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>

                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                      </Button>
                      <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>
                <Table variant="simple" id="table43" display={"none"}>
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Thead bgColor={"#fff"} position="sticky" borderColor={"#e9ecef"}>
                    <Tr>
                      <Th> E-mail</Th>
                      <Th>Nom </Th>
                      <Th>Couverts</Th>
                      <Th>Jour</Th>
                      <Th>heure</Th>


                      <Th>Numero</Th>

                      <Th>Status</Th> 

                    </Tr>
                  </Thead>
                  <Tbody padding={0} id="tb14">
                    {Object.values(ReservationListe).map((items, index) => {

                      if (items.reponseResto == "Refusée" && items.organisation == org) {
                        return (
                          <Tr key={items} display={"none"}>
                            <Td>{items.email}</Td>

                            <Td>{items.nom}</Td>
                            <Td>{items.personnes}</Td>
                            <Td>{items.journée}</Td>
                            <Td>{items.heures}</Td>


                            <Td>{items.numero}</Td>
                            <Td>{items.reponseResto}</Td>


                          </Tr>
                        );
                      }

                    })}
                  </Tbody>
                </Table>


              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>




      </Flex>
    </>
  );
};

export default ReservationPanels;
