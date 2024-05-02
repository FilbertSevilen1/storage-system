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
import React, { useRef, useState } from "react";
function MyPenaltyRow(props) {
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  let [no, setNo] = useState(props.no);
  let [name, setName] = useState(props.punishmentUsername);
  let [type, setType] = useState(props.punishmentType);
  let [date, setDate] = useState(props.punishmentDate);
  let [status, setStatus] = useState(props.punishmentStatus);
  let [image, setImage] = useState(props.punishmentImage);
  let [description, setDescription] = useState(props.punishmentDescription);
  const [approvalDialog, setApprovalDialog] = useState(false);

  const [showImage, setShowImage] = useState("")

  const [uploadImage, setUploadImage] = useState("")
  const uploadDescription = useRef("")

  const editBrandNama = useRef("");
  const [editBrandNamaDefault, setEditBrandNamaDefault] = useState("");
  const [editBrandType, setEditBrandType] = useState("");

  const [errorEditBrandNama, setErrorEditBrandNama] = useState(false);
  const [errorEditBrandNamaMessage, setErrorEditBrandNamaMessage] =
    useState("");

  const openProofDialog = (name, type) => {
    return setApprovalDialog(true);
  };
  const closeApprovalDialog = () => {
    setApprovalDialog(false);
  };

  const checkBrandNama = () => {
    if (editBrandNama.current.value == "") {
      setErrorEditBrandNama(true);
      return setErrorEditBrandNamaMessage("Nama Brand tidak boleh kosong");
    }
    setErrorEditBrandNamaMessage("");
    return setErrorEditBrandNama(false);
  };

  const onSubmit = () => {
    console.log(uploadImage)
    return closeApprovalDialog();
  };

  const changeUploadImage = (event) =>{
    setUploadImage(event.target.files[0])
    setShowImage(URL.createObjectURL(event.target.files[0]));
  }

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
              <img
               className="w-full h-64"
                src={
                  showImage
                }
              ></img>
              <div className="my-4">
                <TextField
                  className="w-full my-4"
                  ref={uploadDescription}
                  defaultValue={description}
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
          {type}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Batas Waktu : </div>
          {date}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Status : </div>
          {status}
        </div>
        <div className=" w-full md:w-3/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
          {status != false ? (
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
