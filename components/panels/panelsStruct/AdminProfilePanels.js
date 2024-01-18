import {
  Avatar,
  Box,
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Stack,
  Text,
  WrapItem,
  Input,
  useToast,
} from "@chakra-ui/react";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/Firebase/Connexion";

import React, { useEffect, useState } from "react";
import { MdAccountCircle, MdEmail, MdLocationCity, MdLocationOn } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const AdminProfilePanels = () => {
  const toast = useToast()
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [Categorie, setCategorie] = useState("");
  const [image, setImage] = useState("");
  const [numero, setNumero] = useState("");
  const [Org, setOrg] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [siret, setSiret] = useState("");
  const [Status, setStatus] = useState("");
  const [Tva, setTVA] = useState("");
  const [etat,setEtat]=useState(false)

  const Getall = async (user) => {
    try {
      const docRef = doc(db, `Admin`,String(user));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("docsnqp",docSnap.exists()) 
        setAddress(docSnap.data().adresse);
        setName(docSnap.data().name);
        setNumero(docSnap.data().number);
        setEmail(docSnap.data().email);
        setEmail2(docSnap.data().email);
        setCategorie(docSnap.data().categorie);
        setImage(docSnap.data().imageUrl);
        setOrg(docSnap.data().organisation);
        setPassword(docSnap.data().password);
        setSiret(docSnap.data().siret);
        setStatus(docSnap.data().status); 
        setTVA(docSnap.data().tva);
        setEtat(true)
      }
    } catch (error) {
      throw(error)
    }
   
  };
  const createNew=async ()=>{
    await deleteDoc(doc(db, "Admin", email2));
        const _user = doc(db, `Admin/${email}`);
        // structure the todo data
        const Users = {
          adresse:address,
          name:name,
          number:numero,
          email:email2,
          categorie:Categorie,
          imageUrl:image,
          organisation:Org,
          password:password,
          siret:siret,
          status:Status,
          tva:Tva,
        };
        await setDoc(_user, Users);
        toast({
          title: "Information mise à jour",
          description: "Decconnexion",
          status: "success",
          duration: 10000,
          isClosable: true,
        });
      
        localStorage.clear()
  }
  useEffect(() => {
    setUser(String(localStorage.user)
      .replace('"', "")
      .trim()
      .replace('"', ""));
    Getall(user)
  },[]);
  if (!etat) {
    Getall(user);
  }
  
  return (
    <>
      <Center w={"100%"} h={"75vh"} mt={-20} >
        <Center
          w={{ base: "100%", lg: "70%" }}
          h={"fit-content"}
          bg={"#f8f9fa"}
          flexDirection={"column"}
          borderRadius={"20px"}
          py={5}
        >
         
          {/* les coordornnée  */}
          <Center
            w={"90%"}
            h={"fit-content"}
            // bg={"#ced4da"}
            borderRadius={"10px"}
          >
            {/* container  */}
            <Stack w={"95%"} h={"fit-content"} spacing={10}>
            <Center display={"grid"}>
              <MdAccountCircle fontSize={100}/>
              <Flex ml={2} fontWeight={700} justifyContent={"space-around"} h={"2em"} w={"85%"}>
                 
                  <Editable
                    onInput={(e) => setName(e.target.value)}
                    value={name}
                  >
                    <EditablePreview />
                    {/* <Input as={EditableInput} onChange={(e)=>console.log(e.target.value)}/> */}
                    <EditableInput />
                  </Editable>
                </Flex>
            </Center>

              <Box pb={5}>
                {/* 1 */}
                <Flex ml={"-132px"} justifyContent={"space-around"} h={"2em"} w={"85%"}>
                  <Flex>
                    <Box mr={2} mt={1}>
                    <MdLocationCity fontSize={20}/>
                    </Box>
                    <Editable
                    onInput={(e) => setOrg(e.target.value)}
                    value={Org} 
                  >
                    <EditablePreview />
                    {/* <Input as={EditableInput} onChange={(e)=>console.log(e.target.value)}/> */}
                    <EditableInput />
                  </Editable>
                  {/* <Text>Email</Text> */}
                  </Flex>
                  </Flex>
                {/* 2 */}
                <Flex ml={"-90px"} justifyContent={"space-around"} h={"2em"} w={"85%"}>
                  <Flex>
                    <Box mr={2} mt={1}>
                    <MdEmail fontSize={20}/>
                    </Box>
                    <Editable
                    onInput={(e) => setEmail(e.target.value)}
                    value={email}
                  >
                    <EditablePreview />
                    {/* <Input as={EditableInput} onChange={(e)=>console.log(e.target.value)}/> */}
                    <EditableInput />
                  </Editable>
                  {/* <Text>Email</Text> */}
                  </Flex>
                 
                 
                </Flex>

                {/* 3 */}
                <Flex ml={"-130px"} justifyContent={"space-around"} h={"2em"} w={"85%"}>
                 <Flex>
                  <Box mr={2}>
                  <FiPhone fontSize={20}/>
                  </Box>
                  {/* <Text>Numéro</Text> */}
                  <Editable
                    onInput={(e) => setNumero(e.target.value)}
                    value={numero}
                  >
                    <EditablePreview />
                    {/* <Input as={EditableInput} onChange={(e)=>console.log(e.target.value)}/> */}
                    <EditableInput />
                  </Editable>
                 </Flex>
                  
                 
                </Flex>
                <Flex ml={-3} justifyContent={"space-around"} h={"2em"} w={"85%"} mb={5}>
                <Flex mr={10}>
                  <Box mr={2}>
                  <MdLocationOn fontSize={20}/>
                  </Box>
                  <Editable
                    onInput={(e) => setAddress(e.target.value)}
                    value={address}
                  >
                    <EditablePreview />
                    {/* <Input as={EditableInput} onChange={(e)=>console.log(e.target.value)}/> */}
                    <EditableInput />
                  </Editable>
                  {/* <Text>Adresse</Text> */}
                 </Flex>
                
                </Flex>
              
              </Box>
            </Stack>
          </Center>

          <Button
            bgColor="#0a7f97"
            mt={".5em"}
            w={"fit-content"}
            px={4}
               py={2}      
             color={"white"}
            // borderRadius={"full"}
            onClick={()=>createNew()}
          >
            Enregistrer
          </Button>
        </Center>
      </Center>
    </>
  );
};

export default AdminProfilePanels;
