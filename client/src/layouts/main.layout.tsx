import { Outlet } from "react-router-dom";
import TopBar from "../components/top-bar.component";

function MainLayout() {
  return (
    <div id="main-layout">
      <TopBar />
      <div id="main-content">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
