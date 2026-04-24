import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const ProtectedRoute = ({ children, adminOnly }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }

    const isAdmin = user.email?.toLowerCase() === "admin@gmail.com";
    if (adminOnly && !isAdmin) {
      return <Navigate to="/student" replace />;
    }
    if (!adminOnly && isAdmin) {
      return <Navigate to="/admin" replace />;
    }

    return children;
  };

  return (
    <div className="app-shell">
      <Router>
        <div className="app-header">
          <h1>Student Project Submission</h1>
          <p className="app-subtitle">Firebase-powered student and admin experience</p>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/student"
            element={
              <ProtectedRoute adminOnly={false}>
                <StudentDashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard user={user} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
