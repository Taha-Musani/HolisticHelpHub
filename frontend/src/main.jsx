import React from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import App from "./App.jsx";
import Hero from "./components/Hero";
import Health from "./components/Health";
import Education from "./components/Education";
import Legal from "./components/Legal";
import Govscheme from "./components/Govscheme";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Hero />,
      },
      {
        path: "health",
        element: <Health />,
      },
      {
        path: "education",
        element: <Education />,
      },
      {
        path: "legal",
        element: <Legal />,
      },
      {
        path: "scheme",
        element: <Govscheme />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
