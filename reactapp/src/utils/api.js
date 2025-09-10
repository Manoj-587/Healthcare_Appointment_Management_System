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
    const errorText = await res.text(); // reads backend ResponseEntity body
    throw new Error(errorText || "Login failed");
  }
  return res.json();
}

// getPatient

const patientUrl = "http://localhost:8080/api/patient"

export async function fetchPatientAppointments(patientId) {
    const res = await fetch(`${patientUrl}/${patientId}`);
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to fetch appointments");
    }
    return res.json();
}
