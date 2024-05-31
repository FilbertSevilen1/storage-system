import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
import {
  Autocomplete,
  Button,
  Checkbox,
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
import { useNavigate } from "react-router";
import PinjamPeralatanRow from "../../../components/PinjamPeralatanRow";
import AddPeralatanRow from "../../../components/AddPeralatanRow";
import AddPeralatanHeader from "../../../components/AddPeralatanHeader";
import SubHeading from "../../../components/base/SubHeading";
import PinjamPeralatanHeader from "../../../components/PinjamPeralatanHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import NoData from "../../../components/base/NoData";

const API_URL = process.env.REACT_APP_API_URL;
function BuatLaporan() {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const [listUser, setListUser] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const createStartDate = useRef("");

  const [addDialog, setAddDialog] = useState(false);
  const searchAddNama = useRef("");
  const searchAddDetailNama = useRef("");
  const [searchAddCategory, setSearchAddCategory] = useState("");

  const [searchAddNamaInput, setSearchAddNamaInput] = useState("");
  const [searchAddNamaDetailInput, setSearchAddNamaDetailInput] = useState("");

  const [isPenalty, setIsPenalty] = useState(false);
  const fineCount = useRef("");
  const deadlineDate = useRef("");
  const [penaltyUser, setPenaltyUser] = useState("");
  const timeout = useRef("");

  const [laporanType, setLaporanType] = useState("");
  const [listAddPeralatan, setListAddPeralatan] = useState([]);

  const [listSearchAddPeralatan, setListSearchAddPeralatan] = useState([]);

  const [listKategori, setListKategori] = useState([
    "Elektronik",
    "Alat Tulis",
    "Lainnya",
  ]);

  const getPeralatanDetails = (peralatan) => {
    setLoading(true);
   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    peralatan.forEach((item) => {
      if (item.hasIdentifier && item.count > 0) {
        axios
          .get(API_URL + `/peralatan-detail/list/${item.id}`, {
            headers: {
              Authorization: `Bearer ${token.token}`,
            },
          })
          .then((res) => {
            let detail = res.data.peralatanDetails;
            detail.forEach((element) => {
              element.detailName = element.name;
              element.status = element.statusName;
            });
            item.peralatanDetails = res.data.peralatanDetails;
            item.available = item.count - item.borrowCount;
            const list = peralatan;
            console.log(list, peralatan);
            if (list != peralatan) {
              list.push(item);
            }

            setLoading(false);
            setListSearchAddPeralatan(list);
          })
          .catch((err) => {
            setSnackbar(true);
            setTimeout(() => {
              setSnackbar(false);
            }, 3000);
            setLoading(false);
            return setSnackbarMessage("Get Data Gagal");
          });
      } else {
        item.peralatanDetails = [];
        item.available = item.count - item.borrowCount;
        const list = peralatan;
        list.push(item);
        setListSearchAddPeralatan(list);
      }
    });
  };

  const getDataPeralatanAvailable = () => {
    setLoading(true);
    let searchNama = "";
    let searchNamaDetail = "";

    if (searchAddNama.current != null) {
      searchNama = searchAddNama.current.value;
    }

    if (searchAddDetailNama.current != null) {
      searchNamaDetail = searchAddDetailNama.current.value;
    }

    const body = {
      name: searchNama,
      peralatanDetailName: searchNamaDetail,
    };

   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/peralatan/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListSearchAddPeralatan("");
        let data = res.data.peralatans;
        getPeralatanDetails(data);
        console.log(data);
        setLoading(false);
      })
      .catch((err) => {
        setSnackbar(true);
        console.log(err);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Get Data Gagal");
      });
  };

  const getDataUser = () => {
    setLoading(true);
    const body = {};

   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/user/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListUser(res.data.users);
        setLoading(false);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Get Data Gagal");
      });
  };

  useEffect(() => {
    getDataUser();
    getDataPeralatanAvailable();
  }, []);

  useEffect(() => {
    generatePinjamPeralatan();
  }, [listAddPeralatan]);

  const addPinjamPeralatanDataBerseri = (alat, detail) => {
    alat = { ...alat, peralatanDetails: [detail] };

    let found = false;
    listAddPeralatan.forEach((item) => {
      if (item.id == alat.id) {
        let detailFound = false;
        item.peralatanDetails.forEach((itemdetail) => {
          if (itemdetail.detailId == detail.detailId) {
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
    listAddPeralatan.forEach((item) => {
      if (item.id == alat.id) {
        for (let i = 0; i < item.peralatanDetails.length; i++) {
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
    } else {
      return <NoData></NoData>;
    }
  };

  const batalkanLaporan = () => {
    navigate("/home");
  };

  const laporanDate = useRef("");
  const laporanKeterangan = useRef("");
  const [penaltyType, setPenaltyType] = useState("");

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
    if (listAddPeralatan.length) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Data Peralatan sudah ada");
    }
    setAddDialog(true);
  };

  const generateAddPeralatanList = () => {
    if (listSearchAddPeralatan.length > 0) {
      return listSearchAddPeralatan.map((peralatan, index) => {
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
            editable={false}
          ></AddPeralatanRow>
        );
      });
    } else {
      return <NoData></NoData>;
    }
  };

  useEffect(() => {
    generateAddPeralatanList();
  }, [listSearchAddPeralatan]);
  const [listLaporanType, setListLaporanType] = useState([
    "Kehilangan",
    "Kerusakan",
  ]);

  const generateSelectLaporanType = () => {
    if (listLaporanType) {
      return listLaporanType.map((laporan, index) => {
        return <MenuItem value={laporan}>{laporan}</MenuItem>;
      });
    }
  };

  const handleLaporanType = (event) => {
    setLaporanType(event.target.value);
  };

  const changeIsPenalty = () => {
    if (penaltyUser.roleName != "User") {
      setIsPenalty(false);
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage(
        "Admin dan Super Admin tidak dapat terkena penalti"
      );
    }

    setIsPenalty(!isPenalty);
  };

  const handlePenaltyType = (event) => {
    setPenaltyType(event.target.value);
  };

  const handlePenaltyUser = (event, newValue) => {
    setIsPenalty(false);
    setPenaltyUser(newValue);
  };

  const onSubmit = () => {
    setLoading(true);
    if (!penaltyUser) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage("User tidak boleh kosong!");
    }
    if (isPenalty) {
      if (!penaltyType) {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Jenis hukuman tidak boleh kosong!");
      }
      if (
        penaltyType == "a44c4cd0-2515-4ac7-bb0e-5199f083f6cd" &&
        !fineCount.current.value
      ) {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Denda tidak boleh kosong!");
      }
      if (!deadlineDate.current.value) {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Tanggal deadline tidak boleh kosong!");
      }

      if (deadlineDate.current.value) {
        const selectedDate = new Date(deadlineDate.current.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset the time part for comparison

        if (selectedDate < today) {
          setSnackbar(true);
          setTimeout(() => {
            setSnackbar(false);
          }, 3000);
          setLoading(false);
          return setSnackbarMessage(
            "Tanggal Deadline tidak boleh tanggal yang sudah lewat!"
          );
        }
      }

      if (!timeout.current.value) {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Timeout tidak boleh kosong!");
      }
    }

    if (listAddPeralatan.length <= 0) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      setLoading(false);
      return setSnackbarMessage("Alat tidak boleh kosong!");
    }

    console.log(listAddPeralatan[0]);
    let detailId = null;
    if (listAddPeralatan[0].peralatanDetails.length > 0) {
      detailId = listAddPeralatan[0].peralatanDetails[0].id;
    }

    let description = "";
    if (penaltyType == "a44c4cd0-2515-4ac7-bb0e-5199f083f6cd") {
      description = "Denda : Rp. " + fineCount.current.value;
    } else {
      description = "Penggantian Barang Serupa atau Sejenis";
    }

    let date = null;
    console.log(deadlineDate);
    if (deadlineDate.current != null) {
      date = deadlineDate.current.value;
    }

    let dayTimeout = "";
    if (timeout.current != null) {
      dayTimeout = timeout.current.value;
    }

    const body = {
      description: laporanKeterangan.current.value,
      count: listAddPeralatan[0].count,
      userId: penaltyUser.id,
      peralatanId: listAddPeralatan[0].id,
      peralatanDetailId: detailId,
      usePenalty: isPenalty,
      punishmentTypeId: penaltyType,
      punishmentDescription: description,
      punishmentDeadline: date,
      punishmentTimeoutDuration: parseInt(dayTimeout),
    };

   if (localStorage.getItem("bearer_token") == null) return navigate("/")
const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/broken/create", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setSnackbar(true);
        setTimeout(() => {
          setLoading(false);
          setSnackbar(false);
          navigate("/");
        }, 1000);

        return setSnackbarMessage("Buat Laporan Berhasil");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setLoading(false);
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Buat Laporan Gagal");
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
        <DialogTitle>Pilih Peralatan</DialogTitle>
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
          <Heading title="Buat Laporan"></Heading>
        </div>
        <div className="bg-white w-full flex items-center mt-8 shadow-md px-4 py-4">
          <div className="w-full flex flex-wrap">
            <div className="w-full xl:w-1/2 px-2">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={listUser}
                getOptionLabel={(option) =>
                  `${option.name || ""} - ${option.roleName || ""}`
                }
                value={penaltyUser}
                onChange={handlePenaltyUser}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="User yang bertanggung Jawab"
                    className="w-full"
                  />
                )}
              />
            </div>
            <div className="w-full flex flex-wrap items-center mb-4">
              <Checkbox
                checked={isPenalty}
                onChange={changeIsPenalty}
                inputProps={{ "aria-label": "controlled" }}
              />
              <div className="">Berikan Penalti untuk User</div>
            </div>
            {isPenalty ? (
              <>
                <div className="w-full flex flex-wrap">
                  <div className="w-full md:w-1/2 xl:w-1/4 flex items-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        d="M7.805 3.469C8.16 3.115 8.451 3 8.937 3h6.126c.486 0 .778.115 1.132.469l4.336 4.336c.354.354.469.646.469 1.132v6.126c0 .5-.125.788-.469 1.132l-4.336 4.336c-.354.354-.646.469-1.132.469H8.937c-.5 0-.788-.125-1.132-.469L3.47 16.195c-.355-.355-.47-.646-.47-1.132V8.937c0-.5.125-.788.469-1.132zM12 7.627v5.5m0 3.246v-.5"
                      />
                    </svg>
                    <div className="w-full px-2">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Hukuman yang Diberikan
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={penaltyType}
                          label="Kategori"
                          onChange={handlePenaltyType}
                          placeholder="Kategori"
                          fullWidth
                        >
                          <MenuItem value="a44c4cd0-2515-4ac7-bb0e-5199f083f6cd">
                            Denda
                          </MenuItem>
                          <MenuItem value="d72c4834-8161-4da4-9b71-6327d6aff8d3">
                            Penggantian Barang
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  {penaltyType == "a44c4cd0-2515-4ac7-bb0e-5199f083f6cd" ? (
                    <div className="w-full md:w-1/2 xl:w-1/4 flex items-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M244.24 60a8 8 0 0 0-7.75-.4c-42.93 21-73.59 11.16-106 .78c-34.09-10.85-69.29-22.1-118 1.68A8 8 0 0 0 8 69.24v119.93a8 8 0 0 0 11.51 7.19c42.93-21 73.59-11.16 106.05-.78c19.24 6.15 38.84 12.42 61 12.42c17.09 0 35.73-3.72 56.91-14.06a8 8 0 0 0 4.49-7.18V66.83a8 8 0 0 0-3.72-6.83M48 152a8 8 0 0 1-16 0V88a8 8 0 0 1 16 0Zm80 8a32 32 0 1 1 32-32a32 32 0 0 1-32 32m96 8a8 8 0 0 1-16 0v-64a8 8 0 0 1 16 0Z"
                        />
                      </svg>
                      <div className="w-full px-2">
                        <TextField
                          id=""
                          label="Jumlah Denda"
                          InputLabelProps={{ shrink: true }}
                          type="number"
                          variant="outlined"
                          className="w-full"
                          placeholder="0"
                          inputRef={fineCount}
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="w-full md:w-1/2 xl:w-1/4 flex items-center mb-4">
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
                      label="Tanggal Deadline"
                      InputLabelProps={{ shrink: true }}
                      type="date"
                      variant="outlined"
                      className="w-full"
                      placeholder="Cari Peralatan di sini"
                      inputRef={deadlineDate}
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2 xl:w-1/4 flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 21q-1.85 0-3.488-.712T5.65 18.35t-1.937-2.863T3 12q0-1.1.25-2.137t.725-1.95t1.138-1.7T6.6 4.8l6.8 6.8L12 13L6.6 7.6q-.75.9-1.175 2.013T5 12q0 2.9 2.05 4.95T12 19t4.95-2.05T19 12q0-2.675-1.713-4.612T13 5.1V7h-2V3h1q1.85 0 3.488.713T18.35 5.65t1.938 2.863T21 12t-.712 3.488t-1.938 2.862t-2.863 1.938T12 21m-5-8q-.425 0-.712-.288T6 12t.288-.712T7 11t.713.288T8 12t-.288.713T7 13m5 5q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m5-5q-.425 0-.712-.288T16 12t.288-.712T17 11t.713.288T18 12t-.288.713T17 13"
                    />
                  </svg>
                  <div className="w-full px-2">
                    <TextField
                      id=""
                      label="Waktu Timeout (Hari)"
                      InputLabelProps={{ shrink: true }}
                      type="number"
                      variant="outlined"
                      className="w-full"
                      placeholder="0"
                      inputRef={timeout}
                    />
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="w-full flex flex-col flex-wrap">
              <div>Keterangan</div>
              <div className="w-full xl:w-1/2">
                <TextareaAutosize
                  className="w-full h-48 py-2 px-3 text-l border-2 border-gray-300 rounded-lg mt-2"
                  minRows={4}
                  aria-label="empty textarea"
                  placeholder="..."
                  ref={laporanKeterangan}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4 mb-8">
          <div className="w-full flex items-center mb-4">
            <SubHeading title="Alat"></SubHeading>
            <div className="ml-4">
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
            </div>
          </div>
          <PinjamPeralatanHeader></PinjamPeralatanHeader>
          {generatePinjamPeralatan()}
        </div>
        <div className="w-full flex justify-end mb-8">
          <div>
            <Button
              onClick={() => batalkanLaporan()}
              color="error"
              variant="contained"
              size="large"
            >
              Batal
            </Button>
          </div>
          <div className="md:ml-2">
            <Button
              disabled={loading}
              onClick={() => onSubmit()}
              variant="contained"
              size="large"
            >
              Buat Laporan
            </Button>
          </div>
          {/* Kalau Laporan Sudah Approved */}
          <div className="md:ml-2">
            {/* <Button onClick={()=>onSubmit()} variant="contained" size="large">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#ffffff" d="M8 21q-.825 0-1.412-.587T6 19v-2H4q-.825 0-1.412-.587T2 15v-4q0-1.275.875-2.137T5 8h14q1.275 0 2.138.863T22 11v4q0 .825-.587 1.413T20 17h-2v2q0 .825-.587 1.413T16 21zM18 7H6V5q0-.825.588-1.412T8 3h8q.825 0 1.413.588T18 5zm0 5.5q.425 0 .713-.288T19 11.5q0-.425-.288-.712T18 10.5q-.425 0-.712.288T17 11.5q0 .425.288.713T18 12.5M8 19h8v-4H8z" className="mr-2"/></svg> <p className="ml-2">Print Laporan</p>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BuatLaporan;
