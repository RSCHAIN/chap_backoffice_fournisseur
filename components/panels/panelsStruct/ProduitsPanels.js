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
import ProductCorps from "../tableProducts/ProductCorps";
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
import EpicerieExt from "@/components/Extension/EpicerieExt";
import RestaurantExt from "@/components/Extension/RestaurantExt";
import TextileExt from "@/components/Extension/TextileExt";

const ProduitsPanels = ({categ}) => {
 
  const router = useRouter();

  const [cat, setCat] = useState();
  

  useEffect(() => {
    setCat(localStorage.getItem("cat"));
 
  }, []);

  

  

  return (
    <>
    {categ == "Restaurant" ? <RestaurantExt/> : cat== "Textile" ? <TextileExt/> :  <EpicerieExt/>}
    </>
  );
};

export default ProduitsPanels;
