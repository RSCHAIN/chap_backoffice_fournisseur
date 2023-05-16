import { Flex } from "@chakra-ui/react";
import {TbChecks} from 'react-icons/tb'
import React from "react";
import { MdCancel } from "react-icons/md";
import { database } from "@/Firebase/Connexion";
import { ref, update } from "firebase/database";
import { useRouter } from "next/router";


function Validate(id,state) {
    
    update(ref(database,  "Commandes/" +String(id.ident)), {
        
        Status: state,
      });
}


function Cancel(id,state) {
    
    update(ref(database,  "Commandes/" +String(id.ident)), {
        
        Status: state,
      });
}



const ActionStructure = (ident) => {
   const router = useRouter()
  return (
    <>
      <Flex
        flexDirection={"row"}
        w={"100%"}
        h={"100%"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        <TbChecks color="green" cursor={"pointer"} onClick={()=>{Validate(ident,"VALIDE")}}/>
        <MdCancel color="red" cursor={"pointer"} onClick={()=>Cancel(ident,"ANNULE")}/>
      </Flex>
    </>
  );
};

export default ActionStructure;
