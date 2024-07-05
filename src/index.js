import React from "react";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import "./index.css";
import { App } from "./App";
import { store, persistor } from "./helpers/store";
import AuthProvider from "./context/AuthProvider";
import CalendarProvider from "./context/CalendarProvider";
import EmployeeProvider from "./context/EmployeeProvider";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <>
        <AuthProvider>
          <CalendarProvider>
            <EmployeeProvider>
              <App />
            </EmployeeProvider>
          </CalendarProvider>
        </AuthProvider>
      </>
    </PersistGate>
  </Provider>
);
