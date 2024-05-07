import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import SubHeading from "../../../components/base/SubHeading";
import PinjamPeralatanHeader from "../../../components/PinjamPeralatanHeader";
import PinjamPeralatanRow from "../../../components/PinjamPeralatanRow";
import { useNavigate } from "react-router";
import PeralatanHeader from "../../../components/PeralatanHeader";
import AddPeralatanHeader from "../../../components/AddPeralatanHeader";
import AddPeralatanRow from "../../../components/AddPeralatanRow";
import { useSelector } from "react-redux";
import ReturnPinjamanRow from "../../../components/ReturnPinjamanRow";
import ReturnPinjamanHeader from "../../../components/ReturnPinjamanHeader";
function ReturnPinjaman() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const createStartDate = useRef("");
  const createEndDate = useRef("");
  const createReason = useRef("");

  const [addDialog, setAddDialog] = useState(false);
  const searchAddNama = useRef();
  const [searchAddCategory, setSearchAddCategory] = useState("");

  const [id, setId] = useState("0001");
  const [name, setName] = useState("User");
  const [startDate, setStartDate] = useState("01/01/2024");
  const [endDate, setEndDate] = useState("01/12/2024");
  const [reason, setReason] = useState("Testing");
  const [status, setStatus] = useState("Menunggu Approval Pengembalian");

  const [listAddPeralatan, setListAddPeralatan] = useState([
    {
      peralatan_id: "1",
      peralatan_image: "test",
      peralatan_name: "Komputer",
      has_identifier: true,
      category_name: "Elektronik",
      peralatan_count: 3,
      peralatan_available: 3,
      brand_name: "Lenovo",
      peralatan_detail: [
        {
          peralatan_detail_id: "1",
          peralatan_detail_name: "KOMP001-0001",
          peralatan_status: "Dalam Peminjaman",
        },
        {
          peralatan_detail_id: "2",
          peralatan_detail_name: "KOMP001-0002",
          peralatan_status: "Dalam Peminjaman",
        },
      ],
    },
    {
      peralatan_id: "2",
      peralatan_image: "test",
      peralatan_name: "Komputer",
      has_identifier: false,
      brand_name: "Lenovo",
      category_name: "Elektronik",
      peralatan_count: 5,
      peralatan_available: 2,
    },
  ]);


  const [listSearchAddPeralatan, setListSearchAddPeralatan] = useState([
    {
      peralatan_id: "1",
      peralatan_image: "test",
      peralatan_name: "Komputer",
      has_identifier: true,
      category_name: "Elektronik",
      peralatan_count: 3,
      peralatan_available: 3,
      brand_name: "Lenovo",
      peralatan_detail: [
        {
          peralatan_detail_id: "1",
          peralatan_detail_name: "KOMP001-0001",
          peralatan_status: "Siap Dipinjam",
        },
        {
          peralatan_detail_id: "2",
          peralatan_detail_name: "KOMP001-0002",
          peralatan_status: "Siap Dipinjam",
        },
        {
          peralatan_detail_id: "3",
          peralatan_detail_name: "KOMP001-0003",
          peralatan_status: "Siap Dipinjam",
        },
      ],
    },
    {
      peralatan_id: "2",
      peralatan_image: "test",
      peralatan_name: "Komputer",
      has_identifier: false,
      brand_name: "Lenovo",
      category_name: "Elektronik",
      peralatan_count: 5,
      peralatan_available: 2,
    },
    {
      peralatan_id: "3",
      peralatan_image: "test",
      peralatan_name: "Monitor",
      has_identifier: false,
      brand_name: "Lenovo",
      category_name: "Elektronik",
      peralatan_count: 3,
      peralatan_available: 4,
    },
    {
      peralatan_id: "4",
      peralatan_image: "test",
      peralatan_name: "Mobil",
      has_identifier: true,
      brand_name: "Lenovo",
      category_name: "Otomotif",
      peralatan_count: 3,
      peralatan_available: 3,
      peralatan_detail: [
        {
          peralatan_detail_id: "1",
          peralatan_detail_name: "MOB001-0001",
          peralatan_status: "Siap Dipinjam",
        },
        {
          peralatan_detail_id: "2",
          peralatan_detail_name: "MOB001-0002",
          peralatan_status: "Siap Dipinjam",
        },
        {
          peralatan_detail_id: "3",
          peralatan_detail_name: "MOB001-0003",
          peralatan_status: "Siap Dipinjam",
        },
      ],
    },
  ]);

  const [listKategori, setListKategori] = useState([
    "Elektronik",
    "Alat Tulis",
    "Lainnya",
  ]);

  useEffect(() => {
    getDataPinjamPeralatan();
  }, []);

  const getDataPinjamPeralatan = () => {
    getPinjamPeralatanList();
  };

  const getPinjamPeralatanList = () => {
    if (listAddPeralatan.length % 5 === 0) {
      setMaxPage(Math.floor(listAddPeralatan.length / 5));
    } else setMaxPage(Math.floor(listAddPeralatan.length / 5) + 1);
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };



  const changeReturnStatus = (id, detail) => {
    let listReturn = listAddPeralatan
    for(let i=0;i<listReturn.length;i++){
        if(listReturn.peralatan_id == id){
            for(let j=0;j<listReturn[i].peralatan_detail;i++){
                if(listReturn[i].peralatan_detail[j].peralatan_detail_id == detail.peralatan_detail_id){
                    listReturn[i].peralatan_detail[j] = detail
                }
            }
        }
    }
    console.log(listReturn)
    setListAddPeralatan();
    setListAddPeralatan(listReturn)

    // for (let i = 0; i < listSearchAddPeralatan.length; i++) {
    //   if (listSearchAddPeralatan[i].peralatan_id == alat.peralatan_id) {
    //     setListSearchAddPeralatan((prevList) => {
    //       const newList = [...prevList];
    //       newList[i].peralatan_available -= 1;
    //       return newList;
    //     });
    //   }
    // }
    
  };

  const generatePinjamPeralatan = () => {
    if (listAddPeralatan) {
      return listAddPeralatan.map((peralatan, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <ReturnPinjamanRow
              peralatan={peralatan}
              editable={true}
              index={index}
              key={index}
              peralatanImage={peralatan.peralatan_image}
              peralatanName={peralatan.peralatan_name}
              hasIdentifier={peralatan.has_identifier}
              peralatanCategory={peralatan.category_name}
              peralatanTotal={peralatan.peralatan_count}
              peralatanAvailable={peralatan.peralatan_available}
              peralatanDetail={peralatan.peralatan_detail}
              brandName={peralatan.brand_name}
              page={page}
              changeReturnStatus={changeReturnStatus}
            ></ReturnPinjamanRow>
          );
      });
    }
  };

  const batalkanPinjaman = () => {
    navigate("/home");
  };

  const handleSearchAddCategory = (event) => {
    setSearchAddCategory(event.target.value);
  };

  const generateSearchAddCategoryList = () => {
    if (listKategori) {
      return listKategori.map((kategori, index) => {
        return <MenuItem value={kategori}>{kategori}</MenuItem>;
      });
    }
  };

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
          <Heading title="Edit Pinjaman"></Heading>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4">
          <div className="w-full flex flex-wrap items-center">
            <div className="flex w-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M8 12h8v-2H8zm0-4h8V6H8zm11.95 12.475L15.9 15.2q-.425-.575-1.05-.887T13.5 14H4V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .125-.012.238t-.038.237M6 22q-.825 0-1.412-.587T4 20v-4h9.5q.25 0 .463.113t.362.312l4.2 5.5q-.125.05-.262.063T18 22z"
                />
              </svg>
              <div className="ml-2">
                <b className="mr-1">Pinjaman</b>
                {id}
              </div>
            </div>
            <div className="flex w-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 36 36"
              >
                <path
                  fill="currentColor"
                  d="M30.61 24.52a17.16 17.16 0 0 0-25.22 0a1.51 1.51 0 0 0-.39 1v6A1.5 1.5 0 0 0 6.5 33h23a1.5 1.5 0 0 0 1.5-1.5v-6a1.51 1.51 0 0 0-.39-.98"
                  class="clr-i-solid clr-i-solid-path-1"
                />
                <circle
                  cx="18"
                  cy="10"
                  r="7"
                  fill="currentColor"
                  class="clr-i-solid clr-i-solid-path-2"
                />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
              <div className="ml-2">
                <b className="mr-1">Peminjam: </b>
                {name}
              </div>
            </div>
          </div>
          <div className="w-1/4 flex flex-wrap mb-4 items-center"></div>
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/4 flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm7 6q-.425 0-.712-.288T11 13q0-.425.288-.712T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13q0-.425.288-.712T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14m8 0q-.425 0-.712-.288T15 13q0-.425.288-.712T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17q0-.425.288-.712T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17q0-.425.288-.712T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18m8 0q-.425 0-.712-.288T15 17q0-.425.288-.712T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18"
                />
              </svg>
              <div className="ml-2">
                <b>Tanggal Mulai :</b> {startDate}
              </div>
            </div>
            <div className="w-full md:w-1/4 flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 14q-.425 0-.712-.288T11 13q0-.425.288-.712T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13q0-.425.288-.712T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14m8 0q-.425 0-.712-.288T15 13q0-.425.288-.712T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17q0-.425.288-.712T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17q0-.425.288-.712T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18m8 0q-.425 0-.712-.288T15 17q0-.425.288-.712T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"
                />
              </svg>
              <div className="ml-2">
                <b>Tanggal Selesai :</b> {endDate}
              </div>
            </div>
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/4">
                <div>
                  <b>Alasan Peminjaman</b>
                  <div>{reason}</div>
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <div>
                  <b>Status Peminjaman</b>
                  <div>{status}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4 mb-8">
          <div className="w-full flex items-center mb-4">
            <SubHeading title="Alat yang dipinjam"></SubHeading>
          </div>
          <ReturnPinjamanHeader></ReturnPinjamanHeader>
          {generatePinjamPeralatan()}
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
        <div className="w-full flex justify-end mb-8">
          <div>
            <Button
              onClick={() => navigate(-1)}
              color="error"
              variant="contained"
              size="large"
            >
              Batal
            </Button>
          </div>
          <div className="md:ml-2">
            <Button variant="contained" size="large">
              Selesaikan Pinjaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReturnPinjaman;