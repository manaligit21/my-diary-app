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
import { useEffect } from "react";
import { useEntries } from "./GlobalContext/Entries";
import Profile from "./components/Profile";
import { toggleTheme } from "./store/themeSlice";
import { useSelector, useDispatch } from "react-redux";
import GoogleLoginPage from "./components/GoogleLogin";
import AuthGuard from "./AuthGuard";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useEntries();
  const hideHeaderAndNav =
    location.pathname === "/" || location.pathname === "/sign-up-page";
  const goTo = (path) => navigate(path);

  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <img className={styles["back-icon"]} src={backIcon} alt="" />
        </div>
        <div className={styles["page-title"]}>Balance</div>

        <div
          className={styles.profile}
          style={{
            visibility: currentUser ? "visible" : "hidden",
            pointerEvents: currentUser ? "auto" : "none",
          }}
          onClick={() => {
            if (!currentUser.id) return;
            console.log("dsfsdjf", currentUser);
            navigate("/profile-page");
          }}
        >
          <div className={styles.logOut}>
            {currentUser?.picture && (
              <img
                key={currentUser.picture}
                src={currentUser.picture}
                alt=""
                style={{
                  height: "100%",
                  maxWidth: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "1px solid",
                }}
              />
            )}
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/entry-page" element={<AuthGuard><EntryPage /></AuthGuard>} />
        <Route path="/calendar-page" element={<AuthGuard><CalendarPage /></AuthGuard>} />
        <Route path="/graph-page" element={<AuthGuard><GraphPage /></AuthGuard>} />
        <Route path="/all-entries-page" element={<AuthGuard><AllEntriesPage /></AuthGuard>} />
        <Route path="/show-entry-page" element={<AuthGuard><ShowEntry /></AuthGuard>} />
        <Route path="/home-page" element={<AuthGuard><HomePage /></AuthGuard>} />
        <Route path="/profile-page" element={<AuthGuard><Profile /></AuthGuard>} />
        <Route path="/" element={<GoogleLoginPage />} />
      </Routes>

      {!hideHeaderAndNav && (
        <div className={styles["bot-nav"]}>
          <div
            className={
              location.pathname === "/home-page"
                ? styles["myitem-wrapper-dark"]
                : styles["myitem-wrapper"]
            }
          >
            <div className={styles["mytab"]} onClick={() => goTo("/home-page")}>
              <img
                className={styles["mytab-icon"]}
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
                ? styles["myitem-wrapper-dark"]
                : styles["myitem-wrapper"]
            }
          >
            <div
              className={styles["mytab"]}
              onClick={() => goTo("/all-entries-page")}
            >
              <img
                className={styles["mytab-icon"]}
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
                ? styles["myitem-wrapper-dark"]
                : styles["myitem-wrapper"]
            }
          >
            <div
              className={styles["mytab"]}
              onClick={() => goTo("/graph-page")}
            >
              <img
                className={styles["mytab-icon"]}
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
                ? styles["myitem-wrapper-dark"]
                : styles["myitem-wrapper"]
            }
          >
            <div
              className={styles["mytab"]}
              onClick={() => goTo("/calendar-page")}
            >
              <img
                className={styles["mytab-icon"]}
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
