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
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddPeralatanBerseriHeader from "./AddPeralatanBerseriHeader";
function EditReturnBerseriRow({
  peralatan,
  detail,
  index,
  addPinjamPeralatanDataBerseri,
  deletePinjamPeralatanBerseri,
  closeEditDialog,
  changeReturnStatus
}) {

  const dispatch = useDispatch();
  const [selectReturnStatus, setSelectReturnStatus] = useState();

  const pinjamAlatBerseri = () => {
    addPinjamPeralatanDataBerseri(peralatan, detail);
  };

  const onDeleteAlatBerseri = () => {
    closeEditDialog();
    deletePinjamPeralatanBerseri(peralatan, detail);
  };

  const handleReturnStatus = (event) => {
    setSelectReturnStatus(event.target.value);
    detail.peralatan_status = event.target.value
    changeReturnStatus(peralatan.peralatan_id, detail);
  };

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-4/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Kode Asset : </div>
          <div>{detail.peralatan_detail_name}</div>
        </div>
        <div className="w-full md:w-4/12 flex flex-wrap justify-center md:justify-center mt-4 md:mt-0">
          <div className="flex w-full">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="peralatanType"
                label="Kategori"
                placeholder="Kategori"
                fullWidth
                defaultValue={detail.peralatan_status}
                onChange={handleReturnStatus}
              >
                <MenuItem value={"Siap Dipinjam"}>{"Siap Dipinjam"}</MenuItem>
                <MenuItem value={"Tidak Siap Dipinjam"}>{"Tidak Siap Dipinjam"}</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditReturnBerseriRow;
