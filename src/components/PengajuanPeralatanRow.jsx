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
function PengajuanPeralatanRow(props) {
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  let [id, setID] = useState(props.requestId);
  let [userName, setUserName] = useState(props.userName);
  let [requestItemName, setRequestItemName] = useState(props.requestItemName);
  let [brandName, setBrandName] = useState(props.brandName);
  let [requestItemDescription, setRequestItemDescription] = useState(
    props.requestItemDescription
  );
  let [requestItemCount, setRequestItemCount] = useState(
    props.requestItemCount
  );
  let [requestReason, setRequestReason] = useState(props.requestReason);
  const editKategoriNama = useRef("");

  let [requestStatus, setRequestStatus] = useState(props.requestStatus);


  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />

      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Id : </div>
          {id}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Pengaju : </div>
          {userName}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Alat : </div>
          {requestItemName} - {brandName}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Deskripsi : </div>
          {requestItemDescription}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Deskripsi : </div>
          {requestItemCount}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Alasan : </div>
          {requestReason}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Status : </div>
          {requestStatus}
        </div>
        <div className=" w-full md:w-3/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
          <button className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 15 15"
            >
              <path
                fill="#ff0000"
                fill-rule="evenodd"
                d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="#00a331"
                d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PengajuanPeralatanRow;
