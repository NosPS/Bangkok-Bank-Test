import ReactDOM from "react-dom/client";
import "./index.css";
import { Providers } from "./redux/provider.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.tsx";
import MainLayout from "./layouts/main.layout.tsx";
import UsersPage from "./pages/users.page.tsx";
import PostsPage from "./pages/posts.page.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route element={<MainLayout />}>
          <Route path="/users">
            <Route index element={<UsersPage />} />
            {/* <Route path="add" element={<AddUserPage />} />
            <Route path="edit" element={<EditUserPage />} /> */}
          </Route>
          <Route path="/posts">
            <Route index element={<PostsPage />} />
            {/* <Route path="add" element={<AddUserPage />} />
            <Route path="edit" element={<EditUserPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Providers>
);
