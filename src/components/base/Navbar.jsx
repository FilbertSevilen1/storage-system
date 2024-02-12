import React from "react";
import "../../css/navbar.css";
import "../../css/dropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
function Navbar() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };
  return (
    <div className="top-0 w-full h-16 shadow-2xl fixed px-4 md:px-8 flex justify-between bg-white z-50">
      <div
        className="flex h-16 items-center cursor-pointer text-2xl font-bold"
        onClick={() => navigate("/home")}
      >
        Storage System
      </div>
      {user.name ? (
        <div className="items-center hidden sm:flex">
          <div className="dropdown">
            <button className="dropbtn w-[200px] text-2xl">Peralatan</button>
            <div className="dropdown-content">
              <div
                onClick={() => {
                  navigate("/peralatan");
                }}
              >
                List Peralatan
              </div>
              <div
                onClick={() => {
                  navigate("/kategori");
                }}
              >
                Kategori
              </div>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn w-[200px] text-2xl">Pinjam</button>
            <div className="dropdown-content">
              <div>Buat Pinjaman Baru</div>
              <div>Pinjaman Saya</div>
              <div>Lapor Kerusakan</div>
              <div>Lihat List Pinjaman -Admin-</div>
            </div>
          </div>
          <div className="h-12 w-0.5 bg-gray-200"></div>
          <div className="dropdown">
            <button className="dropbtn w-[200px] text-2xl">
              Hi, {user.name}
            </button>
            <div className="dropdown-content">
              <div onClick={()=>navigate('/user')}>Manage User</div>
              <div onClick={logout}>Logout</div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <div className="items-center flex sm:hidden transition-all active-scale-95 cursor-pointer ">
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
            <div>Link</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
