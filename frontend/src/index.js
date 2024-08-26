import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { FoodsContextProvider } from "./context/FoodsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <FoodsContextProvider>
      <App />
    </FoodsContextProvider>
  </React.StrictMode>
);
