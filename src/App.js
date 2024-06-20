import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { useAuth } from "./context/AuthProvider";
import MyDrawer from "./components/Drawer";
import { Discounts } from "./pages/discounts";

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
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}
