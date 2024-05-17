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
  Textarea,
  SimpleGrid,
  CheckboxGroup,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";
import React, { useState } from "react";

import { app, db, storage } from "@/Firebase/Connexion";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import Logo from "@/components/generale/Logo";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs"
import axios from "axios";










const Inscription = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [loader,setLoader] = useState(false)
  //recuperation des champs
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [siret, setSiret] = useState();
  const [organisation, setOrganisation] = useState();
  const [categorie, setCategorie] = useState('Restaurant');
  const [name, setName] = useState();
  const [description, setDescription] = useState("none");
  const [adresse, setAdresse] = useState();
  const [tva, setTva] = useState();
  const [ville, setVille] = useState();
  const [codePostal, setCodePostal] = useState();
  const [image, setImage] = useState();
  const [uri, setUri] = useState();
  const [bool, setBool] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const TermsCond = "Je certifie avoir lu et approuvé les ";
  ///envoie de mail pour la verification
  const randomNumb = parseInt(Math.random() * 1000000)
  const [verif,setVerif] = useState(false);



  const [livraison, setLivraison] = useState("Non");
  const [taxe, setTaxe] = useState("");

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
    setLoader(true)
    if (password == password2) {
      //hachage ici

      //fin hachage

      // create a pointer to our Document
      const _user = doc(db, `Admin/${email}`);
      // structure the todo data
      const Users = {
        categorie,
        // imageUrl: uri,
        name,
        organisation,
        number,
        email,
        password,
        // siret,
        adresse,
        // tva,
        transportLivraison: livraison,
        taxeLivraison:taxe,
        ville,codePostal,
        description,
        status: 'non verifié',
        code: randomNumb
      };
      await setDoc(_user, Users)
        .then(async () => {
           await axios.post("/api/sendmail", { email: email, message: randomNumb, subject: "code de verification" });
          toast({
            title: "INSCRIPTION VALIDEE",
            description: "veuillez vous connecter",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          setLoader(true)
          setVerif(true)
        })
        .catch(() => {
          setLoader(false)
          toast({
            title: "VERIFIER LES CHAMPS/VOUS AVEZ UN COMPTE",
            description: "SVP VERIFIER VOS DONNEES ",
            status: "error",
            duration: 7000,
            isClosable: true,
          });
        });

    } else {
      setLoader(false)
      // console.log("okay la");
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
  const imageRef = ref(storage, cat + "/" + org + "/logo/" + file.name.trim());
  await uploadBytes(imageRef, file);

  // Get the download URL of the uploaded image
  const downloadURL = await getDownloadURL(imageRef);

  // Do something with the downloadURL, such as storing it in a database
  setUri(downloadURL);
   createUSer();
  };
  const { isOpen, onToggle } = useDisclosure()
  const etes = "n'êtes"
if (verif) {
 router.push("/verification/")
}else{
  return (
    <>
      <Box
        mt={"-100px"}
        pb={20}
        // bgImage={"2.jpg"}
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
              display={"flex"}
              pb={10}
              w={"100%"}
              h={"fit-content"}
              direction={"column"}
              mt={"1em"}
              alignItems={"center"}

            >
              <Box ml={"1em"} pb={10}>
                <Logo></Logo>
              </Box>

              <Center w={"full"} mt={5}>
                <Text
                  color={"#0077b6"}
                  fontWeight={"bold"}
                  fontSize={["0.8em", "0.8em", "0.90em", "1.5em", "2em"]}

                >
                  Bienvenue très chers fournisseurs
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

                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]} >Catégorie</FormLabel>
                  <Select
                    isRequired

                    border={"1px solid black"}
                    defaultValue={"Restaurant"}
                    value={categorie}
                    onChange={(e) => setCategorie(e.target.value)}
                  >

                    <option value={"Restaurant"} defaultChecked>Restaurant</option>
                    <option value={"Salon de Coiffure"}>Salon De Coiffure</option>
                    <option value={"Commerce de meches"}>Commerce de meches</option>
                    <option value={"Cosmetique"}>Cosmetique</option>
                    <option value={"Textile"}>Textile</option>
                    <option value={"Fret"}>Fret</option>

                    <option value={"Epicerie"}>Epicerie</option>
                  </Select>
                </Stack>
              </Flex>

              {/* les deux inputs  */}
              <SimpleGrid columns={[1, 1, 1, 2, 2]} w={"100%"} alignItems={"center"} justifyContent={"center"}>

                <Stack direction={"column"} w={{ base: "90%" }} >

                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]} htmlFor="input1">Nom Du Gérant</FormLabel>

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
                <Stack direction={"column"} w={{ base: "90%" }}>

                  <Text fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]} >Description</Text>

                  <Textarea

                    onChange={(e) => setDescription(e.target.value)}
                    placeholder='Here is a sample placeholder'
                    size='sm'
                  />
                </Stack>

                {/* input email */}

                {/* input email */}
                <Stack direction={"column"} w={{ base: "90%" }} mt={"1.5em"}>
                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]}>
                    Société/Organisation{" "}
                  </FormLabel>
                  <Input
                    isRequired
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="Le nom de votre Société"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setOrganisation(e.target.value)}
                    type="text"

                  ></Input>
                </Stack>
                <Stack direction={"column"} w={{ base: "90%" }} >
                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]}>
                    Numero de la structure
                  </FormLabel>
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
                {/* input email */}
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>

                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]} htmlFor="InputVille">
                    Ville{" "}
                  </FormLabel>
                  <Input
                    isRequired
                    id="InputVille"
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="Ville"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setVille(e.target.value)}
                    type="text"
                    maxLength={30}
                  ></Input>

                </Stack>
                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]} htmlFor="InputPostal">
                    Code postal
                  </FormLabel>
                  <Input
                    w={"100%"}
                    h={"4em"}
                    id="InputPostal"
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="Code postal"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => setCodePostal(e.target.value)}
                    type="text"
                    isRequired
                  ></Input>
                </Stack>
                {/* input email */}



                {/* input Nom */}


                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]}>
                    Adresse
                  </FormLabel>
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
                <Stack direction={"column"} w={{ base: "90%" }} mt={"1em"}>
                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]}>
                    E-mail
                  </FormLabel>
                  <Input
                    w={"100%"}
                    h={"4em"}
                    bg={"#fff"}
                    borderRadius={"full"}
                    placeholder="votre e-mail"
                    _placeholder={{ color: "#000" }}
                    onChange={(e) => { setEmail(e.target.value.trim()) }}
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


                <Stack direction={"column"} w={{ base: "90%" }} mt={"2em"}>
                  <Text fontWeight={"bold"} fontSize={"1.5em"}>
                    Avez vous votre moyen de livraison?
                  </Text>
                 <Flex justifyContent={"space-around"} display={{base:"grid",lg:"flex"}}>
                  <RadioGroup mb={{base:5,lg:0}} width={{base:"100%",lg:"50%"}} onChange={(e)=>{setLivraison(e), e == "non" ? setTaxe(0) : setTaxe(taxe)}} >
                  <Radio mr={10} colorScheme="blue"  value={"oui"}>
                     Oui
                   </Radio>
                   <Radio colorScheme="red"   value={"non"}>
                     Non
                   </Radio> 
                  </RadioGroup>
                  {livraison == "oui" ? 
                  <Input onChange={(e)=>setTaxe(e.target.value)} width={{base:"100%",lg:"50%"}} placeholder="Entrez la valeur"/>
                  :
                  <>  </>
                  } 
                 </Flex>
                </Stack>
                {/* input mot de pass */}
                <Stack direction={"column"} w={{ base: "90%" }} mt={"1em"}>
                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]}>
                    Mot de Passe
                  </FormLabel>
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
                        {show ? <BsEyeFill fontSize={"20px"} /> : <BsEyeSlashFill fontSize={"20px"} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Stack>
                <Stack direction={"column"} w={{ base: "90%" }} >
                  <FormLabel fontWeight={"bold"} fontSize={["1em", "1em", "1em", "1.25em", "1.5em"]}>
                    Confirmation du Mot de Passe
                  </FormLabel>
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
                        {show ? <BsEyeFill fontSize={"20px"} /> : <BsEyeSlashFill fontSize={"20px"} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Stack>

                {/* input email */}
              </SimpleGrid>
              <Box w={"fit-content"} ml={["10%", "10%", "10%", "30%", "30%",]} >
                <Box display={'flex'} width={"fit-content"} textAlign={'center'} >
                  {/* <Checkbox onDoubleClick={()=>console.log("okay")}  borderColor={"black"} mt={3} mr={5} ml={5}/> */}
                  <Checkbox mt={"1em"} pr={1} onChange={e => {setBool(!e.target.checked) }}>{TermsCond}  <Link
                    color={"messenger.400"}
                    fontWeight={"bold"}
                    mt={"1em"}
                    href={"/Terms"}
                    _hover={{ textDecoration: "none" }}>
                    termes et conditions
                  </Link> </Checkbox>

                </Box>


              </Box>
              <Center
                mt={"1em"}
                w={"100%"}
                py={2}
                h={{ base: "2em" }}
                _hover={{ textDecoration: "none" }}
              >
                <Link
                  // w={"50%"}
                  // py={2}
                  h={{ base: "2em" }}
                  _hover={{ textDecoration: "none" }}
                >
                  <Button
                    isDisabled={bool == true || email.length < 15 || password.length < 8 || password2.length < 8 }
                    isLoading={loader}
                    w={"fit-content"}
                    h={"full"}
                    colorScheme="blue"
                    borderRadius={"full"}
                    fontSize={"1.25em"}
                    onClick={() => {
                     
                      handleImageUpload(image, categorie, organisation)
                      // createUSer()
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
                  pr={2}
                  _hover={{ textDecoration: "none" }}
                >
                  Avez vous deja un compte?{" "}
                </Text>
                <Link
                  href="/Connexion"
                  color={"#0077b6"}
                  fontWeight={"bold"}
                  mt={"1em"}
                  _hover={{ textDecoration: "none", color: 'messenger.400' }}
                >
                  Connectez-vous
                </Link>
              </Flex></Center>

          </Flex>
        </Center>
      </Box>
    </>
  );
}
  
};

export default Inscription;
