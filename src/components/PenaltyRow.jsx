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
function PenaltyRow(props) {
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

  const [approvalReason, setApprovalReason] = useState("");

  const editBrandNama = useRef("");
  const [editBrandNamaDefault, setEditBrandNamaDefault] = useState("");
  const [editBrandType, setEditBrandType] = useState("");

  const [errorEditBrandNama, setErrorEditBrandNama] = useState(false);
  const [errorEditBrandNamaMessage, setErrorEditBrandNamaMessage] =
    useState("");

  const handleInputBrand = (event) => {
    setEditBrandType(event.target.value);
  };

  const resetErrorMessage = () => {
    setErrorEditBrandNamaMessage("");
    setErrorEditBrandNama(false);
  };

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
    return closeApprovalDialog();
  };

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
        <DialogTitle>Bukti Penyelesaian Penalti</DialogTitle>
        <DialogContent>
          <div className="w-full h-[450px] flex justify-between">
            <div className="p-2 w-96 h-64">
              <img src="https://static8.depositphotos.com/1040728/935/i/450/depositphotos_9352722-stock-photo-tool-set.jpg"></img>
              <div className="my-4">
                <TextField
                  className="w-full my-4"
                  defaultValue={description}
                  label="Deskripsi"
                  disabled
                ></TextField>
              </div>
              <div className="my-4">
                <TextField
                  className="w-full my-4"
                  value={approvalReason}
                  defaultValue={description}
                  label="Alasan Tolak/Setuju"
                ></TextField>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onSubmit("reject")}>Tolak</Button>
          <Button onClick={() => onSubmit("approve")} type="submit">
            <b>Setujui</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">No : </div>
          {no}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Nama : </div>
          {name}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Jenis Hukuman : </div>
          {type}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Batas Waktu : </div>
          {date}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Status : </div>
          {status}
        </div>
        <div className=" w-full md:w-2/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
          {status != false ? (
            <div
              onClick={() => openProofDialog()}
              className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95z"
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
export default PenaltyRow;
