import styles from "./AllEntriesPage.module.css";
import { increment, decrement } from "../store/month";
import { useSelector, useDispatch } from "react-redux";
import MoodPieChart from "./MoodPieChart";
function GraphPage() {
  const dispatch = useDispatch();
  const year = useSelector((state) => state.month.year);
  const month = useSelector((state) => state.month.month);
  const monthName = new Date(year, month, 1).toLocaleString("default", {
    month: "long",
  });
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const daysArray = [];
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

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
