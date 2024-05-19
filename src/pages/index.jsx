import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Heading from "../components/base/Heading";
import PinjamanCard from "../components/PinjamanCard";
import { useNavigate } from "react-router";
import Card from "../components/base/Card";
import HorizontalDivider from "../components/base/HorizontalDivider";

import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Snackbar } from "@mui/material";

const API_URL = process.env.REACT_APP_API_URL;
function Dashboard() {
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [listPinjamanCard, setListPinjamanCard] = useState([]);

  const generatePinjamanCard = () => {
    if (listPinjamanCard) {
      return listPinjamanCard.map((card, index) => {
        if(index<5)
        return (
          <PinjamanCard
            title={card.userName}
            startDate={formatDate(card.startDate)}
            endDate={formatDate(card.endDate)}
            status={card.statusName}
          ></PinjamanCard>
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

  const [optionsPeralatan, setOptionsPeralatan] = useState({
    chart: {
      id: "basic-bar",
      width: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ["Mobil", "Komputer", "Pensil", "Penghapus", "Stapler"],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49],
    },
  ]);

  const [optionsKerusakan, setOptionsKerusakan] = useState({
    chart: {
      id: "basic-bar",
      width: "100%",
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ["Mobil", "Komputer", "Pensil", "Penghapus", "Stapler"],
    },
  });
  const [seriesKerusakan, setSeriesKerusakan] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49],
    },
  ]);

  const [popularPeralatan, setPopularPeralatan] = useState([]);

  const getPopularKerusakan = () => {
    const body = {};
    const token = JSON.parse(localStorage.getItem("bearer_token"));
    axios
      .get(API_URL + "/dashboard/popular/broken", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        let popularSeries = [{ name: "series-1", data: [] }];
        let popularName = [];
        res.data.popularBroken.forEach((item) => {
          popularSeries[0].data.push(item.count);
          popularName.push(item.name);
        });
        setSeriesKerusakan(popularSeries);

        setOptionsKerusakan({
          chart: {
            id: "basic-bar",
            width: "100%",
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            categories: popularName,
          },
        });
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 1000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const getPopularPeralatan = () => {
    const body = {};
    const token = JSON.parse(localStorage.getItem("bearer_token"));
    axios
      .get(API_URL + "/dashboard/popular/peralatan", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        console.log(res);
        let popularSeries = [{ name: "series-1", data: [] }];
        let popularName = [];
        res.data.popularPeralatan.forEach((item) => {
          popularSeries[0].data.push(item.count);
          popularName.push(item.name);
        });
        setSeries(popularSeries);

        setOptionsPeralatan({
          chart: {
            id: "basic-bar",
            width: "100%",
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          xaxis: {
            categories: popularName,
          },
        });
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 1000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const [pendingRequest, setPendingRequest] = useState([]);

  const getPendingRequest = () => {
    const token = JSON.parse(localStorage.getItem("bearer_token"));
    axios
      .get(API_URL + "/dashboard/pending/request", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setPendingRequest(res.data.pendingRequest);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 1000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const generatePendingRequest = () => {
    if (pendingRequest) {
      return pendingRequest.map((req, index) => {
        if(index < 5)
        return (
          <Card
            title={`${req.peralatanName} - ${req.itemCount} Buah`}
            description={`${formatDate(req.date)}`}
          ></Card>
        );
      });
    }
  };

  const [recentPurchase, setRecentPurchase] = useState([]);

  const getRecentPurchase = () => {
    const token = JSON.parse(localStorage.getItem("bearer_token"));
    axios
      .get(API_URL + "/dashboard/recent/purchase", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setRecentPurchase(res.data.recentPurchase);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 1000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const generateRecentPurchase = () => {
    if (recentPurchase) {
      return recentPurchase.map((req, index) => {
        if(index < 5)
        return (
          <Card
            title={`${req.peralatanName} ${
              req.peralatanDetailName ? " - " + req.peralatanDetailName : ""
            }`}
            description={`${formatDate(
              req.purchaseDate
            )} - Rp. ${req.totalPrice.toLocaleString("id-ID")}`}
          ></Card>
        );
      });
    }
  };

  const [myBorrow, setMyBorrow] = useState("");
  const getMyBorrow = () => {
    const token = JSON.parse(localStorage.getItem("bearer_token"));
    axios
      .get(API_URL + "/dashboard/me/borrow", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setMyBorrow(res.data.borrows);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 1000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const generateMyBorrow = () => {
    if (myBorrow) {
      return myBorrow.map((borrow, index) => {
        if(index < 5)
        return (
          <PinjamanCard
            title={borrow.reason}
            startDate={formatDate(borrow.startDate)}
            endDate={formatDate(borrow.endDate)}
            status={borrow.statusName}
          ></PinjamanCard>
        );
      });
    }
  };
  const [borrowHistory, setBorrowHistory] = useState("");
  const getBorrowHistory = () => {
    const token = JSON.parse(localStorage.getItem("bearer_token"));
    axios
      .get(API_URL + "/dashboard/me/history-borrow", {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setBorrowHistory(res.data.borrow);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 1000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  const generateBorrowHistory = () => {
    if (borrowHistory) {
      return borrowHistory.map((borrow, index) => {
        if(index < 5)
        return (
          <PinjamanCard
            title={borrow.reason}
            startDate={formatDate(borrow.startDate)}
            endDate={formatDate(borrow.endDate)}
            status={borrow.statusName}
          ></PinjamanCard>
        );
      });
    }
  };

  const getAllBorrow = () => {
    const body = {
      userName: "",
      statusBorrowId: "",
      startDate: "",
      endDate: "",
      me: false,
    };

    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/borrow/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setListPinjamanCard(res.data.borrows);
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage("Gagal Mendapatkan Data");
      });
  };

  useState(() => {
    getPopularPeralatan();
    getPopularKerusakan();

    getPendingRequest();
    getRecentPurchase();

    getMyBorrow();
    getBorrowHistory();

    getAllBorrow();
  }, []);

  return (
    <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />
      <div className="w-full xl:w-1/2 flex flex-col px-8 mb-12">
        <div className="mb-8">
          <Heading title="Pinjaman Terbanyak"></Heading>
        </div>
        <div className="w-full bg-white p-2 md:p-8 flex items-center rounded-2xl shadow-xl">
          <Chart
            options={optionsPeralatan}
            series={series}
            type="bar"
            height="300px"
          />
        </div>
        <div className="w-full my-8">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/borrow")}
          >
            <b>Lihat Selengkapnya</b>
          </Button>
        </div>
      </div>
      <div className="w-full xl:w-1/2 flex flex-col px-8">
        <div className="mb-8">
          <Heading title="Kerusakan Terbanyak"></Heading>
        </div>
        <div className="w-full bg-white p-2 md:p-8 flex items-center rounded-2xl shadow-xl">
          <Chart
            options={optionsKerusakan}
            series={seriesKerusakan}
            type="bar"
            height="300px"
          />
        </div>
        <div className="w-full my-8">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/report")}
          >
            <b>Lihat Kerusakan</b>
          </Button>
        </div>
      </div>
      {user.role == "Admin" || user.role == "Super Admin" ? (
        <div className="w-full xl:w-1/2 flex flex-col px-8 mb-12">
          <div className="mb-8">
            <Heading title="Pengajuan Penambahaan Peralatan"></Heading>
          </div>
          {pendingRequest ? (
            generatePendingRequest()
          ) : (
            <div className="w-full text-xl my-8">Tidak ada data...</div>
          )}

          <div className="w-full my-8">
            <Button
              onClick={() => navigate("/peralatan/request")}
              variant="contained"
              size="large"
            >
              <b>Lihat Pengajuan</b>
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="w-full xl:w-1/2 flex flex-col px-8">
        <div className="mb-8">
          <Heading title="Pengadaan Terbaru"></Heading>
        </div>
        {recentPurchase ? (
          generateRecentPurchase()
        ) : (
          <div className="w-full text-xl my-8">Tidak ada data...</div>
        )}

        <div className="w-full my-8">
          <Button
            onClick={() => navigate("/peralatan")}
            variant="contained"
            size="large"
          >
            <b>Lihat Peralatan</b>
          </Button>
        </div>
      </div>

      <div className="w-full h-[4px] bg-white mx-8 mb-8"></div>

      {user.role == "User" ? (
        <div className="w-full xl:w-1/2 flex flex-col px-8">
          <div className="mb-8">
            <Heading title="Pinjaman Saya"></Heading>
          </div>
          {myBorrow ? (
            <>{generateMyBorrow()}</>
          ) : (
            <div className="w-full text-xl my-8">Tidak ada data...</div>
          )}
          <div className="w-full my-8">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/borrow")}
            >
              <b>Lihat Pinjaman</b>
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full xl:w-1/2 flex flex-col px-8">
          <div className="mb-8">
            <Heading title="List Pinjaman"></Heading>
          </div>
          {generatePinjamanCard()}

          <div className="w-full my-8">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/borrow")}
            >
              <b>Lihat Pinjaman</b>
            </Button>
          </div>
        </div>
      )}
      {user.role == "User" ? (
        <div className="w-full xl:w-1/2 flex flex-col px-8">
          <div className="mb-8">
            <Heading title="Riwayat Pinjaman"></Heading>
          </div>
          {borrowHistory ? (
            <>{generateBorrowHistory()}</>
          ) : (
            <div className="w-full text-xl my-8">Tidak ada data...</div>
          )}
          <div className="w-full my-8">
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/myborrow")}
            >
              <b>Lihat Pinjaman</b>
            </Button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
export default Dashboard;
