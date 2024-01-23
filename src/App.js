import "./App.css";
import { Navbar } from "./Components/NavBar";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import { Loader } from "./Components/Loader";
import { Projects } from "./Pages/Projects";
import { Weather } from "./Pages/Weather";
import { Cookbook } from "./Pages/Cookbook";
import { Social } from "./Pages/Social";
import ProductShowcase from "./Pages/ProductShowcase";
import Maintenance from "./Pages/Maintenance";

export default function App() {
    const [offSetY, setOffSetY] = useState(0);
    const handleOffset = () => setOffSetY(window.pageYOffset);
    const [bgColor, setBgColor] = useState("rgb(0,0,0)");
    const [textColor, setTextColor] = useState("rgb(225,225,225)");

    useEffect(() => {
        window.addEventListener("scroll", handleOffset);

        return () => window.removeEventListener("scroll", handleOffset);
    }, []);

    return (
        <>
            <Loader />
            <Router>
                <div style={{ backgroundColor: bgColor, color: textColor }}>
                    <Navbar textColor={textColor} />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <Home
                                    setOffSetY={setOffSetY}
                                    offSetY={offSetY}
                                    setBgColor={setBgColor}
                                    bgColor={bgColor}
                                    setTextColor={setTextColor}
                                    style={{
                                        backgroundColor: bgColor,
                                        color: "white",
                                    }}
                                />
                            }
                        />
                        <Route path="/Projects" element={<Projects />} />
                        <Route
                            path="/ProductShowcase"
                            element={<ProductShowcase />}
                        />
                        <Route
                            path="/Weather"
                            element={<Weather {...process.env} />}
                        />
                        <Route path="/Cookbook" element={<Cookbook />} />
                        <Route
                            path="/Social"
                            element={<Social {...process.env} />}
                        />
                        <Route path="/Maintenance" element={<Maintenance />} />
                    </Routes>
                </div>
            </Router>
        </>
    );
}
