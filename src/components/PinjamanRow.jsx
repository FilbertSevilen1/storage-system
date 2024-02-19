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
  function PinjamanRow(props) {
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
            <div
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

          </div>
        </div>
      </div>
    );
  }
  export default PinjamanRow;
  