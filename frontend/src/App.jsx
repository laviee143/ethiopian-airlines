import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <div>
      <header>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>✈️ Ethiopian Airlines</Link>
          </div>
          <nav>
            <Link to="/admin" style={{ color: 'white', textDecoration: 'none', marginLeft: '20px' }}>Admin Panel</Link>
          </nav>
        </div>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
