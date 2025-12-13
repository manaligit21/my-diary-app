import { useEffect, useRef, useState } from "react";
import styles from "./AllEntriesPage.module.css";
import { useNavigate } from "react-router-dom";
import { useEntries } from "../GlobalContext/Entries";
import { increment, decrement } from "../store/month";
import { useSelector, useDispatch } from "react-redux";

export default function AllEntriesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const year = useSelector((state) => state.month.year);
  const month = useSelector((state) => state.month.month);
  const monthName = new Date(year, month, 1).toLocaleString("default", {
    month: "long",
  });
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

  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  let monthMatches = {};
  for (let i = 0; i < daysArray.length; i++) {
    monthMatches = entryDates.find((e) => e.month === month && e.year === year);
  }

  const photoClicked = (index) => {
    setClicked(true);
    setCurrentIndex(index);
    navigate("/show-entry-page");
  };

  const todayRef = useRef();

  useEffect(() => {
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);
  const today = new Date();
  const todayDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [clicked, setClicked] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.btn} onClick={() => dispatch(decrement())}>
          ◀
        </button>
        <div>
          {monthName} {year}
        </div>
        <button className={styles.btn} onClick={() => dispatch(increment())}>
          ▶
        </button>
      </div>
      <div className={styles.entries}>
        {monthMatches ? (
          daysArray.map((day, index) => {
            const match = entryDates.find(
              (e) => e.day === day && e.month === month && e.year === year
            );

            if (!match) return null;
            const isToday = match.date === todayDate;

            return (
              <div
                key={index}
                ref={isToday ? todayRef : null}
                className={styles.entry}
                onClick={() => photoClicked(match.entryIndex)}
              >
                <div className={styles.dateTime}>
                  <div className={styles.date}>{match.date}</div>
                  <div className={styles.time}>{match.time}</div>
                </div>

                <div className={styles.text}>{match.entryText}</div>

                {match.media && (
                  <div className={styles.media}>
                    <img className={styles.photo} src={match.media} alt="" />
                  </div>
                )}

                <div
                  className={styles.mood}
                  style={{ background: COLORS[match.mood] }}
                >
                  {match.mood}
                </div>
              </div>
            );
          })
        ) : (
          <div className={styles.noentry}>No Entries This Month</div>
        )}
      </div>
    </div>
  );
}
