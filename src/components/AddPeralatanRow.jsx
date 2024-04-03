import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPeralatanBerseriHeader from "./AddPeralatanBerseriHeader";
import AddPeralatanBerseriRow from "./AddPeralatanBerseriRow";
function AddPeralatanRow({
  peralatan,
  editable,
  index,
  peralatanImage,
  peralatanName,
  hasIdentifier,
  peralatanCategory,
  peralatanTotal,
  peralatanAvailable,
  peralatanDetail,
  brandName,
  page,
  addPinjamPeralatanDataBerseri,
  addPinjamPeralatanDataTidakBerseri,
}) {
  const dispatch = useDispatch();

  const [No, setNo] = useState(index);
  const [image, setImage] = useState(peralatanImage);
  const [nama, setNama] = useState(peralatanName);
  const [tipe, setTipe] = useState(hasIdentifier);
  const [kategori, setKategori] = useState(peralatanCategory);
  const [jumlah, setJumlah] = useState(peralatanTotal || 0);
  const [tersedia, setTersedia] = useState(peralatanAvailable || 0);
  const [namaMerek, setNamaMerek] = useState(brandName || "")

  const [addPeralatanBerseriDialog, setAddPeralatanBerseriDialog] =
    useState(false);

  const openAddPeralatanBerseriDialog = () => {
    setAddPeralatanBerseriDialog(true);
  };
  const onAddPinjamPeralatanTidakBerseri = () => {
    if (tersedia > 0) {
      addPinjamPeralatanDataTidakBerseri();
    }
  };
  const generateAddPeralatanBerseriDetail = () => {
    if (peralatanDetail) {
      return peralatanDetail.map((detail, index) => {
        return (
          <AddPeralatanBerseriRow
            key={index}
            peralatan={peralatan}
            detail={detail}
            index={index}
            addPinjamPeralatanDataBerseri={addPinjamPeralatanDataBerseri}
          ></AddPeralatanBerseriRow>
        );
      });
    }
  };
  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <Dialog
        open={addPeralatanBerseriDialog}
        onClose={() => setAddPeralatanBerseriDialog(false)}
      >
        <DialogTitle>Tambah {nama}</DialogTitle>
        <DialogContent>
          <div className="w-full md:w-[400px]">Pilih Komputer yang ingin dipinjam</div>
          <AddPeralatanBerseriHeader></AddPeralatanBerseriHeader>
          {generateAddPeralatanBerseriDetail()}
        </DialogContent>
      </Dialog>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-2/12 h-24 sm:w-24 md:h-full bg-gray-700 rounded-lg">
          <img src={image} className="w-full h-full"></img>
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Nama Barang : </div>
          <div>{nama} - {namaMerek}</div>
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Kategori : </div>
          <div>{kategori}</div>
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">{"Tersedia"} : </div>
          <div>{tersedia}</div>
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-center md:justify-center mt-4 md:mt-0">
          {hasIdentifier == true ? (
            <div className="flex">
              <button
                onClick={() => openAddPeralatanBerseriDialog()}
                className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex">
              <button
                onClick={() => onAddPinjamPeralatanTidakBerseri()}
                className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default AddPeralatanRow;
