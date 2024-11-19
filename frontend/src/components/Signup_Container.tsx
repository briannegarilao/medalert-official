import React, { useState } from "react";
import { Link } from "react-router-dom";

function Signup_Container() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
  });

  const [isStep1Visible, setIsStep1Visible] = useState(true); // Step 1 is visible initially
  const [isStep2Visible, setIsStep2Visible] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setErrors({ ...errors, [name]: checked });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = { ...errors };

    // Check for empty fields
    if (!formData.firstName) {
      newErrors.firstName = "First Name is required.";
      formIsValid = false;
    } else {
      newErrors.firstName = "";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required.";
      formIsValid = false;
    } else {
      newErrors.lastName = "";
    }

    if (!formData.email) {
      newErrors.email = "Email is required.";
      formIsValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.number) {
      newErrors.number = "Phone number is required.";
      formIsValid = false;
    } else {
      newErrors.number = "";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
      formIsValid = false;
    } else {
      newErrors.password = "";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      formIsValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    if (!errors.termsAccepted) {
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form Data:", formData);
      toggleStep1Visibility();
      toggleStep2Visibility(); // Proceed to step 2
    }
  };

  const toggleStep1Visibility = () => {
    setIsStep1Visible(!isStep1Visible);
  };

  const toggleStep2Visibility = () => {
    setIsStep2Visible(!isStep2Visible);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow" style={{ width: "100%", maxWidth: "1000px", padding: "1rem" }}>
        <div className="card-body">
          {isStep1Visible && (
            <div className="container">
              <h2 className="card-title text-left">Create your account!</h2>
              <p>Sign up and start tracking your medication with us.</p>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="Med"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Simpson"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Ex.MedAlert00@xxxx.xxx"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="text-danger">{errors.email}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="number" className="form-label">Phone Number</label>
                    <div className="input-group">
                      <select className="form-select">
                        <option value="PH">+63</option>
                      </select>
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        name="number"
                        placeholder="Phone number"
                        value={formData.number}
                        onChange={handleChange}
                      />
                      {errors.number && <div className="text-danger">{errors.number}</div>}
                    </div>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">Your Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                  </div>
                </div>

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                    name="termsAccepted"
                    onChange={handleCheckboxChange}
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">I accept all the Terms and Privacy Policy</label>
                </div>

                <div className="text-center">
                  <button type="submit" className="btn btn-primary" style={{ width: "50%" }}>
                    Create Account
                  </button>
                </div>

                <p className="text-center mt-3">
                  Already have an account? <Link to="/Login" className="text-primary">Log In</Link>
                </p>
              </form>
            </div>
          )}

          {isStep2Visible && (
            <div className="container">
              <h2 className="card-title text-left">Get Started with MedAlert!</h2>
              <p>To personalize your experience, would you like to add a guardian to help manage your medications?</p>

              <div className="mb-3">
                <label htmlFor="guardian" className="form-label">Add a Guardian</label>
                <select
                  id="guardian"
                  name="guardian"
                  className="form-select"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <button onClick={() => {
                    toggleStep1Visibility();
                    toggleStep2Visibility();
                  }} className="btn btn-primary w-100">
                    Back
                  </button>
                </div>
                <div className="col-md-6">
                  <button onClick={() => toggleStep2Visibility()} className="btn btn-primary w-100">
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup_Container;
