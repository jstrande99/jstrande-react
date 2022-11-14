import './App.css';
import { Navbar } from './Components/NavBar'; 
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' exact component={Home}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
