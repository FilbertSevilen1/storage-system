import React, { useEffect, useRef, useState } from "react";
import Heading from "../../../components/base/Heading";
import { Button, Snackbar, TextField, TextareaAutosize } from "@mui/material";
import { useSelector } from "react-redux";
import PeralatanDetailHeader from "../../../components/PeralatanDetailHeader";
import HorizontalDivider from "../../../components/base/HorizontalDivider";
import PeralatanDetailRow from "../../../components/PeralatanDetailRow";
function PeralatanDetail() {
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const user = useSelector((state) => state.user);
  const [userRole, setUserRole] = useState(user.role);

  const [peralatanName, setPeralatanName] = useState("Komputer");
  const [peralatanType, setPeralatanType] = useState("Berseri");
  const [peralatanJumlah, setPeralatanJumlah] = useState("5");
  const [peralatanAvailable, setPeralatanAvailable] =
    useState("2");
  const [peralatanDeskripsi, setPeralatanDeskripsi] = useState("");
  const [perlatanImage, setPeralatanImage] = useState("");

  const [edit, setEdit] = useState(false);

  const editPeralatanNama = useRef("");
  const editPeralatanJumlah = useRef("");
  const editPeralatanDeskripsi = useRef("");
  const [editPeralatanImage, setEditPeralatanImage] = useState("");

  const [listPeralatanDetail, setListPeralatanDetail] = useState([
    {
      peralatanId: "1",
      peralatanName: "Komputer",
      peralatanSerialNumber: "KOMP001-0001",
      peralatanStatus: "Dalam Peminjaman",
      peralatanDescription:"Test"
    },
    {
      peralatanId: "2",
      peralatanName: "Komputer",
      peralatanSerialNumber: "KOMP001-0001",
      peralatanStatus: "Dalam Peminjaman",
      peralatanDescription:"Test"
    },
  ]);

  useEffect(() => {
    getPeralatanData();
    getDetailList();
  }, [page]);

  const getPeralatanData = () =>{
    setPeralatanName("Komputer")
    setPeralatanType("Berseri")
    setPeralatanJumlah("5")
    setPeralatanAvailable("2")
    setPeralatanDeskripsi("")
    setPeralatanImage("https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/20060513_toolbox.jpg/220px-20060513_toolbox.jpg")
  }

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

  const saveEdit = () => {
  
    setPeralatanName(editPeralatanNama.current.value)
    setPeralatanDeskripsi(editPeralatanDeskripsi.current.value)
    setEdit(false);
  };

  const cancelEdit = () =>{
    getPeralatanData();
    setEdit(false)
  }

  const generatePeralatanDetail = () => {
    if (listPeralatanDetail) {
      return listPeralatanDetail.map((peralatan, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <PeralatanDetailRow
              index={index}
              key={index}
              role={userRole}
              peralatanId={peralatan.peralatanId}
              peralatanName={peralatan.peralatanName}
              peralatanSerialNumber={peralatan.peralatanSerialNumber}
              peralatanStatus={peralatan.peralatanStatus}
              peralatanDescription={peralatan.peralatanDescription}
              brandName={peralatan.brandName}
              page={page}
            ></PeralatanDetailRow>
          );
      });
    }
  };

  const changePeralatanImage = (event) =>{
    setEditPeralatanImage(event.target.files[0])
    setPeralatanImage(URL.createObjectURL(event.target.files[0]));
  }
  

    
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
          {userRole == "Admin" ? (
            <div className="w-full">
              <div className="w-full mt-4 flex flex-col items-center gap-2">
                {edit ? (
                  <>
                    <div className="w-full">
                      <div className="text-xl font-bold">Ubah Gambar Peralatan</div>
                      <input type="file" onChange={changePeralatanImage} className="my-4">

                      </input>
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
          <div className="text-xl md:text-2xl mb-2 flex">
            <b>Jumlah Alat: </b>
            {edit && peralatanType != "Berseri" ? (
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
          {peralatanType == "Berseri" ? (
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
