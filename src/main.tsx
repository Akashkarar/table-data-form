import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import App from "app/app";

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
