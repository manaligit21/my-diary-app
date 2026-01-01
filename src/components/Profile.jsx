import styles from "./Profile.module.css"; // ✅
import backIcon from "../assets/back.png";
import t from "../assets/theme.png";

import { useLocation, useNavigate } from "react-router-dom";
import { useEntries } from "../GlobalContext/Entries";

function Profile() {
  const navigate = useNavigate();
  const { setUserId, userId, currentUser, setCurrentUser } = useEntries();
    const location = useLocation();

  const back = () => {
    navigate("/home-page");
  };

  const handleColorChange = (e) => {
    const hex = e.target.value;

    // Convert HEX to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Update CSS variable
    document.documentElement.style.setProperty(
      "--primary-bg",
      `${r}, ${g}, ${b}`
    );
  };

  const logout = () => {
    setUserId("");
    setCurrentUser({});
    navigate("/");
  };

  return (
    <div className={styles.screen}>
      <div className={styles.profileCard}>
        <div className={styles.top}>
          {/* <div className={styles.back} onClick={back}>
            <img className={styles.backIcon} src={backIcon} alt="" />
          </div> */}
          <div className={styles.switch}>
            <input id='colorPicker' onChange={handleColorChange} className={styles.color} type="color" />
            <label className={styles.lab} htmlFor="colorPicker"><img src={t} alt="" /></label>
          </div>
        </div>

        <div className={styles.pic}>
          <img key={currentUser.picture} src={currentUser?.picture} className={styles.userIcon} />
        </div>

        <h2 className={styles.title} onClick={logout}>
          Log out
        </h2>

        <label className={styles.label}>Name</label>
        <div className={styles.input}>{currentUser.name}</div>

        <label className={styles.label}>Email</label>
        <div className={styles.input}>{currentUser.email}</div>
      </div>
    </div>
  );
}

export default Profile;
