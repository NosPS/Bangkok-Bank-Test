import { Outlet } from "react-router-dom";
import TopBar from "../components/top-bar.component";
import { SnackbarProvider } from "notistack";
import SnackbarManager from "../components/snackbar-manager.component";
import LeftDrawer from "../components/left-drawer.component";

function MainLayout() {
  return (
    <SnackbarProvider maxSnack={3}>
      <SnackbarManager />
      <LeftDrawer />
      <div id="main-layout">
        <TopBar />
        <div id="main-content">
          <Outlet />
        </div>
      </div>
    </SnackbarProvider>
  );
}

export default MainLayout;
