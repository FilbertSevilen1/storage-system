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
import Heading from "../../components/base/Heading";
import PinjamanHeader from "../../components/PinjamanHeader";
import PinjamanRow from "../../components/PinjamanRow";
import HorizontalDivider from "../../components/base/HorizontalDivider";
import SubHeading from "../../components/base/SubHeading";
import LaporanHeader from "../../components/LaporanHeader";
import LaporanRow from "../../components/LaporanList";
import { useDispatch, useSelector } from "react-redux";
import PurchaseHeader from "../../components/PurchaseHeader";
import PurchaseRow from "../../components/PurchaseRow";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL
function Purchase() {
  const[loading, setLoading] = useState();
  const user = useSelector((state) => state.user);

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
  const [listPurchase, setlistPurchase] = useState([
    {
      peralatanName: "Komputer",
      purchaseDate: "20/20/2024",
      purchaseCount: "4",
      purchaseTotalPrice: "Rp. 160.000.000",
    },
  ]);

  useEffect(() => {
    getPinjamanList();
  }, [page]);

  useEffect(()=>{
    getMaxPage()
  },[listPurchase])

  const getDataPinjamanList = () =>{
    setLoading(true);
    const body = {

    }
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios.post(API_URL + "/purchase/list", body, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    })
    .then((res)=>{
      setlistPurchase(res.data.purchases)
      setLoading(false);
    })
    .catch((err)=>{
      setLoading(false);
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Gagal mendapatkan data");
    })

  }

  const getMaxPage = () =>{
    if (listPurchase.length % 5 === 0) {
      setMaxPage(Math.floor(listPurchase.length / 5));
    } else setMaxPage(Math.floor(listPurchase.length / 5) + 1);
  }

  const getPinjamanList = () => {
    getDataPinjamanList();
  };

  const generateMenuIemStatus = () => {
    return listStatus.map((status, index) => {
      return <MenuItem value={status}>{status}</MenuItem>;
    });
  };

  const generateLaporanData = () => {
    if (listPurchase) {
      return listPurchase.map((purchase, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <PurchaseRow
              index={index}
              key={index}
              purchaseNo={index + 1}
              purchaseNama={purchase.peralatanName}
              purchaseDate={purchase.purchaseDate}
              purchaseCount={purchase.purchaseCount}
              purchaseTotalPrice={purchase.purchaseTotalPrice}
              page={page}
            ></PurchaseRow>
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
          <Heading title="List Pembelian"></Heading>
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
              placeholder="Cari Nama Pelapor"
            />
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="bg-white w-full h-fit xl:w-1/4 p-4 md:p-4 shadow-md">
            <SubHeading title="Filter" />
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
              <Button
                variant="contained"
                size="large"
                fullWidth
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <PurchaseHeader></PurchaseHeader>
            {generateLaporanData()}
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
export default Purchase;
