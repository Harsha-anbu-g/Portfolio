import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import "./towinly.css";
import TowinlyPage from "./TowinlyPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TowinlyPage />
  </StrictMode>
);
