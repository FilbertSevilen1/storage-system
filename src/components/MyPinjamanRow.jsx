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
import { useNavigate } from "react-router";
  function MyPinjamanRow(props) {
    const navigate = useNavigate()

    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const vertical = "top";
    const horizontal = "center";
  
    let [id, setID] = useState(props.pinjamanId);
    let [name, setName] = useState(props.pinjamanNama);
    let [startDate, setStartDate] = useState(props.pinjamanStartDate);
    let [endDate, setEndDate] = useState(props.pinjamanEndDate)
    let [total, setTotal] = useState(props.pinjamanJumlah)
    let [status, setStatus] = useState(props.pinjamanStatus)

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
          <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Id : </div>
            {id}
          </div>
          <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Nama : </div>
            {name}
          </div>
          <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Tanggal Mulai : </div>
            {startDate}
          </div>
          <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Tanggal Selesai : </div>
            {endDate}
          </div>
          <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Jumlah : </div>
            {total}
          </div>
          <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Status : </div>
            {status}
          </div>
          <div className=" w-full md:w-2/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
            <button
              onClick={()=>navigate('/borrow/1')}
              className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg>
            </button>

          </div>
        </div>
      </div>
    );
  }
  export default MyPinjamanRow;
  