import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
// import App from './App.tsx'
import Home from './components/home.tsx';
import Dress from './components/dress.tsx';
import Navbar from './components/navbar.tsx';
import ProductDetail from './components/productdetail.tsx';
import Footer from './components/footer.tsx';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<Navbar />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/dress" element={<Dress />} />
        {/* <Route path="/product" element={<ProductDetail />} /> */}
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);