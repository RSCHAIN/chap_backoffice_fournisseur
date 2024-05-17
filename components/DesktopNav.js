import {
  Avatar,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
  Heading,
  Box,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  useToast
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon, EmailIcon, Search2Icon } from "@chakra-ui/icons";
import { faBell, faHomeLgAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DashBoardPanels from "./panels/panelsStruct/DashBoardPanels";
import ProduitsPanels from "./panels/panelsStruct/ProduitsPanels";
import CommandesPanels from "./panels/panelsStruct/CommandesPanels";
import UtilisateursPanels from "./panels/panelsStruct/UtilisateursPanels";
import EmployePanels from "./panels/panelsStruct/EmployePanels";
import AdminProfilePanels from "./panels/panelsStruct/AdminProfilePanels";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { database, db } from "@/Firebase/Connexion";
import ReservationPanels from "./panels/panelsStruct/ReservationPanels";
import { doc, updateDoc } from "firebase/firestore";


const DesktopNav = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUser] = useState()
  const [org,setOrg]= useState()
  const [display,setDisplay]= useState("none")
  const [display2,setDisplay2]= useState("grid")
  const [cat,setCat] = useState()
  const [email,setEmail] = useState()
  const [livraison,setLivraison] = useState()
  const [taxe,setTaxe] = useState()
  const toast = useToast()

  const handleUpdateLivraison = async () => {
    const adminRef = doc(db, `Admin/${email}`);
    if (livraison == "non") {
      await updateDoc(adminRef, {
        taxeLivraison: 0,
        transportLivraison:livraison
      }).then(() =>toast({title: "Option enregistrée", status: "success",duration: 9000,position: "top-right",isClosable:true}));
    }else{
      if (parseFloat(taxe) >1) {
        await updateDoc(adminRef, {
          taxeLivraison: taxe,
          transportLivraison:livraison
        }).then(() =>toast({title: "Option enregistrée", status: "success",duration: 9000,position: "top-right",isClosable:true}));
      }else{toast({title: "Veuillez verifier vos informations", status: "warning",duration: 9000,position: "top-right",isClosable:true})}
     
    }
   

  };



  useEffect(() => {
    const exist =  sessionStorage.getItem("user");
    const exist2 =  sessionStorage.getItem("cat");
    const exist3 =  sessionStorage.getItem("org");
    const exist4 =  sessionStorage.getItem("name");
   setLivraison(sessionStorage.getItem("Livraison"))
   setTaxe(sessionStorage.getItem("Taxe"))
    if (exist) {
       setData(JSON.parse(exist))
       const all = JSON.parse(exist)
        
        setCat(JSON.parse(exist2))
        setOrg(JSON.parse(exist3))
        setUser(JSON.parse(exist4))
        setEmail(JSON.parse(exist))
        if (JSON.parse(exist2) == "Restaurant") {
            setDisplay("grid")
        }
      //   if (JSON.parse(exist2) != "Restaurant" && JSON.parse(exist2) != "Salon de Coiffure"){
      //     setDisplay2("grid")
      // }
       
       
    }else{
      router.push("/Connexion")
    }
    
  },[setData,router]);
  const logout = () => {
    sessionStorage.clear("user")
    router.push("/")
  };

  









  return (
    <>
    
      <Stack w={"100%"}  direction={"column"} spacing={"0"}>
        {/* le logo et la nav laterale  */}
        <Stack w={"100%"} direction={"row"} spacing={"0"}>
          {/* la box du logo  */}
          
          {/* la box de l'input  */}
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"100%"}
          >
            <Center w={"14.5%"} h={"5em"}>
            <Center
              h={"4.5em"}
              w={"8em"}
              borderRadius={"70%"}
              // bg={"#0077b6"}
              color={"#fff"}
              mt={".5em"}
            >
              
              <Image alt='logo chap' src={"./logo1.png"} />
            </Center>
          </Center>

           

            {/* icone button's */}
            <Flex  ml={"45%"}
              w={"20em"}
              alignItems={"center"}
              justifyContent={""}
            >
              <Link href="/Dashboard" mr={10}>
                <FontAwesomeIcon
                  icon={faHomeLgAlt}
                  color="#6c757d"
                ></FontAwesomeIcon>
              </Link>

             
              <Flex alignItems={"center"} justifyContent={"center"}>
               

                <Menu>
                  <MenuButton
                    as={Button}
                    // rightIcon={<ChevronDownIcon />}
                    variant="outline"
                  >
                    {user ? user : ""}
                  </MenuButton>
                  <MenuList>
                  <Center as={Text}>{email ? email : ""}</Center>
                    <MenuItem as={Button} onClick={() => logout()}>
                      Deconnexion
                    </MenuItem>
                    
                   
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Flex>
        </Stack>

        <Tabs
        display={["none","none","none","flex","flex"]}
          // variant="unstyled"
         
         
         
          orientation="vertical"
        >
          <TabList w={{ md: "30%", xl: "17%" }} >
            <Tab
              w={{ md: "90%", lg: "80%" }}
            
              ml={{ md: "5%", lg: "10%" }}
              borderRadius={"10px"}
              color={"#0077b6"}
              fontWeight={"bold"}
              mt={"2em"}
              _selected={{ color: "#fff", bg: "#0077b6" }}
            >
              <EmailIcon />{" "}
              <Text ml={{ md: "0.5em", lg: "1em" }}>Dashboard</Text>
            </Tab>

            <Tab _selected={{ color: "blue" }} mt={"3em"}>
              Produits
            </Tab>

            <Tab _selected={{ color: "blue" }}>Commandes</Tab>
            <Tab _selected={{ color: "blue" }} display={display2}>Frais de livraison</Tab>

    
           
            <Tab _selected={{ color: "blue" }} display={display}>  Reservations</Tab>
            <Tab _selected={{ color: "blue" }}>Profils</Tab>

            {/* <Tab _selected={{ color: "blue" }}>Liste Des Magasins</Tab> */}

            {/* <Tab _selected={{ color: "blue" }}>Profile Admin</Tab> */}
          </TabList>

          <TabPanels className="h-screen"  bg={"#e9ecef"} w={{ md: "70%", xl: "83%" }} >
            {/* dashboard  */}
            <TabPanel >
              <DashBoardPanels></DashBoardPanels>
            </TabPanel>

            {/* table des produits  */}
            <TabPanel  >
              <ProduitsPanels categ={cat}></ProduitsPanels>
            </TabPanel>
              
            {/* commandes  */}
            <TabPanel  >
              <CommandesPanels></CommandesPanels>
            </TabPanel>

    {/* Frais de livraiosn  */}
    <TabPanel   >
              <Center>
                <Box bgColor={"white"} width={"500px"} boxShadow={"rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;"} height={"fit-content"} p={5}>
                <Flex justifyContent={"space-around"} display={"grid"}>
                  <Center>
                  <RadioGroup value={livraison} display={"flex"} mt={5} mb={{base:5,lg:10}}  onChange={(e)=>{setLivraison(e), e == "non" ? setTaxe(0) : setTaxe(taxe)}} >
                  <Radio mr={10} colorScheme="blue"  value={"oui"}>
                     Oui
                   </Radio>
                   <Radio colorScheme="red"   value={"non"}>
                     Non
                   </Radio> 
                  </RadioGroup>
                  </Center>
                  {livraison == "oui" ? 
                  <Input value={taxe} mb={{base:5,lg:10}} onChange={(e)=>setTaxe(e.target.value)} placeholder="Entrez la valeur"/>
                  :
                  <>  </>
                  } 
                  <Center><Button colorScheme="green" onClick={()=>handleUpdateLivraison()}>Enregistrer </Button></Center>
                 </Flex>
                </Box>
              </Center>
            </TabPanel>
            
            <TabPanel w={"100%"} h={"100%"}>
              <ReservationPanels></ReservationPanels>
            </TabPanel>
            {/* profile admin  */}
            <TabPanel  >
              <AdminProfilePanels/>
            </TabPanel>
          </TabPanels>
        </Tabs> 
        <Box mt={10} display={["flex","flex","flex","none","none"]}>
        <DashBoardPanels></DashBoardPanels></Box>
      </Stack>
    </>
  );
};

export default DesktopNav;
