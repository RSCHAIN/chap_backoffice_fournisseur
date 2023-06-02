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
  Image
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
import { database } from "@/Firebase/Connexion";


const DesktopNav = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [user, setUser] = useState()
  const [org,setOrg]= useState()
  const [cat,setCat] = useState()
  const [email,setEmail] = useState()


  useEffect(() => {
    const exist =  localStorage.getItem("user");
    const exist2 =  localStorage.getItem("cat");
    const exist3 =  localStorage.getItem("org");
    const exist4 =  localStorage.getItem("name");
    if (exist) {
       setData(JSON.parse(exist))
       const all = JSON.parse(exist)
        
        setCat(JSON.parse(exist2))
        setOrg(JSON.parse(exist3))
        setUser(JSON.parse(exist4))
        setEmail(JSON.parse(exist))
       
       router.push("/Dashboard")
    }else{
      router.push("/Connexion")
    }
    
  },[setData,router]);
  const logout = () => {
    localStorage.clear("user")
  };

  









  return (
    <>
    
      <Stack w={"100%"} h={"auto"} direction={"column"} spacing={"0"}>
        {/* le logo et la nav laterale  */}
        <Stack w={"100%"} direction={"row"} spacing={"0"}>
          {/* la box du logo  */}
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

          {/* la box de l'input  */}
          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"85.5%"}
          >
            <InputGroup w={"20em"} ml={"1em"}>
              <Input
                type="tel"
                placeholder="Recherche..."
                bg={"#dee2e6"}
                borderRadius={"5px"}
                _placeholder={{ fontWeight: "bold" }}
              />
              <InputRightElement
                bg={"#0077b6"}
                color={"#fff"}
                borderTopRightRadius={"5px"}
                borderBottomRightRadius={"5px"}
              >
                <Search2Icon />
              </InputRightElement>
            </InputGroup>

            {/* icone button's */}
            <Flex
              w={"20em"}
              alignItems={"center"}
              justifyContent={"space-around"}
            >
              <Link href="/Dashboard">
                <FontAwesomeIcon
                  icon={faHomeLgAlt}
                  color="#6c757d"
                ></FontAwesomeIcon>
              </Link>

              <Link>
                <FontAwesomeIcon
                  icon={faBell}
                  color="#6c757d"
                ></FontAwesomeIcon>
              </Link>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Link>
                  <Avatar
                   
                    name={user ? user : ""}
                  
                    mr={"1em"}
                    bgColor={'#08566e'}
                  />
                </Link>

                <Menu>
                  <MenuButton
                    as={Button}
                    // rightIcon={<ChevronDownIcon />}
                    variant="outline"
                  >
                    Admin
                  </MenuButton>
                  <MenuList>
                  <Center as={Text}>{email ? email : ""}</Center>
                    <MenuItem as={Button} onClick={() => logout()}>
                      Deconnexion
                    </MenuItem>
                    
                    {/* <MenuItem>Create a Copy</MenuItem>
                                        <MenuItem>Mark as Draft</MenuItem>
                                        <MenuItem>Delete</MenuItem>
                                        <MenuItem>Attend a Workshop</MenuItem> */}
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Flex>
        </Stack>

        <Tabs
          variant="unstyled"
          display={"flex"}
          flexDirection={"row"}
          w={"100%"}
          minH={"100vh"}
        >
          <TabList w={{ md: "30%", xl: "17%" }} flexDirection={"column"}>
            <Tab
              w={{ md: "90%", lg: "80%" }}
              h={"3em"}
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
              Table des produits
            </Tab>

            <Tab _selected={{ color: "blue" }}>Commandes</Tab>

            <Tab _selected={{ color: "blue" }}>Les clients</Tab>

            {/* <Tab _selected={{ color: "blue" }}>Liste Des Magasins</Tab> */}

            {/* <Tab _selected={{ color: "blue" }}>Profile Admin</Tab> */}
          </TabList>

          <TabPanels bg={"#e9ecef"} w={{ md: "70%", xl: "83%" }} h={"100%"}>
            {/* dashboard  */}
            <TabPanel w={"100%"} h={"100%"}>
              <DashBoardPanels></DashBoardPanels>
            </TabPanel>

            {/* table des produits  */}
            <TabPanel w={"100%"} h={"100%"}>
              <ProduitsPanels></ProduitsPanels>
            </TabPanel>

            {/* commandes  */}
            <TabPanel w={"100%"} h={"100%"}>
              <CommandesPanels></CommandesPanels>
            </TabPanel>

            {/* utilisateurs   */}
            <TabPanel w={"100%"} h={"100%"}>
              <UtilisateursPanels></UtilisateursPanels>
            </TabPanel>

            {/* employes  */}
            {/* <TabPanel w={"100%"} h={"100%"}> */}
              {/* <EmployePanels></EmployePanels>
            </TabPanel> */}

            {/* profile admin  */}
            <TabPanel w={"100%"} h={"100%"}>
              <AdminProfilePanels></AdminProfilePanels>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </>
  );
};

export default DesktopNav;
