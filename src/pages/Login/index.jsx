import React, { useEffect, useRef, useState } from "react";
import "../../css/login.css";
import Heading from "../../components/base/Heading";
import { Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
import LoadingFull from "../../components/base/LoadingFull";

const API_URL = process.env.REACT_APP_API_URL;
function Login() {
  const [loading,setLoading] = useState(false);

  const vertical = "top";
  const horizontal = "center";

  const email = useRef();
  const password = useRef();

  const [snackbar, setSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const login = () => {
    setLoading(true)
    
    if (!email.current.value) {
      setSnackbar(true);
      setLoading(false)
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Email tidak boleh kosong!");
    }
    if (!password.current.value) {
      setSnackbar(true);
      setLoading(false)
      setTimeout(() => {
        setSnackbar(false);
      }, 3000);
      return setSnackbarMessage("Password tidak boleh kosong!");
    }

    let body = {
      email: email.current.value,
      password: password.current.value,
    };

    let header = {
      "Access-Control-Allow-Origin": "*",
    };

    axios
      .post(API_URL + "/auth/login", body, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          // Add other headers as needed
        },
      })
      .then((res) => {
        console.log(res.data.token);
        const token = res.data.token;
        localStorage.setItem(
          "bearer_token",
          JSON.stringify({
            token: token,
            timestamp: new Date().getTime(),
          })
        );
        const user = res.data.user;
        localStorage.setItem(
          "ss_token",
          JSON.stringify({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.roleName,
            },
            timestamp: new Date().getTime(),
          })
        );
        dispatch({
          type: "USER_LOGIN",
          payload: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.roleName,
          },
        });
        setLoading(false)
        navigate("/home");
      })
      .catch((err) => {
        setSnackbar(true);
        setLoading(false)
        setTimeout(() => {
          setSnackbar(false);
        }, 3000);
        return setSnackbarMessage(err.response.data.message);
      });
  };

  useEffect(() => {
    if (user.role) {
      navigate("/home");
    }
  }, [user]);

  return (
    <div className="bg-login w-full h-full flex flex-col items-center">
      {
        loading?
        <LoadingFull>

        </LoadingFull>
        :
        <>
        </>
      }
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
            inputRef={email}
            id="standard-basic"
            label="Email"
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
