import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EventList } from "./pages/EventList";
import "./App.css";
import "./fonts.css";
import { ToasterProvider } from "./context/ToasterContext";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export const App = () => {
  return (
    <ToasterProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="id" element={<DetailCamera />} /> */}
          <Route path="events" element={<EventList />} />
          <Route path="/" index element={<Home />} />
          <Route path="favorites" element="FavoriteCamera" />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </ToasterProvider>
  );
};

export default App;
