import {
  Box,
  Button,
  Flex,
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
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CommandeCorps from "../tableCommande/CommandeCorps";
import { collection, query, where, getDocs, and } from "firebase/firestore";
import { db } from "@/Firebase/Connexion";
import { onValue, ref, update } from "firebase/database";
import { database } from "@/Firebase/Connexion";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
export function Waiting ({items, org,id}){
  function Cancel(index) {
    update(ref(database, "Commandes/" + String(id) + "/cartlist/" + String(index) ), {
      orderEtat: "Annulée",
   
    });
  }

  function Validate(index) {
    update(ref(database, "Commandes/" + String(id) + "/cartlist/" + String(index) ), {
      orderEtat: "Validée",
   
    });
  }

  return (
    <>
     {items.cartlist.map((item, index) =>{
      if (item.orderOrganisation == org) {
        return (
          <Tr key={items}>  
          <Td>{item.orderName
}</Td>
          <Td>
            <Image
              alt={"images de produit"}
              src={item.orderImageUrl}
              width={20}
              height={10}
            />  
          </Td>
          <Td>{item.orderQte}</Td>
          <Td>{item.orderPrice * item.orderQte}</Td>
          <Td>{items.jour }</Td>
          <Td>{items.email}</Td>

          
        <Td>{items.lieu}</Td>
          <Td>{item.orderEtat
}</Td>

          <Td>
          {item.orderEtat == "En attente"}
            <Flex justifyContent={"space-around"} w={10}>
              <CheckIcon
                color={"cyan.600"}
                fontSize={30}
                mr={5}
                cursor={"pointer"} 
                onClick= {()=>{Validate(index)}}
                  
                
              />
              <CloseIcon
                color={"red"}
                fontSize={30}
                cursor={"pointer"}
                onClick= {()=>{Cancel(index)}}
              />
            </Flex>
          </Td>
        </Tr>
        )
      }
     }
     )}
    </>
  );
}

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

const CommandesPanels = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [CommandeListe, setCommandeListe] = useState([]);
  const [CommandeId, setCommandeId] = useState([]);
  const [livreur, setLivreur] = useState([]);
  const [page, setPage] = useState(0);
  const router = useRouter()
  const [org, setOrg] = useState();

  const Getall = async () => {
    const starCountRef = ref(database, "Commandes/");
    onValue(starCountRef, (snapshot) => {
      if (snapshot.val() != null && snapshot.val() != undefined) {
        setCommandeListe(snapshot.val());
        setCommandeId(Object.keys(snapshot.val()));
      }
    });
  };

  function Cancel(id, state) {
    update(ref(database, "Commandes/" + String(id)), {
      Status: state,
    });
  }
  
  const sendmail = async (items) =>{
    await axios.post('/api/sendmail', {
      message:items.description ,
      email: items.initiateur,
      subject: `Validation de Commande ${items.nom}`,
      nom:items.nom,
      image:items.imageUrl,
      price:items.totalPrix,
      quantity:items.quantite,
    }).then((response)=>{alert("okay")})
  }
  useEffect(() => {
    Getall();
    setOrg(JSON.parse(sessionStorage.getItem("org")));
   
  }, []);
  
  return (
    <>
      <Flex w={"100%"} flexDirection={"column"}>
        <Box>
          <Text fontWeight={"medium"} fontSize={["sm", "md", "lg", "xl"]}>
            Listes Des Commandes
          </Text>
        </Box>
        <Box w={"100%"} overflowY="auto" maxHeight="500px" bg={"#fff"} mt={"2em"} mb={20}>
            <Table variant="simple" id="table41">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead bgColor={"#fff"} position="sticky" borderColor={"#e9ecef"}>
                <Tr>
                  <Th> Nom</Th>
                  <Th>Image </Th>
                  <Th>Quantite</Th>
                  <Th>Prix Total</Th>
                  <Th>Jour</Th>
                  <Th>Client</Th>

                  
             
                  <Th>Status</Th>
                  <Th>Actions </Th>
                </Tr>
              </Thead>
              <Tbody padding={0} id="tb12">
                {Object.values(CommandeListe).map((items, index) => {
                 
                  if (items.status == "En attente" ) {
                    
                    return(
                      <Waiting key={index} items={items} org={org} id={CommandeId[index]}/>
                    )
                    
                    // return (
                    //   {items.cartlist.map((item, index) =>(
                    //     <Tr key={items}>  
                    //     <Td>{items.nom}</Td>
                    //     <Td>
                    //       <Image
                    //         alt={"images de produit"}
                    //         src={items.imageUrl}
                    //         width={20}
                    //         height={10}
                    //       />  
                    //     </Td>
                    //     <Td>{items.quantite}</Td>
                    //     <Td>{items.totalPrix}</Td>
                    //     <Td>{items.jour + " " + items.moment}</Td>
                    //     <Td>{items.receveur}</Td>

                    //     <Td>{items.numero}</Td>
                    //     <Td>{items.lieu}</Td>
                    //     <Td>{items.status}</Td>

                    //     <Td>
                    //       <Flex justifyContent={"space-around"} w={10}>
                    //         <CheckIcon
                    //           color={"cyan.600"}
                    //           fontSize={30}
                    //           mr={5}
                    //           cursor={"pointer"} 
                    //           onClick= {()=>{Cancel(CommandeId[index], "VALIDÉE"),sendmail(items)}}
                                
                              
                    //         />
                    //         <CloseIcon
                    //           color={"red"}
                    //           fontSize={30}
                    //           cursor={"pointer"}
                    //           onClick= {()=>{Cancel(CommandeId[index], "ANNULÉE"),sendmail(items)}}
                    //         />
                    //       </Flex>
                    //     </Td>
                    //   </Tr>
                    //   ))}
                     
                    // );
                  }
                  else if (items.organisation == org && items.Status == "VALIDÉE" || items.Status == "ANNULÉE") 
                    
                  
                  {
                    return (
                      <Tr key={items}>
                        <Td>{items.nom}</Td>
                        <Td>
                          <Image
                            alt={"images de produit"}
                            src={items.imageUrl}
                            width={20}
                            height={10}
                          />
                        </Td>
                        <Td>{items.quantite}</Td>
                        <Td>{items.totalPrix}</Td>
                        <Td>{items.jour + " " + items.moment}</Td>
                        <Td>{items.receveur}</Td>

                        <Td>{items.numero}</Td>
                        <Td>{items.lieu}</Td>
                        <Td>{items.Status}</Td>

                      
                      </Tr>
                    );
                  }
                })}
              </Tbody>
            </Table>
        
         
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Attribuer Au Livreur</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* <Select> */}
              {livreur.forEach((doc) => console.log(doc.id))}
              {/* </Select> */}
            </ModalBody>

            <ModalFooter>
              <Button bgColor={"cyan.700"} color={"white"}>
                Valider
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* l'entete de la liste  */}
        {/* <Flex borderBottom={"2px"} borderColor={"#e9ecef"} w={"100%"}>
            {ListEntete.map((items) => (
              <EntetItemsCorps key={items.id} items={items}></EntetItemsCorps>
            ))}
          </Flex> */}

        {/* la liste  */}
        {/* {Object.values(CommandeListe).map((items,key) => (
            <CommandeCorps
              key={items.id}
              items={items}
              org={org}
              idex={CommandeId}
              lol={key}
            ></CommandeCorps>
        
          ))} */}
      </Flex>
    </>
  );
};

export default CommandesPanels;
