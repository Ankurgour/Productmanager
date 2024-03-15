import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import RegistrationForm from './pages/Register';
import LoginForm from './pages/Login';
import AuthenticatedElement from './components/AuthenticatedRoute';
import ProductsDisplay from './pages/Products/ProductsDisplay';
import ProductDetail from './pages/Products/ProductsDetail';

// Placeholder components for your pages
const Dashboard = () => <ProductsDisplay />
// const ProductDetail = () => <div>Product Detail Page</div>;
const Profile = () => <div>Profile Page</div>;
const MySubmissions = () => <div>My Submissions Page</div>;
const PendingRequests = () => <div>Pending Requests Page</div>;
const RequestDetail = () => <div>Request Detail Page</div>;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<AuthenticatedElement><ProductsDisplay/></AuthenticatedElement>} />
          <Route path="/product/:id" element={<AuthenticatedElement><ProductDetail /></AuthenticatedElement>} />
          <Route path="/profile" element={<AuthenticatedElement><Profile /></AuthenticatedElement>} />
          <Route path="/profile/my-submissions" element={<AuthenticatedElement><MySubmissions /></AuthenticatedElement>} />
          <Route path="/pending-requests" element={<AuthenticatedElement><PendingRequests /></AuthenticatedElement>} />
          <Route path="/pending-requests/:request_id" element={<AuthenticatedElement><RequestDetail /></AuthenticatedElement>} /> 
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
