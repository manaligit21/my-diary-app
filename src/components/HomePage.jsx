import styles from "./HomePage.module.css"; // ✅
import bg from "../assets/homepage_bg.jpg";
import plusIcon from "../assets/plus.png";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function HomePage() {
  const navigate = useNavigate();
  const addEntry = () => {
    navigate("/entry-page");
  };

  const location = useLocation();
  const lastBack = useRef(0);

  useEffect(() => {
    const onBack = () => {
      const now = Date.now();

      if (location.pathname === "/home-page") {
        if (now - lastBack.current < 2000) {
          // Allow browser to handle back naturally
          return;
        } else {
          lastBack.current = now;
          alert("Press back again to leave site");
          window.history.pushState(null, "", location.pathname);
        }
      }
    };

    window.history.pushState(null, "", location.pathname);
    window.addEventListener("popstate", onBack);

    return () => {
      window.removeEventListener("popstate", onBack);
    };
  }, [location.pathname]);

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
