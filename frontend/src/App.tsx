import { Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { EventList } from "./pages/EventList";
import { ToasterProvider } from "./context/ToasterContext";
import { useAuth0 } from "@auth0/auth0-react";
import BeatLoader from "react-spinners/BeatLoader";
import { AuthenticationGuard } from "./components/AuthComponents/AuthGuard";
import "./App.css";
import "./fonts.css";

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

  return (
    <ToasterProvider>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route
            path="events"
            element={<AuthenticationGuard component={EventList} />}
          />
          <Route path="/" index element={<Home />} />
        </Route>
      </Routes>
    </ToasterProvider>
  );
};

export default App;
