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

const API_URL = process.env.REACT_APP_API_URL;
function UserRow(props) {
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  let [index,setIndex] = useState(props.userIndex)
  let [id, setID] = useState(props.userId);
  let [name, setName] = useState(props.userName);
  let [roleId, setRoleId] = useState(props.userRoleId);
  let [role, setRole] = useState(props.userRole);
  let [email, setEmail] = useState(props.userEmail);
  let [birthdate, setBirthdate] = useState(props.userBirthdate);
  let [gender, setGender] = useState(props.userGender);
  let [phone, setPhone] = useState(props.userPhone);
  let [citizenId, setCitizenId] = useState(props.userCitizenId);
  let [status, setStatus] = useState(props.userStatus);

  const [editDialog, setEditDialog] = useState(false);

  const openEditDialog = (
    name,
    role,
    email,
    birthdate,
    gender,
    phone,
    citizenId,
    status
  ) => {
    setEditUserNameDefault(name);
    setEditUserRole(role);
    setEditUserEmailDefault(email);
    setEditUserBirthdateDefault(birthdate);
    setEditUserGender(gender);
    setEditPhoneDefault(phone);
    setEditCitizenIdDefault(citizenId);
    setEditUserStatus(status);

    setEditDialog(true);
  };
  const closeEditDialog = () => {
    setEditDialog(false);
  };

  const editUserName = useRef("");
  const [editUserNameDefault, setEditUserNameDefault] = useState("");
  const editUserEmail = useRef("");
  const [editUserEmailDefault, setEditUserEmailDefault] = useState("");
  const editUserBirthdate = useRef("");
  const [editUserBirthdateDefault, setEditUserBirthdateDefault] = useState("");
  const [editUserRole, setEditUserRole] = useState("");
  const [editUserGender, setEditUserGender] = useState("");
  const editUserPhone = useRef("");
  const editUserCitizenId = useRef("");
  const [editPhoneDefault, setEditPhoneDefault] = useState("");
  const [editCitizenIdDefault, setEditCitizenIdDefault] = useState("");
  const [editUserStatus, setEditUserStatus] = useState("");

  const handleInputRole = (event) => {
    setEditUserRole(event.target.value);
  };
  const handleInputGender = (event) => {
    setEditUserGender(event.target.value);
  };

  const handleInputStatus = (event) => {
    setEditUserStatus(event.target.value);
  };

  const onSubmit = () => {
    if (editUserName.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Username tidak boleh kosong");
    }
    if (editUserRole == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Jabatan tidak boleh kosong");
    }
    if (editUserEmail.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Email tidak boleh kosong");
    }
    if (editUserBirthdate.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Tanggal Lahir tidak boleh kosong");
    }
    if (editUserGender == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Jenis Kelamin tidak boleh kosong");
    }
    if (editUserPhone.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nomor Telepon tidak boleh kosong");
    }
    if (editUserCitizenId.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nomor KTP tidak boleh kosong");
    }
    if (editUserStatus == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Status tidak boleh kosong");
    }

    console.log(id)

// password: "u53R2o2A",

    let body = {
      id: id,
      name: editUserName.current.value,

      gender: editUserGender,
      email: editUserEmail.current.value,
      phoneNumber: editUserPhone.current.value,
      ktp: editUserCitizenId.current.value,
      birthDate: editUserBirthdate.current.value,
      roleId: editUserRole,
    };
    console.log(body);

    const token = JSON.parse(localStorage.getItem("bearer_token"));
    console.log(token.token)
    axios
      .put(API_URL + "/user/update", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    return closeEditDialog();
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
      <Dialog open={editDialog} onClose={closeEditDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <div className="w-full flex justify-between flex-wrap">
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Nama"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={editUserName}
                defaultValue={editUserNameDefault}
              />
            </div>

            <div className="p-2 w-1/2 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Jabatan</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editUserRole}
                  label="Kategori"
                  onChange={handleInputRole}
                  placeholder="Kategori"
                  fullWidth
                  defaultValue={editUserRole}
                  disabled={
                    editUserRole == "3389a328-8272-4ae4-a8d0-b53d7597f009"
                  }
                >
                  <MenuItem value={"3389a328-8272-4ae4-a8d0-b53d7597f009"}>
                    Super Admin
                  </MenuItem>

                  <MenuItem value={"c510b438-ade0-4df1-b469-58212703f4b1"}>
                    Admin
                  </MenuItem>
                  <MenuItem value={"54013ecf-d55e-4588-9a64-f93cdba97267"}>
                    User
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={editUserEmail}
                defaultValue={editUserEmailDefault}
              />
            </div>
            <div className="p-2 w-1/2">
              <TextField
                InputLabelProps={{ shrink: true }}
                margin="dense"
                id="name"
                name="name"
                label="Tanggal Lahir"
                type="date"
                fullWidth
                variant="outlined"
                inputRef={editUserBirthdate}
                defaultValue={editUserBirthdateDefault}
              />
            </div>
            <div className="p-2 w-1/2 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Jenis Kelamin
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editUserGender}
                  label="Jenis Kelamin"
                  onChange={handleInputGender}
                  placeholder="Jenis Kelamin"
                  fullWidth
                  defaultValue={editUserGender}
                >
                  <MenuItem value={"Male"}>Laki-laki</MenuItem>
                  <MenuItem value={"Female"}>Perempuan</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Nomor Telepon"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={editUserPhone}
                defaultValue={editPhoneDefault}
              />
            </div>
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Nomor KTP"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={editUserCitizenId}
                defaultValue={editCitizenIdDefault}
              />
            </div>
            <div className="p-2 w-1/2 mt-2">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Status User
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={editUserStatus}
                  label="Status User"
                  onChange={handleInputStatus}
                  placeholder="Status User"
                  fullWidth
                  defaultValue={editUserStatus}
                  disabled={
                    editUserRole == "3389a328-8272-4ae4-a8d0-b53d7597f009"
                  }
                >
                  <MenuItem value={true}>Aktif</MenuItem>
                  <MenuItem value={false}>Tidak Aktif</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button type="submit" onClick={onSubmit}>
            <b>Ubah</b>
          </Button>
        </DialogActions>
      </Dialog>
      <div className="w-full md:w-fill flex flex-col md:flex-row p-4 items-start md:items-center justify-evenly">
        <div className="w-full md:w-1/12 flex flex-wrap justify-start md:justify-center">
          <div className="flex md:hidden mr-2  md:mr-0 font-bold">No : </div>
          {index}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start md:justify-center">
          <div className="flex md:hidden mr-2  md:mr-0 font-bold">Nama : </div>
          {name}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start md:justify-center">
          <div className="flex md:hidden mr-2  md:mr-0 font-bold">Role : </div>
          {role}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start md:justify-center">
          <div className="flex md:hidden mr-2  md:mr-0 font-bold">Email : </div>
          {email}
        </div>
        <div className="w-full md:w-2/12 flex flex-wrap justify-start md:justify-center">
          <div className="flex md:hidden mr-2  md:mr-0 font-bold">
            Status :{" "}
          </div>
          {status == true ? "Aktif" : "Tidak Aktif"}
        </div>
        <div className=" w-full md:w-1/12 flex rounded-xl flex justify-center items-center">
          <div
            onClick={() =>
              openEditDialog(
                name,
                roleId,
                email,
                birthdate,
                gender,
                phone,
                citizenId,
                status
              )
            }
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
          </div>
          {/* <div className="mx-1 p-1 rounded-md cursor-pointer transition-all active:scale-100 hover:scale-110 hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
              />
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
}
export default UserRow;
