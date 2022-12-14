import './App.css';
import { Navbar } from './Components/NavBar'; 
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import Home from './Pages/Home';
import{ Loader } from './Components/Loader'

export default function App() {
  const [offSetY, setOffSetY] = useState(0);
  const handleOffset = () => setOffSetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleOffset);

    return () => window.removeEventListener('scroll', handleOffset);
  }, []);

  return (
    <>
     <Loader />
    <Router>
      <Navbar />
      <Home setOffSetY={setOffSetY} offSetY={offSetY}/>
      {/* <Routes> */}
        {/* <Route path='/' element={<Home/>}/> */}
      {/* </Routes> */}
    </Router>
    </>
  );
}
