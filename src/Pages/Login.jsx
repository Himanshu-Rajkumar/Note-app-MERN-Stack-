// ✅ Login.jsx
import { useState } from "react";
import styled from "styled-components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return alert("Please fill all fields");
    try {
      const res = await fetch("https://note-making-app-1vom.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("token", data.token);
      alert("Login successful");
      window.location.href = "/notes";
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  };

  return (
    <Wrapper>
      <h1>🔐 Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </Wrapper>
  );
};


// ✅ Styled Component shared between Login and SignUp
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input {
    padding: 0.5rem;
    font-size: 1rem;
  }

  button {
    padding: 0.5rem;
    background: teal;
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: darkcyan;
    }

    &:active {
      transform: scale(0.96);
    }
  }
`;

export default Login;

