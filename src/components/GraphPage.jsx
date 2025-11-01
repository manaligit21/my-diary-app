import React, { useState } from "react";
import styles from "./GraphPage.module.css";
import { useEntries } from "../GlobalContext/Entries";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import MoodPieChart from "./MoodPieChart";


function GraphPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();


  const daysArray = [];
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.btn} onClick={prevMonth}>
            ◀
          </button>
          <div>
            {monthName} {year}
          </div>
          <button className={styles.btn} onClick={nextMonth}>
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
