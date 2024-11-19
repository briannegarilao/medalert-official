import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LogIn_Container() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    if (!email || !password) {
      setError("Please fill out both fields.");
    } else {
      setError("");
      // Log in the user and navigate to the dashboard
      console.log("Form submitted:", { email, password });
      navigate("/Dashboard"); // Redirects to the Dashboard page
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow"
        style={{ width: "100%", maxWidth: "500px", padding: "1rem" }}
      >
        <div className="card-body">
          <h2 className="card-title text-center">Welcome Back!</h2>
          <p>Glad to see you again! Please enter your details.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" htmlFor="exampleCheck1">
                Remember me
              </label>
            </div>
            <div className="text-divider">or</div>
            <button
              type="button"
              className="btn btn-light w-100 mb-2"
              style={{ border: "1px solid #ccc" }}
            >
              Sign in with Google
            </button>

            {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100">
              Sign in
            </button>
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <Link to="/Signup" className="text-primary">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LogIn_Container;
