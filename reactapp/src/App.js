import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPatient from "./components/LoginPatient";
import RegisterPatient from "./components/RegisterPatient";
import PatientDashboard from "./components/PatientDashboard";
import AppointmentForm from "./components/AppointmentForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPatient />} />
        <Route path="/register" element={<RegisterPatient />} />
        <Route path="/dashboard" element={<PatientDashboard />} />
        <Route path="/new-appointment" element={<AppointmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
