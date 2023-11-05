import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import useApi from "../redux/apis/api";
import { useDispatch } from "react-redux";
import { setIsOpenDrawer, setSuccess } from "../redux/features/global.slice";
import PersonIcon from "@mui/icons-material/Person";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import SuccessModel from "../redux/models/success.model";

function TopBar() {
  const [pageName, setPageName] = React.useState("");

  const location = useLocation();
  const dispatch = useDispatch();
  const api = useApi();

  React.useEffect(() => {
    if (location.pathname.startsWith("/users")) {
      setPageName("Users");
    } else if (location.pathname.startsWith("/posts")) {
      setPageName("Posts");
    }
  }, [location.pathname]);

  const logIn = () => {
    api.loginApi(dispatch);
  };

  const logOut = () => {
    localStorage.clear();
    dispatch(
      setSuccess(
        new SuccessModel({
          status: true,
          message: "Logout success",
        })
      )
    );
  };

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      dispatch(setIsOpenDrawer(open));
    };

  return (
    <Box sx={{ flexGrow: 1, gridArea: "top" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundImage: "linear-gradient(to right, #FFD306, #28bf7e)",
          color: "#1b1c1c",
        }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              flexGrow: 1,
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            {pageName === "Users" && <PersonIcon />}
            {pageName === "Posts" && <LocalPostOfficeIcon />}
            <Typography variant="h6" component="div" sx={{ marginLeft: "5px" }}>
              {pageName}
            </Typography>
          </div>
          <Button color="inherit" onClick={logIn}>
            Login
          </Button>
          <Button color="inherit" onClick={logOut}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopBar;
