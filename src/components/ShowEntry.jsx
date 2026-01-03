import { useState } from "react";
import { useEntries } from "../GlobalContext/Entries";
import styles from "./ShowEntry.module.css"; // ✅
import { useLocation, useNavigate } from "react-router-dom";
import backIcon from "../assets/back.png";
function ShowEntry() {
  const navigate = useNavigate();
  const { entries, currentIndex, COLORS, ENTRY_URL, setEntries, userId } =
    useEntries();
  const location = useLocation();
  const passedEntry = location.state?.entry;
  const currentEntry = passedEntry || entries[currentIndex];

  function delEntry() {
    console.log("current id ", typeof currentEntry.id);

    fetch(
      ENTRY_URL +
        userId +
        "/entries/" +
        currentEntry.id,
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEntries((prev) => prev.filter((entry) => entry.id !== currentEntry.id));

        navigate("/all-entries-page");
      });
  }
  const [showPhoto, setShowPhoto] = useState(false);
  const { fromCal, setFromCal } = useEntries();
  const photoClicked = () => {
    if (currentEntry.media) {
      setShowPhoto(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.entries}>
        <div className={styles.entry} onClick={photoClicked}>
          <div className={styles.back} onClick={delEntry}>
            {/* <img className={styles.backIcon} src={backIcon} alt="" /> */}
            Del
          </div>
          <div className={styles.dateTime}>
            <div className={styles.date}>{currentEntry.date}</div>
            <div className={styles.time}>{currentEntry.time}</div>
          </div>
          <div className={styles.text}>{currentEntry.entryText}</div>
          {currentEntry.media && (
            <div className={styles.media}>
              <img className={styles.photo} src={currentEntry.media} alt="" />
            </div>
          )}
          <div
            className={styles.mood}
            style={{ background: COLORS[currentEntry.mood] }}
          >
            {currentEntry.mood}
          </div>
        </div>
      </div>
      {showPhoto && (
        <div className={styles.overlay} onClick={() => setShowPhoto(false)}>
          <div className={styles.wrap}>
            <img className={styles.image} src={currentEntry.media} alt="" />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowEntry;
