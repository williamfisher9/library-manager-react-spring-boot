import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import Error from "./components/Error";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import UserHome from "./components/User/Home/UserHome";
import NewItemModal from "./components/NewItemModal/NewItemModal";
import Details from "./components/Details/Details";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index  element={<Home />}/>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="user-home" element={<UserHome />} />
        <Route path="user-home/add" element={<NewItemModal />} />
        <Route path="user-home/:id" element={<Details />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
