import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppNavbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TransferPoints from './pages/TransferPoints';
import RedeemPoints from './pages/RedeemPoints';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddPoints from './pages/AddPoints'; // Import AddPoints Page
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary'; // Add Error Boundary

const App = () => {
  return (
    <ErrorBoundary>
      <div style={{ backgroundColor: '#F3F4F6', minHeight: '100vh' }}>
        <Router>
          <AppNavbar />
          <div style={{ paddingBottom: '80px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transfer" element={<TransferPoints />} />
              <Route path="/redeem" element={<RedeemPoints />} />
              <Route path="/add-points" element={<AddPoints />} /> {/* Add AddPoints Route */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </ErrorBoundary>
  );
};

export default App;
