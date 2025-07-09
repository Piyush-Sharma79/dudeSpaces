import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { UserProvider } from "./user-context.tsx";
import './fonts.css';
import './App.css';
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <App />
      <Analytics />
    </UserProvider>
  </React.StrictMode>
);
