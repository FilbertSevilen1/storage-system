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
import SubHeading from "../../components/base/SubHeading";
import PenaltyRow from "../../components/PenaltyRow";
import PenaltyHeader from "../../components/PenaltyHeader";
import axios from "axios";
import NoData from "../../components/base/NoData";
import Loading from "../../components/base/Loading";
import LoadingFull from "../../components/base/LoadingFull";

const API_URL = process.env.REACT_APP_API_URL;
function Penalty() {
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
  const [searchStatus, setSearchStatus] = useState("");
  const searchStartDate = useRef();
  const searchEndDate = useRef();
  const [listReport, setlistReport] = useState([]);

  const [listPunishment, setListPunishment] = useState([]);

  const getDataPenalty = () => {
    setLoading(true);
    let body = {
      statusId: searchStatus,
      startDate: searchStartDate.current.value,
      endDate: searchEndDate.current.value,
    };

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/punishment/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setListPunishment(res.data.punishments);
        if (res.data.punishments.length % 5 == 0) {
          setMaxPage(Math.floor(res.data.punishments.length / 5));
        } else setMaxPage(Math.floor(res.data.punishments.length / 5) + 1);
        
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Gagal mendapatkan data");
      });
  };

  useEffect(() => {
    getDataPenalty();
  }, [searchStatus, searchStartDate, searchEndDate]);

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
            <PenaltyRow
              index={punishment.id}
              key={punishment.id}
              no={index + 1}
              punishmentId={punishment.id}
              punishmentUsername={punishment.userName}
              punishmentType={punishment.typeName}
              punishmentDate={punishment.deadline}
              punishmentStatus={punishment.approvalStatusName}
              page={page}
            ></PenaltyRow>
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

  const generateSelectKategoriTipeList = () => {
    if (listCategory) {
      return listCategory.map((tipe, index) => {
        return <MenuItem value={tipe}>{tipe}</MenuItem>;
      });
    }
  };

  const handleSearchNameKeyDown = (event) => {
    if (event.key == "Enter") {
      setPage(1);
      getDataPenalty();
    }
  };

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

  const resetFilter = () => {
    setSearchStatus("");
    searchStartDate.current.value = "";
    searchEndDate.current.value = "";
  };

  const handleSearchStatus = (event) => {
    setSearchStatus(event.target.value);
    getDataPenalty();
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

      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="List Penalty"></Heading>
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
              label="merek"
              variant="standard"
              className="w-full"
              placeholder="Cari User di sini"
              onKeyDown={handleSearchNameKeyDown}
            />
          </div>
        </div>

        <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="bg-white w-full h-fit xl:w-1/4 p-4 md:p-4 shadow-md">
            <SubHeading title="Filter" />
            <div className="w-full mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Status"
                  placeholder="Status"
                  fullWidth
                  value={searchStatus}
                  onChange={handleSearchStatus}
                >
                  <MenuItem value="e3946b09-fb28-4d97-89e2-d2a2a54ba9a7">
                    Menunggu Persetujuan
                  </MenuItem>
                  <MenuItem value="6344d1b5-6b9b-4cd8-b612-f6a3e64fb837">
                    Disetujui
                  </MenuItem>
                  <MenuItem value="5fcc9739-cbdc-4dec-866d-5f7b059213f1">
                    Ditolak
                  </MenuItem>
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
                inputRef={searchStartDate}
                onChange={getDataPenalty}
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
                inputRef={searchEndDate}
                onChange={getDataPenalty}
                fullWidth
              />
            </div>
            <div className="w-full mt-8">
              <Button
                onClick={() => resetFilter()}
                variant="contained"
                size="large"
                fullWidth
              >
                Reset
              </Button>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <PenaltyHeader></PenaltyHeader>
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
export default Penalty;
