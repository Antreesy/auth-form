import * as React from "react";
import { Routes, Route } from "react-router-dom";

import { Layout } from "./Components/Layout"
import { LoginPage } from "./Components/Pages";
import { RegisterPage } from "./Components/Pages";
import { MainPage } from "./Components/Pages";

import AuthProvider from "./Components/AuthProvider";


export default function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<MainPage />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}










