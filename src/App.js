import React, { Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import {
  Learning,
  Careers,
  Rules,
  Home,
  Login,
} from "./pages";
import { useAuth } from "./context/AuthProvider";
import Care from "./pages/care/Care";
import Discounts from "./pages/discounts/Discounts";
import Clubs from "./pages/clubs/Clubs";
import { MyDrawer, Loader } from "./components";
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
                <Route path="/learning" element={<Learning />} />
                <Route path="/clubs" element={<Clubs />} />
              </Routes>
            </Suspense>
          </HistoryRouter>
        </div>
      )}
    </>
  );
}
