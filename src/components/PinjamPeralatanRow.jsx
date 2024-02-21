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
function PinjamPeralatanRow({
  editable,
  index,
  peralatanImage,
  peralatanName,
  peralatanType,
  peralatanCategory,
  peralatanTotal,
  peralatanAvailable,
  peralatanDetail,
  page,
  deletePinjamPeralatanData,
}) {
  const dispatch = useDispatch();

  const [No, setNo] = useState(index);
  const [image, setImage] = useState(peralatanImage);
  const [nama, setNama] = useState(peralatanName);
  const [tipe, setTipe] = useState(peralatanType);
  const [kategori, setKategori] = useState(peralatanCategory);
  const [jumlah, setJumlah] = useState(peralatanTotal || 0);
  const [tersedia, setTersedia] = useState(peralatanAvailable || 0);

  const [deleteDialog, setDeleteDialog] = useState(false);

  const addJumlah = () => {
    if (tersedia > 0) {
      setJumlah(jumlah + 1);
      setTersedia(tersedia - 1);
    }
  };
  const minJumlah = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
      setTersedia(tersedia + 1);
    }
  };

  const openDeleteDialog = () => {
    setDeleteDialog(true);
  };
  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <Dialog open={deleteDialog} onClose={() => setDeleteDialog(false)}>
        <DialogTitle>Delete Peralatan</DialogTitle>
        <DialogContent>
          <div className="w-96">
            Apakah Anda yakin ingin menghilangkan {nama} dari Barang yang akan
            dipinjam?
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog(false)}>Tidak</Button>
          <Button onClick={deletePinjamPeralatanData} type="submit">
            <b>Ya</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-2/12 h-24 sm:w-24 md:h-full bg-gray-700 rounded-lg">
          <img src={image} className="w-full h-full"></img>
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Nama Barang : </div>
          <div>{nama}</div>
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Tipe: </div>
          <div>{tipe}</div>
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Kategori : </div>
          <div>{kategori}</div>
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">
            {"Jumlah (Tersedia)"} :{" "}
          </div>
          <div>{`${jumlah} (${tersedia})`}</div>
        </div>
        {editable ? (
          <div className="w-full md:w-2/12 flex flex-wrap justify-center md:justify-center mt-4 md:mt-0">
            {tipe == "Berseri" ? (
              <div className="flex">
                <button className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M9 9V7h9v2zm0 3v-2h9v2zm5 10v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95zM6 22q-1.25 0-2.125-.875T3 19v-3h3V2h15v9.025q-.5-.05-1.012.038t-.988.312V4H8v12h6l-2 2v4z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex">
                {jumlah == 1 ? (
                  <button
                    onClick={() => openDeleteDialog()}
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
                        d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5q0-.425.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5q0 .425-.288.713T19 6v13q0 .825-.587 1.413T17 21zm3-4q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8q-.425 0-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8q-.425 0-.712.288T13 9v7q0 .425.288.713T14 17"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={minJumlah}
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
                        d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2"
                      />
                    </svg>
                  </button>
                )}

                <button
                  onClick={addJumlah}
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
                      d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full md:w-2/12 flex flex-wrap justify-center md:justify-center mt-4 md:mt-0"></div>
        )}
      </div>
    </div>
  );
}
export default PinjamPeralatanRow;
