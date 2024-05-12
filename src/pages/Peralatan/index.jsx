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
import axios from "axios";

import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const API_URL = process.env.REACT_APP_API_URL;
function Peralatan() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const searchItem = useRef();
  const [searchCategory, setSearchCategory] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const searchCount = useRef("");
  const [listPeralatan, setListPeralatan] = useState([]);
  const [listKategori, setListKategori] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [listTipe, setListTipe] = useState(["Berseri", "Tidak Berseri"]);

  useEffect(() => {
    getDataKategoriList();
    getDataBrandList();
  }, []);

  useEffect(() => {
    getPeralatanList();
  }, [searchCategory, searchType]);

  useEffect(() => {
    getMaxPage();
  }, [listPeralatan]);

  const getMaxPage = () => {
    if (listPeralatan.length % 5 === 0) {
      setMaxPage(Math.floor(listPeralatan.length / 5));
    } else setMaxPage(Math.floor(listPeralatan.length / 5) + 1);
  };

  const handleSearchCategory = (event) => {
    setSearchCategory(event.target.value);
  };
  const handleSearchType = (event) => {
    setSearchType(event.target.value);
  };

  const getPeralatanList = () => {
    getDataPeralatanList();
  };

  const getDataKategoriList = () => {
    let body = {};

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/category/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListKategori(res.data.categories);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const getDataBrandList = () => {
    let body = {};

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/brand/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListBrand(res.data.brands);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const getDataPeralatanList = async () => {
    setLoading(true);
    const body = {
      name: searchItem.current.value,
      categoryId: searchCategory,
      hasIdentifier: searchType,
      minimumCount: searchCount.current.value,
    };

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    await axios
      .post(API_URL + "/peralatan/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        const data = res.data.peralatans;

        if (data) {
          setListPeralatan(data);
          setLoading(false);
        } else {
          setSnackbar(true);
          setTimeout(() => {
            setSnackbar(false);
          }, 3000);
          setLoading(false);
          return setSnackbarMessage("Get Data Gagal");
        }
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal mendapatkan data");
      });
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
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5) {
          return (
            <PeralatanRow
              index={index}
              key={index}
              showAdd={true}
              peralatanId={peralatan.id}
              peralatanName={peralatan.name}
              peralatanCategory={peralatan.categoryName}
              peralatanBrandId={peralatan.brandId}
              peralatanBrand={peralatan.brandName}
              peralatanDescription={peralatan.description}
              peralatanStock={peralatan.count}
              peralatanAvailable={peralatan.count - peralatan.borrowCount}
              peralatanImage={peralatan.image}
              hasIdentifier={peralatan.hasIdentifier}
              brandName={peralatan.brand_name}
              page={page}
            ></PeralatanRow>
          );
        }
      });
    }
  };

  const generateSelectPeralatanCategoryList = () => {
    if (listKategori) {
      return listKategori.map((kategori, index) => {
        return <MenuItem value={kategori.id}>{kategori.name}</MenuItem>;
      });
    }
  };

  const generateSelectPeralatanBrandList = () => {
    if (listBrand) {
      return listBrand.map((brand, index) => {
        return <MenuItem value={brand.id}>{brand.name}</MenuItem>;
      });
    }
  };

  const [addDialog, setAddDialog] = useState(false);

  const openAddDialog = () => {
    setAddDialog(true);
  };
  const closeAddDialog = () => {
    setAddDialog(false);
  };

  const addPeralatanName = useRef("");
  const [addPeralatanImage, setAddPeralatanImage] = useState("");
  const [addPeralatanImageUrl, setAddPeralatanImageUrl] = useState("");
  const [addPeralatanCategory, setAddPeralatanCategory] = useState("");
  const [addPeralatanBrand, setAddPeralatanBrand] = useState("");
  const addPeralatanDenda = useRef("");
  const addPeralatanDeskripsi = useRef("");

  const handleInputCategory = (event) => {
    setAddPeralatanCategory(event.target.value);
  };

  const handleInputBrand = (event) => {
    setAddPeralatanBrand(event.target.value);
  };

  const changeUploadAddImage = (event) => {
    const file = event.target.files[0];
    setAddPeralatanImage(file);
  };

  const uploadPerlatanImageToFirebase = async () => {
    console.log(addPeralatanImage);

    let currentdate = new Date();
    let day = currentdate.getDate().toString().padStart(2, "0"); // Ensures two digits with leading zero
    let month = (currentdate.getMonth() + 1).toString().padStart(2, "0"); // Ensures two digits with leading zero
    let year = currentdate.getFullYear().toString();
    let hours = currentdate.getHours().toString().padStart(2, "0"); // Ensures two digits with leading zero
    let minutes = currentdate.getMinutes().toString().padStart(2, "0"); // Ensures two digits with leading zero
    let seconds = currentdate.getSeconds().toString().padStart(2, "0"); // Ensures two digits with leading zero

    let datetime = day + month + year + hours + minutes + seconds;
    let filename = addPeralatanImage.name.split(".");
    filename[0] = datetime;

    let combinedfilename = filename[0] + "." + filename[1];
    console.log(combinedfilename);

    const firebaseConfig = {
      apiKey: "AIzaSyAf5GnpEKVsZ8iPnbYHO9oJD-hdSk0TWao",
      authDomain: "storage-system-135a2.firebaseapp.com",
      projectId: "storage-system-135a2",
      storageBucket: "storage-system-135a2.appspot.com",
      messagingSenderId: "6215443319",
      appId: "1:6215443319:web:7e35fea7c364cf0035b772",
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const storageRef = firebase.storage().ref(`peralatan/${combinedfilename}`);
    const uploadTask = storageRef.put(addPeralatanImage);

    await uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress function
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
      },
      () => {
        // Complete function
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          setAddPeralatanImageUrl(downloadURL);
          console.log(downloadURL);
          createPeralatanData(downloadURL);
        });
      }
    );
  };

  const onSubmit = async () => {
    if (!addPeralatanName.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nama Peralatan tidak boleh kosong");
    }
    if (!addPeralatanImage) {
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
    await uploadPerlatanImageToFirebase();
  };

  const createPeralatanData = (imgurl) => {
    let body = {
      name: addPeralatanName.current.value,
      description: addPeralatanDeskripsi.current.value,
      image: imgurl,
      borrowCount: 0,
      categoryId: addPeralatanCategory,
      brandId: addPeralatanBrand,
    };

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/peralatan/create", body, {
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
        return setSnackbarMessage("Perekaman Data Berhasil");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Perekaman Data Gagal");
      });
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
    // if (!requestPeralatanCategory) {
    //   setSnackbar(true);
    //   setTimeout(() => {
    //     setSnackbar(false);
    //   }, 3000);
    //   return setSnackbarMessage("Jenis Peralatan tidak boleh kosong");
    // }
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

    let body = {
      itemName: requestPeralatanName.current.value,
      itemDescription: requestPeralatanDeskripsi.current.value,
      itemCount: requestPeralatanCount.current.value,
      reason: requestPeralatanReason.current.value,
      brandId: requestPeralatanBrand,
      peralatanId: null,
    };
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/request/create", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
          window.location.reload();
        }, 1000);
        return setSnackbarMessage("Pembuatan Pengajuan Berhasil");
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Pembuatan Pengajuan Gagal");
      });
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

  const handleSearchNameKeyDown = (event) => {
    if (event.key == "Enter") {
      setPage(1);
      getDataPeralatanList();
    }
  };

  const resetFilter = () => {
    setSearchCategory("");
    setSearchType("");
    searchCount.current.value = null;
    getDataPeralatanList();
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
                  onChange={handleInputRequestBrand}
                  placeholder="Kategori"
                  fullWidth
                >
                  {generateSelectPeralatanBrandList()}
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
          <Button onClick={onSubmitRequest} type="submit">
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
              <input
                className="mt-5"
                type="file"
                onChange={changeUploadAddImage}
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
                  {generateSelectPeralatanCategoryList()}
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
                  {generateSelectPeralatanBrandList()}
                </Select>
              </FormControl>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="peralatanName"
                name="name"
                label="Denda per Jam"
                type="number"
                fullWidth
                variant="outlined"
                inputRef={addPeralatanDenda}
              />
            </div>
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
              placeholder="Cari Alat Berdasarkan Nama"
              disabled={loading}
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
                  disabled={loading}
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
                    disabled={loading}
                  >
                    {generateSelectPeralatanCategoryList()}
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
                    disabled={loading}
                  >
                    <MenuItem value={true}>Berseri</MenuItem>
                    <MenuItem value={false}>Tidak Berseri</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="w-full mt-4">
                <TextField
                  onKeyDown={handleSearchNameKeyDown}
                  inputRef={searchCount}
                  type="number"
                  id="jumlahMinimum"
                  name="searchMinimumCount"
                  label="Jumlah Minimum"
                  variant="outlined"
                  fullWidth
                  disabled={loading}
                />
              </div>
              <div className="w-full mt-8">
                <Button
                  onClick={() => resetFilter()}
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={loading}
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between bg-white">
            <PeralatanHeader></PeralatanHeader>
            {loading ? <></> : <>{generatePeralatanData()}</>}

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
