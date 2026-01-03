import { useEffect, useState } from "react";
import styles from "./EntryPage.module.css";
import { useNavigate } from "react-router-dom";
import { useEntries } from "../GlobalContext/Entries";

function EntryPage() {
  const [entryText, setEntryText] = useState("");
  const [mood, setMood] = useState("");
  const [file, setFile] = useState(null);
  const { setEntries, userId } = useEntries();
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const moods = [
    { label: "Awful", color: "#d83333" },
    { label: "Bad", color: "#f39911" },
    { label: "Okay", color: "#dbc81f" },
    { label: "Nice", color: "#439948" },
    { label: "Awesome", color: "#006bc3" },
  ];
  const API_URL = "https://68fa6509ef8b2e621e7fda19.mockapi.io/diary/entries";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const optionSelected = (mood) => {
    console.log(mood);
    setMood(mood);
    setSelected(true);
  };

  function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert 24-hour to 12-hour format
    const formattedHours = hours % 12 || 12; // 0 -> 12
    const ampm = hours >= 12 ? "PM" : "AM";

    // Pad minutes and hours with leading 0
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedTime = `${String(formattedHours).padStart(
      2,
      "0"
    )}:${formattedMinutes} ${ampm}`;

    return formattedTime;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedDate = new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    if (data.find((i) => i.date === selectedDate && i.userId === userId)) {
      alert("alreday have entry for this date");
      return;
    }
    const newEntry = {
      entryText,
      mood,
      date: new Date(date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      time: formatTime(new Date()),
      imgUrl: file ? URL.createObjectURL(file) : "",
      userId,
    };
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then((data) => {
        setEntries((prev) => [...prev, data]);
        navigate("/show-entry-page", { state: { entry: data } });
      })

      .catch((error) => console.error("eror", error));

    // try {
    //   const response = await fetch(API_URL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newEntry),
    //   });

    //   const data = await response.json();
    //   console.log("Data saved", data);
    //   alert("data", data);
    // } catch (error) {
    //   console.error("eror", error);
    // }

    setEntryText("");
    setMood("");
    setFile(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.date}>
          Select the date
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.datetab}
            type="date"
          />
        </div>

        <div className={styles["enter-text"]}>
          <div className={styles["input-label"]}>Describe your day</div>
          <textarea
            className={styles.input}
            value={entryText}
            onChange={(e) => setEntryText(e.target.value)}
          />
        </div>

        <div className={styles["add-media"]}>
          <div className={styles.mediaLabel}>Want to add a photo or video?</div>
          <input
            className={styles["media-input"]}
            type="file"
            accept="image/*, video/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={{ marginBottom: "10px" }}
          />
        </div>

        <div className={styles.rating}>
          <div className={styles["rating-label"]}>
            How was your day overall?
          </div>

          <div className={styles["rating-select"]}>
            {moods.map((m, index) => (
              <div
                key={index}
                className={styles["option-wrapper"]}
                onClick={() => {
                  optionSelected(m.label);
                }}
                style={{
                  backgroundColor:
                    m.label === mood ? "#ffffff1c" : "transparent",
                }}
              >
                <div
                  className={styles.option}
                  style={{ backgroundColor: m.color }}
                ></div>
                <div className={styles["option-label"]}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <div className={styles.submitBtn} onClick={handleSubmit}>
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryPage;
