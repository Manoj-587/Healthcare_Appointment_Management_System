const base = "http://localhost:8080/api/auth";

// Register patient
export async function registerPatient(data) {
    const response = await fetch(`${base}/register/patient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}

const API_BASE = "http://localhost:8080/api/auth";

// Login patient
export async function loginPatient(credentials) {
  const res = await fetch(`${API_BASE}/login/patient`, {
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
