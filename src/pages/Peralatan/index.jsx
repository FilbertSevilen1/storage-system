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
import React, { useEffect, useRef, useState } from "react";
import PeralatanRow from "../../components/PeralatanRow";
import PeralatanHeader from "../../components/PeralatanHeader";
import Heading from "../../components/base/Heading";
function Peralatan() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const searchItem = useRef();
  const [searchCategory, setSearchCategory] = useState("");
  const [searchType, setSearchType] = useState("");
  const [searchCount, setSearchCount] = useState("");
  const [listPeralatan, setListPeralatan] = useState([
    {
      peralatanId: "0",
      peralatanName: "Komputer",
      peralatanType: "Berseri",
      peralatanCategory: "Elektronik",
      peralatanDescription: "Ini Komputer",
      peralatanStock: "15",
      peralatanAvailable: "20",
    },
    {
      peralatanId: "0",
      peralatanName: "Komputer",
      peralatanType: "Berseri",
      peralatanCategory: "Elektronik",
      peralatanDescription: "Ini Komputer",
      peralatanStock: "15",
      peralatanAvailable: "20",
    },
    {
      peralatanId: "0",
      peralatanName: "Komputer",
      peralatanType: "Berseri",
      peralatanCategory: "Elektronik",
      peralatanDescription: "Ini Komputer",
      peralatanStock: "15",
      peralatanAvailable: "20",
    },
    {
      peralatanId: "0",
      peralatanName: "Komputer",
      peralatanType: "Berseri",
      peralatanCategory: "Elektronik",
      peralatanDescription: "Ini Komputer",
      peralatanStock: "15",
      peralatanAvailable: "20",
    },
    {
      peralatanId: "0",
      peralatanName: "Komputer",
      peralatanType: "Berseri",
      peralatanCategory: "Elektronik",
      peralatanDescription: "Ini Komputer",
      peralatanStock: "15",
      peralatanAvailable: "20",
    },
    {
      peralatanId: "0",
      peralatanName: "Komputer",
      peralatanType: "Berseri",
      peralatanCategory: "Elektronik",
      peralatanDescription: "Ini Komputer",
      peralatanStock: "15",
      peralatanAvailable: "20",
    },
  ]);

  useEffect(() => {
    getPeralatanList();
  }, [page]);

  const handleSearchCategory = (event) => {
    setSearchCategory(event.target.value);
  };
  const handleSearchType = (event) => {
    setSearchType(event.target.value);
  };

  const getPeralatanList = () => {
    if (listPeralatan.length % 10 === 0) {
      setMaxPage(Math.floor(listPeralatan.length / 5));
    } else setMaxPage(Math.floor(listPeralatan.length / 5) + 1);
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const generatePeralatanData = () => {
    if (listPeralatan) {
      return listPeralatan.map((peralatan, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <PeralatanRow
              index={index}
              key={index}
              peralatanId={peralatan.peralatanId}
              peralatanName={peralatan.peralatanName}
              peralatanType={peralatan.peralatanType}
              peralatanCategory={peralatan.peralatanCategory}
              peralatanDescription={peralatan.peralatanDescription}
              peralatanStock={peralatan.peralatanStock}
              peralatanAvailable={peralatan.peralatanAvailable}
              page={page}
            ></PeralatanRow>
          );
      });
    }
  };

  const [addDialog, setAddDialog] = useState("");

  const openAddDialog = () => {
    setAddDialog(true);
  };
  const closeAddDialog = () => {
    setAddDialog(false);
  };

  const addPeralatanNama = useRef("");
  const addPeralatanGambar = useRef("");
  const [addPeralatanKategori, setAddPeralatanKategori] = useState("");
  const addPeralatanDeskripsi = useRef("");

  const [errorAddPeralatanNama, setErrorAddPeralatanNama] = useState(false);
  const [errorAddPeralatanNamaMessage, setErrorAddPeralatanNamaMessage] =
    useState("");

  const [errorAddPeralatanGambar, setErrorAddPeralatanGambar] = useState(false);
  const [errorAddPeralatanGambarMessage, setErrorAddPeralatanGambarMessage] =
    useState("");

  const [errorAddPeralatanKategori, setErrorAddPeralatanKategori] =
    useState(false);
  const [errorAddPeralatanKategoriMessage, setErrorAddPeralatanKategoriMessage] =
    useState("");

  const [errorAddPeralatanDeskripsi, setErrorAddPeralatanDeskripsi] =
    useState(false);
  const [
    errorAddPeralatanDeskripsiMessage,
    setErrorAddPeralatanDeskripsiMessage,
  ] = useState("");

  const handleInputCategory = (event) => {
    setAddPeralatanKategori(event.target.value);
  };

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
    if (!addPeralatanGambar.current.value) {
      setErrorAddPeralatanDeskripsi(true);
      return setErrorAddPeralatanDeskripsiMessage(
        "Kategori tidak boleh kosong"
      );
    }
    setErrorAddPeralatanDeskripsiMessage("");
    return setErrorAddPeralatanDeskripsi(false);
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
      return setSnackbarMessage("Jenis Peralatan tidak boleh kosong");
    }
    if (!addPeralatanDeskripsi.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Deskripsi tidak boleh kosong");
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
      <Dialog open={addDialog} onClose={closeAddDialog}>
        <DialogTitle>Tambah Peralatan</DialogTitle>
        <DialogContent>
          <div className="w-full flex justify-between flex-wrap">
            <div className="p-2 w-1/2">
              <TextField
                error={errorAddPeralatanNama}
                onChange={checkPeralatanNama}
                margin="dense"
                id="name"
                name="name"
                label="Nama Peralatan"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={addPeralatanNama}
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
                id="name"
                name="name"
                label="Gambar"
                type="password"
                fullWidth
                variant="outlined"
                inputRef={addPeralatanGambar}
              />
              <div className="text-red-500 text-md">
                {errorAddPeralatanGambarMessage}
              </div>
            </div>
            <div className="p-2 w-1/2 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Jenis Peralatan
                </InputLabel>
                <Select
                  error={errorAddPeralatanKategori}
                  onchange={checkPeralatanKategori}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={addPeralatanKategori}
                  label="Jenis Peralatan"
                  onChange={handleInputCategory}
                  placeholder="Jenis Peralatan"
                  fullWidth
                >
                  <MenuItem value={"Berseri"}>Berseri</MenuItem>
                  <MenuItem value={"Tidak Berseri"}>Tidak Berseri</MenuItem>
                </Select>
              </FormControl>
              <div className="text-red-500 text-md">
                {errorAddPeralatanKategoriMessage}
              </div>
            </div>
            <div className="p-2 w-1/2"></div>
            <div className="p-2 w-full">
              <TextareaAutosize
                onchange={checkPeralatanDeskrispi}
                className="w-full h-48 py-2 px-3 text-l border-2 border-gray-300 rounded-lg mt-2"
                minRows={4}
                aria-label="empty textarea"
                placeholder="Deskripsi"
                ref={addPeralatanDeskripsi}
              />
              <div className="text-red-500 text-md">
                {errorAddPeralatanKategoriMessage}
              </div>
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
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="List Peralatan"></Heading>
        </div>

        <div className="w-full flex items-center mt-8 shadow-md px-8 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
            />
          </svg>
          <div className="w-full ml-4">
            <Input
              inputRef={searchItem}
              id=""
              label="Username"
              variant="standard"
              className="w-full"
              placeholder="Cari Barang di sini"
            />
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12">
          <div className="w-full h-fit xl:w-1/4 p-4 md:p-8 shadow-md">
            <div className="w-full">
              <Button
                onClick={() => {
                  openAddDialog();
                }}
                variant="contained"
                size="large"
                fullWidth
              >
                + Tambah Peralatan
              </Button>
              <div className="w-full mt-8">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Kategori
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchCategory}
                    label="Kategori"
                    onChange={handleSearchCategory}
                    placeholder="Kategori"
                    fullWidth
                  >
                    <MenuItem value={"Elektronik"}>Elektronik</MenuItem>
                    <MenuItem value={"Alat Tulis"}>Alat Tulis</MenuItem>
                    <MenuItem value={"Lainnya"}>Lainnya</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="w-full mt-4">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Tipe</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchType}
                    label="Tipe"
                    onChange={handleSearchType}
                    placeholder="Tipe"
                    fullWidth
                  >
                    <MenuItem value={"Berseri"}>Berseri</MenuItem>
                    <MenuItem value={"Tidak Berseri"}>Tidak Berseri</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="w-full mt-4">
                <TextField
                  inputRef={searchCount}
                  type="number"
                  id="standard-basic"
                  label="Jumlah Minimum"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </div>
          <div className="w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <PeralatanHeader></PeralatanHeader>
            {generatePeralatanData()}
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
        </div>
      </div>
    </div>
  );
}
export default Peralatan;
