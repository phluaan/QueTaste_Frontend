
import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App.jsx";

// Sau khi hoàn thành project, bỏ chế độ StrictMode (Render component 2 lần dẫn đến bug logic - xem product 1 lần +2 view)
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
