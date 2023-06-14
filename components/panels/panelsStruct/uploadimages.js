import { storage } from "@/Firebase/Connexion";
import { Button, Input, Text } from "@chakra-ui/react";
import { getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { ref as sRef } from "firebase/database";
import { useState } from "react";

export default function Upload() {
  //upload images
  const [imageFile, setImageFile] = useState();
  const [downloadURL, setDownloadURL] = useState("");

   function handleSelectedFile (files) {
    if (files && files[0].size < 10000000) {
      setImageFile(files[0]);

      // console.log(files[0]);
    } else {
      // console.log("File size to large");
    }
  };
  function handleUploadFile () {
    if (imageFile) {
      const nam = imageFile.name;
      const storageRef = sRef(storage, "kolo.png");
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          switch (snapshot.state) {
            case "paused":
              // console.log("Upload is paused");
              break;
            case "running":
              // console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //url is download url of file
            setDownloadURL(url);
            // console.log("url", url);
          });
        }
      );
    } else {
      // console.log("File not found");
    }
  };
  return (
    <>
      <Text>Image du produit</Text>
      <Input
        type="file"
        accept="image/*"
        onChange={(files) => handleSelectedFile(files.target.files)}
        mb={2}
      />
      <Button onClick={()=>handleUploadFile()}>Send</Button>
    </>
  );
}
