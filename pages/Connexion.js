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
  cookieStorageManager,
  useDisclosure,
  useToast,

  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/Firebase/Connexion";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { useRouter } from "next/router";
import Logo from "@/components/generale/Logo";
import { FiEyeOff } from "react-icons/fi"
import { FaEye } from "react-icons/fa"
import Cookies from "js-cookie";
import axios from "axios";

const Connexion = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [userD, setUserD] = useState();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [pass, setPass] = useState("");
  const [passCnf, setPassCnf] = useState("");
  const toast = useToast();
  const router = useRouter();

  const Login = async () => {

    const docRef = doc(db, "Admin/" + email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().password == pass) {
        if (docSnap.data().status == "VERIFIE") {
          localStorage.setItem("user", JSON.stringify(docSnap.data().email) ?? "");
          localStorage.setItem("cat", JSON.stringify(docSnap.data().categorie) ?? "");
          localStorage.setItem("imageUrl", JSON.stringify(docSnap.data().imageUrl ?? ""));
          localStorage.setItem(
            "org",
            JSON.stringify(docSnap.data().organisation)
          );
          localStorage.setItem("name", JSON.stringify(docSnap.data().name));
          Cookies.set("user", JSON.stringify(docSnap.data().name));

          toast({
            title: "ACCES APPROUVÉ",
            description: "NOUS VOUS REDIRIGEONS",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          // if (typeof window !== "undefined") {   
          //   const exist = localStorage.getItem("user");
          //   if (exist) {

          router.push("/Dashboard");
          //   }
          // }
        } else {
          toast({
            title: "MAIL NON VERIFIE",
            description: "MERCI DE BIEN VOULOIR VERIFIER VOTRE MAIL.NOUS VOUS REDIRIGEONS VERS LA PAGE DE VERIFICATION",
            status: "warning",
            duration: 10000,
            isClosable: true,
          });
        }
      } else {
        toast({
          title: "VERIFIER VOS INFORMATIONS",
          description: "Erreur dans l'un des champs",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "VERIFIER VOS INFORMATIONS",
        description: "Erreur dans l'un des champs",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };


  useEffect(() => {
    if (localStorage.getItem("user")) {
      router.push("/Dashboard");
    }
  }, [router]);


  ///Mot de passse oublié
  const randomNumb = parseInt(Math.random() * 1000000)
  const randomNumb2 = parseInt(Math.random() * 1000000)

  const [errorCode, setErrorCode] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPass, setErrorPass] = useState("")
  const [errorPass2, setErrorPass2] = useState("")


  const { isOpen, onOpen, onClose } = useDisclosure()

  const GenCode = async () => {
    try {
      setErrorCode("Code incorrect");
      setErrorEmail("")
      setErrorPass("")
      setErrorPass2("")
      const _user = doc(db, `Admin/${email}`);

      const docSnap = await getDoc(_user);
      if (docSnap.exists()) {

        if (docSnap.data().status == "VERIFIE") {
          await updateDoc(_user, {
            codeVerif: randomNumb
          }).then((res) => {
            axios.post("api/ResetCode", {
              email: email,
              codeVerif: randomNumb
            }).then((send) => {
              toast({
                title: "CODE ENVOYÉ",
                description: "MERCI DE BIEN VOULOIR VERIFIER VOTRE MAIL",
                status: "success",
                duration: 10000,
                isClosable: true,
              });
            })
          })
        } else {
          await updateDoc(_user, {
            codeVerif: randomNumb,
            status: "VERIFIE"
          }).then((res) => {
            axios.post("api/ResetCode", {
              email: email,
              codeVerif: randomNumb

            }).then((send) => {
              toast({
                title: "CODE ENVOYÉ",
                description: "MERCI DE BIEN VOULOIR VERIFIER VOTRE MAIL",
                status: "success",
                duration: 10000,
                isClosable: true,
              })
            })
          })
        }
      } else {
        toast({
          title: "COMPTE INEXISTANT",
          description: "MERCI DE BIEN VOULOIR VERIFIER VOTRE MAIL OU ESSAYER DE CREER UN COMPTE",
          status: "warning",
          duration: 10000,
          isClosable: true,
        });
      }
    } catch (error) {
      setErrorEmail("Veuillez saisir un email")
    }



  }

  const handleSubmit = async () => {
    try {
      setErrorCode("");
      setErrorEmail("")
      setErrorPass("")
      setErrorPass2("")
      if (pass.length >= 8 || passCnf.length >= 8) {
        if (pass == passCnf) {
          const _user = doc(db, `Admin/${email}`);

          const docSnap = await getDoc(_user);
          if (docSnap.exists()) {
            if (docSnap.data().codeVerif == code) {
              await updateDoc(_user, {
                password: pass,
                codeVerif:randomNumb2
              }).then((res) => {
                toast({
                  title: "Mot de passe réinitialisé",
                  description: "MERCI DE BIEN VOULOIR VOUS CONNECTER",
                  status: "success",
                  duration: 10000,
                  isClosable: true,
                });
                onClose()
                setErrorCode("");
                setErrorEmail("")
                setErrorPass("")
                setErrorPass2("")
              });
            } else {
              setErrorCode("Code incorrect");
              setErrorEmail("")
              setErrorPass("")
              setErrorPass2("")
            }
          }
          else {
            setErrorEmail("Renseigner le bon email svp");
            setErrorPass("")
            setErrorPass2("")
            setErrorCode("")
          }
        } else {
          setErrorPass("")
          setErrorPass2("Mot de passe non conforme");
          setErrorCode("")
          setErrorEmail("")
        }
      } else {
        setErrorPass("Mot de passe inferieur  à 8 caractères");
        setErrorPass2("Mot de passe inferieur  à 8 caractères");
        setErrorCode("")
        setErrorEmail("")
      }
    } catch (error) {
      setErrorEmail("Veuillez saisir un email")
      setErrorPass("")
      setErrorPass2("")
      setErrorCode("")
    }


  }
  return (
    <>
      {/* le main  */}
      <Center width={"100%"} height={"100vh"}>
        {/* la premier box grise  */}
        <Flex
          width={{ base: "70%", md: "70%", xl: "50%", "2xl": "40%" }}
          height={"fit-conte"}
          // bg={"#dee2e6"}
          borderRadius={"2em"}
          direction={"column"}
        >
          {/* premiere ligne  */}
          <Stack
            w={"100%"}
            h={"4em"}
            direction={"row"}
            mt={"1em"}
            mb={10}
            alignItems={"center"}
          >
            <Center w={"full"} display={"grid"}>
              <Box ml={"1em"}>
                <Logo></Logo>
              </Box>
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
                onChange={(e) => setEmail(e.target.value.trim())}
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
                    {show ? <FaEye fontSize={"20px"} /> : <FiEyeOff fontSize={"20px"} />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>

          </Flex>

          <Link
            color={"#0077b6"}
            ml={["30%", "50%", "60%", "70%", "70%"]}
            fontWeight={"bold"}
            mt={"1em"}
            w={"fit-content"}
            _hover={{ textDecoration: "none" }}
            href="#"
            onClick={onOpen}
          >
            Mot de passe oublié ?
          </Link>

          {/* formulaire du champ mdp oublieé */}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Reinitialisation</ModalHeader>
              <ModalCloseButton />
              <ModalBody>

                <Text>Email : </Text>
                <Input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Email" />
                {errorEmail ? <Text color={"red"} fontSize={"15px"} my={2} fontWeight={"bold"}>{errorEmail}</Text> : <></>}
                <Text>Code de validation</Text>
                <SimpleGrid columns={2} spacingX={10} >
                  <Input onChange={(e) => setCode(e.target.value)} type="number" placeholder="8xxxxxx" />
                  <Button colorScheme="cyan" color={"#3952DB"} width={"-moz-fit-content"} onClick={GenCode}>Avoir le code</Button>
                </SimpleGrid>
                {errorCode ? <Text color={"red"} fontSize={"15px"} my={2} fontWeight={"bold"}>{errorCode}</Text> : <></>}
                <Text>Nouveau mot de passe</Text>
                <Input onChange={(e) => setPass(e.target.value)} type="password" placeholder="Nouveau  mot de passe" />
                {errorPass ? <Text color={"red"} fontSize={"15px"} my={2} fontWeight={"bold"}>{errorPass}</Text> : <></>}
                <Text>Confirmer le nouveau mot de passe</Text>
                <Input onChange={(e) => setPassCnf(e.target.value)} type="password" placeholder="Confirmation" />
                {errorPass2 ? <Text color={"red"} fontSize={"15px"} my={2} fontWeight={"bold"}>{errorPass2}</Text> : <></>}

              </ModalBody>

              <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={onClose}>
                  Annuler
                </Button>
                <Button colorScheme="blue" type="submit" onClick={handleSubmit}>Reinitialiser</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>







          <Center
            mt={"2em"}
            w={"full"}
            h={{ base: "3em" }}
            _hover={{ textDecoration: "none" }}
          >

            <Link
              // w={"50%"}
              h={{ base: "3em" }}
              _hover={{ textDecoration: "none" }}
            >
              <Button
                w={"fit-content"}
                h={"full"}
                colorScheme="blue"
                borderRadius={"full"}
                px={5}
                py={5}
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
            href="/Inscription"
            _hover={{ textDecoration: "none" }}>
            Pas de compte? Créer un compte
          </Link>



        </Flex>

      </Center>

    </>
  );
};

export default Connexion;
