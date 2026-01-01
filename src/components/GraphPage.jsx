import styles from "./GraphPage.module.css";
import { increment, decrement } from "../store/month";
import { useSelector, useDispatch } from "react-redux";
import MoodPieChart from "./MoodPieChart";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function GraphPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const year = useSelector((state) => state.month.year);
  const month = useSelector((state) => state.month.month);
  const monthName = new Date(year, month, 1).toLocaleString("default", {
    month: "long",
  });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  useEffect(() => {
    const handleBack = () => {
      alert("Back button pressed");
      navigate("/home-page", { replace: true });
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
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
