import React, { useEffect } from "react";
import "../../css/navbar.css";
import "../../css/dropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const path = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  useEffect(() => {
    console.log(path.pathname);
    if (path.pathname != "/" && user.name == "") {
      navigate("/");
    }
  });
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
            <button className="dropbtn w-[200px] text-xl xl:text-2xl">
              Penyimpanan
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
                </div>
              ) : (
                <></>
              )}

              <div
                onClick={() => {
                  navigate("/kategori");
                }}
              >
                Kategori
              </div>
              <div
                onClick={() => {
                  navigate("/merek");
                }}
              >
                Merek
              </div>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn w-[130px] xl:w-[200px] text-xl xl:text-2xl">
              Peminjaman
            </button>
            <div className="dropdown-content">
              <div onClick={() => navigate("/buatpinjaman")}>
                Buat Pinjaman Baru
              </div>
              <div onClick={() => navigate("/pinjamansaya")}>Pinjaman Saya</div>
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div onClick={() => navigate("/pinjaman")}>
                  Lihat List Pinjaman
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn w-[130px] xl:w-[200px] text-xl xl:text-2xl">
              Laporan
            </button>
            <div className="dropdown-content">
              <div onClick={() => navigate("/buatlaporan")}>
                Buat Laporan Kerusakan
              </div>
              {user.role == "Admin" || user.role == "Super Admin" ? (
                <div onClick={() => navigate("/laporan")}>
                  List Laporan Kerusakan
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="h-12 w-0.5 bg-gray-200"></div>
          <div className="dropdown">
            <button className="dropbtn w-[130px] xl:w-[200px] text-xl xl:text-2xl">
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

            <div className="dropdown-content">
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => {
                  navigate("/peralatan");
                }}
              >
                Peralatan
              </div>
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => {
                  navigate("/kategori");
                }}
              >
                Kategori
              </div>
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => {
                  navigate("/merek");
                }}
              >
                Merek
              </div>
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => navigate("/buatpinjaman")}
              >
                Buat Pinjaman Baru
              </div>
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => navigate("/pinjamansaya")}
              >
                Pinjaman Saya
              </div>
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => navigate("/pinjaman")}
              >
                Lihat List Pinjaman -Admin-
              </div>
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => navigate("/laporan")}
              >
                List Laporan Kerusakan -Admin-
              </div>
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => navigate("/buatlaporan")}
              >
                Buat Laporan Kerusakan
              </div>
              <div
                className="border-b-[0.5px] border-gray-300"
                onClick={() => navigate("/user")}
              >
                Manage User
              </div>
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
