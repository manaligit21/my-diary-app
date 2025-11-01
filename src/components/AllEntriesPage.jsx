import React, { useState } from "react";
import styles from "./AllEntriesPage.module.css";
import { useNavigate } from "react-router-dom";
import { useEntries } from "../GlobalContext/Entries";

export default function AllEntriesPage() {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const daysInMonth = new Date(year, month + 1, 0).getDate();  
  const { entries, setCurrentIndex, COLORS } = useEntries();

  const entryDates = entries.map((entry, index) => ({
    date: entry.date,
    entryText: entry.entryText,
    day: new Date(entry.date).getDate(),
    month: new Date(entry.date).getMonth(),
    year: new Date(entry.date).getFullYear(),
    entryIndex: index,
    mood: entry.mood,
  }));

  const daysArray = [];

  // Month navigation
  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));



  for (let d = 0; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  let monthMatches = {}
  for (let i = 0; i<daysArray.length; i++){
    
     monthMatches = entryDates.find(
      (e) => e.month === month && e.year === year
    )
    
  }

  const photoClicked = (index) => {
    setClicked(true);
    setCurrentIndex(index);
    navigate("/show-entry-page");
  };

  const [clicked, setClicked] = useState(false);
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
      <div className={styles.entries}>
        {monthMatches ? (
          daysArray.map((day, index) => {
            const match = entryDates.find(
              (e) => e.day === day && e.month === month && e.year === year
            );
            if (match) {
              return (
                <div
                  key={index}
                  className={styles.entry}
                  onClick={() => photoClicked(match.entryIndex)}
                >
                  <div className={styles.dateTime}>
                    <div className={styles.date}>{match ? match.date : ""}</div>
                    <div className={styles.time}>{match ? match.time : ""}</div>
                  </div>
                  <div className={styles.text}>{match.entryText}</div>
                  {match ? (
                    match.media && (
                      <div className={styles.media}>
                        <img
                          className={styles.photo}
                          src={match.media}
                          alt=""
                        />
                      </div>
                    )
                  ) : (
                    <div></div>
                  )}
                  <div
                    className={styles.mood}
                    style={{ background: COLORS[match.mood] }}
                  >
                    {match.mood}
                  </div>
                </div>
              );
            }
          })
        ) : (
          <div className={styles.noentry}>No Entries</div>
        )}
      </div>
    </div>
  );
}
