import React, { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

const EntriesContext = createContext();
const API_URL = "https://68fa6509ef8b2e621e7fda19.mockapi.io/diary/entries";

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
    Okay: "#dccb31",
    Nice: "#439948",
    Awesome: "#15568b",
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

  // Example entries
  // const entries = [
  //   {
  //   "entryText": "fhadhdfhfdh",
  //   "date": "Fri Oct 24 2025",
  //   "time": "12:14:24 AM",
  //   "mood": "Awful",
  //   "imgUrl": "",
  //   "id": "1"
  // },
  // {
  //   "entryText": "Everything went smoothly today, spent quality time with family.",
  //   "date": "October 1, 2025",
  //   "time": "08:45 PM",
  //   "mood": "Okay",
  //   "imgUrl": "/assets/entries/one.jpg",
  //   "id": "2"
  // },
  // {
  //   "entryText": "Had a relaxing evening with friends at the beach.",
  //   "date": "October 3, 2025",
  //   "time": "07:30 PM",
  //   "mood": "Nice",
  //   "imgUrl": "/assets/entries/two.jpg",
  //   "id": "3"
  // },
  // {
  //   "entryText": "Busy day at work, but felt productive and satisfied.",
  //   "date": "October 5, 2025",
  //   "time": "06:10 PM",
  //   "mood": "Awesome",
  //   "imgUrl": "",
  //   "id": "4"
  // },
  // {
  //   "entryText": "Tiring day with lots of travel, looking forward to rest.",
  //   "date": "October 7, 2025",
  //   "time": "10:20 PM",
  //   "mood": "Bad",
  //   "imgUrl": "/assets/entries/four.jpg",
  //   "id": "5"
  // },
  // {
  //   "entryText": "Woke up early, had a great workout, feeling energetic!",
  //   "date": "October 10, 2025",
  //   "time": "06:50 AM",
  //   "mood": "Awesome",
  //   "imgUrl": "",
  //   "id": "6"
  // },
  // {
  //   "entryText": "Watched a movie alone, had some peaceful time.",
  //   "date": "November 2, 2025",
  //   "time": "09:15 PM",
  //   "mood": "Nice",
  //   "imgUrl": "/assets/entries/three.jpg",
  //   "id": "7"
  // },
  // {
  //   "entryText": "Feeling under the weather today, stayed in bed most of the time.",
  //   "date": "November 6, 2025",
  //   "time": "04:10 PM",
  //   "mood": "Bad",
  //   "imgUrl": "",
  //   "id": "8"
  // },
  // {
  //   "entryText": "Had a great conversation with a close friend.",
  //   "date": "December 12, 2025",
  //   "time": "08:00 PM",
  //   "mood": "Awesome",
  //   "imgUrl": "/assets/entries/five.jpg",
  //   "id": "9"
  // },
  // {
  //   "entryText": "Got caught in the rain, but it felt refreshing.",
  //   "date": "December 14, 2025",
  //   "time": "06:40 PM",
  //   "mood": "Okay",
  //   "imgUrl": "",
  //   "id": "10"
  // },
  // {
  //   "entryText": "Spent the whole day reading and relaxing.",
  //   "date": "December 20, 2025",
  //   "time": "02:30 PM",
  //   "mood": "Awful",
  //   "imgUrl": "/assets/entries/two.jpg",
  //   "id": "11"
  // }
  // ];

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
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};

export const useEntries = () => useContext(EntriesContext);
