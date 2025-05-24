import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";

// layout
import Layout from "./components/Layout";
import DashboardLayout from "./components/dashboard-layout";

// user page
import Register from "./components/user/user-register";
import Login from "./components/user/user-login";
import Profile from "./components/user/user-profile";
import Logout from "./components/user/user-logout";

// contact page
import ContactCreate from "./components/contact/contact-create";
import ContactEdit from "./components/contact/contact-edit";
import ContactList from "./components/contact/contact-list";
import ConctactDetail from "./components/contact/contact-detail";

// state
import Navigate from "./components/navigate";
import NotFound from "./components/error/404";
import ServerError from "./components/error/5xx";
import AddressCreate from "./components/address/address-create";
import AddressEdit from "./components/address/address-edit";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="users">
            <Route path="profile" element={<Profile />}></Route>
            <Route path="logout" element={<Logout />}></Route>
          </Route>

          <Route path="contacts">
            <Route index element={<ContactList />}></Route>
            <Route path="create" element={<ContactCreate />} />
            <Route path=":id">
              <Route index element={<ConctactDetail />} />
              <Route path="edit" element={<ContactEdit />} />
              <Route path="address">
                <Route path="create" element={<AddressCreate />} />
                <Route path=":id_address">
                  <Route path="edit" element={<AddressEdit />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<Navigate />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/server-error" element={<ServerError />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
