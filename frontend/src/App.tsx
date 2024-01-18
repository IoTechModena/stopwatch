import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { VideoList } from "./pages/VideoList";
import "./App.css";
import { RequireAuth } from "react-auth-kit";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* <Route path="id" element={<DetailCamera />} /> */}
        <Route
          path="video-list"
          element={
            <RequireAuth loginPath="/login">
              <VideoList />
            </RequireAuth>
          }
        />
        <Route
          path="/"
          index
          element={
            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        />
        <Route path="favorites" element="FavoriteCamera" />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;
