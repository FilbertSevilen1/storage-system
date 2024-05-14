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
import ReturnPinjamanRow from "../../../components/ReturnPinjamanRow";
import ReturnPinjamanHeader from "../../../components/ReturnPinjamanHeader";

const API_URL = process.env.REACT_APP_API_URL;
function ReturnPinjaman() {
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

  const returnReason = useRef("");
  const [searchAddNamaInput, setSearchAddNamaInput] = useState("");
  const [searchAddNamaDetailInput, setSearchAddNamaDetailInput] = useState("");

  const [searchAddCategory, setSearchAddCategory] = useState("");

  const [disableAdd, setDisableAdd] = useState(true);

  const [id, setId] = useState(pathname.pathname.substring(15));
  const [name, setName] = useState("User");
  const [startDate, setStartDate] = useState("01/01/2024");
  const [endDate, setEndDate] = useState("01/12/2024");
  const [reason, setReason] = useState("Testing");
  const [statusId, setStatusId] = useState("");
  const [statusName, setStatusName] = useState("");
  const [approval, setApproval] = useState();

  const [listAddPeralatan, setListAddPeralatan] = useState([]);
  const [returnConfirmationDialog, setReturnConfirmationDialog] =
    useState(false);

  const getDataPeralatanAvailable = () => {
    if (!startDate || !endDate) {
      return;
    }

    const body = {
      startDate: createStartDate.current.value,
      endDate: createEndDate.current.value,
      peralatanName: searchAddNamaInput,
      peralatanDetailName: searchAddNamaDetailInput,
    };

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/peralatan/available", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListSearchAddPeralatan(res.data.peralatanAvailables);
      })
      .catch((err) => {});
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
            max: borrowperalatan[i].peralatanBorrowCount,
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
        setApproval(res.data.borrow.approval);

        for (let i = 0; i < res.data.borrow.peralatans.length; i++) {
          for (
            let j = 0;
            j < res.data.borrow.peralatans[i].peralatanDetails.length;
            j++
          ) {
            res.data.borrow.peralatans[i].peralatanDetails[
              j
            ].peralatanDetailStatusId = "309bf632-ca49-4a10-a486-f6a7fd43ac7c";
            res.data.borrow.peralatans[i].peralatanDetails[
              j
            ].peralatanDetailStatusName = "Siap Dipinjam";
          }
        }

        console.log(res.data.borrow.peralatans);

        getDetailPeralatan(res.data.borrow.peralatans);
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
    getDetailPinjaman();
    getPeralatanAvailable();
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
          newList[i].peralatanBorrowCount += 1;
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
          newList[i].peralatanBorrowCount -= 1;
          return newList;
        });
      }
    }
  };

  const changeReturnStatus = (peralatanId, detailId, statusId, statusName) => {
    for (let i = 0; i < listAddPeralatan.length; i++) {
      if (peralatanId == listAddPeralatan[i].peralatanId) {
        for (let j = 0; j < listAddPeralatan[i].peralatanDetails.length; j++) {
          if (
            detailId ==
            listAddPeralatan[i].peralatanDetails[j].peralatanDetailId
          ) {
            setListAddPeralatan((prevList) => {
              const newList = [...prevList];
              console.log(statusId, statusName);

              newList[i].peralatanDetails[j].peralatanDetailStatusId = statusId;
              newList[i].peralatanDetails[j].peralatanDetailStatusName =
                statusName;
              newList[i].peralatanDetails[j].status = statusName;
              return newList;
            });
            console.log(listAddPeralatan);
          }
        }
      }
    }
  };

  const generatePinjamPeralatan = () => {
    if (listAddPeralatan) {
      return listAddPeralatan.map((peralatan, index) => {
        if (peralatan.peralatanBorrowCount) {
          peralatan.count = peralatan.peralatanBorrowCount;
        }
        return (
          <ReturnPinjamanRow
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
            maxCount={peralatan.max}
            changeReturnStatus={changeReturnStatus}
          ></ReturnPinjamanRow>
        );
      });
    }
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
              key={index}
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
    }
  };

  const onSubmitReturn = () => {
    const bodyPeralatan = [];
    listAddPeralatan.forEach((item) => {
      let bodyPeralatanDetails = [];
      item.peralatanDetails.forEach((subitem) => {
        if (!subitem.detailId) {
          subitem.detailId = subitem.peralatanDetailId;
        }
        bodyPeralatanDetails.push({
          peralatanDetailId: subitem.detailId,
          statusItemId: subitem.peralatanDetailStatusId,
        });
      });

      if (!item.count) {
        item.count = item.peralatanBorrowCount;
      }

      if (item.peralatanDetails.length > 0) {
        item.count = item.peralatanDetails.length;
      }

      bodyPeralatan.push({
        peralatanId: item.id,
        peralatanReturnCount: item.count,
        peralatanDetailId: bodyPeralatanDetails,
      });
    });

    const body = {
      id: id,
      reason: returnReason.current.value,
      startDate: startDate,
      endDate: endDate,
      peralatan: bodyPeralatan,
    };
    console.log(body);

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .put(API_URL + `/borrow/update/finish/${id}`, body, {
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
        return setSnackbarMessage("Selesaikan Pinjaman Berhasil");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage(
          "Selesaikan Pinjaman Gagal, Silahkan coba lagi"
        );
      });
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
      <Dialog
        open={returnConfirmationDialog}
        onClose={() => setReturnConfirmationDialog(false)}
      >
        <DialogTitle>Selesaikan Pinjaman</DialogTitle>
        <DialogContent>
          <div className="w-96">
            <TextField
              margin="dense"
              label="Alasan"
              type="text"
              variant="outlined"
              inputRef={returnReason}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReturnConfirmationDialog(false)}>
            Batal
          </Button>
          <Button onClick={() => onSubmitReturn()} type="submit">
            <b>Ya</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="Penyelesaian Pinjaman"></Heading>
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
            <div className="w-full flex flex-wrap border-b-[0.5px] border-zinc-500">
              <div className="flex w-full md:w-1/2 xl:w-1/4 items-center h-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m0 16H3V5h18zM5 10h9v2H5zm0-3h9v2H5z"
                  />
                </svg>
                <div className="ml-2">
                  <b>Alasan Peminjaman</b>
                  <div>{reason}</div>
                </div>
              </div>
              <div className="flex w-full md:w-1/2 xl:w-1/4 items-center h-16">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M17.086 4.086a2 2 0 1 1 2.828 2.828l-6.06 6.06a1.25 1.25 0 0 1-.57.326l-3.488.904l.904-3.489a1.25 1.25 0 0 1 .326-.57zm3.889-1.061a3.5 3.5 0 0 0-4.95 0l-6.06 6.06a2.75 2.75 0 0 0-.717 1.254l-1.224 4.723a.75.75 0 0 0 .914.914l4.723-1.224a2.75 2.75 0 0 0 1.254-.718l6.06-6.06a3.5 3.5 0 0 0 0-4.949M12 3c.806 0 1.588.106 2.331.305l-1.27 1.27a7.5 7.5 0 1 0 6.364 6.364l1.27-1.27A9 9 0 1 1 12 3"
                  />
                </svg>
                <div className="ml-2">
                  <b>Status Peminjaman</b>
                  <div>{statusName}</div>
                </div>
              </div>
            </div>
            {approval ? (
              <>
                <div className="w-full flex flex-wrap border-b-[0.5px] border-zinc-500">
                  <div className="flex w-full md:w-1/2 xl:w-1/4 items-center h-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 16q.425 0 .738-.312t.312-.738t-.312-.737T12 13.9t-.737.313t-.313.737t.313.738T12 16m-.75-3.1h1.5q0-.475.038-.75t.112-.45q.1-.2.288-.412t.612-.638q.525-.525.788-1.05t.262-1.05q0-1.175-.775-1.863T12 6q-1.025 0-1.8.575T9.15 8.1l1.35.55q.175-.575.575-.888T12 7.45q.6 0 .975.325t.375.825q0 .425-.188.738t-.662.712q-.425.35-.675.638t-.375.562q-.125.25-.162.613T11.25 12.9m.75 6.45q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12"
                      />
                    </svg>
                    <div className="ml-2">
                      <b>Status Persetujuan Mulai</b>
                      <div>
                        {approval.approvalStartStatusName
                          ? approval.approvalStartStatusName
                          : "Tidak ada Data"}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full md:w-1/2 xl:w-1/4 items-center h-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M7 12.5h7q.213 0 .357-.143T14.5 12t-.143-.357Q14.213 11.5 14 11.5H7q-.213 0-.357.143T6.5 12t.143.357q.144.143.357.143m0-3h7q.213 0 .357-.143T14.5 9t-.143-.357Q14.213 8.5 14 8.5H7q-.213 0-.357.143T6.5 9t.143.357Q6.787 9.5 7 9.5M4.615 19q-.69 0-1.152-.462T3 17.385V6.615q0-.69.463-1.152T4.615 5h14.77q.69 0 1.152.463T21 6.615v10.77q0 .69-.462 1.152T19.385 19zm0-1h14.77q.23 0 .423-.192t.192-.423V6.615q0-.23-.192-.423T19.385 6H4.615q-.23 0-.423.192T4 6.615v10.77q0 .23.192.423t.423.192M4 18V6z"
                      />
                    </svg>
                    <div className="ml-2">
                      <b>Alasan Persetujuan Mulai</b>
                      <div>
                        {approval.approvalStartReason
                          ? approval.approvalStartReason
                          : "Tidak ada Data"}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full md:w-1/2 xl:w-1/4 items-center h-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 8h14V6H5zm0 0V6zm0 14q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z"
                      />
                    </svg>
                    <div className="ml-2">
                      <b>Waktu Persetujuan Mulai</b>
                      <div>
                        {approval.approvalStartDate
                          ? formatDate(approval.approvalStartDate)
                          : "Tidak ada Data"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full flex flex-wrap">
                  <div className="flex w-full md:w-1/2 xl:w-1/4 items-center h-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 15.365q.271 0 .468-.197t.197-.468t-.197-.468t-.468-.197t-.468.197t-.197.468t.197.468t.468.197m2.542-6.738q0-1.021-.688-1.66q-.689-.64-1.767-.64q-.977 0-1.66.477t-.7 1.017q0 .154.061.25q.062.094.204.13q.16.043.297-.04t.234-.205q.187-.352.573-.554q.387-.202.967-.202q.69 0 1.143.409t.452 1.018q0 .546-.29.888q-.29.343-.693.71q-.529.487-.817.96q-.289.473-.289.961q0 .208.12.337t.317.129q.19 0 .313-.124q.123-.123.135-.325q.011-.355.309-.727t.583-.66q.479-.478.838-.987t.358-1.162M12 20.556q-.235 0-.47-.077t-.432-.25q-1.067-.98-2.163-2.185q-1.097-1.204-1.992-2.493t-1.467-2.633t-.572-2.622q0-3.173 2.066-5.234T12 3t5.03 2.062t2.066 5.234q0 1.279-.572 2.613q-.572 1.333-1.458 2.632q-.885 1.3-1.981 2.494T12.92 20.21q-.198.173-.442.26t-.479.086"
                      />
                    </svg>
                    <div className="ml-2">
                      <b>Status Persetujuan Selesai</b>
                      <div>
                        {approval.approvalEndStatusName
                          ? approval.approvalEndStatusName
                          : "Tidak ada Data"}
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full md:w-1/2 xl:w-1/4 items-center h-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M8.117 16.538q.327 0 .547-.221t.22-.55t-.22-.547t-.55-.22t-.548.222t-.22.549t.222.547q.221.22.549.22m0-3.769q.327 0 .547-.221t.22-.55t-.22-.547t-.55-.22t-.548.221t-.22.55t.222.547q.221.22.549.22m0-3.769q.327 0 .547-.222t.22-.549t-.22-.547t-.55-.22t-.548.221t-.22.55t.222.547q.221.22.549.22m3.575 7.27h4.385q.212 0 .356-.145q.144-.144.144-.356q0-.213-.144-.357t-.356-.143h-4.385q-.212 0-.356.144t-.144.357t.144.356t.356.143m0-3.769h4.385q.212 0 .356-.144t.144-.357t-.144-.356t-.356-.143h-4.385q-.212 0-.356.144t-.144.357t.144.356t.356.143m0-3.77h4.385q.212 0 .356-.143t.144-.357t-.144-.356t-.356-.143h-4.385q-.212 0-.356.144t-.144.356t.144.357t.356.143M5.615 20q-.69 0-1.152-.462T4 18.385V5.615q0-.69.463-1.152T5.615 4h12.77q.69 0 1.152.463T20 5.615v12.77q0 .69-.462 1.152T18.385 20z"
                      />
                    </svg>
                    <div className="ml-2">
                      <b>Alasan Persetujuan Selesai</b>
                      <div>
                        {approval.approvalEndReason
                          ? approval.approvalEndReason
                          : "Tidak ada Data"}
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full md:w-1/2 xl:w-1/4 items-center h-16">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m.5-5.2v-2.3q0-.2-.15-.35T18 15t-.35.15t-.15.35v2.275q0 .2.075.388t.225.337l1.525 1.525q.15.15.35.15t.35-.15t.15-.35t-.15-.35z"
                      />
                    </svg>
                    <div className="ml-2">
                      <b>Waktu Persetujuan Selesai</b>
                      <div>
                        {approval.approvalEndDate
                          ? formatDate(approval.approvalEndDate)
                          : "Tidak ada Data"}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4 mb-8">
          <div className="w-full flex items-center mb-4">
            <SubHeading title="List Peralatan"></SubHeading>
          </div>
          <ReturnPinjamanHeader></ReturnPinjamanHeader>
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
            >
              Batal
            </Button>
          </div>
          <div className="md:ml-2">
            <Button
              onClick={() => setReturnConfirmationDialog(true)}
              variant="contained"
              size="large"
            >
              Selesaikan Pinjaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReturnPinjaman;
