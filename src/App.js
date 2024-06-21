import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { useAuth } from "./context/AuthProvider";
import MyDrawer from "./components/Drawer";
import { Discounts } from "./pages/discounts";
import { Rules } from "./pages/rules";
import { Careers } from "./pages/careers";
import { Care } from "./pages/care";
import { Learning } from "./pages/learning";
import { Clubs } from "./pages/clubs";

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
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}
