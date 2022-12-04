import React, { useState, useEffect, createContext } from "react";
import { Route, Routes, useLocation } from "react-router";
// import { ReactQueryDevtools } from "react-query/devtools";
import qs from "query-string";
import _ from "lodash";
import axios from "axios";
import publicIp from "public-ip";
import { useNavigate } from "react-router-dom";
import { Tag } from "./components/comps";
import { ErrorBoundary } from "./utils/errbou";
import { NoneDispColors } from "./utils/colors";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import SignUp from "./views/SignUp.js";
import Layout from "./layout/Layout.js";
import { AnimatePresence } from "framer-motion";
import { jparse, set_path } from "./utils/utils.js";
import Home from "./views/Home.js";
import HorseStatsPage from "./views/HorseStatsPage.js";

export const backend = // `https://bszedapi.stackednaks.com`;
  true && process.env.NODE_ENV == "development"
    ? `http://localhost:3005`
    : `https://bszedapi.stackednaks.com`;

// const suite_page = "https://zed-blood-v2-suite.vercel.app";
export const test_mode = 0;

export const NowContext = createContext({ now: null });
export const useNowContext = () => useContext(NowContext);
export const AppContext = createContext({});
export const useAppContext = () => useContext(AppContext);

export const fet_user = () => {
  const ud = localStorage.getItem("user");
  if (!ud) return null;
  const userdoc = jparse(ud);
  return userdoc;
};

function App() {
  const history = useNavigate();
  const location = useLocation();
  const searchp = qs.parse(location.search);

  const [now, set_now] = useState(Date.now());
  useEffect(() => {
    setTimeout(() => set_now(Date.now()), 200);
  }, [now]);

  const [appdata, set_appdata] = useState({
    user: fet_user(),
  });

  const update_user = () => {
    const userdoc = fet_user();
    set_path(appdata, set_appdata, "user", userdoc);
  };
  const ud = localStorage.getItem("user");
  useEffect(() => {
    if (!ud) return;
    update_user();
  }, [ud]);

  const appcon = {
    history,
    location,
    appdata,
    set_appdata,
    fet_user,
    update_user,
    searchp,
    psearch: searchp,
  };

  const logout = () => {
    set_path(appdata, set_appdata, "user", null);
    localStorage.removeItem("user");
  };
  appcon.logout = logout;

  return (
    <div className="App bg-dark text-white">
      <NowContext.Provider value={{ now }}>
        <AppContext.Provider value={appcon}>
          <HelmetProvider>
            <Helmet>
              <title>Tourney</title>
            </Helmet>
            <Layout>
              <AnimatePresence>
                <Routes location={location} key={location.key}>
                  <Route
                    exact
                    key="/progress/:hid"
                    path="/progress/:hid"
                    element={<HorseStatsPage />}
                  />
                  <Route exact key="/" path="/" element={<Home />} />
                </Routes>
              </AnimatePresence>
            </Layout>
            <NoneDispColors />
          </HelmetProvider>
        </AppContext.Provider>
      </NowContext.Provider>
    </div>
  );
}

export default App;
