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
import axios from "axios";
import NoData from "../../../components/base/NoData";
import LoadingFull from "../../../components/base/LoadingFull";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const API_URL = process.env.REACT_APP_API_URL;
function ListPinjaman() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
  const [listPinjaman, setListPinjaman] = useState([]);

  const getDataPinjamanList = () => {
    setLoading(true);
    const body = {
      userName: searchItem.current.value,
      statusBorrowId: searchStatus,
      startDate: searchStartDate.current.value,
      endDate: searchEndDate.current.value,
      me: false,
    };

   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/borrow/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListPinjaman(res.data.borrows);
        if (res.data.borrows.length % 5 === 0) {
          setMaxPage(Math.floor(res.data.borrows.length / 5));
        } else setMaxPage(Math.floor(res.data.borrows.length / 5) + 1);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const getPinjamanList = () => {
    getDataPinjamanList();
  };

  useEffect(() => {
    let userdata = "";
    if (localStorage.getItem("ss_token")) {
      const logindata = localStorage.getItem("ss_token");
      const { user, timestamp } = JSON.parse(logindata);
      userdata = user;
    }
    if (userdata.role == "User") {
      return navigate("/");
    }
    getPinjamanList();
  }, [searchStatus, searchStartDate, searchEndDate]);

  const getMaxPage = () => {
    if (listPinjaman.length % 5 === 0) {
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
              key={pinjaman.id}
              pinjamanIndex={index + 1}
              pinjamanId={pinjaman.id}
              pinjamanNama={pinjaman.userName}
              pinjamanStartDate={pinjaman.startDate}
              pinjamanEndDate={pinjaman.endDate}
              pinjamanDurasi={""}
              pinjamanJumlah={pinjaman.borrow_count}
              pinjamanStatus={pinjaman.statusName}
              page={page}
            ></PinjamanRow>
          );
      });
    } else {
      return <NoData></NoData>;
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

  const generateMenuIemStatus = () => {
    return listStatus.map((status, index) => {
      return <MenuItem value={status}>{status}</MenuItem>;
    });
  };

  const handleSearchStatus = (event) => {
    setSearchStatus(event.target.value);
  };

  const resetFilter = () => {
    setSearchStatus();
    searchStartDate.current.value = null;
    searchEndDate.current.value = null;
    getPinjamanList();
  };

  const handleSearchNameKeyDown = (event) => {
    if (event.key == "Enter") {
      setPage(1);
      getDataPinjamanList();
    }
  };

  return (
    <div className="w-full">
      {loading ? <LoadingFull></LoadingFull> : <></>}
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="List Pinjaman"></Heading>
        </div>

        <div className="bg-white w-full flex items-center mt-8 shadow-md px-8 py-4">
          <div className="flex w-full">
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
              onKeyDown={handleSearchNameKeyDown}
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
                  <MenuItem value="faa77eff-50d4-4633-acce-78c0aae92cf0">
                    Menunggu Persetujuan
                  </MenuItem>
                  <MenuItem value="de52b2d0-7cdd-4929-aed4-d09a1287b52f">
                    Siap Dipinjam
                  </MenuItem>
                  <MenuItem value="5d4c9168-f08b-4a9c-b354-44a595168129">
                    Dalam Peminjaman
                  </MenuItem>
                  <MenuItem value="73c03313-bfdb-467d-98bb-02dd4a93ff54">
                    Selesai
                  </MenuItem>
                  <MenuItem value="781f0b17-7546-415d-a74b-162b4a67e8f9">
                    Dibatalkan
                  </MenuItem>
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
                onChange={getPinjamanList}
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
                onChange={getPinjamanList}
                fullWidth
              />
            </div>
            <div className="w-full mt-8">
              <Button
                onClick={() => resetFilter()}
                variant="contained"
                size="large"
                fullWidth
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <PinjamanHeader></PinjamanHeader>
            {loading ? <></> : <>{generatePinjamanData()}</>}

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
