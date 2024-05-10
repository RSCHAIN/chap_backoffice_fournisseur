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
    Box
  } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import { ChevronDownIcon, EmailIcon, Search2Icon } from "@chakra-ui/icons";
  import { faBell, faHomeLgAlt } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
  import { deleteCookie, getCookie, hasCookie } from "cookies-next";
  import { useRouter } from "next/router";
  import { database } from "@/Firebase/Connexion";

  
  
  const MenuLink = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [user, setUser] = useState()
    const [org,setOrg]= useState()
    const [display,setDisplay]= useState("none")
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
          if (JSON.parse(exist2) == "Restaurant") {
              setDisplay("grid")
          }
         
         
      }else{
        router.push("/Connexion")
      }
      
    },[setData,router]);
    const logout = () => {
      localStorage.clear("user")
      // Cookies.remove("user")
      router.reload()
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
              <Flex  ml={"40%"}
                w={"10em"}
                alignItems={"center"}
                justifyContent={""}
              >
                <Link href="/Dashboard" mr={5}>
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
  
          
        </Stack>
      </>
    );
  };
  
  export default MenuLink;
  