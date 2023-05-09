import { useState } from 'react';
import { Box, Button } from '@chakra-ui/react';

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { app, storage } from '@/Firebase/Connexion';






const UploadImage = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    // Upload the image to Firebase Storage
    const imageRef = ref(storage, `images/${image.name}`);
    await uploadBytes(imageRef, image);

    // Get the download URL of the uploaded image
    const downloadURL = await getDownloadURL(imageRef);

    // Do something with the downloadURL, such as storing it in a database
    console.log(downloadURL);
  };

  return (
    <Box>
      <input type="file" onChange={handleImageChange} />
      <Button onClick={handleImageUpload}>Upload</Button>
    </Box>
  );
};

export default UploadImage;