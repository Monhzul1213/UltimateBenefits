import React from "react";
import { createRoot } from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

import "./index.css";
import { App } from "./App";
import { store, persistor } from "./helpers/store";
import AuthProviver from "./context/AuthProvider";
import CalendarProvider from "./context/CalendarProvider";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <>
        <AuthProviver>
          <CalendarProvider>
            <App />
          </CalendarProvider>
        </AuthProviver>
      </>
    </PersistGate>
  </Provider>
);
