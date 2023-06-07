import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { TbChecks } from "react-icons/tb";
import React, { useState } from "react";
import { MdCancel } from "react-icons/md";
import { database, db } from "@/Firebase/Connexion";
import { ref, update } from "firebase/database";
import { useRouter } from "next/router";
import { collection, getDocs, query } from "firebase/firestore";

function Validate(id, state) {
  update(ref(database, "Commandes/" + String(id.ident)), {
    Status: state,
  });
}

function Cancel(id, state) {
  update(ref(database, "Commandes/" + String(id.ident)), {
    Status: state,
  });
}


const ActionStructure = (ident) => {
  const [dato,setDato]=useState([])
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const Livreur = async () => {
    setDato([])
    const querySnapshot = await getDocs(collection(db, "Livreur/"));
    querySnapshot.forEach((doc) => {
  
      setDato(doc.data())
    });
    
  };
 
  return (
    <>
      <Flex
        flexDirection={"row"}
        w={"100%"}
        h={"100%"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <TbChecks color="green" cursor={"pointer"} onClick={onOpen} />
        <MdCancel
          color="red"
          cursor={"pointer"}
          onClick={() => Cancel(ident, "ANNULE")}
        />
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ATTRIBUER A UN LIVREUR</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <Box>
               {
                console.log(dato)
               }
              </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              ANNULER
            </Button>
            <Button
              onClick={() => {
                // Validate(ident, "VALIDE");
                Livreur()
              }}
            >
              ATTRIBUER
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ActionStructure;
