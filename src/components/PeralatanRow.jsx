import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const API_URL = process.env.REACT_APP_API_URL;
function PeralatanRow(props) {
  const navigate = useNavigate();
  let user = useSelector((state) => state.user);
  let [showAdd, setShowAdd] = useState(props.showAdd || false);

  let [id, setID] = useState(props.peralatanId);
  let [name, setName] = useState(props.peralatanName);
  let [image, setImage] = useState(props.peralatanImage);
  let [category, setCategory] = useState(props.peralatanCategory);
  let [description, setDescription] = useState(props.peralatanDescription);
  let [stock, setStock] = useState(props.peralatanStock);
  let [available, setAvailable] = useState(props.peralatanAvailable);
  let [hasIdentifier, setHasIdentifier] = useState(props.hasIdentifier);
  let [brandId, setBrandId] = useState(props.peralatanBrandId)
  let [brandName, setBrandName] = useState(props.peralatanBrand);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [addDialog, setAddDialog] = useState("");
  const [addDialogType, setAddDialogType] = useState("");

  // Dialog Data
  const addPeralatanNama = useRef("");
  const [addPeralatanNamaDefault, setAddPeralatanNamaDefault] = useState("");

  const addPeralatanGambar = useRef("");
  const [addPeralatanGambarDefault, setAddPeralatanGambarDefault] =
    useState("");
  const [addPeralatanKategori, setAddPeralatanKategori] = useState("");
  const addPeralatanDescription = useRef("");
  const [addPeralatanDescriptionDefault, setAddPeralatanDescriptionDefault] =
    useState("");

  const addPeralatanNomorSeri = useRef("");
  const addPeralatanCount = useRef("");
  const addPeralatanPrice = useRef("");

  //Request
  const requestPeralatanNama = useRef("");
  const [requestPeralatanNamaDefault, setRequestPeralatanNamaDefault] =
    useState("");
  const requestPeralatanCount = useRef("");
  const requestPeralatanReason = useRef("");

  const openAddDialog = (name, Gambar, type, description) => {
    console.log(type);
    if (user.role == "User") {
      setRequestDialog(true);
      setRequestPeralatanNamaDefault(name);
      return;
    }

    setAddDialogType(type);
    setAddPeralatanNamaDefault(name);
    setAddPeralatanGambarDefault(Gambar);
    setAddPeralatanKategori(type);
    // addPeralatanGambar.current.value = Gambar,
    // setAddDialogType(type);
    // addPeralatanDescription.current.value = description

    setAddDialog(true);
  };
  const closeAddDialog = () => {
    setAddDialog(false);
  };
  const closeRequestDialog = () => {
    setRequestDialog(false);
  };

  const handleInputCategory = (event) => {
    setAddPeralatanKategori(event.target.value);
  };

  const onSubmit = () => {
    if (addPeralatanNama.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nama Peralatan tidak boleh kosong");
    }

    if (addPeralatanDescription.current.value == "" && addDialogType == true) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Deskripsi tidak boleh kosong");
    }
    if (!addPeralatanNomorSeri.current.value && addDialogType == true) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nomor Seri tidak boleh kosong");
    }
    if (!addPeralatanCount.current.value && addDialogType == false) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Jumlah tidak boleh kosong");
    }

    if (hasIdentifier) {
      const body = {
        peralatanId: id,
        name: addPeralatanNomorSeri.current.value,
        description: addPeralatanDescription.current.value,
        totalPrice: addPeralatanPrice.current.value,
      };

      const token = JSON.parse(localStorage.getItem("bearer_token"));

      axios
        .post(API_URL + "/peralatan-detail/create", body, {
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
          return setSnackbarMessage("Tambah Stok Berhasil");
        })
        .catch((err) => {
          setSnackbar(true);
          setTimeout(() => {
            setSnackbar(false);
          }, 3000);
          return setSnackbarMessage("Tambah Stok Gagal");
        });
    } else {
      const body = {
        id: id,
        count: addPeralatanCount.current.value,
        totalPrice: addPeralatanPrice.current.value
      };

      const token = JSON.parse(localStorage.getItem("bearer_token"));

      axios
        .put(API_URL + "/peralatan/update/count", body, {
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
          return setSnackbarMessage("Tambah Stok Berhasil");
        })
        .catch((err) => {
          setSnackbar(true);
          setTimeout(() => {
            setSnackbar(false);
          }, 3000);
          return setSnackbarMessage("Tambah Stok Gagal");
        });
    }
  };

  const onSubmitRequest = () => {
    console.log(brandId)
    if (!requestPeralatanNama.current.value) {
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
      return setSnackbarMessage("Jumlah Peralatan tidak boleh kosong");
    }
    if (!requestPeralatanReason.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Alasan tidak boleh kosong");
    }

    const body = {
      itemName:requestPeralatanNama.current.value,
      itemDescription: description,
      itemCount: requestPeralatanCount.current.value,
      reason: requestPeralatanReason.current.value,
      brandId: brandId,
      peralatanId: id,
    };

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/request/create", body, {
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
        return setSnackbarMessage("Pengajuan Stok Berhasil");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Pengajuan Stok Gagal");
      });

  };

  const [requestDialog, setRequestDialog] = useState(false);

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />
      <Dialog open={addDialog} onClose={closeAddDialog}>
        <DialogTitle>Tambah Stok Peralatan</DialogTitle>
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
                defaultValue={addPeralatanNamaDefault}
                inputRef={addPeralatanNama}
                disabled
              />
            </div>
            <div className="p-2 w-1/2">
              {hasIdentifier == true ? (
                <div>
                  <TextField
                    margin="dense"
                    id="Nomor Seri"
                    name="name"
                    label="Nomor Seri"
                    type="text"
                    fullWidth
                    variant="outlined"
                    inputRef={addPeralatanNomorSeri}
                  />
                </div>
              ) : (
                <div>
                  <TextField
                    margin="dense"
                    id="peralatanJumlah"
                    name="jumlah"
                    label="Jumlah"
                    type="number"
                    fullWidth
                    variant="outlined"
                    inputRef={addPeralatanCount}
                  />
                </div>
              )}
            </div>

            <div className="p-2 w-1/2 mb-2">
              <div>
                <TextField
                  margin="dense"
                  id="peralatanJumlah"
                  name="jumlah"
                  label="Harga"
                  type="number"
                  fullWidth
                  variant="outlined"
                  inputRef={addPeralatanPrice}
                />
              </div>
            </div>
          </div>
          {hasIdentifier == true ? (
            <div className="p-2 w-full flex flex-col">
              <div className="mt-2">Deskripsi</div>
              <TextareaAutosize
                className="w-full h-48 py-2 px-3 text-l border-2 border-gray-300 rounded-lg mt-2"
                minRows={4}
                aria-label="empty textarea"
                placeholder="..."
                ref={addPeralatanDescription}
              />
            </div>
          ) : (
            <></>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog}>Batal</Button>
          <Button onClick={onSubmit} type="submit">
            <b>Tambah</b>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={requestDialog} onClose={closeRequestDialog}>
        <DialogTitle>Ajukan Penambahan Stok</DialogTitle>
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
                defaultValue={requestPeralatanNamaDefault}
                inputRef={requestPeralatanNama}
                disabled
              />
            </div>

            <div className="p-2 w-1/2 mb-2">
              <div>
                <TextField
                  margin="dense"
                  id="peralatanJumlah"
                  name="jumlah"
                  label="Jumlah"
                  type="number"
                  fullWidth
                  variant="outlined"
                  inputRef={requestPeralatanCount}
                />
              </div>
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
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeRequestDialog}>Cancel</Button>
          <Button onClick={onSubmitRequest} type="submit">
            <b>Ajukan</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-full md:w-24 h-24 sm:w-24 md:h-full bg-gray-700 rounded-lg">
        <img src={image} className="w-full h-full object-cover"></img>
      </div>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-start">
          <div className="flex md:hidden mr-2 font-bold">Nama : </div>
          {name} - {brandName}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Kategori : </div>
          {category}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start mx-2 md:justify-start">
          <div className="flex md:hidden mr-2 font-bold">Description : </div>
          {description}
        </div>
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Stok : </div>
          {stock}
        </div>
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center mb-2 md:mb-0">
          <div className="flex md:hidden mr-2 font-bold">Terssedia : </div>
          {available}
        </div>
        <div className="w-full md:w-1/12 flex md:mx-2 p-2 rounded-xl flex justify-center items-center">
          {showAdd ? (
            <button
              onClick={() =>
                openAddDialog(name, image, hasIdentifier, description)
              }
              className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M11 13H6q-.425 0-.712-.288T5 12q0-.425.288-.712T6 11h5V6q0-.425.288-.712T12 5q.425 0 .713.288T13 6v5h5q.425 0 .713.288T19 12q0 .425-.288.713T18 13h-5v5q0 .425-.288.713T12 19q-.425 0-.712-.288T11 18z"
                />
              </svg>
            </button>
          ) : (
            <div></div>
          )}
          <button
            onClick={() => navigate(`/peralatan/${id}`)}
            className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M6.4 18L5 16.6L14.6 7H6V5h12v12h-2V8.4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
export default PeralatanRow;
