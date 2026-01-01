import { useEffect, useRef, useState } from "react";
import styles from "./AllEntriesPage.module.css";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { useEntries } from "../GlobalContext/Entries";
import { increment, decrement } from "../store/month";
import { useSelector, useDispatch } from "react-redux";

export default function AllEntriesPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const location = useLocation();

  const [searchText, setSearchText] = useState("");
  const [selectedMood, setSelectedMood] = useState("ALL");

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

  let daysArray = [];

  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(d);
  }

  const passesFilters = (entry) => {
    if (!entry) return false;

    // month & year (already selected via Redux)
    if (entry.month !== month || entry.year !== year) return false;

    // mood filter
    if (selectedMood !== "ALL" && entry.mood !== selectedMood) return false;

    // text search
    if (
      searchText &&
      !entry.entryText.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return false;
    }

    return true;
  };
  const monthMatches = entryDates.some((e) => passesFilters(e));

  const photoClicked = (index) => {
    setClicked(true);
    setCurrentIndex(index);
    navigate("/show-entry-page");
  };
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

  const todayRef = useRef();

  // useEffect(() => {
  //   if (todayRef.current) {
  //     todayRef.current.scrollIntoView({
  //       behavior: "smooth",
  //       block: "center",
  //     });
  //   }
  // }, []);
  const today = new Date();
  const todayDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [clicked, setClicked] = useState(false);
  return (
    <div className={styles.container}>
      <div className="w-full flex">
        <div
          className="m-4 flex items-center gap-3 rounded-md p-4"
          style={{ backgroundColor: "rgba(var(--primary-bg))" }}
        >
          <input
            type="text"
            placeholder="Search entries..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-3/4 rounded border border-black px-3 py-2 text-lg outline-none focus:ring-2 focus:ring-black"
          />

          <select
            value={selectedMood}
            onChange={(e) => setSelectedMood(e.target.value)}
            className="w-1/2 rounded border border-black px-3 py-2 text-base outline-none focus:ring-2 focus:ring-black"
          >
            <option value="ALL">All moods</option>
            <option value="Awesome">Awesome</option>
            <option value="Nice">Nice</option>
            <option value="Okay">Okay</option>
            <option value="Bad">Bad</option>
            <option value="Awful">Awful</option>
          </select>
        </div>
      </div>

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
          [...daysArray].reverse().map((day, index) => {
            const match = entryDates.find(
              (e) => e.day === day && passesFilters(e)
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
