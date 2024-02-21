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
  TextareaAutosize,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
function PeralatanRow(props) {
  const navigate = useNavigate();

  let [showAdd, setShowAdd] = useState(props.showAdd||false);

  let [id, setID] = useState(props.peralatanId);
  let [name, setName] = useState(props.peralatanName);
  let [image, setImage] = useState(props.peralatanImage);
  let [type, setType] = useState(props.peralatanType);
  let [category, setCategory] = useState(props.peralatanCategory);
  let [description, setDescription] = useState(props.peralatanDescription);
  let [stock, setStock] = useState(props.peralatanStock);
  let [available, setAvailable] = useState(props.peralatanAvailable);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [addDialog, setAddDialog] = useState("");
  const [addDialogType, setAddDialogType] = useState("");

  const openAddDialog = (name, Gambar, type, description) => {
    setAddDialogType(type);

    setAddPeralatanNamaDefault(name);
    setAddPeralatanGambarDefault(Gambar);
    setAddPeralatanDeskripsiDefault(description);
    setAddPeralatanKategori(type);
    // addPeralatanGambar.current.value = Gambar,
    // setAddDialogType(type);
    // addPeralatanDeskripsi.current.value = description

    setAddDialog(true);
  };
  const closeAddDialog = () => {
    setAddDialog(false);
  };

  // Dialog Data
  const addPeralatanNama = useRef("");
  const [addPeralatanNamaDefault, setAddPeralatanNamaDefault] = useState("");

  const addPeralatanGambar = useRef("");
  const [addPeralatanGambarDefault, setAddPeralatanGambarDefault] =
    useState("");
  const [addPeralatanKategori, setAddPeralatanKategori] = useState("");
  const addPeralatanDeskripsi = useRef("");
  const [addPeralatanDeskripsiDefault, setAddPeralatanDeskripsiDefault] =
    useState("");

  const addPeralatanNomorSeri = useRef("");
  const addPeralatanJumlah = useRef("");

  const handleInputCategory = (event) => {
    setAddPeralatanKategori(event.target.value);
  };

  // Error Handling
  const [errorAddPeralatanNama, setErrorAddPeralatanNama] = useState(false);
  const [errorAddPeralatanNamaMessage, setErrorAddPeralatanNamaMessage] =
    useState("");

  const [errorAddPeralatanGambar, setErrorAddPeralatanGambar] = useState(false);
  const [errorAddPeralatanGambarMessage, setErrorAddPeralatanGambarMessage] =
    useState("");

  const [errorAddPeralatanKategori, setErrorAddPeralatanKategori] =
    useState(false);
  const [
    errorAddPeralatanKategoriMessage,
    setErrorAddPeralatanKategoriMessage,
  ] = useState("");

  const [errorAddPeralatanDeskripsi, setErrorAddPeralatanDeskripsi] =
    useState(false);
  const [
    errorAddPeralatanDeskripsiMessage,
    setErrorAddPeralatanDeskripsiMessage,
  ] = useState("");

  const [errorAddPeralatanNomorSeri, setErrorAddPeralatanNomorSeri] =
    useState(false);
  const [
    errorAddPeralatanNomorSeriMessage,
    setErrorAddPeralatanNomorSeriMessage,
  ] = useState("");

  const [errorAddPeralatanJumlah, setErrorAddPeralatanJumlah] = useState(false);
  const [errorAddPeralatanJumlahMessage, setErrorAddPeralatanJumlahMessage] =
    useState("");

  //Checking
  const checkPeralatanNama = () => {
    if (addPeralatanNama.current.value == "") {
      setErrorAddPeralatanNama(true);
      return setErrorAddPeralatanNamaMessage(
        "Nama Peralatan tidak boleh kosong"
      );
    }
    setErrorAddPeralatanNamaMessage("");
    return setErrorAddPeralatanNama(false);
  };

  const checkPeralatanGambar = () => {
    if (!addPeralatanGambar.current.value) {
      setErrorAddPeralatanGambar(true);
      return setErrorAddPeralatanGambarMessage("Gambar tidak boleh kosong");
    }
    setErrorAddPeralatanGambarMessage("");
    return setErrorAddPeralatanGambar(false);
  };

  const checkPeralatanKategori = () => {
    if (!addPeralatanGambar.current.value) {
      setErrorAddPeralatanKategori(true);
      return setErrorAddPeralatanKategoriMessage("Kategori tidak boleh kosong");
    }
    setErrorAddPeralatanKategoriMessage("");
    return setErrorAddPeralatanKategori(false);
  };

  const checkPeralatanDeskrispi = () => {
    if (!addPeralatanDeskripsi.current.value) {
      setErrorAddPeralatanDeskripsi(true);
      return setErrorAddPeralatanDeskripsiMessage(
        "Deskripsi tidak boleh kosong"
      );
    }
    setErrorAddPeralatanDeskripsiMessage("");
    return setErrorAddPeralatanDeskripsi(false);
  };

  const checkPeralatanNomorSeri = () => {
    if (!addPeralatanNomorSeri.current.value) {
      setErrorAddPeralatanNomorSeri(true);
      return setErrorAddPeralatanNomorSeriMessage(
        "Nomor Seri tidak boleh kosong"
      );
    }
    setErrorAddPeralatanNomorSeriMessage("");
    return setErrorAddPeralatanNomorSeri(false);
  };

  const checkPeralatanJumlah = () => {
    if (!addPeralatanJumlah.current.value) {
      setErrorAddPeralatanJumlah(true);
      return setErrorAddPeralatanJumlahMessage("Nomor Seri tidak boleh kosong");
    }
    setErrorAddPeralatanJumlahMessage("");
    return setErrorAddPeralatanJumlah(false);
  };

  const onSubmit = () => {
    if (!addPeralatanNama.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nama Peralatan tidak boleh kosong");
    }
    if (!addPeralatanGambar.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Gambar tidak boleh kosong");
    }
    if (!addPeralatanKategori) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Kategori tidak boleh kosong");
    }
    if (!addPeralatanDeskripsi.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Deskripsi tidak boleh kosong");
    }
    if (!addPeralatanNomorSeri.current.value && addDialogType == "Berseri") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nomor Seri tidak boleh kosong");
    }
    if (!addPeralatanJumlah.current.value && addDialogType == "Tidak Berseri") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Jumlah tidak boleh kosong");
    }
  };

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />
      <Dialog open={addDialog} onClose={closeAddDialog}>
        <DialogTitle>Tambah Stok Peralatan</DialogTitle>
        <DialogContent>
          <div className="w-full flex justify-between flex-wrap">
            <div className="p-2 w-1/2">
              <TextField
                error={errorAddPeralatanNama}
                onChange={checkPeralatanNama}
                margin="dense"
                id="peralatanName"
                name="name"
                label="Nama Peralatan"
                type="text"
                fullWidth
                variant="outlined"
                defaultValue={addPeralatanNamaDefault}
                inputRef={addPeralatanNama}
                disabled
              />
              <div className="text-red-500 text-md">
                {errorAddPeralatanNamaMessage}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                error={errorAddPeralatanGambar}
                onChange={checkPeralatanGambar}
                margin="dense"
                id="peralatanGambar"
                name="name"
                label="Gambar"
                type="password"
                fullWidth
                variant="outlined"
                defaultValue={addPeralatanGambarDefault}
                inputRef={addPeralatanGambar}
                disabled
              />
              <div className="text-red-500 text-md">
                {errorAddPeralatanGambarMessage}
              </div>
            </div>
            <div className="p-2 w-1/2 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                <Select
                  error={errorAddPeralatanKategori}
                  onchange={checkPeralatanKategori}
                  labelId="demo-simple-select-label"
                  id="peralatanType"
                  value={addPeralatanKategori}
                  label="Kategori"
                  onChange={handleInputCategory}
                  placeholder="Kategori"
                  fullWidth
                  disabled
                  defaultValue={addPeralatanKategori}
                >
                  <MenuItem value={"Berseri"}>
                    {"Elektronik (Berseri)"}
                  </MenuItem>
                  <MenuItem value={"Tidak Berseri"}>
                    {"Alat Tulis (Tidak Berseri)"}
                  </MenuItem>
                </Select>
              </FormControl>
              <div className="text-red-500 text-md">
                {errorAddPeralatanKategoriMessage}
              </div>
            </div>
            <div className="p-2 w-1/2">
              {addDialogType == "Berseri" ? (
                <div>
                  <TextField
                    error={errorAddPeralatanNomorSeri}
                    onChange={checkPeralatanNomorSeri}
                    margin="dense"
                    id="Nomor Seri"
                    name="name"
                    label="Nomor Seri"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputRef={addPeralatanNomorSeri}
                  />
                  <div className="text-red-500 text-md">
                    {errorAddPeralatanNomorSeriMessage}
                  </div>
                </div>
              ) : (
                <div>
                  <TextField
                    error={errorAddPeralatanJumlah}
                    onChange={checkPeralatanJumlah}
                    margin="dense"
                    id="peralatanJumlah"
                    name="jumlah"
                    label="Jumlah"
                    type="number"
                    fullWidth
                    variant="outlined"
                    inputRef={addPeralatanJumlah}
                  />
                  <div className="text-red-500 text-md">
                    {errorAddPeralatanJumlahMessage}
                  </div>
                </div>
              )}
            </div>
            <div className="p-2 w-1/2 mt-2"></div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog}>Cancel</Button>
          <Button onClick={onSubmit} type="submit">
            <b>Tambah</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-full md:w-24 h-24 sm:w-24 md:h-full bg-gray-700 rounded-lg">
        <img src={image} className="w-full h-full"></img>
      </div>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Nama : </div>
          {name}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Jenis : </div>
          {type}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Kategori : </div>
          {category}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Deskripsi : </div>
          {description}
        </div>
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Stok : </div>
          {stock}
        </div>
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center mb-2 md:mb-0">
          <div className="flex md:hidden mr-2 font-bold">Terssedia : </div>
          {available}
        </div>
        <div className="w-full md:w-1/12 flex md:mx-2 p-2 rounded-xl flex justify-center items-center">
          {showAdd ? (
            <button
              onClick={() => openAddDialog(name, image, type, description)}
              className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
                />
              </svg>
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={() => navigate(`/peralatan/${id}`)}
            className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PeralatanRow;
