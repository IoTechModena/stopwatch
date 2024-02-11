import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { EventList } from "./pages/EventList";
import "./App.css";
import "./fonts.css";
import { ToasterProvider } from "./context/ToasterContext";
import { useAuth0 } from "@auth0/auth0-react";
import { BeatLoader } from "react-spinners";
import { AuthenticationGuard } from "./components/AuthComponents/AuthGuard";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export const App = () => {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return (
      <>
        <BeatLoader
          className="text-center my-10"
          color="#eab308"
          loading={isLoading}
        />
      </>
    );
  }
  //questo frammento di codice serve per evitare che la pagina si carichi prima che l'utente sia autenticato

  return (
    <ToasterProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route path="id" element={<DetailCamera />} /> */}
          <Route
            path="events"
            element={<AuthenticationGuard component={EventList} />}
          />
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
