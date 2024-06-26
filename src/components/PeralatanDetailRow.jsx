import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const API_URL = process.env.REACT_APP_API_URL;
function PeralatanDetailRow(props) {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(props.role);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [index, setIndex] = useState(props.index);
  const [detailId, setDetailId] = useState(props.peralatanDetailId);
  const [name, setName] = useState(props.peralatanName);
  const [serialNumber, setSerialNumber] = useState(props.peralatanSerialNumber);
  const [description, setDescription] = useState(props.peralatanDescription);
  const [statusId, setStatusId] = useState(props.peralatanStatusId);
  const [status, setStatus] = useState(props.peralatanStatusName);

  const [edit, setEdit] = useState(false);

  const editAngkaSeri = useRef("");
  const editDescription = useRef("");
  const [editStatus, setEditStatus] = useState(props.peralatanStatusId);

  const saveEdit = () => {
    setLoading(true);
    if (editAngkaSeri.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Kode Asset tidak boleh kosong");
    }
    if (editDescription.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Deskripsi tidak boleh kosong");
    }
    if (editStatus == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Status tidak boleh kosong");
    }
    setEdit(false);

    let body = {
      id: detailId,
      name: editAngkaSeri.current.value,
      description: editDescription.current.value,
      statusItemId: editStatus,
    };

    setSerialNumber(editAngkaSeri.current.value);
    setDescription(editDescription.current.value);
    setStatusId(editStatus);
    switch (editStatus) {
      case "c47aaddc-2d23-472d-b43d-c4de92d5217f":
        setStatus("Tidak Siap Dipinjam");
        break;
      case "309bf632-ca49-4a10-a486-f6a7fd43ac7c":
        setStatus("Siap Dipinjam");
        break;
      case "e61288ae-b95c-4db7-b3fb-04adb4623671":
        setStatus("Dalam Peminjaman");
        break;
      case "10f8dd3d-7f56-4c72-a0de-01bac1a0104a":
        setStatus("Dalam Perbaikan");
        break;
      case "76e7b433-cbca-4cb2-8a0c-dd372b94c475":
        setStatus("Dibuang");
        break;
      default:
        break;
    }
    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .put(API_URL + "/peralatan-detail/update", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Simpan Data Berhasil");
      })
      .catch((err) => {
        console.log(err);
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Simpan Data Gagal");
      });
  };

  const handleEditStatus = (event) => {
    setEditStatus(event.target.value);
  };

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-1/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">No : </div>
          <div>{index + 1}</div>
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Kode Asset : </div>
          {edit ? (
            <div>
              <TextField
                type="text"
                id="jumlahMinimum"
                label="Kode Asset"
                variant="outlined"
                defaultValue={serialNumber}
                inputRef={editAngkaSeri}
                fullWidth
              />
            </div>
          ) : (
            <div>{serialNumber}</div>
          )}
        </div>

        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Deskripsi : </div>
          {edit ? (
            <div>
              <TextField
                type="text"
                id="descritpion"
                label="Deskripsi"
                variant="outlined"
                defaultValue={description}
                inputRef={editDescription}
                fullWidth
              />
            </div>
          ) : (
            <div>{description}</div>
          )}
        </div>

        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Status : </div>

          {edit ? (
            <div className="w-48">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                {statusId == "e61288ae-b95c-4db7-b3fb-04adb4623671" ? (
                  <Select
                    labelId="demo-simple-select-label"
                    value={editStatus}
                    id="demo-simple-select"
                    label="Status"
                    onChange={handleEditStatus}
                    defaultValue={statusId}
                    fullWidth
                    disabled={
                      statusId == "e61288ae-b95c-4db7-b3fb-04adb4623671"
                    }
                  >
                    <MenuItem value={"e61288ae-b95c-4db7-b3fb-04adb4623671"}>
                      Dalam Peminjaman
                    </MenuItem>
                  </Select>
                ) : (
                  <Select
                    labelId="demo-simple-select-label"
                    value={editStatus}
                    id="demo-simple-select"
                    label="Status"
                    onChange={handleEditStatus}
                    defaultValue={statusId}
                    fullWidth
                    disabled={
                      statusId == "e61288ae-b95c-4db7-b3fb-04adb4623671"
                    }
                  >
                    <MenuItem value={"c47aaddc-2d23-472d-b43d-c4de92d5217f"}>
                      Tidak Siap Dipinjam
                    </MenuItem>
                    <MenuItem value={"309bf632-ca49-4a10-a486-f6a7fd43ac7c"}>
                      Siap Dipinjam
                    </MenuItem>
                    <MenuItem value={"10f8dd3d-7f56-4c72-a0de-01bac1a0104a"}>
                      Dalam Perbaikan
                    </MenuItem>
                    <MenuItem value={"76e7b433-cbca-4cb2-8a0c-dd372b94c475"}>
                      Dibuang
                    </MenuItem>
                  </Select>
                )}
              </FormControl>
            </div>
          ) : (
            <div>{status}</div>
          )}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-center md:justify-center mt-4 md:mt-0">
          {role != "User" ? (
            <div>
              {edit ? (
                <div className="flex">
                  <button
                    onClick={() => setEdit(!edit)}
                    className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275q-.275-.275-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => saveEdit()}
                    className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4z"
                      />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEdit(!edit)}
                  className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="black"
                      d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95z"
                    />
                  </svg>
                </button>
              )}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
export default PeralatanDetailRow;
