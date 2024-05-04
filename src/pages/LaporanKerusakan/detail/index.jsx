import React, { useEffect, useState } from "react";
import Heading from "../../../components/base/Heading";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, TextField, TextareaAutosize } from "@mui/material";
import SubHeading from "../../../components/base/SubHeading";
import PinjamPeralatanHeader from "../../../components/PinjamPeralatanHeader";
import PinjamPeralatanRow from "../../../components/PinjamPeralatanRow";
function KerusakanDetail() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [reportDate, setReportDate] = useState("01/01/2024");
  const [reportType, setReportType] = useState("Kerusakan");
  const [reportUser, setReportUser] = useState("Budi");
  const [reportStatus, setReportStatus] = useState("Menunggu Approval");
  const [reportPenaltyId, setReportPenaltyId] = useState("0001");
  const [reportPenaltyStatus, setReportPenaltyStatus] = useState(
    "Menunggu Persetujuan"
  );

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

  const openPenaltyDialog = () => {
    setPenaltyDialog(true);
  };
  const closePenaltyDialog = () => {
    setPenaltyDialog(false);
  };

  const [penaltyDialog, setPenaltyDialog] = useState(false);
  const [penaltyDescription, setPenaltyDescription] = useState("")
  const [approvalReason, setApprovalReason] = useState("");

  const onPenaltySubmit = () =>{

  };

  return (
    <div className="w-full">
      <Dialog open={penaltyDialog} onClose={closePenaltyDialog}>
        <DialogTitle>Bukti Penyelesaian Penalti</DialogTitle>
        <DialogContent>
          <div className="w-full h-[450px] flex justify-between">
            <div className="p-2 w-96 h-64">
              <img src="https://static8.depositphotos.com/1040728/935/i/450/depositphotos_9352722-stock-photo-tool-set.jpg"></img>
              <div className="my-4">
                <TextField
                  className="w-full my-4"
                  defaultValue={penaltyDescription}
                  label="Deskripsi"
                  disabled
                ></TextField>
              </div>
              <div className="my-4">
                <TextField
                  className="w-full my-4"
                  value={approvalReason}
                  defaultValue={penaltyDescription}
                  label="Alasan Tolak/Setuju"
                ></TextField>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => onPenaltySubmit("reject")}>Tolak</Button>
          <Button onClick={() => onPenaltySubmit("approve")} type="submit">
            <b>Setujui</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="Detail Laporan"></Heading>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4">
          <div className="w-full flex flex-wrap mb-4 items-center">
            <div className="w-full md:w-1/4 flex items-center mb-4">
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
                <b>Tanggal Laporan :</b> {reportDate}
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
                  d="M8 12h8v-2H8zm0-4h8V6H8zm11.95 12.475L15.9 15.2q-.425-.575-1.05-.887T13.5 14H4V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .125-.012.238t-.038.237M6 22q-.825 0-1.412-.587T4 20v-4h9.5q.25 0 .463.113t.362.312l4.2 5.5q-.125.05-.262.063T18 22z"
                />
              </svg>
              <div className="ml-2">
                <b>Jenis Laporan : </b> {reportType}
              </div>
            </div>
          </div>
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
                <b>User yang bertanggung jawab :</b> {reportUser}
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
                <b>Status Laporan :</b> {reportStatus}
              </div>
            </div>
            <div className="w-full flex flex-wrap mt-8">
              <div className="w-full md:w-1/4">
                <div>
                  <b>ID Penalti</b>
                  <div>{reportPenaltyId}</div>
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <div>
                  <b>Status Penalti</b>
                  <div>{reportPenaltyStatus}</div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/4 mt-8">
                <Button
                  onClick={() => openPenaltyDialog()}
                  variant="contained"
                  fullWidth
                >
                  Lihat Bukti Penalti
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4 mb-8">
          <div className="w-full flex items-center mb-4">
            <SubHeading title="Peralatan"></SubHeading>
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
            <Button variant="contained" size="large">
              Selesaikan Laporan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default KerusakanDetail;
