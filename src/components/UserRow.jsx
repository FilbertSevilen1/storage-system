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
import React, { useRef, useState } from "react";
function UserRow(props) {
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";
  
  let [id, setID] = useState(props.userId);
  let [name, setName] = useState(props.userName);
  let [role, setRole] = useState(props.userRole);
  let [email, setEmail] = useState(props.userEmail);
  let [birthdate, setBirthdate] = useState(props.userBirthdate);
  let [gender, setGender] = useState(props.userGender);
  let [phone, setPhone] = useState(props.userPhone);
  let [citizenId, setCitizenId] = useState(props.userCitizenId);
  let [status, setStatus] = useState(props.userStatus);

  const [editDialog, setEditDialog] = useState(false);

  const openEditDialog = (name, type, email, birthdate, gender, phone, citizenId) => {
    setEditUserNameDefault(name);
    setEditUserRole(type);
    setEditUserEmailDefault(email);
    setEditUserBirthdateDefault(birthdate);
    setEditUserGender(gender);
    setEditPhoneDefault(phone)
    setEditCitizenIdDefault(citizenId)

    resetErrorMessage();
    setEditDialog(true);
  };
  const closeEditDialog = () => {
    setEditDialog(false);
  };

  const [listRole, setListRole] = useState([
    'Admin', 'User'
  ])

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
  const [editUserStatus, setEditUserStatus] = useState("")

  // Error Handling
  const [errorEditUserName, setErrorEditUserName] = useState(false);
  const [errorEditUserNameMessage, setErrorEditUserNameMessage] = useState("");
  const [errorEditUserEmail, setErrorEditUserEmail] = useState(false);
  const [errorEditUserEmailMessage, setErrorEditUserEmailMessage] =
    useState("");
  const [errorEditUserBirthDate, setErrorEditUserBirthDate] = useState(false);
  const [errorEditUserBirthDateMessage, setErrorEditUserBirthDateMessage] =
    useState("");
  const [errorEditUserRole, setErrorEditUserRole] = useState(false);
  const [errorEditUserRoleMessage, setErrorEditUserRoleMessage] = useState("");
  const [errorEditUserGender, setErrorEditUserGender] = useState(false);
  const [errorEditUserGenderMessage, setErrorEditUserGenderMessage] =
    useState("");

    
  const handleInputRole = (event) => {
    setEditUserRole(event.target.value);
  };
  const handleInputGender = (event) => {
    setEditUserGender(event.target.value);
  };

  const handleInputStatus = (event) =>{
    setEditUserStatus(event.target.value);
  }

  const resetErrorMessage = () =>{
    setErrorEditUserName(false);
    setErrorEditUserNameMessage("");
    setErrorEditUserEmail(false);
    setErrorEditUserEmailMessage("");
    setErrorEditUserBirthDate(false);
    setErrorEditUserBirthDateMessage("");
    setErrorEditUserRole(false);
    setErrorEditUserRoleMessage("");
    setErrorEditUserGender(false);
    setErrorEditUserGenderMessage("");
  }

  const checkErrorUsername = () => {
    if (!editUserName.current.value) {
      setErrorEditUserName(true);
      return setErrorEditUserNameMessage("Username tidak boleh kosong!");
    }
    setErrorEditUserName(false);
    setErrorEditUserNameMessage("");
  };
  const checkErrorEmail = () => {
    if (!editUserEmail.current.value) {
      setErrorEditUserEmail(true);
      return setErrorEditUserEmailMessage("Email tidak boleh kosong!");
    }
    setErrorEditUserEmail(false);
    setErrorEditUserEmailMessage("");
  };

  const checkErrorBirthDate = () => {
    if (!editUserBirthdate.current.value) {
      setErrorEditUserBirthDate(true);
      return setErrorEditUserBirthDateMessage(
        "Tanggal Lahir tidak boleh kosong!"
      );
    }
    setErrorEditUserBirthDate(false);
    setErrorEditUserBirthDateMessage("");
  };

  const checkErrorRole = () => {
    if (!editUserRole) {
      setErrorEditUserRole(true);
      return setErrorEditUserRoleMessage("Role tidak boleh kosong!");
    }
    setErrorEditUserRole(false);
    setErrorEditUserRoleMessage("");
  };

  const checkErrorGender = () => {
    if (!editUserGender) {
      setErrorEditUserGender(true);
      return setErrorEditUserGenderMessage("Gender tidak boleh kosong!");
    }
    setErrorEditUserGender(false);
    setErrorEditUserGenderMessage("");
  };

  const onSubmit = () =>{
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
    return closeEditDialog();
  }

  const generateRoleData = () =>{
    if(listRole){
      return listRole.map((role,index)=>{
        return(
          <MenuItem value={role}>{role}</MenuItem>
        )
      })
    }
  }

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
                error={errorEditUserName}
                onChange={checkErrorUsername}
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
              <div className="text-red-500 text-md">
                {errorEditUserNameMessage}
              </div>
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
                >
                  {generateRoleData()}
                </Select>
              </FormControl>
              <div className="text-red-500 text-md">
                {errorEditUserRoleMessage}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                error={errorEditUserEmail}
                onChange={checkErrorEmail}
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
               <div className="text-red-500 text-md">
                {errorEditUserEmailMessage}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                onChange={checkErrorBirthDate}
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
               <div className="text-red-500 text-md">
                {errorEditUserBirthDate}
              </div>
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
                  <MenuItem value={"Laki-laki"}>Laki-laki</MenuItem>
                  <MenuItem value={"Perempuan"}>Perempuan</MenuItem>
                </Select>
              </FormControl>
              <div className="text-red-500 text-md">
                {errorEditUserGender}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                onChange={checkErrorEmail}
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
                onChange={checkErrorEmail}
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
                >
                  <MenuItem value={"Aktif"}>Aktif</MenuItem>
                  <MenuItem value={"Tidak Aktif"}>Tidak Aktif</MenuItem>
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
      <div className="w-full md:w-fill flex flex-col md:flex-row p-2 items-start md:items-center justify-evenly">
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Id : </div>
          {id}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Nama : </div>
          {name}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Role : </div>
          {role}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Email : </div>
          {email}
        </div>
        <div className="w-full md:w-3/12 flex flex-wrap justify-start mx-2 md:justify-center">
          <div className="flex md:hidden mr-2 font-bold">Status : </div>
          {status}
        </div>
        <div className=" w-full md:w-3/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
          <div
            onClick={() => openEditDialog(name, role, email, birthdate, gender, phone, citizenId)}
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
