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
  import { useDispatch, useSelector } from "react-redux";
  import AddPeralatanBerseriHeader from "./AddPeralatanBerseriHeader";
  function AddPeralatanBerseriRow({
    peralatan,
    detail,
    index,
    addPinjamPeralatanDataBerseri
  }) {
    const dispatch = useDispatch();
  
    const pinjamAlatBerseri = () =>{
        addPinjamPeralatanDataBerseri(peralatan, detail)
    }
  
    return (
      <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
        <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
          <div className="w-full md:w-4/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Nomor Seri : </div>
            <div>{detail.peralatan_detail_name}</div>
          </div>
          <div className="w-full md:w-4/12 flex flex-wrap justify-start mx-2 md:justify-center">
            <div className="flex md:hidden mr-2 font-bold">Status: </div>
            <div>{detail.peralatan_status}</div>
          </div>
          <div className="w-full md:w-4/12 flex flex-wrap justify-center md:justify-center mt-4 md:mt-0">
              <div className="flex">
                <button onClick={()=>pinjamAlatBerseri()} className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
                    />
                  </svg>
                </button>
              </div>
          </div>
        </div>
      </div>
    );
  }
  export default AddPeralatanBerseriRow;
  