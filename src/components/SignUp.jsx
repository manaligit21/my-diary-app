// src/components/SignUp.jsx
import React, { useState } from "react";
import styles from "./Auth.module.css";
import backIcon from "../assets/back.png"; // optional
import { useNavigate } from "react-router-dom";
import { useEntries } from "../GlobalContext/Entries";

export default function SignUp() {
  const navigate = useNavigate();
  const {allUsers, setAllUsers, setUserId, setCurrentUser} = useEntries();
  const USER_API_URL = "https://68fa6509ef8b2e621e7fda19.mockapi.io/diary/users";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const createUser = () => {
    const temp = allUsers.find((t)=> t.email === email)
    if (temp){
      alert("User already exists")
      return 
    }
    const newUser = {
      name,
      email,
      password,
    };
    fetch(USER_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
         setAllUsers((prev) => [...prev, data]);
         setUserId(data.id)
         setCurrentUser(data)
       });

    setName("");
    setEmail("");
    setPassword("");
    navigate('/')
  };

  return (
    <div className={styles.screen}>
      <div className={styles.signupcard}>
        <h2 className={styles.title}>Create account</h2>

        <label className={styles.label}>Full name</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />

        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Choose password"
        />

        <button className={styles.primaryBtn} onClick={createUser}>
          Sign up
        </button>

        <div className={styles.alt}>
          <span>Already have an account?</span>
          <a className={styles.link} href="/">
            {" "}
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
