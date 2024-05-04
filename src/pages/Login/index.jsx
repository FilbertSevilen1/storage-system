import React, { useEffect, useRef, useState } from "react";
import "../../css/login.css";
import Heading from "../../components/base/Heading";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";

function Login() {
  const vertical = "top";
  const horizontal = "center";

  const username = useRef();
  const password = useRef();

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const login = () => {
    if (!username.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Username tidak boleh kosong!");
    }
    if (!password.current.value) {
      setSnackbar(true);
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Password tidak boleh kosong!");
    }

    console.log(username.current.value);
    console.log(password.current.value);

    if (username.current.value == "Admin") {
      localStorage.setItem('ss_token',JSON.stringify({user:{ id: 1, name: username.current.value, role: "Admin" }, timestamp: new Date().getTime()}))
      dispatch({
        type: "USER_LOGIN",
        payload: { id: 1, name: username.current.value, role: "Admin" },
      });
      navigate("/home");
    } 
    else if (username.current.value == "SuperAdmin"){
      localStorage.setItem('ss_token',JSON.stringify({user:{ id: 1, name: username.current.value, role: "SuperAdmin" }, timestamp: new Date().getTime()}))
      dispatch({
        type: "USER_LOGIN",
        payload: { id: 1, name: username.current.value, role: "Super Admin" },
      });
      navigate("/home");
    }
    else {
      localStorage.setItem('ss_token',JSON.stringify({user:{ id: 1, name: username.current.value, role: "User" }, timestamp: new Date().getTime()}))
      dispatch({
        
        type: "USER_LOGIN",
        payload: { id: 1, name: username.current.value, role: "User" },
      });
      navigate("/home");
    }
  };
  

  useEffect(() => {

    if (user.role) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="bg-login w-full h-full flex flex-col items-center">
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={snackbar}
        autoHideDuration={3000}
        message={snackbarMessage}
        key={"top" + "center"}
      />
      <div className="w-11/12 xl:w-[900px] p-12 flex flex-col items-center bg-white shadow-2xl my-12 md:my-40 rounded-2xl">
        <Heading title="Login"></Heading>

        <div className="flex flex-col w-full md:w-[450px] text-xl md:text-2xl mt-8">
          <TextField
            inputRef={username}
            id="standard-basic"
            label="Username"
            variant="standard"
            margin="normal"
          />
        </div>
        <div className="flex flex-col w-full md:w-[450px] text-xl md:text-2xl mb-8">
          <TextField
            inputRef={password}
            type="password"
            id="standard-basic"
            label="Password"
            variant="standard"
            margin="normal"
          />
        </div>

        <div className="mt-8">
          <Button variant="contained" size="large" onClick={login}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Login;
