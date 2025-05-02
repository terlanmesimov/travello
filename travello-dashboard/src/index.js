import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "../src/assets/scss/index.scss";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Modal from "react-modal";
Modal.setAppElement("#root");

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
