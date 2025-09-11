const auth = "http://localhost:8080/api/auth";

// Register patient
export async function registerPatient(data) {
  const response = await fetch(`${auth}/register/patient`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

// Login patient
export async function loginPatient(credentials) {
  const res = await fetch(`${auth}/login/patient`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Login failed");
  }
  return res.json();
}

// Fetch patient appointments
const patientUrl = "http://localhost:8080/api/patients";

export async function fetchPatientAppointments(patientId) {
  const res = await fetch(`${patientUrl}/${patientId}`);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to fetch appointments");
  }
  return res.json();
}

// Fetch doctors and parse dailyAvailability
export async function fetchDoctors() {
  const res = await fetch("http://localhost:8080/api/doctors");
  const data = await res.json();

  // Parse dailyAvailability JSON string into object
  return data.map(doc => ({
    ...doc,
    dailyAvailability:
      typeof doc.dailyAvailability === "string"
        ? JSON.parse(doc.dailyAvailability)
        : doc.dailyAvailability
  }));
}

// Create appointment
export const createAppointment = async (data) => {
  const response = await fetch("http://localhost:8080/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to create appointment");
  }
  return await response.json();
};
