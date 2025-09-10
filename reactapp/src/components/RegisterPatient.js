import React, { useState } from "react";
import { registerPatient } from "../utils/api";

function RegisterPatient() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    dateOfBirth: ""
  });

  const [message, setMessage] = useState("");
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerPatient(form);
      setMessage(`Registration successful! Welcome, ${data.name}`);
      setForm({ name: "", email: "", phoneNumber: "", password: "", dateOfBirth: "" });
    } catch (error) {
      setMessage(error.message || "Registration failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Register as Patient</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        /><br />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        /><br />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={form.dateOfBirth}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit" style={{ marginTop: "10px" }}>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RegisterPatient;
