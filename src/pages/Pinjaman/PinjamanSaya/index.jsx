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
import HorizontalDivider from "../../../components/base/HorizontalDivider";
import SubHeading from "../../../components/base/SubHeading";
import MyPinjamanHeader from "../../../components/MyPinjamanHeader";
import MyPinjamanRow from "../../../components/MyPinjamanRow";
import axios from "axios";
import { useNavigate } from "react-router";
import NoData from "../../../components/base/NoData";
import LoadingFull from "../../../components/base/LoadingFull";

const API_URL = process.env.REACT_APP_API_URL;
function PinjamanSaya() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(0);

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
  const [listPinjaman, setListPinjaman] = useState([]);

  useEffect(() => {
    getPinjamanList();
  }, [searchStatus, searchStartDate, searchEndDate]);

  const getDataPinjamanList = () => {
    setLoading(true);
    const body = {
      userName: "",
      statusBorrowId: searchStatus,
      startDate: searchStartDate.current.value,
      endDate: searchEndDate.current.value,
      me: true,
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

  const generateMenuIemStatus = () => {
    return listStatus.map((status, index) => {
      return <MenuItem value={status}>{status}</MenuItem>;
    });
  };

  const generatePinjamanData = () => {
    if (listPinjaman) {
      return listPinjaman.map((pinjaman, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <MyPinjamanRow
              index={index}
              key={pinjaman.id}
              pinjamanIndex={index + 1}
              pinjamanId={pinjaman.id}
              pinjamanNama={pinjaman.userName}
              pinjamanStartDate={pinjaman.startDate}
              pinjamanEndDate={pinjaman.endDate}
              pinjamanDurasi={""}
              pinjamanStatus={pinjaman.statusName}
              page={page}
            ></MyPinjamanRow>
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

  const resetFilter = () => {
    setSearchStatus();
    searchStartDate.current.value = null;
    searchEndDate.current.value = null;
    getPinjamanList();
  };

  return (
    <div className="w-full">
      {loading ? <LoadingFull></LoadingFull> : <></>}
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div className="mb-4">
          <Heading title="Pinjaman Saya"></Heading>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="bg-white w-full h-fit xl:w-1/4 p-4 md:p-4 shadow-md">
            <div className="w-full mb-4">
              <Button
                onClick={() => navigate("/borrow/create")}
                variant="contained"
                size="large"
                fullWidth
              >
                + Buat Pinjaman
              </Button>
            </div>
            <HorizontalDivider />
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
                  <MenuItem value={"faa77eff-50d4-4633-acce-78c0aae92cf0"}>
                    Menunggu Persetujuan
                  </MenuItem>
                  <MenuItem value={"de52b2d0-7cdd-4929-aed4-d09a1287b52f"}>
                    Siap Dipinjam
                  </MenuItem>
                  <MenuItem value={"5d4c9168-f08b-4a9c-b354-44a595168129"}>
                    Dalam Peminjaman
                  </MenuItem>
                  <MenuItem value={"73c03313-bfdb-467d-98bb-02dd4a93ff54"}>
                    Selesai
                  </MenuItem>
                  <MenuItem value={"781f0b17-7546-415d-a74b-162b4a67e8f9"}>
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
