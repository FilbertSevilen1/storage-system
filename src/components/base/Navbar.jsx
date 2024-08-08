import React, { useEffect, useState } from "react";
import "../../css/navbar.css";
import "../../css/dropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation();

  const [listPinjamanCount, setListPinjamanCount] = useState(0);
  const [listBrokenCount, setListBrokenCount] = useState(0);
  const [listPenaltyCount, setListPenaltyCount] = useState(0);
  const [listLaporanCount, setListLaporanCount] = useState(0);
  const [listRequestCount, setListRequestCount] = useState(0);

  const getDataPinjamanList = () => {
    let body = {};
    let flag = false;
    if (user.role == "user") {
      flag = true;
    }
    body = {
      me: flag,
    };

    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    let count = 0;
    setListPinjamanCount(0);
    axios
      .post(API_URL + "/borrow/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        const data = res.data.borrows;
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].statusId == "73c03313-bfdb-467d-98bb-02dd4a93ff54" ||
            data[i].statusId == "781f0b17-7546-415d-a74b-162b4a67e8f9"
          ) {
            data.splice(i, 1);
            i--;
          }
        }

        setListPinjamanCount(data.length);
      })
      .catch((err) => {});
  };

  const getReportData = () => {
    const body = {};

    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/broken/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        const data = res.data.brokens;

        for (let i = 0; i < data.length; i++) {
          if (data[i].approvalStatus == "Disetujui") {
            data.splice(i, 1);
            i--;
          }
        }
        setListBrokenCount(data.length);
      })
      .catch((err) => {});
  };

  const getDataPenalty = () => {
    let body = {};

    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/punishment/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        const data = res.data.punishments;
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].punishmentResolutionStatus == "Disetujui" ||
            data[i].punishmentId == null
          ) {
            data.splice(i, 1);
            i--;
          }
          setListPenaltyCount(data.length);
        }
      })
      .catch((err) => {});
  };

  const getDataRequestList = () => {
    const body = {
      statusId: "e3946b09-fb28-4d97-89e2-d2a2a54ba9a7",
    };

    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/request/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        const data = res.data.requests;
        setListRequestCount(data.length);
      })
      .catch((err) => {});
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  useEffect(() => {
    let userdata = "";
    if (localStorage.getItem("ss_token")) {
      const logindata = localStorage.getItem("ss_token");
      const { user, timestamp } = JSON.parse(logindata);
      userdata = user;
    }
    if (path.pathname != "/" && !userdata) {
      navigate("/");
    }

    getDataPinjamanList();
    getReportData();
    getDataPenalty();
    getDataRequestList();
    setListLaporanCount(listPenaltyCount + listBrokenCount);
  }, []);
  return (
    <div className="top-0 w-full h-16 shadow-2xl fixed px-4 md:px-8 flex justify-between bg-white z-50">
      <div
        className="flex h-16 items-center cursor-pointer text-2xl font-bold"
        onClick={() => navigate("/home")}
      >
        Storage System
      </div>
      {user.name ? (
        <div className="items-center hidden md:flex">
          <div className="dropdown">
            <button className="flex justify-center dropbtn w-[130px] xl:w-[200px] text-xl xl:text-2xl">
              Penyimpanan
              {listRequestCount > 0 ? (
                <p className="w-4 h-4 px-1 rounded-full bg-red-500 text-sm flex items-center justify-center text-white">
                  !
                </p>
              ) : (
                <></>
              )}
            </button>
            <div className="dropdown-content">
              <div
                onClick={() => {
                  navigate("/peralatan");
                }}
              >
                Peralatan
              </div>
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div
                  onClick={() => {
                    navigate("/peralatan/request");
                  }}
                >
                  Pengajuan Penambahan
                  {listRequestCount > 0 ? (
                    <p className="w-4 h-4 px-1 rounded-full bg-red-500 text-sm flex items-center justify-center text-white">
                      {listRequestCount}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div
                  onClick={() => {
                    navigate("/category");
                  }}
                >
                  Kategori
                </div>
              ) : (
                <></>
              )}
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div
                  onClick={() => {
                    navigate("/brand");
                  }}
                >
                  Merek
                </div>
              ) : (
                <></>
              )}
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div
                  onClick={() => {
                    navigate("/purchase");
                  }}
                >
                  Pembelian
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="dropdown">
            <button className="flex justify-center dropbtn w-[130px] xl:w-[200px] text-xl xl:text-2xl">
              Peminjaman
              {listPinjamanCount > 0 ? (
                <p className="w-4 h-4 px-1 rounded-full bg-red-500 text-sm flex items-center justify-center text-white">
                  !
                </p>
              ) : (
                <></>
              )}
            </button>
            <div className="dropdown-content">
              {user.role == "User" ? (
                <div onClick={() => navigate("/borrow/create")}>
                  Buat Pinjaman Baru
                </div>
              ) : (
                <></>
              )}
              {user.role == "User" ? (
                <div className="flex" onClick={() => navigate("/myborrow")}>
                  Pinjaman Saya
                  {listPinjamanCount > 0 ? (
                    <p className="w-4 h-4 px-1 rounded-full bg-red-500 text-sm flex items-center justify-center text-white">
                      {listPinjamanCount}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <>
                  <div className="flex" onClick={() => navigate("/borrow")}>
                    Lihat List Pinjaman
                    {listPinjamanCount > 0 ? (
                      <p className="w-4 h-4 px-1 rounded-full bg-red-500 text-sm flex items-center justify-center text-white">
                        {listPinjamanCount}
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="dropdown">
            <button className="flex justify-center dropbtn w-[130px] xl:w-[200px] text-xl xl:text-2xl">
              Laporan
              {/* {listLaporanCount > 0 || listBrokenCount >0 || listPenaltyCount >0? (
                <p className="w-4 h-4 px-1 rounded-full bg-red-500 text-sm flex items-center justify-center text-white">
                  !
                </p>
              ) : (
                <></>
              )} */}
            </button>
            <div className="dropdown-content">
              <>
                {user.role == "Admin" || user.role == "Super Admin" ? (
                  <div onClick={() => navigate("/report/create")}>
                    Buat Laporan Kerusakan
                  </div>
                ) : (
                  <></>
                )}
              </>
              <>
                {/* {user.role == "Admin" || user.role == "Super Admin" ? ( */}
                <div className="flex" onClick={() => navigate("/report")}>
                  List Laporan Kerusakan
                </div>
                {/* ) : (
                  <></>
                )} */}
              </>
              <>
                {user.role == "Admin" || user.role == "Super Admin" ? (
                  <div onClick={() => navigate("/penalty")}>
                    List Penalti
                  </div>
                ) : (
                  <></>
                )}
              </>
              <>
                {user.role == "User" ? (
                  <div onClick={() => navigate("/penalty/mypenalty")}>
                    Pinalti Saya
                  </div>
                ) : (
                  <></>
                )}
              </>
            </div>
          </div>
          <div className="h-12 w-0.5 bg-gray-200"></div>
          <div className="dropdown">
            <button className="dropbtn w-[130px] xl:w-[200px] text-xl xl:text-2xl flex whitespace-nowrap">
              Hi, {user.name}
            </button>
            <div className="dropdown-content">
              {user.role == "Super Admin" ? (
                <div onClick={() => navigate("/user")}>Manage User</div>
              ) : (
                <></>
              )}
              <div onClick={logout}>Logout</div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="items-center flex md:hidden transition-all active-scale-95 cursor-pointer ">
        {user.name ? (
          <div className="dropdown">
            <div className="dropbtn self-end">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 48 48"
              >
                <g fill="none" stroke="#000">
                  <path d="M7.94971 11.9497H39.9497" />
                  <path d="M7.94971 23.9497H39.9497" />
                  <path d="M7.94971 35.9497H39.9497" />
                </g>
              </svg>
            </div>

            {/* Mobile */}
            <div className="dropdown-content">
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => {
                  navigate("/peralatan");
                }}
              >
                Peralatan
              </div>
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div
                  className="border-b-[0.5px] border-gray-300"
                  onClick={() => {
                    navigate("/peralatan/request");
                  }}
                >
                  Pengajuan Penambahan
                </div>
              ) : (
                <></>
              )}
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div
                  className="border-b-[0.5px] border-gray-300"
                  onClick={() => {
                    navigate("/category");
                  }}
                >
                  Kategori
                </div>
              ) : (
                <></>
              )}
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div
                  className="border-b-[0.5px] border-gray-300"
                  onClick={() => {
                    navigate("/brand");
                  }}
                >
                  Merek
                </div>
              ) : (
                <></>
              )}

              {user.role == "User" ? (
                <div
                  className="border-b-[0.5px] border-gray-300"
                  onClick={() => navigate("/borrow/create")}
                >
                  Buat Pinjaman Baru
                </div>
              ) : (
                <></>
              )}
              {user.role == "User" ? (
                <div
                  className="border-b-[0.5px] border-gray-300"
                  onClick={() => navigate("/myborrow")}
                >
                  Pinjaman Saya
                  {listPinjamanCount > 0 ? (
                    <p className="w-4 h-4 px-1 rounded-full bg-red-500 text-sm flex items-center justify-center text-white">
                      {listPinjamanCount}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div
                  className="border-b-[0.5px] border-gray-300"
                  onClick={() => navigate("/borrow")}
                >
                  Lihat List Pinjaman
                  {listPinjamanCount > 0 ? (
                    <p className="w-4 h-4 px-1 rounded-full bg-red-500 text-sm flex items-center justify-center text-white">
                      {listPinjamanCount}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <></>
              )}
              {user.role == "User" ? (
                <div
                  className="border-b-[0.5px] border-gray-300"
                  onClick={() => navigate("/report/create")}
                >
                  Buat Laporan Kerusakan
                </div>
              ) : (
                <></>
              )}
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div
                  className="border-b-[0.5px] border-gray-300"
                  onClick={() => navigate("/report")}
                >
                  List Laporan Kerusakan
                </div>
              ) : (
                <></>
              )}

              <>
                {user.role == "User" ? (
                  <div
                    className="border-b-[0.5px] border-gray-300"
                    onClick={() => navigate("/penalty/mypenalty")}
                  >
                    Pinalti Saya
                  </div>
                ) : (
                  <></>
                )}
              </>

              {user.role == "Super Admin" ? (
                <div
                  className="border-b-[0.5px] border-gray-300"
                  onClick={() => navigate("/user")}
                >
                  Manage User
                </div>
              ) : (
                <></>
              )}

              <div onClick={logout}>Logout</div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
export default Navbar;
