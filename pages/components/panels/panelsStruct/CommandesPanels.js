import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CommandeCorps from "../tableCommande/CommandeCorps";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/Firebase/Connexion";
import { onValue, ref } from "firebase/database";
import { database } from "@/Firebase/Connexion";
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
    label: "TOTAL",
  },
  {
    id: 5,
    label: "RECEVEUR",
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

// le corps des entetes
export function EntetItemsCorps({ items }) {
  return (
    <>
      <Flex
        w={"16.66%"}
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
      setCommandeListe(snapshot.val());
     setCommandeId(Object.keys(snapshot.val()));
    });
  };
  useEffect(() => {
    Getall();
    setOrg(JSON.parse(localStorage.getItem("org")));
  },[]);
  return (
    <>
      <Flex w={"100%"} minH={"100vh"} flexDirection={"column"}>
        <Box>
          <Text fontWeight={"medium"} fontSize={["sm", "md", "lg", "xl"]}>
            Listes Des Commandes
          </Text>
        </Box>

        <Stack w={"100%"} minH={"90vh"} mt={"2em"} bg={"#fff"}>
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
        </Stack>
      </Flex>
    </>
  );
};

export default CommandesPanels;
