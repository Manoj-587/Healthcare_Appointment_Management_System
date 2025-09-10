import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPatient from "./components/LoginPatient";
import RegisterPatient from "./components/RegisterPatient";
import PatientDashboard from "./components/PatientDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPatient />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
