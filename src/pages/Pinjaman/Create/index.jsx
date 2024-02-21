import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
import { Button, Input, TextField, TextareaAutosize } from "@mui/material";
import SubHeading from "../../../components/base/SubHeading";
import PinjamPeralatanHeader from "../../../components/PinjamPeralatanHeader";
import PinjamPeralatanRow from "../../../components/PinjamPeralatanRow";
import { useNavigate } from "react-router";
function CreatePinjaman() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const createStartDate = useRef("")
  const createEndDate = useRef("")
  const createReason = useRef("")

  const [listPinjamPeralatan, setListPinjamPeralatan] = useState([
    // {
    //   peralatan_id: "1",
    //   peralatan_image: "test",
    //   peralatan_name: "Komputer",
    //   peralatan_type: "Berseri",
    //   peralatan_category: "Elektronik",
    //   peralatan_total: 2,
    //   peralatan_available: 4,
    //   peralatan_detail: [
    //     {
    //       peralatan_serial_no: "KOMP001-0001",
    //     },
    //     {
    //       peralatan_serial_no: "KOMP001-0002",
    //     },
    //   ],
    // },
    // {
    //   peralatan_id: "2",
    //   peralatan_image: "test",
    //   peralatan_name: "Komputer",
    //   peralatan_type: "Tidak Berseri",
    //   peralatan_category: "Elektronik",
    //   peralatan_total: 5,
    //   peralatan_available: 2,
    // },
  ]);

  useEffect(() => {
    getDataPinjamPeralatan();
  }, []);

  const getDataPinjamPeralatan = () => {
    getPinjamPeralatanList();
  };

  const getPinjamPeralatanList = () => {
    if (listPinjamPeralatan.length % 10 === 0) {
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
              editable={true}
              index={index}
              key={index}
              peralatanImage={peralatan.peralatan_image}
              peralatanName={peralatan.peralatan_name}
              peralatanType={peralatan.peralatan_type}
              peralatanCategory={peralatan.peralatan_category}
              peralatanTotal={peralatan.peralatan_total}
              peralatanAvailable={peralatan.peralatan_available}
              peralatanDetail={peralatan.peralatanDetail}
              page={page}
              deletePinjamPeralatanData={() => deletePinjamPeralatanData(index)}
            ></PinjamPeralatanRow>
          );
      });
    }
  };

  const batalkanPinjaman = () =>{
    navigate("/home")
  }
  return (
    <div className="w-full">
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="Buat Pinjaman Baru"></Heading>
        </div>
        <div className="bg-white w-full flex items-center mt-8 shadow-md px-4 py-4">
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
              <div className="w-full px-2 md:pr-4">
                <TextField
                  id=""
                  label="Tanggal Mulai"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                  className="w-full"
                  value={createStartDate}
                />
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
              <div className="w-full px-2">
                <TextField
                  id=""
                  label="Tanggal Selesai"
                  InputLabelProps={{ shrink: true }}
                  type="date"
                  variant="outlined"
                  className="w-full"
                  placeholder="Cari Barang di sini"
                  value={createEndDate}
                />
              </div>
            </div>
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/2">
                <TextareaAutosize
                  className="w-full h-48 py-2 px-3 text-l border-2 border-gray-300 rounded-lg mt-2"
                  minRows={4}
                  aria-label="empty textarea"
                  placeholder="Alasan Peminjaman"
                  value={createReason}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4 mb-8">
          <div className="w-full flex items-center mb-4">
            <SubHeading title="Keranjang"></SubHeading>
            <div className="ml-4">
              <Button variant="contained" size="large">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                  />
                </svg>
              </Button>
            </div>
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
          <div>
            <Button onClick={()=>batalkanPinjaman()} color="error" variant="contained" size="large">
              Batal
            </Button>
          </div>
          <div className="md:ml-2">
            <Button variant="contained" size="large">
              Buat Pinjaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreatePinjaman;
