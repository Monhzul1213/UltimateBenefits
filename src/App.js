import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/home";
import { useAuth } from "./context/AuthProvider";

export function App() {
  const { isAuth } = useAuth();
  // const loggedIn = useSelector((state) => state.temp.loggedIn);
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
      <Home />
    </div>
  );
}
