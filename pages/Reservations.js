import MenuLink from "@/components/generale/Menu";
import ReservationPanels from "@/components/panels/panelsStruct/ReservationPanels";
import { Button, Center, Flex, Image, Link, Menu, MenuButton, MenuItem, MenuList, Stack } from "@chakra-ui/react";
import { faHomeLgAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Reserved(){
    return(
        <>
      <MenuLink/>
        <ReservationPanels></ReservationPanels>
        </>
    )
}