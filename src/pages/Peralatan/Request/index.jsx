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
import axios from "axios";
import LoadingFull from "../../../components/base/LoadingFull";
import NoData from "../../../components/base/NoData";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const API_URL = process.env.REACT_APP_API_URL;
function PengajuanPeralatan() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
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

  const handleSearchStatus = (event) => {
    setSearchStatus(event.target.value);
  };

  const [listRequest, setListRequest] = useState([]);

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

    getRequestList();
  }, [searchStartDate, searchEndDate, searchStatus]);

  useEffect(() => {
    getMaxPage();
  }, [listRequest]);

  const getDataRequestList = () => {
    setLoading(true);
    const body = {
      itemName: searchItem.current.value,
      statusId: searchStatus,
      startDate: searchStartDate.current.value,
      endDate: searchEndDate.current.value,
    };

    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/request/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListRequest(res.data.requests);
        setLoading(false);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Gagal mendapatkan data");
      });
  };

  const resetFilter = () => {
    setSearchStatus("");
    searchStartDate.current.value = "";
    searchEndDate.current.value = "";
  };

  const getRequestList = () => {
    getDataRequestList();
  };

  const handleSearchNameKeyDown = (event) => {
    if (event.key == "Enter") {
      setPage(1);
      getDataRequestList();
    }
  };

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

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const generateMenuIemStatus = () => {
    return listStatus.map((status, index) => {
      return <MenuItem value={status}>{status}</MenuItem>;
    });
  };

  const generateRequestData = () => {
    if (listRequest) {
      return listRequest.map((item, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <PengajuanPeralatanRow
              key={item.id}
              requestIndex={index + 1}
              requestId={item.id}
              userId={item.userId}
              userName={item.userName}
              brandId={item.brandId}
              brandName={item.brandName}
              requestItemName={item.itemName}
              requestItemCount={item.itemCount}
              requestItemDescription={item.itemDescription}
              requestDate={item.date}
              approvalId={item.approvalId}
              approvalStatus={item.approvalStatus}
              requestReason={item.reason}
            ></PengajuanPeralatanRow>
          );
      });
    } else {
      return <NoData></NoData>;
    }
  };
  return (
    <div className="w-full">
      {loading ? <LoadingFull></LoadingFull> : <></>}
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
              placeholder="Cari Nama Alat di sini"
              onKeyDown={handleSearchNameKeyDown}
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
                    <MenuItem value={"e3946b09-fb28-4d97-89e2-d2a2a54ba9a7"}>
                      Menunggu Persetujuan
                    </MenuItem>
                    <MenuItem value={"6344d1b5-6b9b-4cd8-b612-f6a3e64fb837"}>
                      Disetujui
                    </MenuItem>
                    <MenuItem value={"5fcc9739-cbdc-4dec-866d-5f7b059213f1"}>
                      Ditolak
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
                  fullWidth
                  onChange={getDataRequestList}
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
                  onChange={getDataRequestList}
                />
              </div>
              <div className="w-full mt-8">
                <Button
                  onClick={resetFilter}
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <PengajuanPeralatanHeader></PengajuanPeralatanHeader>
            {loading ? <></> : <>{generateRequestData()}</>}
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
