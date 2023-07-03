import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Stack,
  Switch,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { app, db, storage } from "@/Firebase/Connexion";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import Logo from "@/components/generale/Logo";











const Inscription = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  //recuperation des champs
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [password, setPassword] = useState();
  const [password2, setPassword2] = useState();
  const [siret, setSiret] = useState();
  const [organisation, setOrganisation] = useState();
  const [categorie, setCategorie] = useState('Alimentation');
  const [name, setName] = useState();
  const [adresse, setAdresse] = useState();
  const [tva, setTva] = useState();
  const [image, setImage] = useState();
  const [uri, setUri] = useState();
  const [bool, setBool] = useState(true);
  const toast = useToast();
  const router = useRouter();

///envoie de mail pour la verification
const randomNumb= parseInt(Math.random()*1000000)

const sendEmail = async (email, subject, message) => {
  return axios({
    method: 'post',
    url: '/api/sendmail',
    data: {
      email: email,
      subject: "VOTRE CODE D'ACCES A L'APPCHAP",
      message: randomNumb,
    },
  });
};







  const createUSer = async () => {
    if (password == password2) {
      //hachage ici

      //fin hachage

      // create a pointer to our Document
      const _user = doc(db, `Admin/${email}`);
      // structure the todo data
      const Users = {
        categorie,
        imageUrl: uri,
        name,
        organisation,
        number,
        email,
        password,
        siret,
        adresse,
        tva,
        status:'non verifié',
        code:randomNumb
      };
      await setDoc(_user, Users)
        .then(() => {
          toast({
            title: "INSCRIPTION VALIDEE",
            description: "veuillez vous connecter",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch(() => {
          toast({
            title: "VERIFIER LES CHAMPS/VOUS AVEZ UN COMPTE",
            description: "SVP VERIFIER VOS DONNEES ",
            status: "error",
            duration: 7000,
            isClosable: true,
          });
        });
      router.push("/Connexion");
    } else {
      console.log("okay la");
      toast({
        title: "MAUVAISE SAISIE",
        description: "MOT DE PASSE NON IDENTIQUE",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    }
  };

  ///upload image
  const handleImageUpload = async (file, cat, org) => {
    // Upload the image to Firebase Storage
    const imageRef = ref(storage, cat + "/" + org + "/logo/" + file.name);
    await uploadBytes(imageRef, file);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);

    // Do something with the downloadURL, such as storing it in a database
    setUri(downloadURL);
     createUSer();
  };
  const { isOpen, onToggle } = useDisclosure()

  return (
    <>
      <Box
        mt={"-100px"}
        pb={20}
        bgImage={"2.jpg"}
        bgSize={"cover"}
        height={"fit-content"}
      >
        
        {/* le main  */}
        <Center width={"100%"} pb={60} pt={-5}>
          {/* la premier box grise  */}
          <Flex
            width={{ base: "90%", md: "70%", xl: "50%", "2xl": "75%" }}
            mt={"190px"}
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
              alignItems={"center"}
            >
              <Box ml={"1em"}>
                <Logo></Logo>
              </Box>

              <Center w={"full"}>
                <Text
                  color={"#0077b6"}
                  fontWeight={"bold"}
                  fontSize={{ base: "1em", sm: "2em" }}
                >
                  BIENVENUE TRES CHERS FOURNISSEURS
                </Text>
              </Center>
            </Stack>
            <FormControl isRequired>
            <Flex
              w={"90%"}
              alignItems={"center"}
              justifyContent={"center"}
              flexDirection={"column"}
            >
              <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
               
                <FormLabel fontWeight={"bold"} fontSize={"1.5em"} >Catégorie</FormLabel>
                <Select
                isRequired
               
                  border={"1px solid black"}
                  defaultValue={"Alimentation"}
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                >
                  <option value={"Alimentation"} defaultChecked>
                    Alimentation
                  </option>
                  <option value={"Restauration"}>Restauration</option>
                  <option value={"Esthetique"}>Esthetique</option>
                  <option value={"Epicerie"}>Epicerie</option>
                </Select>
              </Stack>
            </Flex>
            {/* les deux inputs  */}
            <Flex w={"100%"} alignItems={"center"} justifyContent={"center"}>
              <Flex
                w={"50%"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                 
                  <FormLabel fontWeight={"bold"} fontSize={"1.5em"} htmlFor="input1">Nom Du Gérant</FormLabel>
                  
                  <Input
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    id="input1"
                    borderRadius={"full"}
                    placeholder="votre nom"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    isRequired
                  ></Input>
                </Stack>

                {/* input email */}

                {/* input email */}
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    Société/Organisation{" "}
                  </Text>
                  <Input
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="Le nom de votre Société"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setOrganisation(e.target.value)}
                    type="text"
                    isRequired
                  ></Input>
                </Stack>
                {/* input email */}
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
             
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    SIRET{" "}
                  </Text>
                  <Input
                  isRequired
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="Numéro de SIRET"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setSiret(e.target.value)}
                    type="text"
                    maxLength={30}
                  ></Input>
                 
                </Stack>
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    T.V.A
                  </Text>
                  <Input
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="votre numero de TVA"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setTva(e.target.value)}
                    type="text"
                    isRequired
                  ></Input>
                </Stack>
                {/* input email */}

                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    Numero de la structure
                  </Text>
                  <Input
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="Numero de la structure"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setNumber(e.target.value)}
                    type="number"
                    isRequired
                  ></Input>
                </Stack>
              </Flex>
              {/* input Nom */}

              <Flex
                w={"50%"}
                alignItems={"center"}
                justifyContent={"center"}
                flexDirection={"column"}
              >
                 <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                 Adresse
                  </Text>
                  <Input
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="votre Adresse"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setAdresse(e.target.value)}
                    type="text"
                    isRequired
                  ></Input>
                </Stack>
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
                    type="email"
                    isRequired
                  ></Input>
                </Stack>
               
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    IMAGE DU MAGASIN
                  </Text>
                  <Input
                    w={"100%"}
                    
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder=""
                    _placeholder={{ color: "#000" }}
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      setImage(e.target.files[0])
                    }}
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
                      onChange={(e) => setPassword(e.target.value)}
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
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    Confirmation du Mot de Passe
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
                      onChange={(e) => setPassword2(e.target.value)}
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
              {/* input email */}
            </Flex>
            <Box textAlign={'center'} alignContent={"center"} justifyContent={"center"} alignItems={"center"} >
              <Box display={'flex'}  textAlign={'center'} marginX={"35%"}>
                <Checkbox onDoubleClick={()=>console.log("okay")}  borderColor={"black"} mt={3} mr={5} ml={5}/>
              <Text mt={"1em"}>En cochant cette case, vous acceptez nos </Text>
              
              </Box>
       
            <Link
              color={"messenger.400"}
              fontWeight={"bold"}
              mt={"1em"}
              href={"/Terms"}
              _hover={{ textDecoration: "none" }}>
              Termes et Conditions
            </Link>
          </Box>
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
                //  isDisabled={bool}
                  w={"full"}
                  h={"full"}
                  colorScheme="blue"
                  borderRadius={"full"}
                  fontSize={"1.5em"}
                  onClick={() => {
                    handleImageUpload(image, categorie, organisation),
                     createUSer()
                  }}
                >
                  Inscription
                </Button>
              </Link>
            </Center>
            </FormControl>
            <Center>
            <Flex alignContent={"center"} textAlign={"center"}>
              <Text
                color={"#0077b6"}
                fontWeight={"bold"}
                mt={"1em"}
                _hover={{ textDecoration: "none" }}
              >
                VOUS AVEZ DEJA UN COMPTE?{" "}
              </Text>
              <Link
              href="/Connexion"
                color={"#0077b6"}
                fontWeight={"bold"}
                mt={"1em"}
                _hover={{ textDecoration: "none",color:'messenger.400' }}
              >
                Connectez-vous
              </Link>
            </Flex></Center>
            
          </Flex>
        </Center>
      </Box>
    </>
  );
};

export default Inscription;
