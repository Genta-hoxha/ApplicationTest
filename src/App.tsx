
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', background: '#f0f0f0' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>Home</Link>
        <Link to="/aboutus" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>About Us</Link>
        <Link to="/contactus" style={{ textDecoration: 'none', color: '#333', padding: '10px' }}>Contact Us</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </Router>
  );
};

export default App;
