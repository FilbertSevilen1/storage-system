import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
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
import SubHeading from "../../../components/base/SubHeading";
import PinjamPeralatanHeader from "../../../components/PinjamPeralatanHeader";
import PinjamPeralatanRow from "../../../components/PinjamPeralatanRow";
import { useLocation, useNavigate } from "react-router";
import PeralatanHeader from "../../../components/PeralatanHeader";
import AddPeralatanHeader from "../../../components/AddPeralatanHeader";
import AddPeralatanRow from "../../../components/AddPeralatanRow";
import { useSelector } from "react-redux";
import axios from "axios";
import NoData from "../../../components/base/NoData";
import LoadingFull from "../../../components/base/LoadingFull";

const API_URL = process.env.REACT_APP_API_URL;
function EditPinjaman() {
  const [loading, setLoading] = useState(false);
  const pathname = useLocation();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const createStartDate = useRef("");
  const createEndDate = useRef("");
  const createReason = useRef("");

  const [addDialog, setAddDialog] = useState(false);
  const searchAddNama = useRef("");
  const searchAddDetailNama = useRef("");

  const [searchAddNamaInput, setSearchAddNamaInput] = useState("");
  const [searchAddNamaDetailInput, setSearchAddNamaDetailInput] = useState("");

  const [searchAddCategory, setSearchAddCategory] = useState("");

  const [disableAdd, setDisableAdd] = useState(true);

  const [id, setId] = useState(pathname.pathname.substring(13));
  const [name, setName] = useState("User");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("Testing");
  const [statusId, setStatusId] = useState("");
  const [statusName, setStatusName] = useState("");

  const [listAddPeralatan, setListAddPeralatan] = useState([]);

  const getDataPeralatanAvailable = (start, end) => {
    setLoading(true);
    if (!startDate || !endDate) {
      setLoading(false);
      return;
    }
    console.log(startDate, endDate);

    const body = {
      startDate: startDate,
      endDate: endDate,
      peralatanName: searchAddNama.current.value,
      peralatanDetailName: searchAddDetailNama.current.value,
    };

   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/peralatan/available", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListSearchAddPeralatan(res.data.peralatanAvailables);
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

  const getPeralatanAvailable = () => {
    if (createStartDate.current.value && createEndDate.current.value) {
      setDisableAdd(false);
    } else {
      setDisableAdd(true);
    }
    getDataPeralatanAvailable();
  };

  const getDetailPeralatan = (borrowperalatan) => {
    setLoading(true);
   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    for (let i = 0; i < borrowperalatan.length; i++) {
      axios
        .get(API_URL + `/peralatan/get/${borrowperalatan[i].peralatanId}`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        })
        .then((res) => {
          borrowperalatan[i] = {
            ...borrowperalatan[i],
            id: borrowperalatan[i].peralatanId,
            image: res.data.peralatan.image,
            categoryId: res.data.peralatan.categoryId,
            categoryName: res.data.peralatan.categoryName,
            brandId: res.data.peralatan.brandId,
            brandName: res.data.peralatan.brandName,
            available:
              res.data.peralatan.count - res.data.peralatan.borrowCount,
          };

          if (i == borrowperalatan.length - 1) {
            setListAddPeralatan(borrowperalatan);
          }
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
    }
  };

  const getDataDetailPinjaman = () => {
    setLoading(true);
   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .get(API_URL + `/borrow/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setName(res.data.borrow.userName);
        setStartDate(res.data.borrow.startDate);
        setEndDate(res.data.borrow.endDate);
        setReason(res.data.borrow.reason);
        setStatusName(res.data.borrow.statusName);
        getDetailPeralatan(res.data.borrow.peralatans);
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

  const getDetailPinjaman = () => {
    getDataDetailPinjaman();
  };

  useEffect(() => {
    getDataPeralatanAvailable();
  }, [startDate, endDate]);

  useEffect(() => {
    getDetailPinjaman();
  }, []);

  const [listSearchAddPeralatan, setListSearchAddPeralatan] = useState([]);

  const [listKategori, setListKategori] = useState([
    "Elektronik",
    "Alat Tulis",
    "Lainnya",
  ]);

  useEffect(() => {
    console.log("ROLE", user.role);
  }, []);

  useEffect(() => {
    generatePinjamPeralatan();
  }, [listAddPeralatan]);

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const addPinjamPeralatanDataBerseri = (alat, detail) => {
    alat = { ...alat, peralatanDetails: [detail] };

    let found = false;
    listAddPeralatan.forEach((item) => {
      if (item.id == alat.id) {
        let detailFound = false;

        item.peralatanDetails.forEach((itemdetail) => {
          if (
            itemdetail.detailId == detail.detailId ||
            (itemdetail.peralatanDetailId == detail.peralatanDetailId &&
              itemdetail.peralatanDetailId != undefined &&
              detail.peralatanDetailId != undefined)
          ) {
            detailFound = true;
            setAddDialog(false);
            setSnackbar(true);
            setTimeout(() => {
              setSnackbar(false);
            }, 3000);
            return setSnackbarMessage("Alat sudah ada di List");
          }
        });
        if (!detailFound) {
          item.peralatanDetails.push(detail);

          listSearchAddPeralatan.forEach((itemalat) => {
            if (itemalat.id == alat.id) {
              itemalat.count++;
              itemalat.available--;
            }
          });
          listAddPeralatan.forEach((itemalat) => {
            if (itemalat.id == alat.id) {
              itemalat.count--;
              itemalat.peralatanBorrowCount++;
              itemalat.available--;
            }
          });

          setAddDialog(false);
          setSnackbar(true);
          setTimeout(() => {
            setSnackbar(false);
          }, 3000);
          setSnackbarMessage("Tambah Stok Alat Sukses");
        }
        found = true;
      }
    });
    if (!found) {
      alat = {
        ...alat,
        count: 1,
        available: alat.available - 1,
      };
      listAddPeralatan.push(alat);
      listSearchAddPeralatan.forEach((item) => {
        if (item.id == alat.id) {
          item.count++;
          item.available--;
        }
      });
      setAddDialog(false);
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Tambah Alat Sukses");
    } else {
    }
  };

  const addPinjamPeralatanDataTidakBerseri = (alat) => {
    let found = false;
    for (let i = 0; i < listAddPeralatan.length; i++) {
      if (alat.id == listAddPeralatan[i].id) {
        found = true;
      }
    }

    if (!found) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      listAddPeralatan.push({
        ...alat,
        count: 1,
        available: alat.available - 1,
      });
      listSearchAddPeralatan.forEach((item) => {
        if (item.id == alat.id) {
          item.available--;
        }
      });
      setAddDialog(false);
      return setSnackbarMessage("Tambah Alat Sukses");
    } else {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      console.log("TEST");
      return setSnackbarMessage("Alat sudah ada di List");
    }
  };

  const deletePinjamPeralatanData = (index) => {
    // Use setListSearchAddPeralatan to update the state
    listAddPeralatan.forEach((item) => {
      if (item.id == listAddPeralatan[index].id) {
        item.available++;
      }
    });
    setListAddPeralatan((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
    for (let i = 0; i < listSearchAddPeralatan.length; i++) {
      if (listSearchAddPeralatan[i].id == listAddPeralatan[index].id) {
        setListSearchAddPeralatan((prevList) => {
          const newList = [...prevList];
          newList[i].available += 1;
          return newList;
        });
      }
    }
  };

  const deletePinjamPeralatanBerseri = (alat, detail) => {
    console.log(alat, detail);
    listAddPeralatan.forEach((item) => {
      console.log(item.id, alat.id);
      if (item.id == alat.id) {
        for (let i = 0; i < item.peralatanDetails.length; i++) {
          console.log(item.peralatanDetails[i].detailId, detail.detailId);
          if (item.peralatanDetails[i].detailId == detail.detailId) {
            item.peralatanDetails.splice(i, 1);
          }
        }
      }
    });
    for (let i = 0; i < listAddPeralatan.length; i++) {
      if (
        listAddPeralatan[i].id == alat.id &&
        listAddPeralatan[i].peralatanDetails.length <= 0
      ) {
        setListAddPeralatan((prevList) => {
          const newList = [...prevList];
          newList.splice(i, 1);
          return newList;
        });
      }
    }
    for (let i = 0; i < listSearchAddPeralatan.length; i++) {
      if (listSearchAddPeralatan[i].id == alat.id) {
        setListSearchAddPeralatan((prevList) => {
          const newList = [...prevList];
          newList[i].available += 1;
          return newList;
        });
      }
    }
  };

  const incrementTotal = (alat) => {
    for (let i = 0; i < listSearchAddPeralatan.length; i++) {
      if (listSearchAddPeralatan[i].id == alat.id) {
        setListSearchAddPeralatan((prevList) => {
          const newList = [...prevList];
          newList[i].available -= 1;
          return newList;
        });
      }
    }
    for (let i = 0; i < listAddPeralatan.length; i++) {
      if (listAddPeralatan[i].id == alat.id) {
        setListAddPeralatan((prevList) => {
          const newList = [...prevList];
          newList[i].count += 1;
          return newList;
        });
      }
    }
  };
  const decrementTotal = (alat) => {
    for (let i = 0; i < listSearchAddPeralatan.length; i++) {
      if (listSearchAddPeralatan[i].id == alat.id) {
        setListSearchAddPeralatan((prevList) => {
          const newList = [...prevList];
          newList[i].available += 1;
          return newList;
        });
      }
    }
    for (let i = 0; i < listAddPeralatan.length; i++) {
      if (listAddPeralatan[i].id == alat.id) {
        setListAddPeralatan((prevList) => {
          const newList = [...prevList];
          newList[i].count -= 1;
          return newList;
        });
      }
    }
  };

  const generatePinjamPeralatan = () => {
    if (listAddPeralatan) {
      return listAddPeralatan.map((peralatan, index) => {
        if (peralatan.peralatanBorrowCount) {
          peralatan.available -= peralatan.peralatanBorrowCount;
        }

        if (!peralatan.count && peralatan.peralatanBorrowCount) {
          peralatan.count = peralatan.peralatanBorrowCount;
        }

        return (
          <PinjamPeralatanRow
            listPeralatan={listSearchAddPeralatan}
            peralatan={peralatan}
            editable={true}
            index={index}
            key={peralatan.id}
            peralatanImage={peralatan.image || peralatan.peralatanImage}
            peralatanName={peralatan.name || peralatan.peralatanName}
            hasIdentifier={
              peralatan.hasIdentifier || peralatan.peralatanDetails.length > 0
            }
            peralatanCategory={peralatan.categoryName}
            peralatanTotal={peralatan.count}
            peralatanAvailable={peralatan.available}
            peralatanDetail={peralatan.peralatanDetails}
            brandName={peralatan.brandName}
            page={page}
            addPinjamPeralatanDataBerseri={addPinjamPeralatanDataBerseri}
            deletePinjamPeralatanBerseri={deletePinjamPeralatanBerseri}
            deletePinjamPeralatanData={() => deletePinjamPeralatanData(index)}
            incrementTotal={incrementTotal}
            decrementTotal={decrementTotal}
          ></PinjamPeralatanRow>
        );
      });
    } else {
      return <NoData></NoData>;
    }
  };

  const batalkanPinjaman = () => {
    navigate("/home");
  };

  const handleSearchAddCategory = (event) => {
    setSearchAddCategory(event.target.value);
  };

  const generateSearchAddCategoryList = () => {
    if (listKategori) {
      return listKategori.map((kategori, index) => {
        return <MenuItem value={kategori}>{kategori}</MenuItem>;
      });
    }
  };

  const openAddDialog = () => {
    setAddDialog(true);
  };

  const formatDate = (date) => {
    const dateformat = new Date(date);

    const year = dateformat.getFullYear();
    const month = String(dateformat.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
    const day = String(dateformat.getDate()).padStart(2, "0");
    const hours = String(dateformat.getHours()).padStart(2, "0");
    const minutes = String(dateformat.getMinutes()).padStart(2, "0");
    const seconds = String(dateformat.getSeconds()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  };

  const generateAddPeralatanList = () => {
    if (listSearchAddPeralatan) {
      return listSearchAddPeralatan.map((peralatan, index) => {
        if (true) {
          return (
            <AddPeralatanRow
              index={index}
              key={peralatan.id}
              peralatan={peralatan}
              peralatanImage={peralatan.image}
              peralatanName={peralatan.name}
              hasIdentifier={peralatan.hasIdentifier}
              peralatanCategory={peralatan.categoryName}
              peralatanTotal={peralatan.count}
              peralatanAvailable={peralatan.available}
              peralatanDetail={peralatan.peralatanDetails}
              brandName={peralatan.brandName}
              page={page}
              addPinjamPeralatanDataBerseri={addPinjamPeralatanDataBerseri}
              addPinjamPeralatanDataTidakBerseri={() =>
                addPinjamPeralatanDataTidakBerseri(peralatan)
              }
            ></AddPeralatanRow>
          );
        }
      });
    } else {
      return <NoData></NoData>;
    }
  };

  const onSubmitEdit = () => {
    setLoading(true);
    const bodyPeralatan = [];
    listAddPeralatan.forEach((item) => {
      let bodyPeralatanDetails = [];
      item.peralatanDetails.forEach((subitem) => {
        if (!subitem.detailId) {
          subitem.detailId = subitem.peralatanDetailId;
        }
        bodyPeralatanDetails.push(subitem.detailId);
      });

      if (!item.count) {
        item.count = item.peralatanBorrowCount;
      }

      if (item.peralatanDetails.length > 0) {
        item.count = item.peralatanDetails.length;
      }

      bodyPeralatan.push({
        peralatanId: item.id,
        peralatanCount: item.count,
        peralatanDetailId: bodyPeralatanDetails,
      });
    });

    const body = {
      id: id,
      reason: reason,
      startDate: startDate,
      endDate: endDate,
      peralatan: bodyPeralatan,
    };
    console.log(body);

   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .put(API_URL + "/borrow/update/peralatan", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setSnackbar(true);
        setTimeout(() => {
          navigate(-1);
          setSnackbar(false);
        }, 1000);
        setLoading(false);
        return setSnackbarMessage("Edit Pinjaman Berhasil");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Buat Pinjaman Gagal, Silahkan coba lagi");
      });
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
      <Dialog
        open={addDialog}
        onClose={() => setAddDialog(false)}
        maxWidth="[500px]"
      >
        <DialogTitle>Tambah Peralatan</DialogTitle>
        <DialogContent>
          <div className="flex flex-col md:flex-row w-full">
            <div className="w-full md:w-[400px] md:mr-2">
              <TextField
                margin="dense"
                id="peralatanName"
                name="peralatanName"
                label="Nama Peralatan"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={searchAddNama}
                onChange={getDataPeralatanAvailable}
              />
            </div>
            <div className="w-full md:w-[400px] md:ml-2">
              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  id="peralatanName"
                  name="peralatanName"
                  label="Kode Asset"
                  type="text"
                  fullWidth
                  variant="outlined"
                  inputRef={searchAddDetailNama}
                  onChange={getDataPeralatanAvailable}
                />
              </FormControl>
            </div>
          </div>
          <AddPeralatanHeader></AddPeralatanHeader>
          {generateAddPeralatanList()}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="Edit Pinjaman"></Heading>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4">
          <div className="w-full flex flex-wrap items-center">
            <div className="flex w-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M8 12h8v-2H8zm0-4h8V6H8zm11.95 12.475L15.9 15.2q-.425-.575-1.05-.887T13.5 14H4V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .125-.012.238t-.038.237M6 22q-.825 0-1.412-.587T4 20v-4h9.5q.25 0 .463.113t.362.312l4.2 5.5q-.125.05-.262.063T18 22z"
                />
              </svg>
              <div className="ml-2">
                <b className="mr-1">Pinjaman ID: </b>
                {id}
              </div>
            </div>
            <div className="flex w-1/4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 36 36"
              >
                <path
                  fill="currentColor"
                  d="M30.61 24.52a17.16 17.16 0 0 0-25.22 0a1.51 1.51 0 0 0-.39 1v6A1.5 1.5 0 0 0 6.5 33h23a1.5 1.5 0 0 0 1.5-1.5v-6a1.51 1.51 0 0 0-.39-.98"
                  class="clr-i-solid clr-i-solid-path-1"
                />
                <circle
                  cx="18"
                  cy="10"
                  r="7"
                  fill="currentColor"
                  class="clr-i-solid clr-i-solid-path-2"
                />
                <path fill="none" d="M0 0h36v36H0z" />
              </svg>
              <div className="ml-2">
                <b className="mr-1">Peminjam: </b>
                {name}
              </div>
            </div>
          </div>
          <div className="w-1/4 flex flex-wrap mb-4 items-center"></div>
          <div className="w-full flex flex-wrap">
            <div className="w-full md:w-1/4 flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm7 6q-.425 0-.712-.288T11 13q0-.425.288-.712T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13q0-.425.288-.712T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14m8 0q-.425 0-.712-.288T15 13q0-.425.288-.712T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17q0-.425.288-.712T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17q0-.425.288-.712T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18m8 0q-.425 0-.712-.288T15 17q0-.425.288-.712T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18"
                />
              </svg>
              <div className="ml-2">
                <b>Tanggal Mulai :</b> {formatDate(startDate)}
              </div>
            </div>
            <div className="w-full md:w-1/4 flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 14q-.425 0-.712-.288T11 13q0-.425.288-.712T12 12q.425 0 .713.288T13 13q0 .425-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13q0-.425.288-.712T8 12q.425 0 .713.288T9 13q0 .425-.288.713T8 14m8 0q-.425 0-.712-.288T15 13q0-.425.288-.712T16 12q.425 0 .713.288T17 13q0 .425-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17q0-.425.288-.712T12 16q.425 0 .713.288T13 17q0 .425-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17q0-.425.288-.712T8 16q.425 0 .713.288T9 17q0 .425-.288.713T8 18m8 0q-.425 0-.712-.288T15 17q0-.425.288-.712T16 16q.425 0 .713.288T17 17q0 .425-.288.713T16 18M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"
                />
              </svg>
              <div className="ml-2">
                <b>Tanggal Selesai :</b> {formatDate(endDate)}
              </div>
            </div>
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/4">
                <div>
                  <b>Alasan Peminjaman</b>
                  <div>{reason}</div>
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <div>
                  <b>Status Peminjaman</b>
                  <div>{statusName}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4 mb-8">
          <div className="w-full flex items-center mb-4">
            <SubHeading title="Keranjang"></SubHeading>
            <div className="ml-4">
              <Button
                onClick={() => openAddDialog()}
                variant="contained"
                size="large"
                disabled={loading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z"
                  />
                </svg>
              </Button>
            </div>
          </div>
          <PinjamPeralatanHeader></PinjamPeralatanHeader>
          <div className="w-full max-h-[400px] sm:max-h-[600px] overflow-y-scroll">
            {loading ? <></> : <>{generatePinjamPeralatan()}</>}
          </div>
          <div className="w-full justify-end items-center mt-4 flex"></div>
        </div>
        <div className="w-full flex justify-end mb-8">
          <div>
            <Button
              onClick={() => navigate(-1)}
              color="error"
              variant="contained"
              size="large"
              disabled={loading}
            >
              Batal
            </Button>
          </div>
          <div className="md:ml-2">
            <Button
              onClick={() => onSubmitEdit()}
              variant="contained"
              size="large"
              disabled={loading}
            >
              Edit Pinjaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditPinjaman;
