import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup_Container() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmailAddress: "",
    guardianPhoneNumber: "",
  });

  const [isStep1Visible, setIsStep1Visible] = useState(true);
  const [isStep2Visible, setIsStep2Visible] = useState(false);
  const [isStep3Visible, setIsStep3Visible] = useState(false);

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    guardianFirstName: "",
    guardianLastName: "",
    guardianEmailAddress: "",
    guardianPhoneNumber: "",
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

    if (isStep3Visible) {
      if (!formData.guardianFirstName) {
        newErrors.guardianFirstName = "Guardian's first name is required.";
        formIsValid = false;
      } else {
        newErrors.guardianFirstName = "";
      }

      if (!formData.guardianLastName) {
        newErrors.guardianLastName = "Guardian's last name is required.";
        formIsValid = false;
      } else {
        newErrors.guardianLastName = "";
      }

      if (!formData.guardianEmailAddress) {
        newErrors.guardianEmailAddress = "Guardian's email is required.";
        formIsValid = false;
      } else {
        newErrors.guardianEmailAddress = "";
      }

      if (!formData.guardianPhoneNumber) {
        newErrors.guardianPhoneNumber = "Guardian's phone number is required.";
        formIsValid = false;
      } else {
        newErrors.guardianPhoneNumber = "";
      }
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // console.log("Form Data:", formData);
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

  const toggleStep3Visibility = () => {
    setIsStep3Visible(!isStep3Visible);
  };

  const navigate = useNavigate();

  const handleCreateAcc = () => {
    navigate("/Dashboard");
  };

  const handleAdd = () => {
    if (validateForm()) {
      navigate("/Dashboard");
    }
  };

  const [guardianSelection, setGuardianSelection] = useState("yes");

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card shadow"
        style={{ width: "100%", maxWidth: "1000px", padding: "1rem" }}
      >
        <div className="card-body">
          {isStep1Visible && (
            <div className="container">
              <h2 className="card-title text-left">Create your account!</h2>
              <p>Sign up and start tracking your medication with us.</p>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      placeholder="Med"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <div className="text-danger">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      placeholder="Simpson"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <div className="text-danger">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Ex.MedAlert00@xxxx.xxx"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="number" className="form-label">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <div style={{ width: 80 }}>
                        <select className="form-select">
                          <option value="PH">+63</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="number"
                        name="number"
                        placeholder="Phone number"
                        value={formData.number}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.number && (
                      <div className="text-danger">{errors.number}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      Your Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    {errors.confirmPassword && (
                      <div className="text-danger">
                        {errors.confirmPassword}
                      </div>
                    )}
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
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    I accept all the Terms and Privacy Policy
                  </label>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: "50%" }}
                  >
                    Create Account
                  </button>
                </div>

                <p className="text-center mt-3">
                  Already have an account?{" "}
                  <Link to="/Login" className="text-primary">
                    Log In
                  </Link>
                </p>
              </form>
            </div>
          )}

          {isStep2Visible && (
            <div className="container">
              <h2 className="card-title text-left">
                Get Started with MedAlert!
              </h2>
              <p>
                To personalize your experience, would you like to add a guardian
                to help manage your medications?
              </p>

              <div className="mb-3">
                <label htmlFor="guardian" className="form-label">
                  Add a Guardian
                </label>
                <select
                  id="guardian"
                  name="guardian"
                  className="form-select"
                  value={guardianSelection}
                  onChange={(e) => setGuardianSelection(e.target.value)}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <button
                    onClick={() => {
                      toggleStep1Visibility();
                      toggleStep2Visibility();
                    }}
                    className="btn btn-primary w-100"
                  >
                    Back
                  </button>
                </div>
                <div className="col-md-6">
                  {guardianSelection === "yes" ? (
                    <button
                      onClick={() => {
                        toggleStep2Visibility();
                        toggleStep3Visibility();
                      }}
                      className="btn btn-primary w-100"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      onClick={handleCreateAcc}
                      className="btn btn-primary w-100"
                    >
                      Create Account
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {isStep3Visible && (
            <div className="container">
              <h2 className="card-title text-left">
                Get Started with MedAlert!
              </h2>
              <p>
                To personalize your experience, would you like to add a guardian
                to help manage your medications?
              </p>

              <div className="mb-3">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="guardianFirstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="guardianFirstName"
                      name="guardianFirstName"
                      placeholder="Marvin"
                      value={formData.guardianFirstName}
                      onChange={handleChange}
                    />
                    {errors.guardianFirstName && (
                      <div className="text-danger">
                        {errors.guardianFirstName}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="guardianLastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="guardianLastName"
                      name="guardianLastName"
                      placeholder="Simpson"
                      value={formData.guardianLastName}
                      onChange={handleChange}
                    />
                    {errors.guardianLastName && (
                      <div className="text-danger">
                        {errors.guardianLastName}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label
                      htmlFor="guardianEmailAddress"
                      className="form-label"
                    >
                      Guardian Email Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="guardianEmailAddress"
                      name="guardianEmailAddress"
                      placeholder="Ex.MedAlert00@xxxx.xxx"
                      value={formData.guardianEmailAddress}
                      onChange={handleChange}
                    />
                    {errors.guardianEmailAddress && (
                      <div className="text-danger">
                        {errors.guardianEmailAddress}
                      </div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="guardianPhoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <div className="input-group">
                      <div style={{ width: 80 }}>
                        <select className="form-select">
                          <option value="PH">+63</option>
                        </select>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="guardianPhoneNumber"
                        name="guardianPhoneNumber"
                        placeholder="Phone Number"
                        value={formData.guardianPhoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                    {errors.guardianPhoneNumber && (
                      <div className="text-danger">
                        {errors.guardianPhoneNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <button
                    onClick={() => {
                      toggleStep2Visibility();
                      toggleStep3Visibility();
                    }}
                    className="btn btn-primary w-100"
                  >
                    Back
                  </button>
                </div>
                <div className="col-md-6">
                  <button className="btn btn-primary w-100" onClick={handleAdd}>
                    Add
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
