import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import React, { useState } from "react";
import { VisuallyHiddenInput } from "../component/styles/StyledComponent";
import { UserLogin } from "../redux/slices/LoginSlice";
import { useDispatch, useSelector } from "react-redux";
import { UserRegister } from "../redux/slices/RegisterSlice";
import { useInputValidation, useFileHandler } from "6pp";
import { usernameValidator } from "../utility/validator";
import { Cookies } from "react-cookie";

import Notify from "../component/shared/Notify";

function LoginRegister() {
  const [isLogin, setisLogin] = useState(true);
  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  const avatar = useFileHandler("single");

  const dispatch = useDispatch();
  const cookies = new Cookies();


  const [formDataLogin, setformDataLogin] = useState({
    username: "",
    password: "",
  });

  // const [registerForm, setregisterForm] = useState({
  //   avatar: "",
  //   name: "",
  //   bio: "",
  //   username: "",
  //   password: "",
  // });

  // const handleChangeRegister = (e) => {
  //   const { name, value } = e.target;
  //   setregisterForm((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformDataLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // const uploadFile = (event) => {
  //   let files = event.target.files[0];
  //   if (files) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       resizeImage(reader.result, 400, 400, (resizedImage) => {
  //         setregisterForm({
  //           ...registerForm,
  //           avatar: resizedImage,
  //         });
  //       });
  //     };
  //     reader.readAsDataURL(files);
  //   }
  // };

  //   const uploadFile = (event) => {
  //     let files = event.target.files[0];
  //     if (files) {
  //         const reader = new FileReader();
  //         reader.onload = () => {
  //             setregisterForm({ avatar: reader.result });
  //         };
  //         reader.readAsDataURL(files);
  //     }
  // }

  // const resizeImage = (base64Str, maxWidth, maxHeight, callback) => {
  //   const img = new Image();
  //   img.src = base64Str;
  //   img.onload = () => {
  //     let width = img.width;
  //     let height = img.height;

  //     if (width > height) {
  //       if (width > maxWidth) {
  //         height *= maxWidth / width;
  //         width = maxWidth;
  //       }
  //     } else {
  //       if (height > maxHeight) {
  //         width *= maxHeight / height;
  //         height = maxHeight;
  //       }
  //     }

  //     const canvas = document.createElement("canvas");
  //     const ctx = canvas.getContext("2d");
  //     canvas.width = width;
  //     canvas.height = height;
  //     ctx.drawImage(img, 0, 0, width, height);
  //     callback(canvas.toDataURL("image/jpeg"));
  //   };
  // };

  const handalRegister = async (e) => {
    const formData = new FormData();
    formData.append("name", name.value);
    formData.append("avatar", avatar.file);
    formData.append("bio", bio.value);
    formData.append("username", username.value);
    formData.append("password", password.value);

    let result = await dispatch(UserRegister(formData));
    if (result.type === "register/fulfilled") {
      Notify("success", result.payload.message, "");
    } else {
      Notify("error", result.error.message, "");
    }
  };

  const handalLogin = async (e) => {
    let result = await dispatch(UserLogin(formDataLogin));
    if (result.type === "login/fulfilled") {
      Notify("success", result.payload.message, "");
    } else {
      Notify("error", result.error.message, "");
    }
  };
  return (
    <>
      <div
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,200,200,0.5),rgba(120,110,220,0.5))",
        }}
      >
        <Container
          maxWidth="xs"
          component={"main"}
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              borderRadius: "10px",
            }}
          >
            {isLogin ? (
              <>
                <Typography variant="h5">Login</Typography>
                <form style={{ width: "100%", marginTop: "1rem" }}>
                  <TextField
                    required
                    fullWidth
                    label="UserName"
                    margin="normal"
                    name="username"
                    variant="outlined"
                    onChange={handleChange}
                  />

                  <TextField
                    required
                    type="password"
                    fullWidth
                    label="Password"
                    name="password"
                    margin="normal"
                    variant="outlined"
                    onChange={handleChange}
                  />
                  <Button
                    sx={{ marginTop: "1rem" }}
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="button"
                    onClick={handalLogin}
                  >
                    Login
                  </Button>
                  <Typography textAlign={"center"} m={"1rem"}>
                    Or
                  </Typography>
                  <Button
                    fullWidth
                    variant="text"
                    onClick={() => setisLogin(false)}
                  >
                    Sign Up
                  </Button>
                </form>
              </>
            ) : (
              <>
                <Typography variant="h5">Sign up</Typography>
                <form style={{ width: "100%", marginTop: "1rem" }}>
                  <Stack position={"relative"} width={"10rem"} margin={"auto"}>
                    <Avatar
                      sx={{
                        width: "10rem",
                        height: "10rem",
                        objectFit: "contain",
                      }}
                      src={avatar.preview}
                      name="avatar"
                    />

                    <IconButton
                      sx={{
                        position: "absolute",
                        bottom: "0",
                        right: "0",
                        color: "white",
                        bgcolor: "rgba(0,0,0,0.5)",
                        ":hover": {
                          bgcolor: "rgba(0,0,0,0.7)",
                        },
                      }}
                      component="label"
                    >
                      <>
                        <AddAPhotoIcon />
                        <VisuallyHiddenInput
                          type="file"
                          onChange={avatar.changeHandler}
                        />
                      </>
                    </IconButton>
                  </Stack>

                  {avatar.error && (
                    <Typography
                      color="error"
                      varient="caption"
                      m={"1rem auto"}
                      width={"fit-content"}
                      display={"block"}
                    >
                      {avatar.error}
                    </Typography>
                  )}

                  <TextField
                    required
                    fullWidth
                    label="Name"
                    margin="normal"
                    variant="outlined"
                    name="name"
                    value={name.value}
                    onChange={name.changeHandler}
                  />

                  <TextField
                    required
                    fullWidth
                    label="Bio"
                    margin="normal"
                    variant="outlined"
                    value={bio.value}
                    onChange={bio.changeHandler}
                  />

                  <TextField
                    required
                    fullWidth
                    label="UserName"
                    margin="normal"
                    variant="outlined"
                    name="username"
                    value={username.value}
                    onChange={username.changeHandler}
                  />
                  {username.error && (
                    <Typography color="error" varient="caption">
                      {username.error}
                    </Typography>
                  )}

                  <TextField
                    required
                    type="password"
                    fullWidth
                    label="Password"
                    margin="normal"
                    variant="outlined"
                    name="password"
                    value={password.value}
                    onChange={password.changeHandler}
                  />
                  {password.error && (
                    <Typography color="error" varient="caption">
                      {password.error}
                    </Typography>
                  )}
                  <Button
                    sx={{ marginTop: "1rem" }}
                    variant="contained"
                    fullWidth
                    color="primary"
                    type="button"
                    onClick={handalRegister}
                  >
                    Register
                  </Button>
                  <Typography textAlign={"center"} m={"1rem"}>
                    Or
                  </Typography>
                  <Button
                    fullWidth
                    variant="text"
                    onClick={() => setisLogin(true)}
                  >
                    Sign In
                  </Button>
                </form>
              </>
            )}
          </Paper>
        </Container>
      </div>
    </>
  );
}

export default LoginRegister;
