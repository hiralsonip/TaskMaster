import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root.tsx";
import Home from "./pages/Home.tsx";
import MyTask from "./pages/MyTask.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import Goal from "./pages/Goal.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Profile from './pages/Profile.tsx'
import { AuthContextProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./services/ProtectedRoute.tsx";
import SingleTask from "./pages/SingleTask.tsx";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  // { path: 'profile', element: <Profile /> },

  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "home", element: <Home /> },
          { path: "mytask", element: <MyTask /> },
          { path: "portfolio", element: <Portfolio /> },
          { path: "goal", element: <Goal /> },
          { path: "contactUs", element: <ContactUs /> },
          { path: 'profile', element: <Profile /> },
          { path: 'singletask/:id', element: <SingleTask /> },
        ]
      },
      // { path: "/", element: <Home /> },
      // { path: "home", element: <Home /> },
      // { path: "mytask", element: <MyTask /> },
      // { path: "portfolio", element: <Portfolio /> },
      // { path: "goal", element: <Goal /> },
      // { path: "contactUs", element: <ContactUs /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
