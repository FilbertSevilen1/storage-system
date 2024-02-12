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
  TextField,
} from "@mui/material";
import React, { useRef, useState } from "react";
function UserRow(props) {
  let [id, setID] = useState(props.userId);
  let [name, setName] = useState(props.userName);
  let [role, setRole] = useState(props.userRole);
  let [email, setEmail] = useState(props.userEmail);
  let [birthdate, setBirthdate] = useState(props.userBirthdate);
  let [gender, setGender] = useState(props.userGender);

  const [editDialog, setEditDialog] = useState(false);

  const openEditDialog = (name, type, email, birthdate, gender) => {
    setEditUserNameDefault(name);
    setEditUserRole(type);
    console.log(type);
    setEditUserEmailDefault(email);
    setEditUserBirthdateDefault(birthdate);
    setEditUserGender(gender);

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

  const handleInputRole = (event) => {
    setEditUserRole(event.target.value);
  };
  const handleInputGender = (event) => {
    setEditUserGender(event.target.value);
  };
  return (
    <div className="my-2 w-full h-auto md:h-24 bg-white shadow-xl flex flex-col sm:flex-row sm:justify-between rounded-xl">
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
                >
                  <MenuItem value={"Admin"}>Admin</MenuItem>
                  <MenuItem value={"User"}>User</MenuItem>
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
                  <MenuItem value={"Laki-laki"}>Laki-laki</MenuItem>
                  <MenuItem value={"Perempuan"}>Perempuan</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>Cancel</Button>
          <Button type="submit">
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
        <div className=" w-full md:w-3/12 flex mx-2 p-2 rounded-xl flex justify-center items-center">
          <div
            onClick={() => openEditDialog(name, role, email, birthdate, gender)}
            className="mx-1 p-1 rounded-md cursor-pointer transition-all active:scale-90 hover:scale-110 hover:shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >
              <path
                fill="black"
                d="M4 14v-2h7v2zm0-4V8h11v2zm0-4V4h11v2zm9 14v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55q0 .275-.1.563t-.325.512l-5.5 5.5zm6.575-5.6l.925-.975l-.925-.925l-.95.95z"
              />
            </svg>
          </div>
          {/* <div className="mx-1 p-1 rounded-md cursor-pointer transition-all active:scale-90 hover:scale-110 hover:shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
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
