import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PeralatanRow from "../../components/PeralatanRow";
import PeralatanHeader from "../../components/PeralatanHeader";
import Heading from "../../components/base/Heading";
import KategoriHeader from "../../components/KategoriHeader";
import KategoriRow from "../../components/KategoriRow";
import axios from "axios";
import LoadingFull from "../../components/base/LoadingFull";
import NoData from "../../components/base/NoData";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const API_URL = process.env.REACT_APP_API_URL;
function Kategori() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [AddDialog, setAddDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const [listTipe, setListTipe] = useState(["Berseri", "Tidak Berseri"]);

  const searchItem = useRef();
  const [listKategori, setListKategori] = useState([]);

  const getMaxPage = () => {
    if (listKategori.length % 5 === 0) {
      setMaxPage(Math.floor(listKategori.length / 5));
    } else setMaxPage(Math.floor(listKategori.length / 5) + 1);
  };

  useEffect(() => {
    let userdata = "";
    if (localStorage.getItem("ss_token")) {
      const logindata = localStorage.getItem("ss_token");
      const { user, timestamp } = JSON.parse(logindata);
      userdata = user;
    }
    if (userdata.role == "User") {
      return navigate("/");
    }
    getKategoriList();
  }, [page]);

  useEffect(() => {
    getMaxPage();
  }, [listKategori]);

  const getDataKategoriList = async () => {
    setLoading(true);
    let body = {
      name: searchItem.current.value,
    };

   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    await axios
      .post(API_URL + "/category/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListKategori(res.data.categories);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const getKategoriList = () => {
    getDataKategoriList();
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const generateKategoriData = () => {
    if (listKategori) {
      return listKategori.map((kategori, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <KategoriRow
              index={index}
              key={index}
              kategoriIndex={index + 1}
              kategoriId={kategori.id}
              kategoriNama={kategori.name}
              kategoriType={kategori.hasIdentifier}
              page={page}
            ></KategoriRow>
          );
      });
    } else {
      return <NoData></NoData>;
    }
  };

  const openAddDialog = () => {
    setAddDialog(true);
  };
  const closeAddDialog = () => {
    setAddDialog(false);
  };

  const addKategoriName = useRef("");
  const [addKategoriType, setAddKategoriType] = useState(null);

  const [errorAddKategoriNama, setErrorAddKategoriNama] = useState(false);
  const [errorAddKategoriNamaMessage, setErrorAddKategoriNamaMessage] =
    useState("");

  const [errorAddKategoriType, setErrorAddKategoriType] = useState(false);
  const [errorAddKategoriTypeMessage, setErrorAddKategoriTypeMessage] =
    useState("");

  const handleInputKategoriType = (event) => {
    setAddKategoriType(event.target.value);
  };

  const checkKategoriNama = () => {
    if (addKategoriName.current.value == "") {
      setErrorAddKategoriNama(true);
      return setErrorAddKategoriNamaMessage("Nama Kategori tidak boleh kosong");
    }
    setErrorAddKategoriNamaMessage("");
    return setErrorAddKategoriNama(false);
  };

  const handleSearchNameKeyDown = (event) => {
    if (event.key == "Enter") {
      setPage(1);
      getDataKategoriList();
    }
  };

  const onSubmit = () => {
    setLoading(true);
    if (addKategoriName.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage("Nama Kategori tidak boleh kosong");
    }
    if (addKategoriType == null) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage("Tipe Kategori tidak boleh kosong");
    }

    const body = {
      name: addKategoriName.current.value,
      hasIdentifier: addKategoriType,
    };
   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/category/create", body, {
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
        return setSnackbarMessage("Berhasil Merekam Data");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Gagal Merekam Data");
      });

    return closeAddDialog();
  };

  return (
    <div className="w-full">
      {loading ? <LoadingFull></LoadingFull> : <></>}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />
      <Dialog open={AddDialog} onClose={closeAddDialog}>
        <DialogTitle>Tambah Kategori</DialogTitle>
        <DialogContent>
          <div className="w-full flex justify-between">
            <div className="mx-2 w-96">
              <TextField
                error={errorAddKategoriNama}
                onChange={checkKategoriNama}
                margin="dense"
                id="kategoriName"
                name="kategoriName"
                label="Nama"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={addKategoriName}
              />
              <div className="text-red-500 text-md">
                {errorAddKategoriNamaMessage}
              </div>
            </div>
            <div className="mx-2 w-96 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Tipe Kategori
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="kategoriType"
                  value={addKategoriType}
                  label="Kategori"
                  onChange={handleInputKategoriType}
                  placeholder="Kategori"
                  fullWidth
                >
                  <MenuItem value={true}>Berseri</MenuItem>
                  <MenuItem value={false}>Tidak Berseri</MenuItem>
                </Select>
              </FormControl>
              <div className="text-red-500 text-md">{errorAddKategoriType}</div>
            </div>
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
          <Heading title="List Kategori"></Heading>
        </div>

        <div className="bg-white w-full flex items-center mt-8 shadow-md px-8 py-4">
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
              onKeyDown={handleSearchNameKeyDown}
              inputRef={searchItem}
              id=""
              label="Username"
              variant="standard"
              className="w-full"
              placeholder="Cari Kategori di sini"
            />
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="bg-white w-full h-fit xl:w-1/4 p-4 md:p-4 shadow-md">
            <div className="w-full">
              <Button
                onClick={openAddDialog}
                variant="contained"
                size="large"
                fullWidth
              >
                + Tambah Kategori
              </Button>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <KategoriHeader></KategoriHeader>
            {loading ? <></> : <>{generateKategoriData()}</>}

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
export default Kategori;
