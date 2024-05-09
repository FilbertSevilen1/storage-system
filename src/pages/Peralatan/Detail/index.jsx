import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import { useSelector } from "react-redux";
import PeralatanDetailHeader from "../../../components/PeralatanDetailHeader";
import HorizontalDivider from "../../../components/base/HorizontalDivider";
import PeralatanDetailRow from "../../../components/PeralatanDetailRow";
import { useLocation } from "react-router";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
function PeralatanDetail() {
  const [loading, setLoading] = useState(false);
  const pathname = useLocation();

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const user = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState(user.role);

  const [listKategori, setListKategori] = useState("");
  const [listBrand, setListBrand] = useState("");

  const [peralatanName, setPeralatanName] = useState("");
  const [peralatanType, setPeralatanType] = useState("");
  const [peralatanJumlah, setPeralatanJumlah] = useState("");
  const [peralatanAvailable, setPeralatanAvailable] = useState("");
  const [peralatanDeskripsi, setPeralatanDeskripsi] = useState("");
  const [perlatanImage, setPeralatanImage] = useState("");

  const [peralatanCategoryId, setPeralatanCategoryId] = useState("");
  const [peralatanCategoryName, setPeralatanCategoryName] = useState("");

  const [peralatanBrandId, setPeralatanBrandId] = useState("");
  const [peralatanBrandName, setPeralatanBrandName] = useState("");

  const [listPeralatanDetail, setListPeralatanDetail] = useState([]);

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

  useEffect(() => {
    getDataKategoriList();
    getDataBrandList();
    getPeralatan();
    getDetailList();
  }, []);

  const getDataPeralatan = () => {
    setLoading(true);

    const id = pathname.pathname.substring(11);
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .get(API_URL + `/peralatan/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        const data = res.data.peralatan;
        setPeralatanName(data.name);
        setPeralatanJumlah(data.count);
        setPeralatanAvailable(data.count - data.borrowCount);
        setPeralatanImage(data.image);
        setPeralatanCategoryId(data.categoryId);
        setPeralatanCategoryName(data.categoryName);
        setPeralatanBrandId(data.brandId);
        setPeralatanBrandName(data.brandName);
        setPeralatanDeskripsi(data.description);
        setPeralatanType(data.hasIdentifier);
        setEditPeralatanCategory(data.categoryId);
        setEditPeralatanBrand(data.brandId);

        if (data.hasIdentifier) {
          getDataPeralatanDetails();
        } else {
          setLoading(false);
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
  };

  const getDataPeralatanDetails = () => {
    const id = pathname.pathname.substring(11);
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .get(API_URL + `/peralatan-detail/list/${id}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListPeralatanDetail(res.data.peralatanDetails);
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

  const getPeralatan = () => {
    getDataPeralatan();
  };

  const getDetailList = () => {
    if (listPeralatanDetail.length % 5 === 0) {
      setMaxPage(Math.floor(listPeralatanDetail.length / 5));
    } else setMaxPage(Math.floor(listPeralatanDetail.length / 5) + 1);
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  // Edit

  const [edit, setEdit] = useState(false);

  const editPeralatanNama = useRef("");
  const editPeralatanJumlah = useRef("");
  const editPeralatanDeskripsi = useRef("");
  const [editPeralatanImage, setEditPeralatanImage] = useState("");
  const [editPeralatanCategory, setEditPeralatanCategory] =
    useState(peralatanCategoryId);
  const [editPeralatanBrand, setEditPeralatanBrand] =
    useState(peralatanBrandId);

  const generateSelectPeralatanCategoryList = () => {
    if (listKategori) {
      return listKategori.map((kategori, index) => {
        if (kategori.hasIdentifier == peralatanType) {
          return <MenuItem value={kategori.id}>{kategori.name}</MenuItem>;
        }
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

  const handleInputCategory = (event) => {
    setEditPeralatanCategory(event.target.value);
  };

  const handleInputBrand = (event) => {
    setEditPeralatanBrand(event.target.value);
  };

  const saveEdit = () => {
    setPeralatanName(editPeralatanNama.current.value);
    setPeralatanDeskripsi(editPeralatanDeskripsi.current.value);
    setPeralatanCategoryId(editPeralatanCategory)
    setPeralatanBrandId(editPeralatanBrand)
    setEdit(false);
  };

  const cancelEdit = () => {
    getPeralatan();
    setEdit(false);
  };

  // if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)

  const generatePeralatanDetail = () => {
    if (listPeralatanDetail) {
      return listPeralatanDetail.map((peralatan, index) => {
        
          return (
            <PeralatanDetailRow
              index={index}
              key={index}
              role={userRole}
              peralatanId={peralatan.id}
              peralatanName={peralatan.name}
              peralatanSerialNumber={peralatan.name}
              peralatanStatusId={peralatan.statusId}
              peralatanStatusName={peralatan.statusName}
              peralatanDescription={peralatan.description}
              brandName={peralatan.brandName}
              page={page}
            ></PeralatanDetailRow>
          );
      });
    }
  };

  const changePeralatanImage = (event) => {
    setEditPeralatanImage(event.target.files[0]);
    setPeralatanImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />
      <div>
        <Heading title="Detail Peralatan"></Heading>
      </div>
      <div className="w-full flex flex-col md:flex-row mb-12 mt-8">
        <div className="w-full md:w-[275px] h-fit flex flex-col p-4 bg-white shadow-md md:mr-2 mb-4 items-center">
          <div className="w-[250px] h-[250px] bg-gray-200">
            <img
              src={perlatanImage}
              className="w-full h-full object-cover"
            ></img>
          </div>
          {userRole != "User" ? (
            <div className="w-full">
              <div className="w-full mt-4 flex flex-col items-center gap-2">
                {edit ? (
                  <>
                    <div className="w-full">
                      <div className="text-xl font-bold">
                        Ubah Gambar Peralatan
                      </div>
                      <input
                        type="file"
                        onChange={changePeralatanImage}
                        className="my-4"
                      ></input>
                    </div>
                    <div className="flex w-full">
                      <div className="w-full">
                        <Button
                          onClick={() => cancelEdit(false)}
                          variant="contained"
                          size="large"
                          fullWidth
                          className=""
                          color="error"
                        >
                          Batal
                        </Button>
                      </div>
                      <div className="w-full ml-1">
                        <Button
                          onClick={() => saveEdit()}
                          variant="contained"
                          size="large"
                          fullWidth
                          className=""
                          color="success"
                        >
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <Button
                    onClick={() => setEdit(true)}
                    variant="contained"
                    size="large"
                    fullWidth
                    className=""
                  >
                    Edit Peralatan
                  </Button>
                )}
              </div>
              {/* <div className="w-full mt-4 flex flex-col items-center">
                <Button variant="contained" size="large" fullWidth className="">
                  Delete Peralatan
                </Button>
              </div> */}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="w-full md:w-full flex flex-col p-4 bg-white shadow-md md:ml-2 mb-4">
          <div className="text-xl md:text-2xl mb-2 flex items-center">
            <b>Nama Alat: </b>
            {edit ? (
              <div className="ml-2">
                <TextField
                  inputRef={editPeralatanNama}
                  id="peralatanNama"
                  label="Nama Peralatan"
                  margin="dense"
                  variant="outlined"
                  hide-details
                  size="normal"
                  defaultValue={peralatanName}
                />
              </div>
            ) : (
              <div className="ml-2">{peralatanName}</div>
            )}
          </div>
          <div className="text-xl md:text-2xl mb-2 flex items-center">
            <b>Jumlah Alat: </b>
            {edit && peralatanType != true ? (
              <div className="ml-2">
                <TextField
                  inputRef={editPeralatanJumlah}
                  id="peralatanNama"
                  label="Jumlah Alat"
                  margin="dense"
                  variant="outlined"
                  hide-details
                  size="normal"
                  defaultValue={peralatanJumlah}
                />
              </div>
            ) : (
              <div className="ml-2">{peralatanJumlah} Buah</div>
            )}
          </div>
          <div className="text-xl md:text-2xl mb-2 flex">
            <b>Available: </b>
            <div className="ml-2">{peralatanAvailable} Buah </div>
          </div>
          <div className="text-xl md:text-2xl mb-2 flex items-center">
            <b>Kategori: </b>
            {edit ? (
              <div className="w-64 ml-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Kategori
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="peralatanType"
                    value={editPeralatanCategory}
                    label="Kategori"
                    onChange={handleInputCategory}
                    placeholder="Kategori"
                    defaultValue={peralatanCategoryId}
                  >
                    {generateSelectPeralatanCategoryList()}
                  </Select>
                </FormControl>
              </div>
            ) : (
              <div className="ml-2">{peralatanCategoryName}</div>
            )}
          </div>
          <div className="text-xl md:text-2xl mb-2 flex items-center">
            <b>Merek: </b>
            {edit ? (
              <div className="w-64 ml-2">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Merek</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="peralatanType"
                    value={editPeralatanBrand}
                    label="Kategori"
                    onChange={handleInputBrand}
                    placeholder="Kategori"
                    defaultValue={peralatanBrandId}
                  >
                    {generateSelectPeralatanBrandList()}
                  </Select>
                </FormControl>
              </div>
            ) : (
              <div className="ml-2">{peralatanBrandName}</div>
            )}
          </div>
          <div className="text-xl md:text-2xl mb-2">
            <b>Deskripsi: </b>
            {edit ? (
              <div className="">
                <TextareaAutosize
                  className="w-full h-48 py-2 px-3 text-l border-2 border-gray-300 rounded-lg mt-2"
                  minRows={4}
                  aria-label="empty textarea"
                  placeholder="Deskripsi"
                  defaultValue={peralatanDeskripsi}
                  ref={editPeralatanDeskripsi}
                />
              </div>
            ) : (
              <div className="">{peralatanDeskripsi}</div>
            )}
          </div>
          {peralatanType == true ? (
            <div className="w-full flex-col">
              <HorizontalDivider></HorizontalDivider>
              <PeralatanDetailHeader></PeralatanDetailHeader>
              {generatePeralatanDetail()}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default PeralatanDetail;
