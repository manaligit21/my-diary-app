import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";
import backIcon from "./assets/logo.png";
import homeIcon from "./assets/home.png";
import homeDarkIcon from "./assets/home_black.png";
import notesIcon from "./assets/notes.png";
import notesDarkIcon from "./assets/notes_black.png";
import graphIcon from "./assets/graph.png";
import graphDarkIcon from "./assets/graph_black.png";
import calendarIcon from "./assets/calendar.png";
import calendarDarkIcon from "./assets/calendar_black.png";
import HomePage from "./components/HomePage";
import EntryPage from "./components/EntryPage";
import GraphPage from "./components/GraphPage";
import AllEntriesPage from "./components/AllEntriesPage";
import ShowEntry from "./components/ShowEntry";
import CalendarPage from "./components/CalendarPage";
import { EntriesProvider } from "./GlobalContext/Entries";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideHeaderAndNav =
    location.pathname === "/" || location.pathname === "/sign-up-page";
  const goTo = (path) => navigate(path);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        console.log("Notification permission:", permission);
      });
    }
  }, []);

  useEffect(() => {
    const showNotification = () => {
      if (Notification.permission === "granted") {
        new Notification("🌙 Diary Reminder", {
          body: "It’s 10 PM — time to write about your day 💜",
          icon: "/vite.svg",
        });
      }
    };

    const checkTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Trigger exactly at 10:00 PM
      if (hours === 22 && minutes === 0) {
        showNotification();
      }
    };

    // Check every minute
    const interval = setInterval(checkTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <img className={styles["back-icon"]} src={backIcon} alt="" />
        </div>
        <div className={styles["page-title"]}>Balance</div>
      </div>

      <EntriesProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/entry-page" element={<EntryPage />} />
          <Route path="/calendar-page" element={<CalendarPage />} />
          <Route path="/graph-page" element={<GraphPage />} />
          <Route path="/all-entries-page" element={<AllEntriesPage />} />
          <Route path="/show-entry-page" element={<ShowEntry />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/sign-up-page" element={<SignUp />} />
        </Routes>
      </EntriesProvider>

      {!hideHeaderAndNav && (
        <div className={styles["bottom-nav"]}>
          <div
            className={
              location.pathname === "/home-page"
                ? styles["item-wrapper-dark"]
                : styles["item-wrapper"]
            }
          >
            <div className={styles["tab"]} onClick={() => goTo("/home-page")}>
              <img
                className={styles["tab-icon"]}
                src={
                  location.pathname === "/home-page" ? homeIcon : homeDarkIcon
                }
                alt=""
              />
            </div>
          </div>

          <div
            className={
              location.pathname === "/all-entries-page"
                ? styles["item-wrapper-dark"]
                : styles["item-wrapper"]
            }
          >
            <div
              className={styles["tab"]}
              onClick={() => goTo("/all-entries-page")}
            >
              <img
                className={styles["tab-icon"]}
                src={
                  location.pathname === "/all-entries-page"
                    ? notesIcon
                    : notesDarkIcon
                }
                alt=""
              />
            </div>
          </div>

          <div
            className={
              location.pathname === "/graph-page"
                ? styles["item-wrapper-dark"]
                : styles["item-wrapper"]
            }
          >
            <div className={styles["tab"]} onClick={() => goTo("/graph-page")}>
              <img
                className={styles["tab-icon"]}
                src={
                  location.pathname === "/graph-page"
                    ? graphIcon
                    : graphDarkIcon
                }
                alt=""
              />
            </div>
          </div>

          <div
            className={
              location.pathname === "/calendar-page"
                ? styles["item-wrapper-dark"]
                : styles["item-wrapper"]
            }
          >
            <div
              className={styles["tab"]}
              onClick={() => goTo("/calendar-page")}
            >
              <img
                className={styles["tab-icon"]}
                src={
                  location.pathname === "/calendar-page"
                    ? calendarIcon
                    : calendarDarkIcon
                }
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
