import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
// import App from './App.tsx'
import Home from './components/home.tsx';
import Dress from './components/dress.tsx';
import Navbar from './components/navbar.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/dress" element={<Dress />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>

);


