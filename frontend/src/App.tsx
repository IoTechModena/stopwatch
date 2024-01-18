import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { VideoList } from "./pages/VideoList";
import "./App.css";

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
        <Route index element={<Home />} />
        {/* <Route path="id" element={<DetailCamera />} /> */}
        <Route path="video-list" element={<VideoList />} />
        <Route path="favorites" element="FavoriteCamera" />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default App;

// If you are using the Refresh Token feature, then you must add
//the refresh prop with proper value, otherwise refresh token will throw
//a not implemented error. If you are not using the Refresh Token feature,
// then don't add it
