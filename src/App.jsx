import React from 'react';
import Navbar from './compoonents/Navbar/Navbar';
import Sidebar from './compoonents/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import Add from './pages/Add/Add';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Orders url={url} />} /> {/* Default route */}
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
