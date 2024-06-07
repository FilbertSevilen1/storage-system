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
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
function User() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState("");

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const vertical = "top";
  const horizontal = "center";

  const [addDialog, setAddDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const searchItem = useRef();
  const [listRole, setListRole] = useState(["Admin", "User"]);
  const [listGender, setListGender] = useState(["Laki-laki", "Perempuan"]);
  const [listUser, setListUser] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMaxPage();
  }, [listUser]);

  const getMaxPage = () => {
    if (listUser.length % 5 == 0) {
      setMaxPage(Math.floor(listUser.length / 5));
    } else setMaxPage(Math.floor(listUser.length / 5) + 1);
  };

  const getDataUserList = async () => {
    setLoading(true);
    let body = {
      name: searchItem.current.value,
      roleId: searchUserRole,
      gender: searchUserGender,
    };
    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    await axios
      .post(API_URL + "/user/list", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        const data = res.data.users;

        if (data) {
          setListUser(data);
          generateUserData();
          setLoading(false);
        } else {
          setSnackbar(true);
          setTimeout(() => {
            setSnackbar(false);
          }, 3000);
          setLoading(false);
          return setSnackbarMessage("Get Data Gagal");
        }
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        setLoading(false);
        return setSnackbarMessage(err.response.data.message);
      });
  };

  const getUserList = () => {
    getDataUserList();
  };

  const prevPage = () => {
    if (page <= 1) return;
    setPage(page - 1);
  };

  const nextPage = () => {
    if (page >= maxPage) return;
    setPage(page + 1);
  };

  const generateUserData = () => {
    if (listUser) {
      return listUser.map((user, index) => {
        if ((page - 1) * 5 < index + 1 && index + 1 <= page * 5)
          return (
            <UserRow
              index={index}
              key={index}
              userIndex={index + 1}
              userId={user.id}
              userName={user.name}
              userRoleId={user.roleId}
              userRole={user.roleName}
              userEmail={user.email}
              userBirthdate={user.dateOfBirth}
              userGender={user.gender}
              userPhone={user.phoneNumber}
              userCitizenId={user.ktp}
              userStatus={user.isActive}
              page={page}
            ></UserRow>
          );
      });
    }
  };

  const generateGenderData = () => {
    if (listGender) {
      return listGender.map((gender, index) => {
        return <MenuItem value={gender}>{gender}</MenuItem>;
      });
    }
  };

  const openAddDialog = () => {
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

  const handleInputGender = (event) => {
    setPage(1);
    setAddUserGender(event.target.value);
  };

  const handleInputSearchJabatan = (event) => {
    setPage(1);
    setSearchUserRole(event.target.value);
  };

  const handleInputSearchGender = (event) => {
    setPage(1);
    setSearchUserGender(event.target.value);
  };

  const handleSearchNameKeyDown = (event) => {
    if (event.key == "Enter") {
      setPage(1);
      getDataUserList();
    }
  };

  const resetFilter = () => {
    setSearchUserRole("");
    setSearchUserGender("");
    getDataUserList();
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

    if (addUserPhone.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nomor Telepon tidak boleh kosong");
    }

    if (addUserCitizenId.current.value == "") {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Nomor KTP tidak boleh kosong");
    }

    let body = {
      name: addUserName.current.value,
      password: addUserPassword.current.value,
      gender: addUserGender,
      email: addUserEmail.current.value,
      phoneNumber: addUserPhone.current.value,
      ktp: addUserCitizenId.current.value,
      birthDate: addUserBirthDate.current.value,
      roleId: "54013ecf-d55e-4588-9a64-f93cdba97267",
    };

    if (localStorage.getItem("bearer_token") == null) return navigate("/");
    const token = JSON.parse(localStorage.getItem("bearer_token"));

    axios
      .post(API_URL + "/user/register", body, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      })
      .then((res) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
          window.location.reload();
        }, 1000);
        return setSnackbarMessage("Penambahan User Berhasil");
      })
      .catch((err) => {
        setSnackbar(true);
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage(err.response.data.message);
      });

    return closeAddDialog();
  };

  useEffect(() => {
    let userdata = "";
    if (localStorage.getItem("ss_token")) {
      const logindata = localStorage.getItem("ss_token");
      const { user, timestamp } = JSON.parse(logindata);
      userdata = user;
    }
    if (userdata.role == "User") {
      return navigate("/");
    }
    getUserList();
  }, [searchUserGender, searchUserRole]);

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
                margin="dense"
                id="name"
                name="name"
                label="Nama"
                type="text"
                fullWidth
                variant="outlined"
                inputRef={addUserName}
              />
            </div>
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="Password"
                type="password"
                fullWidth
                variant="outlined"
                inputRef={addUserPassword}
              />
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
                inputRef={addUserEmail}
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
                inputRef={addUserBirthDate}
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
                  value={addUserGender}
                  label="Jenis Kelamin"
                  onChange={handleInputGender}
                  placeholder="Jenis Kelamin"
                  fullWidth
                >
                  {generateGenderData()}
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
                inputRef={addUserPhone}
              />
            </div>
            <div className="p-2 w-1/2">
              <TextField
                margin="dense"
                id="ktp"
                name="name"
                label="Nomor KTP"
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
              onKeyDown={handleSearchNameKeyDown}
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
            <HorizontalDivider></HorizontalDivider>
            <div className="w-full mt-4">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Jabatan</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={searchUserRole}
                  label="Jabatan"
                  onChange={handleInputSearchJabatan}
                  placeholder="Jabatan"
                  fullWidth
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
            <div className="mt-4">
              <Button
                onClick={resetFilter}
                variant="contained"
                size="large"
                fullWidth
              >
                Reset Filter
              </Button>
            </div>
          </div>
          <div className="bg-white w-full h-full xl:w-3/4 p-4 shadow-xl mt-4 md:mt-0 xl:ml-4 flex-col justify-between">
            <UserHeader></UserHeader>
            {loading ? <></> : <>{generateUserData()}</>}

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
