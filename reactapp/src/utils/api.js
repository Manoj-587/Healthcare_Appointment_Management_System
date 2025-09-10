const base = "http://localhost:8080/api/auth";

export async function registerPatient(data) {
    const response = await fetch(`${base}/register/patient`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    return response.json();
}