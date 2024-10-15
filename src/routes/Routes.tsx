import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "../components/Home";
import AboutUs from "../components/AboutUs";
const MyRoutes = () => {
  return (
<BrowserRouter>
   <main>
     <Routes>
    <Route  path="/" element={<Home />} />
    <Route path="aboutus" element={<AboutUs />} />
  
  </Routes>
 </main>
  </BrowserRouter>
);
};

export default MyRoutes;