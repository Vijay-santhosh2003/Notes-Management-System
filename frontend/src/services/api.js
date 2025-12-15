const API = "http://localhost:5000/api";

export const loginUser = (data) =>
  fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());

export const getNotes = (token) =>
  fetch(`${API}/notes`, {
    headers: { Authorization: token },
  }).then((res) => res.json());
