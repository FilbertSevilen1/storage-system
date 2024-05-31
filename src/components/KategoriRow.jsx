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
import axios from "axios";
import React, { useRef, useState } from "react";
import LoadingFull from "./base/LoadingFull";
import { useNavigate } from "react-router";
const API_URL = process.env.REACT_APP_API_URL;
function KategoriRow(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  let [index, setIndex] = useState(props.kategoriIndex);
  let [id, setID] = useState(props.kategoriId);
  let [name, setName] = useState(props.kategoriNama);
  let [type, setType] = useState(props.kategoriType);

  const [editDialog, setEditDialog] = useState(false);

  const editKategoriNama = useRef("");
  const [editKategoriNamaDefault, setEditKategoriNamaDefault] = useState("");
  const [editKategoriType, setEditKategoriType] = useState("");

  const [errorEditKategoriNama, setErrorEditKategoriNama] = useState(false);
  const [errorEditKategoriNamaMessage, setErrorEditKategoriNamaMessage] =
    useState("");

  const handleInputKategori = (event) => {
    setEditKategoriType(event.target.value);
  };

  const resetErrorMessage = () => {
    setErrorEditKategoriNamaMessage("");
    setErrorEditKategoriNama(false);
  };

  const openEditDialog = (name, type) => {
    setEditKategoriNamaDefault(name);
    setEditKategoriType(type);

    resetErrorMessage();

    return setEditDialog(true);
  };
  const closeEditDialog = () => {
    setEditDialog(false);
  };

  const checkKategoriNama = () => {
    if (editKategoriNama.current.value == "") {
      setErrorEditKategoriNama(true);
      return setErrorEditKategoriNamaMessage(
        "Nama Kategori tidak boleh kosong"
      );
    }
    setErrorEditKategoriNamaMessage("");
    return setErrorEditKategoriNama(false);
  };

  const onSubmit = () => {
    setLoading(true);
    if (editKategoriNama.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage("Nama Kategori tidak boleh kosong");
    }

    const body = {
      id: id,
      name: editKategoriNama.current.value,
      hasIdentifier: editKategoriType,
    };
   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .put(API_URL + "/category/update", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
          window.location.reload();
        }, 1000);
        setLoading(false);
        return setSnackbarMessage("Ubah Kategori Berhasil");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Ubah Kategori Gagal");
      });
  };

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      {loading ? <LoadingFull></LoadingFull> : <></>}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />
      <Dialog open={editDialog} onClose={closeEditDialog}>
        <DialogTitle>Edit Kategori</DialogTitle>
        <DialogContent>
          <div className="w-full flex justify-between">
            <div className="p-2 w-96">
              <TextField
                onChange={checkKategoriNama}
                error={errorEditKategoriNama}
                margin="dense"
                id="name"
                name="name"
                label="Nama"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={editKategoriNama}
                defaultValue={editKategoriNamaDefault}
              />
              <div className="text-red-500 text-md">
                {errorEditKategoriNamaMessage}
              </div>
            </div>
            <div className="p-2 w-96 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipe Kategori
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editKategoriType}
                  label="Kategori"
                  onChange={handleInputKategori}
                  placeholder="Kategori"
                  fullWidth
                  disabled
                >
                  <MenuItem value={true}>Berseri</MenuItem>
                  <MenuItem value={false}>Tidak Berseri</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button onClick={onSubmit} type="submit">
            <b>Ubah</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">No : </div>
          {index}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Nama : </div>
          {name}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Tipe : </div>
          {type == true ? "Berseri" : "Tidak Berseri"}
        </div>
        <div className=" w-full md:w-3/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
          <div
            onClick={() => openEditDialog(name, type)}
            className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95z"
              />
            </svg>
          </div>
          {/* <div className="mx-1 p-1 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
              />
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default KategoriRow;
