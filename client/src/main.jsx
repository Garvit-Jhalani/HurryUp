import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "./auth.context.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Auth from "./Auth.jsx";
import Register from "./Register.jsx";
import Dashboard from "./Dashboard.jsx";
import AddData from "./AddData.jsx";
import ViewTask from "./ViewTask.jsx";
import Progress from "./Progress.jsx";
import AboutUs from "./AboutUs.jsx";
import SetReminder from "./SetReminder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/HurryUp",
    element: <Auth />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "AddData",
        element: <AddData />,
      },
      {
        path: "ViewTask",
        element: <ViewTask />,
      },
      {
        path: "Progress",
        element: <Progress />,
      },
      {
        path: "AboutUs",
        element: <AboutUs />,
      },
      {
        path: "SetReminder",
        element: <SetReminder />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Auth0Provider
        domain="dev-3fjgvbot14tdw8gc.us.auth0.com"
        clientId="lQrr2BMtlYmYcCVuVLnGK0tZ2gEsYHPg"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <RouterProvider router={router} />
      </Auth0Provider>
    </AuthProvider>
  </React.StrictMode>
);
