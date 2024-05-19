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
} from "@mui/material";
import axios from "axios";
import React, { useRef, useState } from "react";
import LoadingFull from "./base/LoadingFull";

const API_URL = process.env.REACT_APP_API_URL;
function PengajuanPeralatanRow(props) {
  const [loading, setLoading] = useState(false);

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  let [id, setId] = useState(props.requestId);
  let [index, setIndex] = useState(props.requestIndex);
  let [userName, setUserName] = useState(props.userName);
  let [requestItemName, setRequestItemName] = useState(props.requestItemName);
  let [brandName, setBrandName] = useState(props.brandName);
  let [requestItemDescription, setRequestItemDescription] = useState(
    props.requestItemDescription
  );

  let [date, setDate] = useState(props.requestDate);

  const dateformat = new Date(date);

  const year = dateformat.getFullYear();
  const month = String(dateformat.getMonth() + 1).padStart(2, "0"); // Month is zero-based, so add 1
  const day = String(dateformat.getDate()).padStart(2, "0");
  const hours = String(dateformat.getHours()).padStart(2, "0");
  const minutes = String(dateformat.getMinutes()).padStart(2, "0");
  const seconds = String(dateformat.getSeconds()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  let [requestItemCount, setRequestItemCount] = useState(
    props.requestItemCount
  );
  let [requestReason, setRequestReason] = useState(props.requestReason);
  const editKategoriNama = useRef("");

  let [requestStatus, setRequestStatus] = useState(props.approvalStatus);

  const [rejectDialog, setRejectDialog] = useState(false);
  const [approveDialog, setApproveDialog] = useState(false);
  const inputReason = useRef("");

  const onRejectSubmit = () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("bearer_token"));
    let body = {};
    axios
      .put(API_URL + `/request/reject/${id}`, body, {
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
        setLoading(false);
        return setSnackbarMessage("Tolak Pengajuan Berhasil");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Tolak Pengajuan Gagal");
      });
  };

  const onApproveSubmit = () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("bearer_token"));
    let body = {};
    axios
      .put(API_URL + `/request/approve/${id}`, body, {
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
        setLoading(false);
        return setSnackbarMessage("Setujui Pengajuan Berhasil");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage("Setujui Pengajuan Gagal");
      });
  };

  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
      {loading ? <LoadingFull></LoadingFull> : <></>}
      <Dialog open={rejectDialog} onClose={() => setRejectDialog(false)}>
        <DialogTitle>Tolak Pengajuan {requestItemName}</DialogTitle>
        {/* <DialogContent>
          <div className="w-full flex justify-between flex-wrap">
            <div className="p-2 w-96">
              <TextField
                margin="dense"
                id="peralatanName"
                label="Alasan Penolakan"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={inputReason}
              />
            </div>
          </div>
        </DialogContent> */}
        <DialogContent>
          <div className="w-96">Apakah Anda yakin ingin menolak Pengajuan?</div>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setRejectDialog(false)}>Batal</Button>
          <Button onClick={onRejectSubmit} type="submit">
            <b>Tolak Pengajuan</b>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={approveDialog} onClose={() => setApproveDialog(false)}>
        <DialogTitle>Setujui Pengajuan {requestItemName}</DialogTitle>
        <DialogContent>
          {/* <div className="w-full flex justify-between flex-wrap">
            <div className="p-2 w-96">
              <TextField
                margin="dense"
                id="peralatanName"
                label="Alasan Penolakan"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={inputReason}
              />
            </div>
          </div> */}
          <div className="w-96">
            Apakah Anda yakin ingin menyetujui Pengajuan?
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveDialog(false)}>Batal</Button>
          <Button onClick={onApproveSubmit} type="submit">
            <b>Setujui Pengajuan</b>
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />

      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">No : </div>
          {index}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Pengaju : </div>
          {userName}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Alat : </div>
          {requestItemName} - {brandName}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Tanggal : </div>
          {formattedDate}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Jumlah : </div>
          {requestItemCount}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Alasan : </div>
          {requestReason}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center text-center">
          <div className="flex md:hidden mr-2 font-bold">Status : </div>
          {requestStatus}
        </div>
        <div className=" w-full md:w-3/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
          {requestStatus == "Menunggu Persetujuan" ? (
            <>
              <button
                onClick={() => setRejectDialog(true)}
                className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 15 15"
                >
                  <path
                    fill="#ff0000"
                    fill-rule="evenodd"
                    d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={() => setApproveDialog(true)}
                className="mx-1 p-2 bg-gray-200 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#00a331"
                    d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4z"
                  />
                </svg>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
export default PengajuanPeralatanRow;
