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
import HorizontalDivider from "../../components/base/HorizontalDivider";
import { useSelector } from "react-redux";
function Peralatan() {
  const user = useSelector((state) => state.user);

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
      peralatan_id: "1",
      peralatan_name: "Komputer",
      category_id: "1",
      category_name: "Elektronik (Berseri)",
      peralatan_description: "Ini Komputer",
      peralatan_count: "15",
      peralatan_available: "20",
      peralatan_image: "Test",
      has_identifier: true,
      brand_name : "Lenovo"
    },
    {
      peralatan_id: "0",
      peralatan_name: "Komputer",
      category_id: "1",
      category_name: "Elektronik (Berseri)",
      peralatan_description: "Ini Komputer",
      peralatan_count: "15",
      peralatan_available: "20",
      peralatan_image: "Test",
      has_identifier: true,
      brand_name : "Lenovo"
    },
    {
      peralatan_id: "0",
      peralatan_name: "Komputer",
      category_id: "1",
      category_name: "Elektronik (Berseri)",
      peralatan_description: "Ini Komputer",
      peralatan_count: "15",
      peralatan_available: "20",
      peralatan_image: "Test",
      brand_name : "Lenovo"
    },
    {
      peralatan_id: "0",
      peralatan_name: "Komputer",
      category_id: "1",
      category_name: "Elektronik (Berseri)",
      peralatan_description: "Ini Komputer",
      peralatan_count: "15",
      peralatan_available: "20",
      peralatan_image: "Test",
      has_identifier: true,
      brand_name : "Lenovo"
    },
    {
      peralatan_id: "0",
      peralatan_name: "Komputer",
      category_id: "2",
      category_name: "Elektronik (Tidak Berseri)",
      peralatan_description: "Ini Komputer",
      peralatan_count: "15",
      peralatan_available: "20",
      peralatan_image: "Test",
      has_identifier: false,
      brand_name : "Lenovo"
    },
    {
      peralatan_id: "0",
      peralatan_name: "Komputer",
      category_id: "2",
      category_name: "Elektronik (Tidak Berseri)",
      peralatan_description: "Ini Komputer",
      peralatan_count: "15",
      peralatan_available: "20",
      peralatan_image: "Test",
      has_identifier: false,
      brand_name : "Lenovo"
    },
  ]);

  const [listKategori, setListKategori] = useState([
    "Elektronik",
    "Alat Tulis",
    "Lainnya",
  ]);

  const [listTipe, setListTipe] = useState(["Berseri", "Tidak Berseri"]);

  useEffect(() => {
    getPeralatanData();
  }, [page]);

  const handleSearchCategory = (event) => {
    setSearchCategory(event.target.value);
  };
  const handleSearchType = (event) => {
    setSearchType(event.target.value);
  };

  const getPeralatanData = () => {
    getPeralatanList();
  };

  const getPeralatanList = () => {
    if (listPeralatan.length % 5 === 0) {
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
              showAdd={true}
              peralatanId={peralatan.peralatan_id}
              peralatanName={peralatan.peralatan_name}
              peralatanCategory={peralatan.category_name}
              peralatanDescription={peralatan.peralatan_description}
              peralatanStock={peralatan.peralatan_count}
              peralatanAvailable={peralatan.peralatan_available}
              peralatanImage={peralatan.peralatan_image}
              hasIdentifier={peralatan.has_identifier}
              brandName={peralatan.brand_name}
              page={page}
            ></PeralatanRow>
          );
      });
    }
  };

  const generateSelectPeralatanKategoryList = () => {
    if (listKategori) {
      return listKategori.map((kategori, index) => {
        return <MenuItem value={kategori}>{kategori}</MenuItem>;
      });
    }
  };

  const generateSelectPeralatanTipeList = () => {
    if (listTipe) {
      return listTipe.map((tipe, index) => {
        return <MenuItem value={tipe}>{tipe}</MenuItem>;
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

  const addPeralatanName = useRef("");
  const addPeralatanImage = useRef("");
  const [addPeralatanCategory, setAddPeralatanCategory] = useState("");
  const [addPeralatanBrand, setAddPeralatanBrand] = useState("");
  const addPeralatanDeskripsi = useRef("");

  const handleInputCategory = (event) => {
    setAddPeralatanCategory(event.target.value);
  };

  const handleInputBrand = (event) => {
    setAddPeralatanBrand(event.target.value);
  };

  const onSubmit = () => {
    if (!addPeralatanName.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nama Peralatan tidak boleh kosong");
    }
    if (!addPeralatanImage.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Gambar tidak boleh kosong");
    }
    if (!addPeralatanCategory) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Jenis Peralatan tidak boleh kosong");
    }
    if (!addPeralatanBrand) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Merek tidak boleh kosong");
    }
    if (!addPeralatanDeskripsi.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Deskripsi tidak boleh kosong");
    }
  };

  const onSubmitRequest = () => {
    if (!requestPeralatanName.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nama Peralatan tidak boleh kosong");
    }
    if (!requestPeralatanCount.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Jumlah tidak boleh kosong");
    }
    if (!requestPeralatanCategory) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Jenis Peralatan tidak boleh kosong");
    }
    if (!requestPeralatanBrand) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Merek tidak boleh kosong");
    }
    if (!requestPeralatanDeskripsi.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Deskripsi tidak boleh kosong");
    }
  };

  // Request
  const [requestDialog, setRequestDialog] = useState(false);
  const openRequestDialog = () => {
    setRequestDialog(true);
  };
  const closeRequestDialog = () => {
    setRequestDialog(false);
  };

  const requestPeralatanName = useRef("");
  const requestPeralatanCount = useRef("");
  const [requestPeralatanCategory, setRequestPeralatanCategory] = useState("");
  const [requestPeralatanBrand, setRequestPeralatanBrand] = useState("");
  const requestPeralatanDeskripsi = useRef("");
  const requestPeralatanReason = useRef("");

  const handleInputRequestCategory = (event) => {
    setRequestPeralatanCategory(event.target.value);
  };

  const handleInputRequestBrand = (event) => {
    setRequestPeralatanBrand(event.target.value);
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

      <Dialog open={requestDialog} onClose={closeRequestDialog}>
        <DialogTitle>Ajukan Peralatan Baru</DialogTitle>
        <DialogContent>
          <div className="w-full flex justify-between flex-wrap">
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="peralatanName"
                name="name"
                label="Nama Peralatan"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={requestPeralatanName}
              />
            </div>
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="peralatanImage"
                name="count"
                label="Jumlah"
                type="number"
                fullWidth
                variant="outlined"
                inputRef={requestPeralatanCount}
              />
            </div>
            <div className="p-2 w-1/2 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Merek</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="peralatanType"
                  value={requestPeralatanBrand}
                  label="Kategori"
                  onChange={handleInputBrand}
                  placeholder="Kategori"
                  fullWidth
                >
                  <MenuItem value={"Lenovo"}>{"Lenovo"}</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="p-2 w-1/2"></div>
            <div className="p-2 w-full flex flex-col">
              <div className="mt-2">Deskripsi</div>
              <TextareaAutosize
                className="w-full h-48 py-2 px-3 text-l border-2 border-gray-300 rounded-lg mt-2"
                minRows={4}
                aria-label="empty textarea"
                placeholder="..."
                ref={requestPeralatanDeskripsi}
              />
            </div>
            <div className="p-2 w-full flex flex-col">
              <div className="mt-2">Alasan</div>
              <TextareaAutosize
                className="w-full h-48 py-2 px-3 text-l border-2 border-gray-300 rounded-lg mt-2"
                minRows={4}
                aria-label="empty textarea"
                placeholder="..."
                ref={requestPeralatanReason}
              />
            </div>
            <div className="p-2 w-1/2 mt-2"></div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRequestDialog}>Cancel</Button>
          <Button onClick={onSubmit} type="submit">
            <b>Ajukan</b>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addDialog} onClose={closeAddDialog}>
        <DialogTitle>Tambah Peralatan</DialogTitle>
        <DialogContent>
          <div className="w-full flex justify-between flex-wrap">
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="peralatanName"
                name="name"
                label="Nama Peralatan"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={addPeralatanName}
              />
            </div>
            <div className="p-2 w-1/2">
              <TextField
                InputLabelProps={{ shrink: true }}
                margin="dense"
                id="peralatanImage"
                name="name"
                label="Gambar"
                type="file"
                fullWidth
                variant="outlined"
                inputRef={addPeralatanImage}
              />
            </div>
            <div className="p-2 w-1/2 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="peralatanType"
                  value={addPeralatanCategory}
                  label="Kategori"
                  onChange={handleInputCategory}
                  placeholder="Kategori"
                  fullWidth
                >
                  <MenuItem value={"Berseri"}>
                    {"Elektronik (Berseri)"}
                  </MenuItem>
                  <MenuItem value={"Tidak Berseri"}>
                    {"Alat Tulis (Tidak Berseri)"}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="p-2 w-1/2 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Merek</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="peralatanType"
                  value={addPeralatanBrand}
                  label="Kategori"
                  onChange={handleInputBrand}
                  placeholder="Kategori"
                  fullWidth
                >
                  <MenuItem value={"Lenovo"}>{"Lenovo"}</MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="p-2 w-1/2"></div>
            <div className="p-2 w-full flex flex-col">
              <div className="mt-2">Deskripsi</div>
              <TextareaAutosize
                className="w-full h-48 py-2 px-3 text-l border-2 border-gray-300 rounded-lg mt-2"
                minRows={4}
                aria-label="empty textarea"
                placeholder="..."
                ref={addPeralatanDeskripsi}
              />
            </div>
            <div className="p-2 w-1/2 mt-2"></div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog}>Cancel</Button>
          <Button onClick={onSubmitRequest} type="submit">
            <b>Tambah</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="List Peralatan"></Heading>
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
              inputRef={searchItem}
              id=""
              label="Username"
              variant="standard"
              className="w-full"
              placeholder="Cari Alat Berdasarkan Nama"
            />
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="w-full h-fit xl:w-1/4 p-4 md:p-4 shadow-md bg-white">
            <div className="w-full">
              {user.role == "User" ? (
                <Button
                  onClick={() => {
                    openRequestDialog();
                  }}
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  + Ajukan Peralatan Baru
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    openAddDialog();
                  }}
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  + Tambah Peralatan Baru
                </Button>
              )}

              <HorizontalDivider></HorizontalDivider>
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
                    {generateSelectPeralatanKategoryList()}
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
                    {generateSelectPeralatanTipeList()}
                  </Select>
                </FormControl>
              </div>
              <div className="w-full mt-4">
                <TextField
                  inputRef={searchCount}
                  type="number"
                  id="jumlahMinimum"
                  label="Jumlah Minimum"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="w-full mt-8">
                <Button
                  onClick={() => getPeralatanData()}
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Cari
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between bg-white">
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
