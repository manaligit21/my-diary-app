import styles from "./HomePage.module.css"; // ✅
import bg from "../assets/homepage_bg.jpg";
import plusIcon from "../assets/plus.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const addEntry = () => {
    navigate("/entry-page");
  };

  return (
    <div className={styles.container}>
      <div className={styles["app-body"]}>
        <img className={styles.bg} src={bg} alt="" />
        <div className={styles.hello}>What's on your mind today</div>
      </div>
      <div className={styles.add} onClick={addEntry}>
        <img className={styles.plusIcon} src={plusIcon} alt="" />
      </div>
    </div>
  );
}

export default HomePage;
