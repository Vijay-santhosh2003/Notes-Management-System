import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h3>Welcome Back 👋</h3>

        <form onSubmit={loginUser}>
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

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-3">
          New user? <Link to="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
