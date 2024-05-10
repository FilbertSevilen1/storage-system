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
function PurchaseRow(props) {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  let [no, setNo] = useState(props.purchaseNo);
  let [name, setName] = useState(props.purchaseNama);
  let [date, setDate] = useState(props.purchaseDate);
  let [count, setCount] = useState(props.purchaseCount);
  let [price, setPrice] = useState(props.purchaseTotalPrice);

  const dateformat = new Date(date);

  const year = dateformat.getFullYear();
  const month = String(dateformat.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(dateformat.getDate()).padStart(2, "0");
  const hours = String(dateformat.getHours()).padStart(2, "0");
  const minutes = String(dateformat.getMinutes()).padStart(2, "0");
  const seconds = String(dateformat.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

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
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">No : </div>
          {no}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Nama : </div>
          {name}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Jumlah : </div>
          {count}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">
            Tanggal Pembelian :{" "}
          </div>
          {formattedDate}
        </div>
        <div className=" w-full md:w-2/12 flex mx-2 rounded-xl flex justify-start md:justify-center items-center">
          <div className="flex md:hidden mr-2 font-bold">Total Harga : </div>
          Rp. {price.toLocaleString("id-ID")}
        </div>
      </div>
    </div>
  );
}
export default PurchaseRow;
