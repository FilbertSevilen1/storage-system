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
import { useNavigate } from "react-router";
import PeralatanHeader from "../../../components/PeralatanHeader";
import AddPeralatanHeader from "../../../components/AddPeralatanHeader";
import AddPeralatanRow from "../../../components/AddPeralatanRow";
import { useSelector } from "react-redux";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
function CreatePinjaman() {
  const [loading, setLoading] = useState();

  const [addDialog, setAddDialog] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const createStartDate = useRef("");
  const createEndDate = useRef("");
  const createReason = useRef("");

  const searchAddNama = useRef("");
  const searchAddDetailNama = useRef("");

  const [searchAddNamaInput, setSearchAddNamaInput] = useState("");
  const [searchAddNamaDetailInput, setSearchAddNamaDetailInput] = useState("");

  const [searchAddCategory, setSearchAddCategory] = useState("");

  const [disableAdd, setDisableAdd] = useState(true);
  const [listAddPeralatan, setListAddPeralatan] = useState([]);

  const getDataPeralatanAvailable = () => {
    if (!createStartDate.current.value || !createEndDate.current.value) {
      return;
    }

    const body = {
      startDate: createStartDate.current.value,
      endDate: createEndDate.current.value,
      // peralatanName: searchAddNama.current.value,
      // peralatanDetailName: searchAddDetailNama.current.value,
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
    setDisableAdd(true);
    const selectedStartDate = new Date(createStartDate.current.value);
    const selectedEndDate = new Date(createEndDate.current.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset the time part for comparison

    if (selectedStartDate < today) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage(
        "Tanggal Mulai tidak boleh tanggal yang sudah lewat!"
      );
    }

    if (selectedEndDate < today) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage(
        "Tanggal Berakhir tidak boleh tanggal yang sudah lewat!"
      );
    }

    if (selectedEndDate < selectedStartDate) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage(
        "Tanggal Berakhir tidak boleh sebelum Tanggal Mulai"
      );
    }

    if (createStartDate.current.value && createEndDate.current.value) {
      setDisableAdd(false);
    } else {
      setDisableAdd(true);
    }

    getDataPeralatanAvailable();
  };

  useEffect(() => {
    console.log("ROLE", user.role);
    if (user.role != "User" && user.role != "") {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    generatePinjamPeralatan();
  }, [listAddPeralatan]);

  const [listSearchAddPeralatan, setListSearchAddPeralatan] = useState([]);

  const [listKategori, setListKategori] = useState([
    "Elektronik",
    "Alat Tulis",
    "Lainnya",
  ]);

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const addPinjamPeralatanDataBerseri = (alat, detail) => {
    setLoading(true);
    alat = { ...alat, peralatanDetails: [detail] };

    let found = false;
    listAddPeralatan.forEach((item) => {
      if (item.id == alat.id) {
        let detailFound = false;
        item.peralatanDetails.forEach((itemdetail) => {
          if (itemdetail.detailId == detail.detailId) {
            detailFound = true;
            console.log(itemdetail.detailId == detail.detailId);
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
          console.log(item);

          listSearchAddPeralatan.forEach((itemalat) => {
            if (itemalat.id == alat.id) {
              itemalat.count++;
              itemalat.available--;
            }
          });
          listAddPeralatan.forEach((itemalat) => {
            if (itemalat.id == alat.id) {
              itemalat.count--;
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
      setLoading(false);
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
      setLoading(false);
      return setSnackbarMessage("Tambah Alat Sukses");
    } else {
    }
  };

  const addPinjamPeralatanDataTidakBerseri = (alat) => {
    setLoading(true);
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
      setLoading(false);
      return setSnackbarMessage("Tambah Alat Sukses");
    } else {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage("Alat sudah ada di List");
    }
  };

  const deletePinjamPeralatanData = (index) => {
    setLoading(true);
    // Use setListSearchAddPeralatan to update the state
    listAddPeralatan.forEach((item) => {
      if (item.id == listAddPeralatan[index].id) {
        item.available++;
      }
    });
    setListAddPeralatan((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      setLoading(false);
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
    setLoading(false);
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
        // if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
        if (true)
          return (
            <PinjamPeralatanRow
              key={peralatan.id}
              listPeralatan={listSearchAddPeralatan}
              peralatan={peralatan}
              editable={true}
              index={index}
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
              deletePinjamPeralatanBerseri={deletePinjamPeralatanBerseri}
              deletePinjamPeralatanData={() => deletePinjamPeralatanData(index)}
              incrementTotal={incrementTotal}
              decrementTotal={decrementTotal}
            ></PinjamPeralatanRow>
          );
      });
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
    if (!createStartDate.current.value || !createEndDate.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage(
        "Tanggal Mulai dan Berakhir tidak boleh kosong"
      );
    }
    setAddDialog(true);
  };

  const resetPage = () => {
    window.location.reload();
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
              peralatanTotal={peralatan.available}
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

  const onSubmit = () => {
    if (!createStartDate.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage("Tanggal Mulai tidak boleh kosong!");
    }

    if (!createEndDate.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage("Tanggal Selesai tidak boleh kosong!");
    }

    if (!createReason.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage("Alasan tidak boleh kosong!");
    }

    const bodyPeralatan = [];
    listAddPeralatan.forEach((item) => {
      let bodyPeralatanDetails = [];
      item.peralatanDetails.forEach((subitem) => {
        bodyPeralatanDetails.push(subitem.detailId);
      });

      bodyPeralatan.push({
        peralatanId: item.id,
        peralatanCount: item.count,
        peralatanDetailId: bodyPeralatanDetails,
      });
    });

    const body = {
      reason: createReason.current.value,
      startDate: createStartDate.current.value,
      endDate: createEndDate.current.value,
      peralatan: bodyPeralatan,
    };
    console.log(body);

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/borrow/create", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setSnackbar(true);
        setTimeout(() => {
          navigate("/");
          setSnackbar(false);
        }, 1000);
        setLoading(false);
        return setSnackbarMessage("Buat Pinjaman Berhasil");
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
                defaultValue={""}
                onChange={getPeralatanAvailable}
              />
            </div>
            <div className="w-full md:w-[400px] md:ml-2">
              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  id="peralatanName"
                  name="peralatanName"
                  label="Nomor Seri"
                  type="text"
                  fullWidth
                  variant="outlined"
                  defaultValue={""}
                  inputRef={searchAddDetailNama}
                  onChange={getPeralatanAvailable}
                />
              </FormControl>
            </div>
          </div>
          <AddPeralatanHeader></AddPeralatanHeader>
          <div className="max-h-[350px] sm:max-h-[600px] overflow-y-scroll">
            {generateAddPeralatanList()}
          </div>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>

      <Dialog
        open={confirmationDialog}
        onClose={() => setConfirmationDialog(false)}
      >
        <DialogTitle>Konfirmasi Pembuatan Pinjaman</DialogTitle>
        <DialogContent>Apakah Anda yakin ingin membuat pinjaman?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialog(false)}>Tidak</Button>
          <Button onClick={() => onSubmit()} type="submit">
            <b>Ya</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="Buat Pinjaman Baru"></Heading>
        </div>
        <div className="bg-white w-full flex items-center mt-8 shadow-md px-4 py-4">
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
              <div className="w-full px-2 md:pr-4">
                <TextField
                  id=""
                  label="Tanggal Mulai"
                  InputLabelProps={{ shrink: true }}
                  type="datetime-local"
                  variant="outlined"
                  className="w-full"
                  inputRef={createStartDate}
                  disabled={listAddPeralatan.length}
                  onChange={getPeralatanAvailable}
                />
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
              <div className="w-full px-2">
                <TextField
                  id=""
                  label="Tanggal Selesai"
                  InputLabelProps={{ shrink: true }}
                  type="datetime-local"
                  variant="outlined"
                  className="w-full"
                  placeholder="Search Peralatan di sini"
                  inputRef={createEndDate}
                  disabled={listAddPeralatan.length}
                  onChange={getPeralatanAvailable}
                />
              </div>
            </div>
            <div className="w-full flex flex-wrap">
              <div className="w-full md:w-1/2">
                <TextareaAutosize
                  className="w-full h-48 py-2 px-3 text-l border-2 border-gray-300 rounded-lg mt-2"
                  minRows={4}
                  aria-label="empty textarea"
                  placeholder="Alasan Peminjaman"
                  ref={createReason}
                />
                <div className="font-bold text-red-500 text-xl mt-4">
                  CATATAN PENTING!
                </div>
                <div className="text-l text-red-500 w-full mt-2 text-justify">
                  {"*)"} Peminjam diberikan kompensasi keterlambatan selama 1
                  jam, Jika peminjaman melewati waktu tersebut, maka user akan
                  terkena hukuman berupa{" "}
                  <b>
                    timeout peminjaman dan denda tiap alat per jam
                    keterlambatan.
                  </b>{" "}
                  Hal ini dimohon menjadi catatan karena dapat mengganggu
                  peminjaman alat oleh pengguna lain.
                </div>
                <div className="text-l text-red-500 w-full mt-2 text-justify">
                  {
                    "**) Dalam kasus tertentu akibat ada kerusakan alat atau keterlambatan pengembalian dari pengguna lain, admin dapat mengubah alat yang akan dipinjam atau membatalkan pinjaman yang telah disetujui apabila tidak ada alat lain yang tersedia."
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4 mb-8">
          <div className="w-full flex items-center mb-4">
            <SubHeading title="Keranjang"></SubHeading>
            <div className="ml-4">
              {disableAdd ? (
                <div className="mt-1">
                  {
                    "(Mohon untuk mengisi Tanggal Mulai dan Selesai terlebih dahulu.)"
                  }
                </div>
              ) : (
                <Button
                  onClick={() => openAddDialog()}
                  variant="contained"
                  size="large"
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
              )}
            </div>
          </div>
          <PinjamPeralatanHeader></PinjamPeralatanHeader>
          <div className="w-full max-h-[400px] sm:max-h-[600px] overflow-y-scroll">
            {loading ? <></> : <>{generatePinjamPeralatan()}</>}
          </div>
        </div>
        <div className="w-full flex justify-end mb-8">
          <div>
            <Button
              onClick={() => resetPage()}
              color="error"
              variant="contained"
              size="large"
            >
              Reset
            </Button>
          </div>
          <div className="md:ml-2">
            <Button
              onClick={() => setConfirmationDialog(true)}
              variant="contained"
              size="large"
            >
              Buat Pinjaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CreatePinjaman;
