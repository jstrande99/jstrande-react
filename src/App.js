import './App.css';
import { Navbar } from './Components/NavBar'; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import{ Loader } from './Components/Loader'

export default function App() {
  return (
    <>
     <Loader />
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}/>
      </Routes>
    </Router>
    </>
  );
}
