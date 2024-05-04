import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
import PengajuanPeralatanHeader from "../../../components/PengajuanPeralatanHeader";
import PengajuanPeralatanRow from "../../../components/PengajuanPeralatanRow";
import SubHeading from "../../../components/base/SubHeading";
function PengajuanPeralatan() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [searchStatus, setSearchStatus] = useState("");

  const handleSearchStatus = (event) => {
    setSearchStatus(event.target.value);
  };

  useEffect(() => {
    getRequestData();
  },[])

  const getRequestData = () =>{
    getMaxPage();
  }

  const getMaxPage = () => {
    if (listRequest.length % 5 === 0) {
      setMaxPage(Math.floor(listRequest.length / 5));
    } else setMaxPage(Math.floor(listRequest.length / 5) + 1);
  };

  const [listStatus, setListStatus] = useState([
    "Menunggu Approval",
    "Dalam Peminjaman",
    "Selesai",
  ]);

  const searchItem = useRef();
  const searchStartDate = useRef();
  const searchEndDate = useRef();

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const generateMenuIemStatus = () =>{
    return listStatus.map((status, index) => {
        return(
            <MenuItem value={status}>{status}</MenuItem>
        )
    })
  }

  const [listRequest, setListRequest] = useState([
    {
        request_id:"1",
        user_id : "1",
        user_name : "Jack",
        brand_id : "1",
        brand_name : "Lenovo",
        request_item_name : "Laptop A",
        request_item_count : "1",
        request_item_description : "A",
        approval_id : "",
        request_status : "Waiting for Approval",
        request_reason : "Butuh Banyak"
    },
])

  const generateRequestData = () =>{
    return listRequest.map((item, index)=>{
        return <PengajuanPeralatanRow
            requestId = {item.request_id}
            userId = {item.user_id}
            userName = {item.user_name}
            brandId = {item.brand_id}
            brandName = {item.brand_name}
            requestItemName = {item.request_item_name}
            requestItemCount = {item.request_item_count}
            requestItemDescription = {item.request_item_description}
            approvalId = {item.approval_id}
            requestReason = {item.request_reason}
            requestStatus = {item.request_status}
        >
        </PengajuanPeralatanRow>
    })
  }
  return (
    <div className="w-full">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />

      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="List Pengajuan"></Heading>
        </div>

        <div className="bg-white w-full flex items-center mt-8 shadow-md px-8 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
            />
          </svg>
          <div className="w-full ml-4">
            <Input
              inputRef={searchItem}
              id=""
              label="Username"
              variant="standard"
              className="w-full"
              placeholder="Cari Nama Pengaju di sini"
            />
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="w-full h-fit xl:w-1/4 p-4 md:p-4 shadow-md bg-white">
            <div className="w-full">
              <SubHeading title="Filter" />
              <div className="w-full mt-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Status</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={searchStatus}
                    id="demo-simple-select"
                    label="Status"
                    onChange={handleSearchStatus}
                    placeholder="Status"
                    fullWidth
                  >
                    {generateMenuIemStatus()}
                  </Select>
                </FormControl>
              </div>
              <div className="w-full mt-4">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  id="jumlahMinimum"
                  label="Tanggal Mulai"
                  variant="outlined"
                  inputRef={searchStartDate}
                  fullWidth
                />
              </div>
              <div className="w-full mt-4">
                <TextField
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  id="jumlahMinimum"
                  label="Tanggal Selesai"
                  variant="outlined"
                  inputRef={searchEndDate}
                  fullWidth
                />
              </div>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <PengajuanPeralatanHeader></PengajuanPeralatanHeader>
            {generateRequestData()}
            <div className="w-full justify-end items-center mt-4 flex">
              <Button onClick={prevPage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m14 17l-5-5l5-5z" />
                </svg>
              </Button>
              <div className="mx-2">
                {page} / {maxPage}
              </div>
              <Button onClick={nextPage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M10 17V7l5 5z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PengajuanPeralatan;
