import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchPatientAppointments } from "../utils/api";

function PatientDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;

  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!patient) {
      navigate("/"); // redirect to login if no patient
      return;
    }

    const loadAppointments = async () => {
      try {
        const data = await fetchPatientAppointments(patient.id);
        setAppointments(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadAppointments();
  }, [patient, navigate]);

  if (!patient) return null;

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <h2>Welcome, {patient.name}</h2>
      {/* <button style={{ marginBottom: "20px" }}>Book New Appointment</button> */}
      <button
        style={{ marginBottom: "20px" }}
        onClick={() => navigate("/new-appointment", { state: { patient } })}
      >
        Book New Appointment
      </button>


      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Upcoming Appointments</h3>
      {appointments.length === 0 ? (
        <p>No upcoming appointments</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.doctor?.name} ({appt.doctor?.specialization})</td>
                <td>{appt.appointmentDate}</td>
                <td>{appt.appointmentTime}</td>
                <td>{appt.status}</td>
              </tr>
            ))}
          </tbody>

        </table>
      )}
    </div>
  );
}

export default PatientDashboard;
