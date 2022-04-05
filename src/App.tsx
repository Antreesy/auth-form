import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./redux/reducer";
import { Routes, Route, useNavigate } from "react-router-dom";

import Cookies from "js-cookie"

import { Layout } from "./Components/Layout"
import { Toast } from "./Components/Toast";
import { LoginPage } from "./pages";
import { RegisterPage } from "./pages";
import { MainPage } from "./pages";

export default function App() {
  const navigate = useNavigate();
  const store = useSelector((state: RootState) => {return {auth: state.auth, form: state.form, toast: state.toast}})

  useEffect(()=>{
    if (!Cookies.get('auth_token')) {
      navigate("/login")
    } else navigate("/main")
  } , [store.auth.auth_token])

  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>

      <Toast message={store.toast.message} />
    </Layout>
  );
}










