import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useNavigate } from "react-router";

const API_URL = process.env.REACT_APP_API_URL;
function MyPenaltyRow(props) {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  let [no, setNo] = useState(props.no);
  let [id, setId] = useState(props.punishmentId);
  let [name, setName] = useState(props.punishmentUsername);
  let [type, setType] = useState(props.punishmentType);
  let [date, setDate] = useState(props.punishmentDate);
  let [status, setStatus] = useState(props.punishmentStatus);
  let [image, setImage] = useState(props.punishmentImage);
  let [description, setDescription] = useState(props.punishmentDescription);
  let defaultUploadDescription = useRef("");
  const [approvalDialog, setApprovalDialog] = useState(false);

  const [showImage, setShowImage] = useState("");

  const [uploadImage, setUploadImage] = useState("");
  const [originalImage, setOriginalImage] = useState("");
  const uploadDescription = useRef("");

  useState("");

  const formatDate = (date) => {
    const dateformat = new Date(date);

    const year = dateformat.getFullYear();
    const month = String(dateformat.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
    const day = String(dateformat.getDate()).padStart(2, "0");
    const hours = String(dateformat.getHours()).padStart(2, "0");
    const minutes = String(dateformat.getMinutes()).padStart(2, "0");
    const seconds = String(dateformat.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  const getDataResolution = () => {
    let body = {};

    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + `/resolution/get/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setShowImage(res.data.resolution.image);
        setOriginalImage(res.data.resolution.image);
        uploadDescription.current.value = res.data.resolution.description;
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal mendapatkan data");
      });
  };

  const openProofDialog = () => {
    getDataResolution();

    return setApprovalDialog(true);
  };
  const closeApprovalDialog = () => {
    setApprovalDialog(false);
  };

  const uploadPeralatanImageToFirebase = async () => {
    let currentdate = new Date();
    let day = currentdate.getDate().toString().padStart(2, "0"); // Ensures two digits with leading zero
    let month = (currentdate.getMonth() + 1).toString().padStart(2, "0"); // Ensures two digits with leading zero
    let year = currentdate.getFullYear().toString();
    let hours = currentdate.getHours().toString().padStart(2, "0"); // Ensures two digits with leading zero
    let minutes = currentdate.getMinutes().toString().padStart(2, "0"); // Ensures two digits with leading zero
    let seconds = currentdate.getSeconds().toString().padStart(2, "0"); // Ensures two digits with leading zero

    let datetime = day + month + year + hours + minutes + seconds;
    let filename = uploadImage.name.split(".");
    filename[0] = datetime;

    let combinedfilename = filename[0] + "." + filename[1];
    console.log(combinedfilename);

    const firebaseConfig = {
      apiKey: "AIzaSyAf5GnpEKVsZ8iPnbYHO9oJD-hdSk0TWao",
      authDomain: "storage-system-135a2.firebaseapp.com",
      projectId: "storage-system-135a2",
      storageBucket: "storage-system-135a2.appspot.com",
      messagingSenderId: "6215443319",
      appId: "1:6215443319:web:7e35fea7c364cf0035b772",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const storageRef = firebase.storage().ref(`peralatan/${combinedfilename}`);
    const uploadTask = storageRef.put(uploadImage);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
      },
      () => {
        // Complete function
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
          updateResolution(downloadURL);
        });
      }
    );
  };

  const updatePeralatanImageToFirebase = async () => {
    const firebaseConfig = {
      apiKey: "AIzaSyAf5GnpEKVsZ8iPnbYHO9oJD-hdSk0TWao",
      authDomain: "storage-system-135a2.firebaseapp.com",
      projectId: "storage-system-135a2",
      storageBucket: "storage-system-135a2.appspot.com",
      messagingSenderId: "6215443319",
      appId: "1:6215443319:web:7e35fea7c364cf0035b772",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    if (uploadImage) {
      // Reference to the Firebase Storage location where you want to replace the image
      const storageRef = firebase.storage().refFromURL(originalImage);

      // Upload the new image
      const uploadTask = storageRef.put(uploadImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress monitoring if needed
        },
        (error) => {
          console.error(error);
        },
        () => {
          // Image uploaded successfully, get the new URL
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            // Update the URL in your database or perform any other actions with the URL
            console.log("File available at", downloadURL);
            updateResolution(downloadURL);
          });
        }
      );
    }
  };

  const updateResolution = (imgurl) => {
    console.log(imgurl);

    const body = {
      punishmentId: id,
      name: name,
      description: uploadDescription.current.value,
      image: imgurl,
    };

    console.log(body);

    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .put(API_URL + "/resolution/update", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setSnackbar(true);
        closeApprovalDialog();
        setTimeout(() => {
          window.location.reload();
          setSnackbar(false);
        }, 1000);
        return setSnackbarMessage("Berhasil menyimpan data");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal menyimpan data");
      });
  };

  const onSubmit = () => {
    if (!originalImage && !uploadImage) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Gambar tidak boleh kosong!");
    }

    if (!uploadDescription.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Deskripsi tidak boleh kosong!");
    }

    if (originalImage && uploadImage) {
      updatePeralatanImageToFirebase();
    } else if (!originalImage && uploadImage) {
      uploadPeralatanImageToFirebase();
    } else {
      updateResolution(originalImage);
    }
  };

  const changeUploadImage = (event) => {
    setUploadImage(event.target.files[0]);
    setShowImage(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {}, []);

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />
      <Dialog open={approvalDialog} onClose={closeApprovalDialog}>
        <DialogTitle>Upload Bukti Penyelesaian Penalti</DialogTitle>
        <DialogContent>
          <div className="w-full h-[400px] flex justify-between">
            <div className="p-2 w-96 h-64">
              <div className="my-4">
                <input type="file" onChange={changeUploadImage}></input>
              </div>
              <img className="w-full h-64" src={showImage}></img>
              <div className="my-4">
                <TextField
                  className="w-full my-4"
                  inputRef={uploadDescription}
                  defaultValue={uploadDescription}
                  label="Deskripsi"
                ></TextField>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeApprovalDialog}>Batal</Button>
          <Button onClick={() => onSubmit()} type="submit">
            <b>Edit</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">No : </div>
          {no}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Jenis Hukuman : </div>
          {description}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Batas Waktu : </div>
          {formatDate(date)}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Status : </div>
          {status}
        </div>
        <div className=" w-full md:w-3/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
          {status != "Disetujui" ? (
            <div
              onClick={() => openProofDialog()}
              className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
                />
              </svg>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default MyPenaltyRow;
