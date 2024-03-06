import { useAuth0 } from "@auth0/auth0-react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { ChannelContext } from "./context/ChannelContext";
import { AuthenticationGuard } from "./lib/AuthGuard";
import { EventList } from "./pages/EventList";
import { Home } from "./pages/Home";
import React from "react";
import "./fonts.css";
import BeatLoader from "react-spinners/BeatLoader";
import "./App.css";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export const App = () => {
  const { isLoading } = useAuth0();
  const [selectedChannel, setSelectedChannel] = React.useState<number | null>(
    null
  );

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
    <ChannelContext.Provider value={{ selectedChannel, setSelectedChannel }}>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route
            path="events"
            element={<AuthenticationGuard component={EventList} />}
          />
          <Route path="/" index element={<Home />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </ChannelContext.Provider>
  );
};

export default App;
