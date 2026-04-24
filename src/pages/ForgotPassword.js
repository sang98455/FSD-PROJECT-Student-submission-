import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (event) => {
    event.preventDefault();
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent. Check your inbox.");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card">
      <h2>Reset Password</h2>
      <p className="empty-state">Enter your email to receive a password reset link.</p>
      <form onSubmit={handleReset}>
        <div className="form-group">
          <label>Email</label>
          <input
            className="input-field"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>
      <div style={{ marginTop: 18, color: "#cbd5e1" }}>
        <button className="link-button" onClick={() => navigate("/login")}>Back to Login</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
