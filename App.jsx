import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Rooms from "./pages/Rooms";
import BookRoom from "./pages/BookRoom";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import HotelDetails from "./pages/HotelDetails";

// Components
import Navbar from "./components/Navbar";

function App() {
  const user = JSON.parse(localStorage.getItem("user")); // Must contain user object with role field

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected routes - Require login */}
        <Route
          path="/rooms"
          element={user ? <Rooms /> : <Navigate to="/login" />}
        />
        <Route
          path="/book/:roomId"
          element={user ? <BookRoom /> : <Navigate to="/login" />}
        />
        <Route
          path="/mybookings"
          element={user ? <MyBookings /> : <Navigate to="/login" />}
        />

        {/* Admin-only routes */}
        <Route
          path="/admin"
          element={user?.role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/hoteldetails"
          element={user?.role === "ADMIN" ? <HotelDetails /> : <Navigate to="/" />}
        />

        {/* Fallback route */}
        <Route path="*" element={<h3 className="text-center mt-5">404 - Page Not Found</h3>} />
      </Routes>
    </Router>
  );
}

export default App;
