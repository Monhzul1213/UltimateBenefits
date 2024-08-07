import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import Rules from "./pages/rules/Rules";

import { Learning, Home, Login, Employees } from "./pages";
import { useAuth } from "./context/AuthProvider";
import Care from "./pages/care/Care";
import Discounts from "./pages/discounts/Discounts";
import Clubs from "./pages/clubs/Clubs";
import { MyDrawer, Loader } from "./components";
import Careers from "./pages/careers/Careers";
export function App() {
  const { isAuth } = useAuth();
  const userToken = sessionStorage.getItem("userToken");
  if (!userToken)
    return (
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );

  return (
    <>
      {isAuth && (
        <div className="App">
          <MyDrawer />
          <HistoryRouter history={createBrowserHistory()}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discounts" element={<Discounts />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/care" element={<Care />} />
                <Route path="/training" element={<Learning />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/employees" element={<Employees />} />
              </Routes>
            </Suspense>
          </HistoryRouter>
        </div>
      )}
    </>
  );
}
