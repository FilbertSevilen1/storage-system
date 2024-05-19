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
function KerusakanDetail() {
  const user = useSelector((state)=>state.user)

  const path = useLocation().pathname;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [reportId, setReportId] = useState(path.substring(8));

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [reportDate, setReportDate] = useState("01/01/2024");
  const [penaltyType, setPenaltyType] = useState(null);
  const [reportUser, setReportUser] = useState("Budi");
  const [reportStatus, setReportStatus] = useState("");
  const [reportPenaltyId, setReportPenaltyId] = useState("");
  const [reportPenaltyStatus, setReportPenaltyStatus] = useState("");

  const [listPinjamPeralatan, setListPinjamPeralatan] = useState([]);
  const [listPeralatanDetail, setListPeralatanDetail] = useState([]);

  const [isApproved, setIsApproved] = useState(false);

  const [itemCount, setItemCount] = useState("");

  useEffect(() => {
    getDataPinjamPeralatan();
  }, []);

  const getDataPinjamPeralatan = () => {
    let body = {};

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .get(API_URL + `/broken/get/${reportId}`, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setItemCount(res.data.broken.count);
        setReportDate(res.data.broken.dateIn);
        setReportUser(res.data.broken.userName);
        setReportStatus(res.data.broken.approvalStatus);
        setPenaltyType(res.data.broken.punishmentType);
        setReportPenaltyId(res.data.broken.punishmentId);
        setReportPenaltyStatus(res.data.broken.punishmentResolutionStatus);
        setListPinjamPeralatan([res.data.broken.peralatans]);

        setPenaltyId(res.data.broken.punishmentId);

        if (res.data.broken.peralatans.peralatanDetail) {
          setListPeralatanDetail([res.data.broken.peralatans.peralatanDetail]);
        } else {
          setListPeralatanDetail([]);
        }

        if (
          res.data.broken.punishmentResolutionStatus == "Disetujui" ||
          res.data.broken.punishmentId == null
        ) {
          setIsApproved(true);
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

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const deletePinjamPeralatanData = (index) => {
    setListPinjamPeralatan((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      return newList;
    });
  };

  const generatePinjamPeralatan = () => {
    if (listPinjamPeralatan) {
      return listPinjamPeralatan.map((peralatan, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <PinjamPeralatanRow
              editable={false}
              index={index}
              key={peralatan.id}
              peralatanImage={peralatan.peralatanImage}
              peralatanName={peralatan.peralatanName}
              peralatanType={peralatan.peralatanHasIdentifier}
              peralatanCategory={peralatan.peralatanCategoryName}
              brandName={peralatan.peralatanBrandName}
              peralatanTotal={itemCount}
              peralatanAvailable={peralatan.peralatan_available}
              peralatanDetail={listPeralatanDetail}
              page={page}
              deletePinjamPeralatanData={() => deletePinjamPeralatanData(index)}
            ></PinjamPeralatanRow>
          );
      });
    }
  };

  const openPenaltyDialog = () => {
    getDataResolution();
  };
  const closePenaltyDialog = () => {
    setPenaltyDialog(false);
  };

  const [penaltyId, setPenaltyId] = useState("");
  const [penaltyDialog, setPenaltyDialog] = useState(false);
  const [penaltyDescription, setPenaltyDescription] = useState("");
  const [proofImage, setProofImage] = useState("");
  const approvalReason = useRef("");
  const [defaultApprovalReason, setDefaultApprovalReason] = useState("");

  const getDataResolution = () => {
    let body = {};

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + `/resolution/get/${penaltyId}`, body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setDefaultApprovalReason(res.data.resolution.approvalReason);
        setProofImage(res.data.resolution.image);
        setPenaltyDescription(res.data.resolution.description);
        setPenaltyDialog(true);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal mendapatkan data");
      });
  };

  const onPenaltySubmit = (statusId) => {
    if (!approvalReason.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Alasan tidak boleh kosong!");
    }

    const body = {
      punishmentId: penaltyId,
      approvalReason: approvalReason.current.value,
      approvalStatusId: statusId,
    };

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    let successMessage = "";
    if (statusId == "6344d1b5-6b9b-4cd8-b612-f6a3e64fb837") {
      successMessage = "Berhasil Menyetujui Bukti";
    } else {
      successMessage = "Berhasil Menolak Bukti";
    }

    axios
      .put(API_URL + "/resolution/update-status", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setSnackbar(true);
        closeApprovalDialog();
        getDataResolution();
        setTimeout(() => {
          window.location.reload();
          setSnackbar(false);
        }, 1000);
        return setSnackbarMessage(successMessage);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal mengubah data");
      });
  };

  const onSubmit = () => {
    const body = {};
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .put(API_URL + `/broken/finish/${reportId}`, body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
          navigate("/");
        }, 1000);
        return setSnackbarMessage("Berhasil menyelesaikan Laporan");
      })
      .catch((err) => {
        setLoading(false);
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal menyelesaikan Laporan");
      });
  };

  const closeApprovalDialog = () => {
    setPenaltyDialog(false);
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
      <Dialog open={penaltyDialog} onClose={closePenaltyDialog}>
        <DialogTitle>Bukti Penyelesaian Penalti</DialogTitle>
        <DialogContent>
          <div className="w-full h-[450px] flex justify-between">
            <div className="p-2 w-96 h-64">
              <img src={proofImage}></img>
              <div className="my-4">
                <TextField
                  className="w-full my-4"
                  value={penaltyDescription}
                  defaultValue={penaltyDescription}
                  label="Deskripsi"
                  disabled
                ></TextField>
              </div>
              <div className="my-4">
                <TextField
                  className="w-full my-4"
                  inputRef={approvalReason}
                  defaultValue={defaultApprovalReason}
                  label="Alasan Tolak/Setuju"
                ></TextField>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              onPenaltySubmit("5fcc9739-cbdc-4dec-866d-5f7b059213f1")
            }
          >
            Tolak
          </Button>
          <Button
            onClick={() =>
              onPenaltySubmit("6344d1b5-6b9b-4cd8-b612-f6a3e64fb837")
            }
            type="submit"
          >
            <b>Setujui</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="Detail Laporan"></Heading>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4">
          <div className="w-full flex flex-wrap mb-4 items-center">
            <div className="w-full md:w-1/4 flex items-center mb-4">
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
                <b>Tanggal Laporan :</b> {formatDate(reportDate)}
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
                <b>User yang bertanggung jawab :</b> {reportUser}
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
                <b>Status Laporan :</b> {reportStatus}
              </div>
            </div>
            {penaltyType ? (
              <>
                <div className="w-full md:w-1/4 flex items-center mb-4">
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
                    <b>Penalti untuk User : </b> {penaltyType}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {penaltyType ? (
              <div className="w-full flex flex-wrap mt-8">
                <div className="flex items-center w-full md:w-1/4">
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
                    <b>ID Penalti</b>
                    <div>{reportPenaltyId}</div>
                  </div>
                </div>

                <div className="flex items-center w-full md:w-1/4">
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
                    <b>Status Penalti</b>
                    <div>{reportPenaltyStatus}</div>
                  </div>
                </div>
                <div className="w-full md:w-64">
                  {user.role != "User" ? (
                    <Button
                      onClick={() => openPenaltyDialog()}
                      variant="contained"
                      fullWidth
                    >
                      Lihat Bukti Penalti
                    </Button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="bg-white w-full flex flex-col items-center mt-8 shadow-md px-4 py-4 mb-8">
          <div className="w-full flex items-center mb-4">
            <SubHeading title="Peralatan"></SubHeading>
            <div className="ml-4"></div>
          </div>
          <PinjamPeralatanHeader></PinjamPeralatanHeader>
          {generatePinjamPeralatan()}
          <div className="w-full justify-end items-center mt-4 flex"></div>
        </div>
        <div className="w-full flex justify-end mb-8">
          <div className="md:ml-2">
            {reportStatus == "Disetujui" ? (
              <></>
            ) : (
              <Button
                onClick={() => onSubmit()}
                disabled={!isApproved}
                variant="contained"
                size="large"
              >
                Selesaikan Laporan
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default KerusakanDetail;
