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
function EditPeralatanBerseriRow({
  peralatan,
  detail,
  index,
  addPinjamPeralatanDataBerseri,
  deletePinjamPeralatanBerseri,
  closeEditDialog,
}) {
  const dispatch = useDispatch();

  const pinjamAlatBerseri = () => {
    addPinjamPeralatanDataBerseri(peralatan, detail);
  };

  const onDeleteAlatBerseri = () =>{
    closeEditDialog();
    deletePinjamPeralatanBerseri(peralatan, detail);
  }

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-4/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Nomor Seri : </div>
          <div>{detail.detailName}</div>
        </div>
        <div className="w-full md:w-4/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Status: </div>
          <div>{detail.status}</div>
        </div>
        <div className="w-full md:w-4/12 flex flex-wrap justify-center md:justify-center mt-4 md:mt-0">
          <div className="flex">
            <button
              onClick={() => onDeleteAlatBerseri()}
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
                  d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5q0-.425.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8q-.425 0-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8q-.425 0-.712.288T13 9v7q0 .425.288.713T14 17"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditPeralatanBerseriRow;
