import { FormControl, InputLabel, MenuItem, Select, Snackbar, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
function PeralatanDetailRow(props) {
  const [role, setRole] = useState(props.role);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [index, setIndex] = useState(props.index);
  const [name, setName] = useState(props.peralatanName);
  const [serialNumber, setSerialNumber] = useState(props.peralatanSerialNumber);
  const [status, setStatus] = useState(props.peralatanStatus);

  const [edit, setEdit] = useState(false);

  const editAngkaSeri = useRef("");

  const saveEdit = () => {
    if (editAngkaSeri.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Angka Seri tidak boleh kosong");
    }
    setEdit(false);

    setSerialNumber(editAngkaSeri.current.value);

    setSnackbar(true);
    setTimeout(() => {
      setSnackbar(false);
    }, 3000);
    return setSnackbarMessage("Simpan Sukses!");
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
          <div className="flex md:hidden mr-2 font-bold">Nama Barang : </div>
          <div>{name}</div>
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Angka Seri : </div>
          {edit ? (
            <div>
              <TextField
                type="text"
                id="jumlahMinimum"
                label="Angka Seri"
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
          <div className="flex md:hidden mr-2 font-bold">Status : </div>
            <div>{status}</div>
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-center md:justify-center mt-4 md:mt-0">
          {role == "Admin" ? (
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
