import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SwipeableDrawer,
} from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { useDispatch } from "react-redux";
import { setIsOpenDrawer } from "../redux/features/global.slice";
import PersonIcon from "@mui/icons-material/Person";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import { useNavigate } from "react-router-dom";

function LeftDrawer() {
  const reducer = useAppSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const list = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {["Users", "Posts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(`/${text.toLowerCase()}`);
              }}
            >
              {index === 0 && <PersonIcon className="icon-drawer-button" />}
              {index === 1 && (
                <LocalPostOfficeIcon className="icon-drawer-button" />
              )}
              <ListItemText primary={text} sx={{ marginRight: "3rem" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={reducer.isOpenDrawer}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {list()}
    </SwipeableDrawer>
  );
}

export default LeftDrawer;
