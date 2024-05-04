import React, { useEffect, useState } from "react";
import Heading from "../../../components/base/Heading";
import { Button, Input, TextField, TextareaAutosize } from "@mui/material";
import SubHeading from "../../../components/base/SubHeading";
import PinjamPeralatanHeader from "../../../components/PinjamPeralatanHeader";
import PinjamPeralatanRow from "../../../components/PinjamPeralatanRow";
import { useNavigate } from "react-router";
function DetailPinjaman() {
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [id, setId] = useState("0001");
  const [name, setName] = useState("User")
  const [startDate, setStartDate] = useState("01/01/2024");
  const [endDate, setEndDate] = useState("01/12/2024");
  const [reason, setReason] = useState("Testing");
  const [status, setStatus] = useState("Menunggu Approval Pengembalian");

  const [listPinjamPeralatan, setListPinjamPeralatan] = useState([
    {
      peralatan_id: "1",
      peralatan_image: "test",
      peralatan_name: "Komputer",
      peralatan_type: "Berseri",
      category_name: "Elektronik",
      peralatan_count: 2,
      peralatan_available: 4,
      peralatan_detail: [
        {
          peralatan_detail_name: "KOMP001-0001",
        },
        {
          peralatan_detail_name: "KOMP001-0002",
        },
      ],
    },
    {
      peralatan_id: "2",
      peralatan_image: "test",
      peralatan_name: "Komputer",
      peralatan_type: "Tidak Berseri",
      category_name: "Elektronik",
      peralatan_count: 5,
      peralatan_available: 2,
    },
  ]);

  useEffect(() => {
    getDataPinjamPeralatan();
  }, []);

  const getDataPinjamPeralatan = () => {
    getPinjamPeralatanList();
  };

  const getPinjamPeralatanList = () => {
    if (listPinjamPeralatan.length % 5 === 0) {
      setMaxPage(Math.floor(listPinjamPeralatan.length / 5));
    } else setMaxPage(Math.floor(listPinjamPeralatan.length / 5) + 1);
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const deletePinjamPeralatanData = (index) => {
    // Use setListPinjamPeralatan to update the state
    setListPinjamPeralatan((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  const generatePinjamPeralatan = () => {
    if (listPinjamPeralatan) {
      return listPinjamPeralatan.map((peralatan, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <PinjamPeralatanRow
              editable={false}
              index={index}
              key={index}
              peralatanImage={peralatan.peralatan_image}
              peralatanName={peralatan.peralatan_name}
              peralatanType={peralatan.peralatan_type}
              peralatanCategory={peralatan.category_name}
              peralatanTotal={peralatan.peralatan_count}
              peralatanAvailable={peralatan.peralatan_available}
              peralatanDetail={peralatan.peralatanDetail}
              page={page}
              deletePinjamPeralatanData={() => deletePinjamPeralatanData(index)}
            ></PinjamPeralatanRow>
          );
      });
    }
  };
  return (
    <div className="w-full">
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="Detail Pinjaman"></Heading>
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
            <SubHeading title="Peralatan yang Dipinjam"></SubHeading>
            <div className="ml-4">
              <Button
                variant="contained"
                size="large"
                onClick={()=>navigate('/borrow/edit/1')}
              >
                Edit
              </Button>
            </div>
            <div className="ml-4"></div>
          </div>
          <PinjamPeralatanHeader></PinjamPeralatanHeader>
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
          <div className="md:ml-2">
            <Button color="error" variant="contained" size="large">
              Tolak Peminjaman
            </Button>
          </div>
          <div className="md:ml-2">
            <Button color="success" variant="contained" size="large">
             Setujui Peminjaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailPinjaman;
