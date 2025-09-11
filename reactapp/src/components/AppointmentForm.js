import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchDoctors, createAppointment } from "../utils/api";

function BookAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const patient = location.state?.patient;

  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [specializationFilter, setSpecializationFilter] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [form, setForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    reason: ""
  });
  const [message, setMessage] = useState("");

  const specializations = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "General Medicine"
  ];

  // Load doctors
  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const data = await fetchDoctors();
        setDoctors(data);
        setFilteredDoctors(data);
      } catch {
        setMessage("Failed to load doctors");
      }
    };
    loadDoctors();
  }, []);

  // Filter doctors by specialization
  useEffect(() => {
    let filtered = doctors;
    if (specializationFilter) {
      filtered = doctors.filter(
        (doc) =>
          doc.specialization.toLowerCase() ===
          specializationFilter.toLowerCase()
      );
    }
    setFilteredDoctors(filtered);
    setSelectedDoctor(null);
    setAvailableDates([]);
    setAvailableTimes([]);
    setForm({ ...form, doctorId: "", date: "", time: "" });
  }, [specializationFilter, doctors]);

  if (!patient) {
    navigate("/");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDoctorChange = (e) => {
    const doctor = filteredDoctors.find(
      (d) => d.id.toString() === e.target.value
    );
    setSelectedDoctor(doctor);
    setForm({ ...form, doctorId: Number(e.target.value), date: "", time: "" });

    // Compute available dates for next 14 days
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dayName = date
        .toLocaleDateString("en-US", { weekday: "long" })
        .toUpperCase();
      if (doctor.dailyAvailability && doctor.dailyAvailability[dayName]) {
        dates.push(date.toISOString().split("T")[0]);
      }
    }
    setAvailableDates(dates);
    setAvailableTimes([]);
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setForm({ ...form, date, time: "" });

    if (!selectedDoctor) return;

    const dayName = new Date(date)
      .toLocaleDateString("en-US", { weekday: "long" })
      .toUpperCase();

    const slotsString = selectedDoctor.dailyAvailability[dayName]; 
    if (!slotsString) {
      setAvailableTimes([]);
      return;
    }

    const times = [];
    slotsString.split(",").forEach((slot) => {
      const [start, end] = slot.split("-");
      let [h, m] = start.split(":").map(Number);
      let current = new Date();
      current.setHours(h, m, 0, 0);

      const [endH, endM] = end.split(":").map(Number);
      const endTime = new Date();
      endTime.setHours(endH, endM, 0, 0);

      while (current < endTime) {
        const hh = current.getHours().toString().padStart(2, "0");
        const mm = current.getMinutes().toString().padStart(2, "0");
        times.push(`${hh}:${mm}`);
        current.setMinutes(current.getMinutes() + 30);
      }
    });

    setAvailableTimes(times);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.doctorId || !form.date || !form.time) {
      setMessage("Please select doctor, date, and time");
      return;
    }

    try {
      await createAppointment({
        patientId: patient.id,
        doctorId: Number(form.doctorId),
        appointmentDate: form.date,
        appointmentTime: form.time,
        reason: form.reason
      });
      setMessage("Appointment booked successfully!");
      setTimeout(() => navigate("/dashboard", { state: { patient } }), 1500);
    } catch (error) {
      setMessage(error.message || "Failed to book appointment");
    }
  };

  const to12HourFormat = (time) => {
    const [h, m] = time.split(":").map(Number);
    const ampm = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${m.toString().padStart(2, "0")} ${ampm}`;
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto" }}>
      <h2>Book Appointment</h2>

      <div style={{ marginBottom: "20px" }}>
        <select
          value={specializationFilter}
          onChange={(e) => setSpecializationFilter(e.target.value)}
        >
          <option value="">-- Select Specialization --</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit}>
        <label>Doctor:</label>
        <br />
        <select
          name="doctorId"
          value={form.doctorId}
          onChange={handleDoctorChange}
          required
        >
          <option value="">-- Select Doctor --</option>
          {filteredDoctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.name} ({doc.specialization})
            </option>
          ))}
        </select>
        <br /><br />

        <label>Date:</label>
        <br />
        <select
          name="date"
          value={form.date}
          onChange={handleDateChange}
          required
          disabled={!selectedDoctor}
        >
          <option value="">-- Select Date --</option>
          {availableDates.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <br /><br />

        <label>Time:</label>
        <br />
        <select
          name="time"
          value={form.time}
          onChange={handleChange}
          required
          disabled={!form.date}
        >
          <option value="">-- Select Time --</option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>
              {to12HourFormat(t)}
            </option>
          ))}
        </select>
        <br /><br />

        <label>Reason:</label>
        <br />
        <textarea
          name="reason"
          value={form.reason}
          onChange={handleChange}
          placeholder="Enter reason for appointment"
        />
        <br /><br />

        <button type="submit">Book Appointment</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default BookAppointment;
