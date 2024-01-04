import MenuLink from "@/components/generale/Menu";
import CommandesPanels from "@/components/panels/panelsStruct/CommandesPanels";
import ReservationPanels from "@/components/panels/panelsStruct/ReservationPanels";
import { Button, Center, Flex, Image, Link, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react";
import { faHomeLgAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Reserved(){
    return(
        <>
      
          {/* la box du logo  */}
          
          {/* la box de l'input  */}
        <MenuLink/>
          
        <CommandesPanels></CommandesPanels>
        </>
    )
}