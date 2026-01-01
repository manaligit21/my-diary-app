import styles from "./GraphPage.module.css";
import { increment, decrement } from "../store/month";
import { useSelector, useDispatch } from "react-redux";
import MoodPieChart from "./MoodPieChart";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function GraphPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const year = useSelector((state) => state.month.year);
  const month = useSelector((state) => state.month.month);
  const monthName = new Date(year, month, 1).toLocaleString("default", {
    month: "long",
  });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  const hasPushedRef = useRef(false);

  useEffect(() => {
    if (!hasPushedRef.current) {
      window.history.pushState(null, "", location.pathname);
      hasPushedRef.current = true;
    }

    const onBack = () => {
      navigate("/home-page", { replace: true });
    };

    window.addEventListener("popstate", onBack);

    return () => {
      window.removeEventListener("popstate", onBack);
    };
  }, [navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch(decrement());
          }}
        >
          ◀
        </button>
        <div>
          {monthName} {year}
        </div>
        <button
          className={styles.btn}
          onClick={() => {
            dispatch(increment());
          }}
        >
          ▶
        </button>
      </div>
      <div className={styles.graph}>
        <MoodPieChart month={month} year={year} />
      </div>
    </div>
  );
}

export default GraphPage;
