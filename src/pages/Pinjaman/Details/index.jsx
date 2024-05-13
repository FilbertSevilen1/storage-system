import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Input,
  Snackbar,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import SubHeading from "../../../components/base/SubHeading";
import PinjamPeralatanHeader from "../../../components/PinjamPeralatanHeader";
import PinjamPeralatanRow from "../../../components/PinjamPeralatanRow";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

const API_URL = process.env.REACT_APP_API_URL;
function DetailPinjaman() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const path = useLocation().pathname.substring(8);

  const [id, setId] = useState(path);
  const [name, setName] = useState("User");
  const [startDate, setStartDate] = useState("01/01/2024");
  const [endDate, setEndDate] = useState("01/12/2024");
  const [reason, setReason] = useState("Testing");
  const [statusId, setStatusId] = useState("");
  const [statusName, setStatusName] = useState(
    "Menunggu Approval Pengembalian"
  );

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

  const [listPinjamPeralatan, setListPinjamPeralatan] = useState([]);

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
            peralatanImage: res.data.peralatan.image,
            categoryId: res.data.peralatan.categoryId,
            categoryName: res.data.peralatan.categoryName,
            brandId: res.data.peralatan.brandId,
            brandName: res.data.peralatan.brandName,
          };

          if (i == borrowperalatan.length - 1) {
            setListPinjamPeralatan(borrowperalatan);
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
  }, []);

  const deletePinjamPeralatanData = (index) => {
    // Use setListPinjamPeralatan to update the state
    setListPinjamPeralatan((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  const generatePinjamPeralatan = () => {
    if (listPinjamPeralatan) {
      return listPinjamPeralatan.map((peralatan, index) => {
        if (true)
          return (
            <PinjamPeralatanRow
              editable={false}
              index={index}
              key={peralatan.peralatanId}
              peralatanImage={peralatan.peralatanImage}
              peralatanName={peralatan.peralatanName}
              peralatanType={
                peralatan.peralatanDetails.length > 0 ? true : false
              }
              peralatanCategory={peralatan.categoryName}
              peralatanTotal={peralatan.peralatanBorrowCount}
              peralatanAvailable={""}
              peralatanDetail={peralatan.peralatanDetails}
              brandName={peralatan.brandName}
              page={page}
              deletePinjamPeralatanData={() => deletePinjamPeralatanData(index)}
            ></PinjamPeralatanRow>
          );
      });
    }
  };

  const onRejectBorrow = () => {
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    if (!rejectReason.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Alasan tidak boleh kosong");
    }

    const body = {
      reason: rejectReason.current.value,
    };

    axios
      .put(API_URL + `/borrow/update/reject/${id}`, body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Berhasil menolak pinjaman");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
          window.location.reload();
        }, 1000);
        return setSnackbarMessage("Tolak pinjaman gagal");
      });
  };
  const onApproveBorrow = () => {
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    const body = {};

    axios
      .put(API_URL + `/borrow/update/approve/${id}`, body, {
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
        return setSnackbarMessage("Berhasil menyetujui pinjaman");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Setujui pinjaman gagal");
      });
  };

  const onCancelBorrow = () => {
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    if (!cancelReason.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Alasan tidak boleh kosong");
    }

    const body = {};

    axios
      .put(API_URL + `/borrow/update/cancel/${id}`, body, {
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
        return setSnackbarMessage("Berhasil membatalkan pinjaman");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Pembatalan pinjaman gagal");
      });
  };

  const onStartBorrow = () => {
    console.log(listPinjamPeralatan);

    // let flag = false
    // listPinjamPeralatan.forEach(item => {
    //   if(item.peralatanDetails){
    //     item.peralatanDetails.forEach(subitem => {

    //     });
    //   }
    // });

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    const body = {
      reason: "test",
    };

    axios
      .put(API_URL + `/borrow/update/start/${id}`, body, {
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
        return setSnackbarMessage("Pinjaman dimulai");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Setujui pinjaman gagal");
      });
  };

  const rejectReason = useRef("");
  const [rejectConfirmationDialog, setRejectConfirmationDialog] =
    useState(false);
  const [approveConfirmationDialog, setApproveConfirmationDialog] =
    useState(false);

  const cancelReason = useRef("");
  const [cancelConfirmationDialog, setCancelConfirmationDialog] =
    useState(false);
  const [startConfirmationDialog, setStartConfirmationDialog] = useState(false);

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
        open={rejectConfirmationDialog}
        onClose={() => setRejectConfirmationDialog(false)}
      >
        <DialogTitle>Tolak Pinjaman</DialogTitle>
        <DialogContent>
          <div className="w-96">
            <TextField
              margin="dense"
              label="Alasan"
              type="text"
              variant="outlined"
              inputRef={rejectReason}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectConfirmationDialog(false)}>
            Batal
          </Button>
          <Button onClick={() => onRejectBorrow()} type="submit">
            <b>Ya</b>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={approveConfirmationDialog}
        onClose={() => setRejectConfirmationDialog(false)}
      >
        <DialogTitle>Setujui Pinjaman</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menyetujui pinjaman?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setApproveConfirmationDialog(false)}>
            Batal
          </Button>
          <Button onClick={() => onApproveBorrow()} type="submit">
            <b>Ya</b>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={cancelConfirmationDialog}
        onClose={() => setCancelConfirmationDialog(false)}
      >
        <DialogTitle>Batalkan Pinjaman</DialogTitle>
        <DialogContent>
          <div className="w-96">
            <TextField
              margin="dense"
              label="Alasan"
              type="text"
              variant="outlined"
              inputRef={cancelReason}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCancelConfirmationDialog(false)}>
            Batal
          </Button>
          <Button onClick={() => onCancelBorrow()} type="submit">
            <b>Ya</b>
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={startConfirmationDialog}
        onClose={() => setStartConfirmationDialog(false)}
      >
        <DialogTitle>Setujui Pinjaman</DialogTitle>
        <DialogContent>
          Apakah Anda yakin ingin menyetujui pinjaman?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setStartConfirmationDialog(false)}>
            Batal
          </Button>
          <Button onClick={() => onStartBorrow()} type="submit">
            <b>Ya</b>
          </Button>
        </DialogActions>
      </Dialog>

      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="Detail Pinjaman"></Heading>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4">
          <div className="w-full flex flex-wrap items-center">
            <div className="flex w-full md:w-1/2 xl:w-1/4">
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
                <b className="mr-1">Pinjaman</b>
                {id}
              </div>
            </div>
            <div className="flex w-full md:w-1/2 xl:w-1/4">
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
            <div className="flex w-full md:w-1/2 xl:w-1/4 flex items-center mb-4">
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
            <div className="flex w-full md:w-1/2 xl:w-1/4 flex items-center mb-4">
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
              <div className="flex w-full md:w-1/2 xl:w-1/4">
                <div>
                  <b>Alasan Peminjaman</b>
                  <div>{reason}</div>
                </div>
              </div>
              <div className="flex w-full md:w-1/2 xl:w-1/4">
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
            <SubHeading title="Peralatan yang Dipinjam"></SubHeading>
            <div className="ml-4">
              {statusName == "Menunggu Persetujuan" ||
              statusName == "Siap Dipinjam" ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate(`/borrow/edit/${id}`)}
                >
                  Edit
                </Button>
              ) : (
                <></>
              )}
            </div>
            <div className="ml-4"></div>
          </div>
          <PinjamPeralatanHeader></PinjamPeralatanHeader>
          <div className="w-full max-h-[400px] sm:max-h-[600px] overflow-y-scroll">
            {loading ? <></> : <>{generatePinjamPeralatan()}</>}
          </div>

          <div className="w-full justify-end items-center mt-4 flex"></div>
        </div>
        {user.role == "User" ? (
          <></>
        ) : (
          <>
            {statusName == "Menunggu Persetujuan" ? (
              <div className="w-full flex justify-end mb-8">
                <div className="md:ml-2">
                  <Button
                    onClick={() => setRejectConfirmationDialog(true)}
                    color="error"
                    variant="contained"
                    size="large"
                  >
                    Tolak Peminjaman
                  </Button>
                </div>
                <div className="md:ml-2">
                  <Button
                    onClick={() => setApproveConfirmationDialog(true)}
                    color="success"
                    variant="contained"
                    size="large"
                  >
                    Setujui Peminjaman
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}

            {statusName == "Siap Dipinjam" ? (
              <div className="w-full flex justify-end mb-8">
                <div className="md:ml-2">
                  <Button
                    onClick={() => setCancelConfirmationDialog(true)}
                    color="error"
                    variant="contained"
                    size="large"
                  >
                    Batalkan Pinjaman
                  </Button>
                </div>
                <div className="md:ml-2">
                  <Button
                    onClick={() => setStartConfirmationDialog(true)}
                    color="primary"
                    variant="contained"
                    size="large"
                  >
                    Mulai Pinjaman
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}

            {statusName == "Dalam Peminjaman" ? (
              <div className="w-full flex justify-end mb-8">
                <div className="md:ml-2">
                  <Button
                    onClick={() => navigate(`/borrow/return/${id}`)}
                    color="primary"
                    variant="contained"
                    size="large"
                  >
                    Selesaikan Pinjaman
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}
export default DetailPinjaman;
