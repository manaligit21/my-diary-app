import React, { useEffect, useId, useState } from "react";
import styles from "./Profile.module.css"; // ✅
import userIcon from "../assets/profile.jpg";
import backIcon from "../assets/back.png";
import { useNavigate } from "react-router-dom";
import { useEntries } from "../GlobalContext/Entries";

function Profile() {
  const navigate = useNavigate();
  const [name, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { allUsers, setAllUsers,setUserId, userId, currentUser, setCurrentUser } = useEntries();

  const USER_API_URL =
    "https://68fa6509ef8b2e621e7fda19.mockapi.io/diary/users";

  useEffect(()=>{
    setUserName(currentUser.name)
    setEmail(currentUser.email)
    setPassword(currentUser.password)
  },[])

  const back = () => {
    navigate("/home-page");
  };

  const logout = () =>{
    setUserId("")
    setCurrentUser({})
    navigate("/")
  }

  const update = () => {
    const temp = allUsers.find((t) => t.email === email);
    if (temp) {
      const newUser = {
        name,
        email,
        password,
      };
      fetch(`${USER_API_URL}/${temp.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
      })
        .then((res) => res.json())
        .then((data) => {
          setUserId(temp.id)
          // setCurrentUser(temp)
          navigate('/home-page')
          
        });
        
    } else {
      alert("the user does not esixt");
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles.profileCard}>
        <div className={styles.back} onClick={back}>
          <img className={styles.backIcon} src={backIcon} alt="" />
        </div>
        <div className={styles.pic}>
          <img src={userIcon} alt="User" className={styles.userIcon} />
        </div>

        <h2 className={styles.title} onClick={logout}>Log out</h2>

        <label className={styles.label}>Name</label>
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={(e) => setUserName(e.target.value)}
        />

        <label className={styles.label}>Email</label>
        <input
          className={styles.input}
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={styles.label}>Password</label>
        <input
          className={styles.input}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.saveBtn} onClick={update}>
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default Profile;
