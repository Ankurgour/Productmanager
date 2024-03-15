import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { BrowserRouter as Router, Route,Routes, Navigate } from 'react-router-dom';
import RegistrationForm from './pages/Register';
import LoginForm from './pages/Login';
// import AdminDashboard from './AdminDashboard';
// import TeamMemberDashboard from './TeamMemberDashboard';
import AuthenticatedRoute from './components/AuthenticatedRoute';
// Placeholder components for your pages

const Dashboard = () => <div>Dashboard Page</div>;
const ProductDetail = () => <div>Product Detail Page</div>;
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
          <AuthenticatedRoute path="/dashboard" element={<Dashboard />} />
          <AuthenticatedRoute path="/product/:product_id" element={<ProductDetail />} />
          <AuthenticatedRoute path="/profile" element={<Profile />} />
          <AuthenticatedRoute path="/profile/my-submissions" element={<MySubmissions />} />
          <AuthenticatedRoute path="/pending-requests" element={<PendingRequests />} />
          <AuthenticatedRoute path="/pending-requests/:request_id" element={<RequestDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
