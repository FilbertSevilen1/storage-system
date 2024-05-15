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
  function LaporanRow(props) {
    const navigate = useNavigate()

    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const vertical = "top";
    const horizontal = "center";
  
    let [index, setIndex] = useState(props.reportIndex);
    let [id, setId] = useState(props.reportId)
    let [itemName, setItemName] = useState(props.reportItemName)
    let [name, setName] = useState(props.reportNama);
    let [startDate, setStartDate] = useState(props.reportDate);
    let [status, setStatus] = useState(props.reportStatus)

    const formatDate = (date) =>{
      const dateformat = new Date(date);

      const year = dateformat.getFullYear();
      const month = String(dateformat.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
      const day = String(dateformat.getDate()).padStart(2, "0");
      const hours = String(dateformat.getHours()).padStart(2, "0");
      const minutes = String(dateformat.getMinutes()).padStart(2, "0");
      const seconds = String(dateformat.getSeconds()).padStart(2, "0");
    
      const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      return formattedDate
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
        <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
          <div className="w-full text-center md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">No. : </div>
            {index}
          </div>
          <div className="w-full text-center md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Nama Alat : </div>
            {itemName}
          </div>
          <div className="w-full text-center md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Penanggung Jawab : </div>
            {name}
          </div>
          <div className="w-full text-center md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Tanggal Laporan : </div>
            {formatDate(startDate)}
          </div>
          <div className="w-full text-center md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Status : </div>
            {status}
          </div>
          <div className=" w-full text-center md:w-2/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
            <button
              className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
              onClick={()=>navigate(`/report/${id}`)}
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"/></svg>
            </button>

          </div>
        </div>
      </div>
    );
  }
  export default LaporanRow;
  