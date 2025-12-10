import styles from "./Profile.module.css"; // ✅
import backIcon from "../assets/back.png";
import { useNavigate } from "react-router-dom";
import { useEntries } from "../GlobalContext/Entries";

function Profile() {
  const navigate = useNavigate();
  const { setUserId, currentUser, setCurrentUser } = useEntries();

  const back = () => {
    navigate("/home-page");
  };

  const logout = () => {
    setUserId("");
    setCurrentUser({});
    navigate("/");
  };

  return (
    <div className={styles.screen}>
      <div className={styles.profileCard}>
        <div className={styles.back} onClick={back}>
          <img className={styles.backIcon} src={backIcon} alt="" />
        </div>
        <div className={styles.pic}>
          <img src={currentUser.picture} className={styles.userIcon} />
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
