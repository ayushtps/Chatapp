import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { Suspense, lazy, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ContrastColor } from "../color";
import Notify from "../component/shared/Notify";
import { logOutUser } from "../redux/slices/LogoutSlice";

const Searchs = lazy(() => import("../component/specific/Searchs"));
const Notification = lazy(() => import("../component/specific/Notification"));
const Newgroup = lazy(() => import("../component/specific/NewGroup"));

function Header() {
  const [mobileView, setmobileView] = useState(false);
  const [isSearch, setisSearch] = useState(false);
  const [isNewGroup, setisNewGroup] = useState(false);
  const [isNotification, setisNotification] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handalMobile = () => {
    setmobileView(!mobileView);
  };
  const openSeachDialog = () => {
    setisSearch(!isSearch);
  };
  const openNewGroup = () => {
    setisNewGroup(!isNewGroup);
  };
  const navigateToGroup = () => {
    navigate("/group");
  };
  const openNotification = () => {
    setisNotification(!isNotification);
  };

  const logOutbtn = async () => {
    let result = await dispatch(logOutUser());
    if (result.type === "logout/fulfilled") {
      Notify("success", result.payload.message, "");
      window.location.reload()
    } else {
      Notify("error", result.error.message, "");
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: ContrastColor,
            boxShadow: "none",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Mychatt
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handalMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSeachDialog}
              />

              <IconBtn
                title={"New group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />

              <IconBtn
                title={"Manage group"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />

              <IconBtn
                title={"Notification"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />

              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logOutbtn}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Searchs />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <Notification />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <Newgroup />
        </Suspense>
      )}
    </>
  );
}

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="larger" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
