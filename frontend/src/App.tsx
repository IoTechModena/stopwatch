import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EventList } from "./pages/EventList";
import "./App.css";
import "./fonts.css";

//import { RequireAuth } from "react-auth-kit";
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
          <Route path="video-list" element={<EventList />} />
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
              <EventList />
            </RequireAuth>

            <RequireAuth loginPath="/login">
              <Home />
            </RequireAuth>
          }
        />
        */
export default App;
