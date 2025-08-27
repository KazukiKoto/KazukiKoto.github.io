import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Landing from './pages/Landing';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Landing</Link> |{' '}
        <Link to="/projects">Projects</Link> |{' '}
        <Link to="/contact">Contact</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
