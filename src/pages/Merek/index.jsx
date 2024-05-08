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
import MerekRow from "../../components/MerekRow";
import MerekHeader from "../../components/Merekheader";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
function Merek() {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [AddDialog, setAddDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const [listCategory, setListCategory] = useState(["Elektronik", "Komputer"]);

  const searchItem = useRef();
  const [listMerek, setListMerek] = useState("");

  useEffect(() => {
    getMerekList();
  }, []);

  useEffect(()=>{
    getMaxPage()
  },[listMerek])

  const getMaxPage = () =>{
    if (listMerek.length % 5 == 0) {
      setMaxPage(Math.floor(listMerek.length / 5));
    } else setMaxPage(Math.floor(listMerek.length / 5) + 1);
  }

  const getDataMerekList = () => {
    setLoading(true);
    const body = {
      name: searchItem.current.value,
    };
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/brand/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setListMerek(res.data.brands);
        
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

  const getMerekList = () => {
    getDataMerekList();
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const generateMerekData = () => {
    if (listMerek) {
      return listMerek.map((merek, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <MerekRow
              index={index}
              key={index}
              brandIndex={index + 1}
              brandId={merek.id}
              brandName={merek.name}
              brandCategory={""}
              page={page}
            ></MerekRow>
          );
      });
    }
  };

  const openAddDialog = () => {
    setAddDialog(true);
  };
  const closeAddDialog = () => {
    setAddDialog(false);
  };

  const addBrandName = useRef("");
  const [addBrandCategory, setAddBrandCategory] = useState("");

  const handleSearchNameKeyDown = (event) => {
    if (event.key == "Enter") {
      setPage(1)
      getDataMerekList();
    }
  };

  const onSubmit = () => {
    setLoading(true);
    if (addBrandName.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nama Merek tidak boleh kosong");
    }

    const body = {
      name: addBrandName.current.value,
    };

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/brand/create", body, {
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
        return setSnackbarMessage("Sukses menambahkan data");
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal menambahkan data");
      });
    return closeAddDialog();
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
      <Dialog open={AddDialog} onClose={closeAddDialog}>
        <DialogTitle>Tambah Merek</DialogTitle>
        <DialogContent>
          <div className="w-full flex justify-between">
            <div className="mx-2 w-96">
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Nama Merek"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={addBrandName}
              />
            </div>
            {/* <div className="mx-2 w-96 mt-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Kategori Merek
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="kategori"
                    value={addBrandCategory}
                    label="Kategori"
                    onChange={handleInputKategoriType}
                    placeholder="Kategori"
                    fullWidth
                  >
                   {generateSelectKategoriTipeList()}
                  </Select>
                </FormControl>
                <div className="text-red-500 text-md">{errorAddBrandCategory}</div>
              </div> */}
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
          <Heading title="List Merek"></Heading>
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
              onKeyDown={handleSearchNameKeyDown}
              id=""
              label="merek"
              variant="standard"
              className="w-full"
              placeholder="Cari Merek di sini"
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
                + Tambah Merek
              </Button>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <MerekHeader></MerekHeader>
            {loading ? <></> : <>{generateMerekData()}</>}

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
              {loading ? (
                <></>
              ) : (
                <>
                  <div className="mx-2">
                    {page} / {maxPage}
                  </div>
                </>
              )}

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
export default Merek;
