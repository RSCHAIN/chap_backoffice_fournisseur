import { Box, Flex, Image, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CommandeCorps from "../tableCommande/CommandeCorps";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/Connexion";
import { onValue, ref, update } from "firebase/database";
import { database } from "@/Firebase/Connexion";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
  }
];

function Cancel(id, state) {
  update(ref(database, "Commandes/" + String(id)), {
    Status: state,
  });
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
  const [CommandeListe, setCommandeListe] = useState([]);
  const [CommandeId, setCommandeId] = useState([]);
  const [org, setOrg] = useState();
  const Getall = async () => {
    //     const q = query(collection(db, "orders"), where("name", "==", "T-shirt blanc"));

    // const querySnapshot = await getDocs(q);
    // console.log(querySnapshot.docs)
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    // //   console.log(doc.id, " => ", doc.data());
    // });*

    const starCountRef = ref(database, "Commandes/");
    onValue(starCountRef, (snapshot) => {
      if (snapshot.val() != null && snapshot.val() != undefined) {
        setCommandeListe(snapshot.val());
     setCommandeId(Object.keys(snapshot.val()));
      }
      
    });
  };
  useEffect(() => {
    Getall();
    setOrg(JSON.parse(localStorage.getItem("org")));
  },[]);
  return (
    <>
      <Flex w={"100%"}  flexDirection={"column"}>
        <Box>
          <Text fontWeight={"medium"} fontSize={["sm", "md", "lg", "xl"]}>
            Listes Des Commandes
          </Text>
        </Box>
        <Stack w={"100%"} minH={"100rem"} bg={"#fff"} mt={"2em"}mb={20}>
          <TableContainer >
            <Table variant='simple'>
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead
                bgColor={"#90e0ef"}
                borderColor={"#e9ecef"}
                borderBottom={"2px"}
              >
                <Tr>
                  <Th> Nom</Th>
                  <Th>Image </Th>
                  <Th>Quantite</Th>
                  <Th>Prix Total</Th>
                  <Th >Jour</Th>
                  <Th >Client</Th>
                 
                  <Th>Numero</Th>
                  <Th>Lieu</Th>
                  <Th>Status</Th>
                  <Th>Actions </Th>
                </Tr>
              </Thead>
              <Tbody padding={0}>
                {Object.values(CommandeListe).map((items,index) => (
                  <Tr key={items}>
                    <Td>{items.nom}</Td>
                    <Td>
                      <Image alt={'images de produit'} src={items.imageUrl}  width={20} height={10} />
                    </Td>
                    <Td>{items.quantite}</Td>
                    <Td>{items.totalPrix}</Td>
                    <Td>{items.jour+" "+items.moment}</Td>
                    <Td>{items.receveur}</Td>
                   
                    <Td>{items.numero}</Td>
                    <Td>{items.lieu}</Td>
                    <Td>{items.Status}</Td>
                    <Td>
                      <Flex justifyContent={"space-around"} w={10}>
                     <CheckIcon color={"cyan.600"}fontSize={30} mr={5} cursor={"pointer"}/>
                    <CloseIcon color={"red"}fontSize={30} cursor={"pointer"} onClick={()=>Cancel(CommandeId[index],"ANNULE")}/>
                      </Flex>
                    
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {/* l'entete de la liste  */}

          {/* la liste  */}
        </Stack>








          {/* l'entete de la liste  */}
          <Flex borderBottom={"2px"} borderColor={"#e9ecef"} w={"100%"}>
            {ListEntete.map((items) => (
              <EntetItemsCorps key={items.id} items={items}></EntetItemsCorps>
            ))}
          </Flex>

          {/* la liste  */}
          {Object.values(CommandeListe).map((items,key) => (
            <CommandeCorps
              key={items.id}
              items={items}
              org={org}
              idex={CommandeId}
              lol={key}
            ></CommandeCorps>
        
          ))}
        
      </Flex>
    </>
  );
};

export default CommandesPanels;
