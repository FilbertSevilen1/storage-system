import { Button, FormControl, Input, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
import PinjamanHeader from "../../../components/PinjamanHeader";
import PinjamanRow from "../../../components/PinjamanRow";
import HorizontalDivider from "../../../components/base/HorizontalDivider";
import SubHeading from "../../../components/base/SubHeading";
import MyPinjamanHeader from "../../../components/MyPinjamanHeader";
import MyPinjamanRow from "../../../components/MyPinjamanRow";
function PinjamanSaya() {
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

  const [listStatus, setListStatus] = useState([
    "Menunggu Approval",
    "Dalam Peminjaman",
    "Selesai",
  ]);


  const searchItem = useRef();
  const searchStartDate = useRef();
  const searchEndDate = useRef();
  const [listPinjaman, setListPinjaman] = useState([
    {
      borrow_id: "1",
      user_id:"1",
      user_name: "Anton",
      approval_start_id:"1",
      approval_end_id:"2",
      borrow_start_date: "2024/01/01",
      borrow_end_date: "2024/01/02",
      borrow_duration: "1 Minggu",
      borrow_count: "6",
      status_borrow_id: "4",
      status_borrow_name: "Selesai"
    },
    {
      borrow_id: "2",
      user_id:"1",
      user_name: "Anton",
      approval_start_id:"3",
      approval_end_id:"4",
      borrow_start_date: "2024/01/01",
      borrow_end_date: "2024/01/02",
      borrow_duration: "1 Minggu",
      borrow_count: "6",
      status_borrow_id: "2",
      status_borrow_name: "Menunggu Approval"
    },
    {
      borrow_id: "3",
      user_id:"1",
      user_name: "Anton",
      approval_start_id:"3",
      approval_end_id:"4",
      borrow_start_date: "2024/01/01",
      borrow_end_date: "2024/01/02",
      borrow_duration: "1 Minggu",
      borrow_count: "3",
      status_borrow_id:"3",
      status_borrow_name: "Dalam Peminjaman",
    },
  ]);

  useEffect(() => {
    getPinjamanData();
  }, [page]);
  const getPinjamanData = () =>{
    getPinjamanList();
  }

  const getPinjamanList = () => {
    if (listPinjaman.length % 5 === 0) {
      setMaxPage(Math.floor(listPinjaman.length / 5));
    } else setMaxPage(Math.floor(listPinjaman.length / 5) + 1);
  };

  const generateMenuIemStatus = () =>{
    return listStatus.map((status, index) => {
        return(
            <MenuItem value={status}>{status}</MenuItem>
        )
    })
  }

  const generatePinjamanData = () => {
    if (listPinjaman) {
      return listPinjaman.map((pinjaman, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <MyPinjamanRow
              index={index}
              key={index}
              pinjamanId={pinjaman.borrow_id}
              pinjamanNama={pinjaman.user_name}
              pinjamanStartDate={pinjaman.borrow_start_date}
              pinjamanEndDate={pinjaman.borrow_end_date}
              pinjamanDurasi={pinjaman.borrow_duration}
              pinjamanJumlah={pinjaman.borrow_count}
              pinjamanStatus={pinjaman.status_borrow_name}
              page={page}
            ></MyPinjamanRow>
          );
      });
    }
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };
  return (
    <div className="w-full">
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="Pinjaman Saya"></Heading>
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
              placeholder="Cari Pinjaman ID di sini"
            />
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="bg-white w-full h-fit xl:w-1/4 p-4 md:p-4 shadow-md">
            <div className="w-full mb-4">
              <Button variant="contained" size="large" fullWidth>
                + Buat Pinjaman
              </Button>
            </div>
            <HorizontalDivider/>
            <SubHeading title="Filter"/>
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
            <div className="w-full mt-8">
              <Button onClick={()=>getPinjamanData()} variant="contained" size="large" fullWidth>
                Cari
              </Button>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <MyPinjamanHeader></MyPinjamanHeader>
            {generatePinjamanData()}
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
export default PinjamanSaya;
