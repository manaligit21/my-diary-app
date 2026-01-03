import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const EntriesContext = createContext();
const API_URL = "https://68fa6509ef8b2e621e7fda19.mockapi.io/diary/entries";

const ENTRY_URL = "https://68fa6509ef8b2e621e7fda19.mockapi.io/diary/users/"

export const EntriesProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fromCal, setFromCal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [profiePhoto, setProfilePhoto] = useState("");
  const COLORS = {
    Awful: "#d83333",
    Bad: "#f39911",
    Okay: "#dbc81f",
    Nice: "#439948",
    Awesome: "#006bc3",
  };

  const [entries, setEntries] = useState([]);

  const USER_API_URL =
    "https://68fa6509ef8b2e621e7fda19.mockapi.io/diary/users";

  useEffect(() => {
    fetch(USER_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setAllUsers(data);
      });
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) =>
        setEntries(data.filter((entry) => entry.userId == userId))
      )
      .catch((err) => console.log("EroR", err));
  }, [userId]);

  return (
    <EntriesContext.Provider
      value={{
        profiePhoto,
        setProfilePhoto,
        allUsers,
        setAllUsers,
        entries,
        setEntries,
        currentIndex,
        setCurrentIndex,
        fromCal,
        setFromCal,
        COLORS,
        userId,
        setUserId,
        setCurrentUser,
        currentUser,
        ENTRY_URL
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => useContext(EntriesContext);
