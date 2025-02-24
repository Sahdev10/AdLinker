import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "../home/Home.jsx";
import { SignInPage } from "../component/tools/signin/SignInPage.jsx";
import SignupForm from "../component/tools/register/advertiser/SignupForm.jsx";
import Publisher from "../../server/models/Publisher.js";
import { PublisherWallForm } from "../component/tools/publisher/PublisherWallForm.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="/register" element={<SignupForm />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/Publisher" element={<PublisherWallForm />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App/> */}
  </StrictMode>
);
