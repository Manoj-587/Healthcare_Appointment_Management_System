import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginPatient } from "../utils/api";

function LoginPatient() {
  const [form, setForm] = useState({ emailOrPhone: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginPatient(form);
      setMessage(`Welcome back, ${data.name}`);

      // Redirect to dashboard and pass patient info
      navigate("/dashboard", { state: { patient: data } });
    } catch (error) {
      setMessage(error.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="emailOrPhone"
          placeholder="Email or Phone Number"
          value={form.emailOrPhone}
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
        <button type="submit" style={{ marginTop: "10px" }}>Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPatient;
