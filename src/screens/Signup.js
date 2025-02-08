import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "", // Location is taken as input by the user
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location, // Location entered by the user
      }),
    });

    const json = await response.json();
    if (json.success) {
      // On successful sign-up, store auth token and navigate to login
      localStorage.setItem("token", json.authToken);
      navigate("/login");
    } else {
      // Show error message if email already exists
      alert(json.message || "Enter valid credentials");
      if (json.message === "Already a user, please log in first") {
        navigate("/login");
      }
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <Navbar />
      <div className="container">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <h5 style={{ color: "white" }}>Name</h5>
            <input
              type="text"
              className="form-control"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="m-3">
            <h5 style={{ color: "white" }}>Email Address</h5>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="m-3">
            <h5 style={{ color: "white" }}>Location</h5>
            <input
              type="text"
              className="form-control"
              name="location"
              placeholder="Enter your location"
              value={credentials.location}
              onChange={onChange} // Handle input for location
            />
          </div>
          <div className="m-3">
            <h5 style={{ color: "white" }}>Password</h5>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 mx-1 btn btn-danger">
            Already a user?
          </Link>
        </form>
      </div>
    </div>
  );
}