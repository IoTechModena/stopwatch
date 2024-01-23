import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { VideoList } from "./pages/VideoList";
import "./App.css";
//import { RequireAuth } from "react-auth-kit";
import { ToasterProvider } from "./context/ToasterContext";
import { Toaster } from "./components/Toaster";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export const App = () => {
  return (
    <ToasterProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="id" element={<DetailCamera />} /> */}
          <Route path="video-list" element={<VideoList />} />
          <Route path="/" index element={<Home />} />
          <Route path="favorites" element="FavoriteCamera" />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </ToasterProvider>
  );
};

/* ROUTE PROTETTE DA METTERE PRIMA DI ANDARE IN PRODUZIONE
            <RequireAuth loginPath="/login">
              <VideoList />
            </RequireAuth>

            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        />
        */
export default App;
