// src/components/Login.jsx
import React, { useEffect, useState } from "react";
import styles from "./Auth.module.css";
import backIcon from "../assets/back.png"; // optional: remove if not needed
import { useNavigate } from "react-router-dom";
import { useEntries } from "../GlobalContext/Entries";

export default function Login() {
  const {allUsers} = useEntries();
  const {setUserId} = useEntries()


  const navigate = useNavigate();
  const goToHome = () => {
    const matchedUser = allUsers.find(
      (user) => user.email === email && user.password === password
    );    

    if (matchedUser){
      setUserId(matchedUser.id)
      navigate("/home-page");
    } else {
      alert("Wrong password or username");
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className={styles.screen}>
      <div className={styles.logincard}>
        <h2 className={styles.title}>Welcome back</h2>

        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="text"
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
          placeholder="Enter password"
        />

        <button className={styles.primaryBtn} onClick={goToHome}>
          Log in
        </button>

        <div className={styles.alt}>
          <span>Don’t have an account?</span>
          <a className={styles.link} href="/sign-up-page">
            {" "}
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}
