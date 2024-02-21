import {
  Button,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
import PinjamanHeader from "../../../components/PinjamanHeader";
import PinjamanRow from "../../../components/PinjamanRow";
import SubHeading from "../../../components/base/SubHeading";
function ListPinjaman() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const searchItem = useRef();
  const searchStartDate = useRef();
  const searchEndDate = useRef();
  const [searchStatus, setSearchStatus] = useState("");
  const [listPinjaman, setListPinjaman] = useState([
    {
      pinjamanId: "1",
      pinjamanName: "Anton",
      pinjamanStartDate: "2024/01/01",
      pinjamanEndDate: "2024/01/02",
      pinjamanDurasi: "1 Minggu",
      pinjamanJumlah: "6",
      pinjamanStatus: "Selesai",
    },
    {
      pinjamanId: "2",
      pinjamanName: "Anton",
      pinjamanStartDate: "2024/01/01",
      pinjamanEndDate: "2024/01/02",
      pinjamanDurasi: "1 Minggu",
      pinjamanJumlah: "6",
      pinjamanStatus: "Menunggu Approval",
    },
    {
      pinjamanId: "3",
      pinjamanName: "Anton",
      pinjamanStartDate: "2024/01/01",
      pinjamanEndDate: "2024/01/02",
      pinjamanDurasi: "1 Minggu",
      pinjamanJumlah: "6",
      pinjamanStatus: "Dalam Peminjaman",
    },
  ]);



  useEffect(() => {
    getPinjamanData();
  }, [page]);

  const getPinjamanData = () =>{
    getPinjamanList();
  }
  
  const getPinjamanList = () => {
    if (listPinjaman.length % 10 === 0) {
      setMaxPage(Math.floor(listPinjaman.length / 5));
    } else setMaxPage(Math.floor(listPinjaman.length / 5) + 1);
  };

  const generatePinjamanData = () => {
    if (listPinjaman) {
      return listPinjaman.map((pinjaman, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <PinjamanRow
              index={index}
              key={index}
              pinjamanId={pinjaman.pinjamanId}
              pinjamanNama={pinjaman.pinjamanName}
              pinjamanStartDate={pinjaman.pinjamanStartDate}
              pinjamanEndDate={pinjaman.pinjamanEndDate}
              pinjamanDurasi={pinjaman.pinjamanDurasi}
              pinjamanJumlah={pinjaman.pinjamanJumlah}
              pinjamanStatus={pinjaman.pinjamanStatus}
              page={page}
            ></PinjamanRow>
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

  const [listStatus, setListStatus] = useState([
    "Menunggu Approval",
    "Dalam Peminjaman",
    "Selesai",
  ]);

  const generateMenuIemStatus = () =>{
    return listStatus.map((status, index) => {
        return(
            <MenuItem value={status}>{status}</MenuItem>
        )
    })
  }

  const handleSearchStatus = (event) => {
    setSearchStatus(event.target.value);
  };
  return (
    <div className="w-full">
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="List Pinjaman"></Heading>
        </div>

        <div className="bg-white w-full flex items-center mt-8 shadow-md px-8 py-4">
          <div className="flex w-1/2 md:mr-4">
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
            <div className="w-fit ml-4"></div>
            <Input
              inputRef={searchItem}
              id=""
              label="Username"
              variant="standard"
              className="w-full"
              placeholder="Pinjaman ID"
            />
          </div>
          <div className="flex w-1/2 md:ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
              />
            </svg>
            <div className="w-fit ml-4"></div>
            <Input
              inputRef={searchItem}
              id=""
              label="Username"
              variant="standard"
              className="w-full"
              placeholder="Nama Peminjam"
            />
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="bg-white w-full h-fit xl:w-1/4 p-4 md:p-4 shadow-md">
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
            <PinjamanHeader></PinjamanHeader>
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
export default ListPinjaman;
