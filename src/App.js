import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';

function App () {

  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
