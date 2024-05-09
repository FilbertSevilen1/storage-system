import React, { useEffect, useState } from "react";
import firebase from 'firebase/app';
import 'firebase/storage';

function FirebaseUploadImage(props) {
    const [image, setImage] = useState(props.image);
    const [imageUrl, setImageUrl] = useState('');

  const firebaseConfig = {
    apiKey: "",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "storage-system-135a2",
    storageBucket: "gs://storage-system-135a2.appspot.com",
    messagingSenderId: "6215443319",
    appId: "",
  };

  useEffect(()=>{
    handleUpload();
  },[])

  const handleUpload = () => {
    
    const storageRef = firebase.storage().ref(`images/${image.name}`);
    const uploadTask = storageRef.put(image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // progress function
      },
      (error) => {
        console.error(error);
      },
      () => {
        // complete function
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImageUrl(downloadURL);
        });
      }
    );
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}
export default FirebaseUploadImage;
