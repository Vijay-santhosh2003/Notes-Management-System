import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    alert("Registered successfully");
    navigate("/");
  };
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3>Create Account 🚀</h3>

        <form onSubmit={registerUser}>
          <input
            className="form-control mb-3"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-3"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="form-control mb-3"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
