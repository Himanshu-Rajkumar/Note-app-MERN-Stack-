// ✅ SignUp.jsx
import { useState } from "react";
import styled from "styled-components";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) return alert("Please fill all fields");
    try {
      const res = await fetch("https://note-making-app-1vom.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("SignUp successful. Please login.");
      window.location.href = "/login";
    } catch (err) {
      alert("SignUp failed: " + err.message);
    }
  };

  return (
    <Wrapper>
      <h1>📝 Sign Up</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={handleRegister}>Sign Up</button>
    </Wrapper>
  );
};

export default SignUp;

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