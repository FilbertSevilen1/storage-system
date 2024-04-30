import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import PeralatanRow from "../../components/PeralatanRow";
import PeralatanHeader from "../../components/PeralatanHeader";
import Heading from "../../components/base/Heading";
import KategoriHeader from "../../components/KategoriHeader";
import KategoriRow from "../../components/KategoriRow";
import UserRow from "../../components/UserRow";
import UserHeader from "../../components/UserHeader";
import HorizontalDivider from "../../components/base/HorizontalDivider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
function User() {
  const user = useSelector((state)=>state.user)
  const navigate = useNavigate()
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [addDialog, setAddDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const searchItem = useRef();
  const [listRole, setListRole] = useState([
    'Admin', 'User'
  ])
  const [listGender,setListGender] = useState([
    'Laki-laki', 'Perempuan'
  ])
  const [listUser, setListUser] = useState([
    {
      user_id: "1",
      user_name: "Greg Sutarto",
      user_role: "Admin",
      user_email: "tarto@gmail.com",
      user_birthdate: "2024-01-01",
      user_gender: "Laki-laki",
      user_phone_number: "123123123123",
      user_citizen_id: "1111222244445555",
    },
    {
      user_id: "2",
      user_name: "Ig Warsito",
      user_role: "Admin",
      user_email: "ito@gmail.com",
      user_birthdate: "2024-01-01",
      user_gender: "Laki-laki",
      user_phone_number: "123123123123",
      user_citizen_id: "1111222244445555",
    },
    {
      user_id: "3",
      user_name: "Ari",
      user_role: "User",
      user_email: "ari@gmail.com",
      user_birthdate: "2024-01-01",
      user_gender: "Laki-laki",
      user_phone_number: "123123123123",
      user_citizen_id: "1111222244445555",
    },
  ]);

  useEffect(() => {
    if(user.role!="Super Admin"){
      navigate("/")
    }
    getUserList();
  }, [page]);

  const getUserList = () => {
    if (listUser.length % 5 === 0) {
      setMaxPage(Math.floor(listUser.length / 5));
    } else setMaxPage(Math.floor(listUser.length / 5) + 1);
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const generateKategoriData = () => {
    if (listUser) {
      return listUser.map((user, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <UserRow
              index={index}
              key={index}
              userId={user.user_id}
              userName={user.user_name}
              userRole={user.user_role}
              userEmail={user.user_email}
              userBirthdate={user.user_birthdate}
              userGender={user.user_gender}
              userPhone={user.user_phone_number}
              userCitizenId={user.user_citizen_id}
              page={page}
            ></UserRow>
          );
      });
    }
  };

  const generateRoleData = () =>{
    if(listRole){
      return listRole.map((role,index)=>{
        return(
          <MenuItem value={role}>{role}</MenuItem>
        )
      })
    }
  }
  const generateGenderData = () =>{
    if(listGender){
      return listGender.map((gender,index)=>{
        return(
          <MenuItem value={gender}>{gender}</MenuItem>
        )
      })
    }
  }

  const openAddDialog = () => {
    resetErrorMessage();
    setAddDialog(true);
  };
  const closeAddDialog = () => {
    setAddDialog(false);
  };

  // Search
  const [searchUserRole, setSearchUserRole] = useState("");
  const [searchUserGender, setSearchUserGender] = useState("");


  const addUserName = useRef("");
  const addUserPassword = useRef("");
  const addUserEmail = useRef("");
  const [addUserGender, setAddUserGender] = useState("");
  const addUserBirthDate = useRef("");
  const addUserPhone = useRef("");
  const addUserCitizenId = useRef("");

  // Error Handling
  const [errorAddUserName, setErrorAddUserName] = useState(false);
  const [errorAddUserNameMessage, setErrorAddUserNameMessage] = useState("");
  const [errorAddUserPassword, setErrorAddUserPassword] = useState(false);
  const [errorAddUserPasswordMessage, setErrorAddUserPasswordMessage] =
    useState("");
  const [errorAddUserEmail, setErrorAddUserEmail] = useState(false);
  const [errorAddUserEmailMessage, setErrorAddUserEmailMessage] = useState("");
  const [errorAddUserBirthDate, setErrorAddUserBirthDate] = useState(false);
  const [errorAddUserBirthDateMessage, setErrorAddUserBirthDateMessage] =
    useState("");
  const [errorAddUserGender, setErrorAddUserGender] = useState(false);
  const [errorAddUserGenderMessage, setErrorAddUserGenderMessage] =
    useState("");


    const resetErrorMessage = () =>{
      setErrorAddUserName(false);
      setErrorAddUserNameMessage("");
      setErrorAddUserEmail(false);
      setErrorAddUserEmailMessage("");
      setErrorAddUserBirthDate(false);
      setErrorAddUserBirthDateMessage("");
      setErrorAddUserPassword(false);
      setErrorAddUserPasswordMessage("");
      setErrorAddUserGender(false);
      setErrorAddUserGenderMessage("");
    }

  const checkErrorUsername = () => {
    if (!addUserName.current.value) {
      setErrorAddUserName(true);
      return setErrorAddUserNameMessage("Username tidak boleh kosong!");
    }
    setErrorAddUserName(false);
    setErrorAddUserNameMessage("");
  };
  const checkErrorEmail = () => {
    if (!addUserEmail.current.value) {
      setErrorAddUserEmail(true);
      return setErrorAddUserEmailMessage("Email tidak boleh kosong!");
    }
    setErrorAddUserEmail(false);
    setErrorAddUserEmailMessage("");
  };

  const checkErrorBirthDate = () => {
    if (!addUserBirthDate.current.value) {
      setErrorAddUserBirthDate(true);
      return setErrorAddUserBirthDateMessage(
        "Tanggal Lahir tidak boleh kosong!"
      );
    }
    setErrorAddUserBirthDate(false);
    setErrorAddUserBirthDateMessage("");
  };

  const checkErrorPassword = () => {
    if (!addUserPassword.current.value) {
      setErrorAddUserPassword(true);
      return setErrorAddUserPasswordMessage("Password tidak boleh kosong!");
    }
    setErrorAddUserPassword(false);
    setErrorAddUserPasswordMessage("");
  };

  const checkErrorGender = () => {
    if (!addUserGender) {
      setErrorAddUserGender(true);
      return setErrorAddUserGenderMessage("Gender tidak boleh kosong!");
    }
    setErrorAddUserGender(false);
    setErrorAddUserGenderMessage("");
  };

  const handleInputGender = (event) => {
    setAddUserGender(event.target.value);
  };

  const handleInputSearchJabatan = (event) => {
    setSearchUserRole(event.target.value);
  };

  const handleInputSearchGender = (event) => {
    setSearchUserGender(event.target.value);
  };


  const onSubmit = () => {
    if (addUserName.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Username tidak boleh kosong");
    }
    if (addUserPassword.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Passsword tidak boleh kosong");
    }
    if (addUserEmail.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Email tidak boleh kosong");
    }
    if (addUserBirthDate.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Tanggal Lahir tidak boleh kosong");
    }
    if (addUserGender == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Jenis Kelamin tidak boleh kosong");
    }
    return closeAddDialog();
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
      <Dialog open={addDialog} onClose={closeAddDialog}>
        <DialogTitle>Tambah User</DialogTitle>
        <DialogContent>
          <div className="w-full flex justify-between flex-wrap">
            <div className="p-2 w-1/2">
              <TextField
                error={errorAddUserName}
                onChange={checkErrorUsername}
                margin="dense"
                id="name"
                name="name"
                label="Nama"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={addUserName}
              />
              <div className="text-red-500 text-md">
                {errorAddUserNameMessage}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                error={errorAddUserPassword}
                onChange={checkErrorPassword}
                margin="dense"
                id="name"
                name="name"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                inputRef={addUserPassword}
              />
              <div className="text-red-500 text-md">
                {errorAddUserPasswordMessage}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                error={errorAddUserEmail}
                onChange={checkErrorEmail}
                margin="dense"
                id="name"
                name="name"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={addUserEmail}
              />
              <div className="text-red-500 text-md">
                {errorAddUserEmailMessage}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                InputLabelProps={{ shrink: true }}
                error={errorAddUserBirthDate}
                onChange={checkErrorBirthDate}
                margin="dense"
                id="name"
                name="name"
                label="Tanggal Lahir"
                type="date"
                fullWidth
                variant="outlined"
                inputRef={addUserBirthDate}
              />
              <div className="text-red-500 text-md">
                {errorAddUserBirthDateMessage}
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
                  value={addUserGender}
                  label="Jenis Kelamin"
                  onChange={handleInputGender}
                  placeholder="Jenis Kelamin"
                  fullWidth
                >
                  {generateGenderData()}
                </Select>
              </FormControl>
              <div className="text-red-500 text-md">
                {errorAddUserGenderMessage}
              </div>
            </div>
            <div className="p-2 w-1/2">
              <TextField
                onChange={checkErrorEmail}
                margin="dense"
                id="name"
                name="name"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={addUserPhone}
              />
            </div>
            <div className="p-2 w-1/2">
              <TextField
                onChange={checkErrorEmail}
                margin="dense"
                id="name"
                name="name"
                label="Email"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={addUserCitizenId}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAddDialog}>Cancel</Button>
          <Button onClick={onSubmit} type="submit">
            <b>Tambah</b>
          </Button>
        </DialogActions>
      </Dialog>

      <div className="w-11/12 md:w-10/12 mx-auto flex flex-row flex-wrap justify-between mt-20">
        <div>
          <Heading title="List User"></Heading>
        </div>

        <div className="bg-white w-full flex items-center mt-8 shadow-md px-8 py-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5q0-2.725 1.888-4.612T9.5 3q2.725 0 4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5q0-1.875-1.312-3.187T9.5 5Q7.625 5 6.313 6.313T5 9.5q0 1.875 1.313 3.188T9.5 14"
            />
          </svg>
          <div className="w-full ml-4">
            <Input
              inputRef={searchItem}
              id=""
              label="Username"
              variant="standard"
              className="w-full"
              placeholder="Cari User Berdasarkan Nama di sini"
            />
          </div>
        </div>
        <div className="w-full flex flex-col xl:flex-row mb-12 mt-4">
          <div className="w-full bg-white h-fit xl:w-1/4 p-4 md:p-4 shadow-md">
            <div className="w-full">
              <Button
                onClick={openAddDialog}
                variant="contained"
                size="large"
                fullWidth
              >
                + Tambah User
              </Button>
            </div>
            <HorizontalDivider>

            </HorizontalDivider>
            <div className="w-full mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Jabatan
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchUserRole}
                  label="Jabatan"
                  onChange={handleInputSearchJabatan}
                  placeholder="Jabatan"
                  fullWidth
                >
                  {generateRoleData()}
                </Select>
              </FormControl>
            </div>
            <div className="w-full mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Jenis Kelamin
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchUserGender}
                  label="Jenis Kelamin"
                  onChange={handleInputSearchGender}
                  placeholder="Jenis Kelamin"
                  fullWidth
                >
                  {generateGenderData()}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <UserHeader></UserHeader>
            {generateKategoriData()}
            <div className="w-full justify-end items-center mt-4 flex">
              <Button onClick={prevPage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="m14 17l-5-5l5-5z" />
                </svg>
              </Button>
              <div className="mx-2">
                {page} / {maxPage}
              </div>
              <Button onClick={nextPage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path fill="currentColor" d="M10 17V7l5 5z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default User;
