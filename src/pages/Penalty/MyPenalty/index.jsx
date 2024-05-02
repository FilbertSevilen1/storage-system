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
  import PeralatanRow from "../../../components/PeralatanRow";
  import PeralatanHeader from "../../../components/PeralatanHeader";
  import Heading from "../../../components/base/Heading";
  import KategoriHeader from "../../../components/KategoriHeader";
  import KategoriRow from "../../../components/KategoriRow";
import MerekRow from "../../../components/MerekRow";
import MerekHeader from "../../../components/Merekheader";
import SubHeading from "../../../components/base/SubHeading";
import PenaltyRow from "../../../components/PenaltyRow";
import PenaltyHeader from "../../../components/PenaltyHeader";
import MyPenaltyRow from "../../../components/MyPenaltyRow";
import MyPenaltyHeader from "../../../components/MyPenaltyHeader";
  function MyPenalty() {
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState("");
  
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const vertical = "top";
    const horizontal = "center";
  
    const [AddDialog, setAddDialog] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
  
    const [listCategory, setListCategory] = useState([
      'Elektronik',
      'Komputer',
    ])
  
    const searchItem = useRef();
    const [listPunishment, setListPunishment] = useState([
      {
        punishmentUsername: "Anton",
        punishmentType: "Denda",
        punishmentDate: "13/03/2024",
        punishmentStatus: "DONE",
      },
    ]);
  
    useEffect(() => {
      getKategoriList();
    }, [page]);
  
    const getKategoriList = () => {
      if (listPunishment.length % 5 === 0) {
        setMaxPage(Math.floor(listPunishment.length / 5));
      } else setMaxPage(Math.floor(listPunishment.length / 5) + 1);
    };
  
    const prevPage = () => {
      if (page <= 1) return;
      setPage(page - 1);
    };
  
    const nextPage = () => {
      if (page >= maxPage) return;
      setPage(page + 1);
    };
  
    const generatePunishmentData = () => {
      if (listPunishment) {
        return listPunishment.map((punishment, index) => {
          if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
            return (
              <MyPenaltyRow
                index={index}
                key={index}
                no={index+1}
                punishmentUsername={punishment.punishmentUsername}
                punishmentType={punishment.punishmentType}
                punishmentDate={punishment.punishmentDate}
                punishmentStatus={punishment.punishmentStatus}
                page={page}
              ></MyPenaltyRow>
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
  
    const [errorAddKategoriNama, setErrorAddKategoriNama] = useState(false);
    const [errorAddKategoriNamaMessage, setErrorAddKategoriNamaMessage] =
      useState("");
  
    const [errorAddBrandCategory, setErrorAddBrandCategory] = useState(false);
    const [errorAddBrandCategoryMessage, setErrorAddBrandCategoryMessage] =
      useState("");
  
    const handleInputKategoriType = (event) => {
      setAddBrandCategory(event.target.value);
    };
  
    const checkKategoriNama = () => {
      if (addBrandName.current.value == "") {
        setErrorAddKategoriNama(true);
        return setErrorAddKategoriNamaMessage("Nama Kategori tidak boleh kosong");
      }
      setErrorAddKategoriNamaMessage("");
      return setErrorAddKategoriNama(false);
    };
  
    const generateSelectKategoriTipeList = () =>{
      if(listCategory){
        return listCategory.map((tipe,index)=>{
          return(
            <MenuItem value={tipe}>{tipe}</MenuItem>
          )
        })
      }
    }
  
    const resetAddDialog = () => {
      addBrandName.current.value = "";
      setAddBrandCategory("");
    };
    const onSubmit = () => {
      if (addBrandName.current.value == "") {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Nama Kategori tidak boleh kosong");
      }
      if (addBrandCategory == "") {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Tipe Kategori tidak boleh kosong");
      }
  
      resetAddDialog();
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
                  error={errorAddKategoriNama}
                  onChange={checkKategoriNama}
                  margin="dense"
                  id="name"
                  name="name"
                  label="Nama Merek"
                  type="text"
                  fullWidth
                  variant="outlined"
                  inputRef={addBrandName}
                />
                <div className="text-red-500 text-md">
                  {errorAddKategoriNamaMessage}
                </div>
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
            <Heading title="My Penalty"></Heading>
          </div>
  
          <div className="py-8">
          </div>
          
          <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="bg-white w-full h-fit xl:w-1/4 p-4 md:p-4 shadow-md">
            <SubHeading title="Filter"/>
            <div className="w-full mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  placeholder="Status"
                  fullWidth
                >
                </Select>
              </FormControl>
            </div>
            <div className="w-full mt-4">
              <TextField
                InputLabelProps={{ shrink: true }}
                type="date"
                id="jumlahMinimum"
                label="Tanggal Mulai"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="w-full mt-4">
              <TextField
                InputLabelProps={{ shrink: true }}
                type="date"
                id="jumlahMinimum"
                label="Tanggal Selesai"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="w-full mt-8">
              <Button variant="contained" size="large" fullWidth>
                Cari
              </Button>
            </div>
          </div>
            <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
              <MyPenaltyHeader></MyPenaltyHeader>
              {generatePunishmentData()}
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
  export default MyPenalty;
  