import React, { useEffect, useState } from "react";
import styles from "./CalendarPage.module.css";
import { useEntries } from "../GlobalContext/Entries";
import { useFetcher, useNavigate } from "react-router-dom";

function CalendarPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const { setFromCal } = useEntries();

  const { entries, setCurrentIndex, COLORS } = useEntries();
  const entryDates = entries.map((entry, index) => ({
    day: new Date(entry.date).getDate(),
    month: new Date(entry.date).getMonth(),
    year: new Date(entry.date).getFullYear(),
    entryIndex : index,
    mood: entry.mood,
  }));
  
  const daysArray = [];
  function openEntry(index) {
    if (index>=0){
    setCurrentIndex(index);
    setFromCal(true);
    navigate("/show-entry-page");
    }
  }

  // Month navigation
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  for (let i = 0; i < firstDay; i++) daysArray.push(null); // empty for offset
  for (let d = 1; d <= daysInMonth; d++) daysArray.push(d);

  return (
    <div className={styles.container}>
      <div className={styles.calendar}>
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

        <div className={styles.weekdays}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className={styles.days}>
          {daysArray.map((day, index) => {
            if (!day) return <div key={index} className={styles.empty}></div>;

            // Find entry matching this day/month/year
            const match = entryDates.find(
              (e) => e.day === day && e.month === month && e.year === year
            );

            return (
              <div
                onClick={() => openEntry(match ? match.entryIndex : -1 )}
                key={index}
                className={styles.day}
                style={{
                  backgroundColor: match ? COLORS[match.mood] : "transparent",
                }}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
