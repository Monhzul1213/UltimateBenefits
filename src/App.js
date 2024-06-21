import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import { Learning, Clubs, Care, Careers, Rules, Discounts, Home, Login } from "./pages";
import { useAuth } from "./context/AuthProvider";
import MyDrawer from "./components/Drawer";

export function App() {
  const { isAuth } = useAuth();
  if (!isAuth)
    return (
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="*" element={<Login />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    );

  return (
    <div className="App">
      <MyDrawer />
      <HistoryRouter history={createBrowserHistory()}>
        <Suspense>
          <Routes>
            <Route path="*" element={<Home />} />
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
  );
}
