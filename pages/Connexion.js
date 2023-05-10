import {
  Box,
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Logo from "./components/generale/Logo";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/Firebase/Connexion";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";

const Connexion = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [userD, setUserD] = useState();
  
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const toast = useToast();
  const router = useRouter()




 






  const Login = async () => {
    // const q = query(collection(db, "Admin/"), where("email", "==", email));

    // const querySnapshot = await getDocs(q);

    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
      // if (doc.data().password == pass) {
      //   console.log(doc.data().password);
      //   localStorage.setItem("user",JSON.stringify(doc.data()));
      //   router.reload()
      // }
    // });
    const docRef = doc(db, "Admin/" + email);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      
      if (docSnap.data().password == pass ) {
       
        localStorage.setItem("user",JSON.stringify(docSnap.data().email));
        localStorage.setItem("cat",JSON.stringify(docSnap.data().categorie))
        localStorage.setItem("org",JSON.stringify(docSnap.data().organisation))
        localStorage.setItem("name",JSON.stringify(docSnap.data().name))
        router.reload()
        
          toast({
            title: "ACCES APPROUVÉ",
            description: "NOUS VOUS REDIRIGEONS",
            status: "success",
            duration: 5000,
            isClosable: true,
          })
      
      }else{
        toast({
          title: "VERIFIER VOS INFORMATIONS",
          description: "Erreur dans l'un des champs",
          status: "warning",
          duration: 5000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: "VERIFIER VOS INFORMATIONS",
        description: "Erreur dans l'un des champs",
        status: "warning",
        duration: 5000,
        isClosable: true,
      })
    }
  };
  if (typeof window !== "undefined") {
    const exist =  localStorage.getItem("user");
    if (exist) {
       console.log(exist.toString())
       router.push("/Dashboard")
    }
    
   }
  return (
    <>
      {/* le main  */}
      <Center width={"100%"} height={"100vh"}>
        {/* la premier box grise  */}
        <Flex
          width={{ base: "90%", md: "70%", xl: "50%", "2xl": "40%" }}
          height={{
            base: "90vh",
            md: "90vh",
            lg: "70vh",
            xl: "65vh",
            "2xl": "70vh",
          }}
          bg={"#dee2e6"}
          borderRadius={"2em"}
          direction={"column"}
        >
          {/* premiere ligne  */}
          <Stack
            w={"100%"}
            h={"4em"}
            direction={"row"}
            mt={"1em"}
            alignItems={"center"}
          >
            <Box ml={"1em"}>
              <Logo></Logo>
            </Box>

            <Center w={"full"}>
              <Text color={"#0077b6"} fontWeight={"bold"} fontSize={"2em"}>
                PAGE DE CONNEXION
              </Text>
            </Center>
          </Stack>

          {/* les deux inputs  */}
          <Flex
            w={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            {/* input email */}
            <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
              <Text fontWeight={"bold"} fontSize={"1.5em"}>
                E-mail
              </Text>
              <Input
                w={"100%"}
                h={"4em"}
                bg={"#fff"}
                borderRadius={"full"}
                placeholder="votre e-mail"
                _placeholder={{ color: "#000" }}
                onChange={(e) => setEmail(e.target.value)}
                isRequired
              ></Input>
            </Stack>

            {/* input mot de pass */}
            <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
              <Text fontWeight={"bold"} fontSize={"1.5em"}>
                Mot de Passe
              </Text>
              <InputGroup>
                <Input
                  w={"100%"}
                  h={"4em"}
                  bg={"#fff"}
                  borderRadius={"full"}
                  placeholder="mot de passe"
                  _placeholder={{ color: "#000" }}
                  type={show ? "text" : "password"}
                  onChange={(e) => setPass(e.target.value)}
                  _valid={{ border: "1px solid red" }}
                  isRequired
                ></Input>

                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    w={"fit-content"}
                    size="sm"
                    mt={5}
                    mr={5}
                    onClick={handleClick}
                  >
                    {show ? "Afficher" : "Masquer"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </Flex>

          <Center
            mt={"2em"}
            w={"100%"}
            h={{ base: "3em" }}
            _hover={{ textDecoration: "none" }}
          >
            <Link
              w={"50%"}
              h={{ base: "3em" }}
              _hover={{ textDecoration: "none" }}
            >
              <Button
                w={"full"}
                h={"full"}
                colorScheme="blue"
                borderRadius={"full"}
                fontSize={"1.5em"}
                onClick={() => Login()}
              >
                Connexion
              </Button>
            </Link>
          </Center>

          <Link
            color={"#0077b6"}
            textAlign={"center"}
            fontWeight={"bold"}
            mt={"1em"}
            _hover={{ textDecoration: "none" }}
          >
            Mot de passe oublié ?
          </Link>
        </Flex>
      </Center>
    </>
  );
};

export default Connexion;
