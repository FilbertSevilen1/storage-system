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
function ReturnPeralatanBerseriRow({
  peralatan,
  detail,
  index,
  addPinjamPeralatanDataBerseri,
  deletePinjamPeralatanBerseri,
  closeEditDialog,
  changeReturnStatus
}) {
  const [returnStatusId, setReturnStatusId] = useState(detail.peralatanDetailStatusId);

  const dispatch = useDispatch();

  const pinjamAlatBerseri = () => {
    addPinjamPeralatanDataBerseri(peralatan, detail);
  };

  const onDeleteAlatBerseri = () => {
    closeEditDialog();
    deletePinjamPeralatanBerseri(peralatan, detail);
  };

  if (!detail.detailName) {
    detail.detailName = detail.peralatanDetailName;
  }

  if (!detail.status) {
    detail.status = detail.peralatanDetailStatusName;
  }

  const handleReturnStatus = (event) =>{
    setReturnStatusId(event.target.value)
    let statusName = "";

    switch (event.target.value) {
      case "c47aaddc-2d23-472d-b43d-c4de92d5217f":
        statusName = "Tidak Siap Dipinjam";
        break;
      case "309bf632-ca49-4a10-a486-f6a7fd43ac7c":
        statusName = "Siap Dipinjam";
        break;
      case "e61288ae-b95c-4db7-b3fb-04adb4623671":
        statusName = "Dalam Peminjaman" ;
        break;
      case "10f8dd3d-7f56-4c72-a0de-01bac1a0104a":
        statusName = "Dalam Perbaikan";
        break;
      case "76e7b433-cbca-4cb2-8a0c-dd372b94c475":
        statusName = "Dibuang";
        break;
      default:
        break;
    }

    changeReturnStatus(peralatan.peralatanId, detail.peralatanDetailId, event.target.value, statusName)
  }

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-4/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Kode Asset : </div>
          <div>{detail.detailName}</div>
        </div>
        <div className="w-full md:w-4/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Status: </div>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={returnStatusId}
              id="demo-simple-select"
              label="Status Pengembalian"
              onChange={handleReturnStatus}
              defaultValue={returnStatusId}
              fullWidth
            >
              <MenuItem value={"c47aaddc-2d23-472d-b43d-c4de92d5217f"}>
                Tidak Siap Dipinjam
              </MenuItem>
              <MenuItem value={"309bf632-ca49-4a10-a486-f6a7fd43ac7c"}>
                Siap Dipinjam
              </MenuItem>
              <MenuItem value={"10f8dd3d-7f56-4c72-a0de-01bac1a0104a"}>
                Dalam Perbaikan
              </MenuItem>
              <MenuItem value={"76e7b433-cbca-4cb2-8a0c-dd372b94c475"}>
                Dibuang
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="w-full md:w-4/12 flex flex-wrap justify-center md:justify-center mt-4 md:mt-0">
          <div className="flex">
            {/* <button
              onClick={() => onDeleteAlatBerseri()}
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
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReturnPeralatanBerseriRow;
