import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Import Vendor CSS
import "./assets/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/et-line.css";
import "./assets/css/ionicons.min.css";
import "./assets/css/animate.min.css";

// Import Main CSS
import "./assets/css/main.css";

import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>
);
