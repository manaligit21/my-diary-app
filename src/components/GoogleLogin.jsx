import { useGoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router-dom";
import bg from "../assets/homepage_bg.jpg";
import { useEntries } from "../GlobalContext/Entries";
import { useEffect, useRef } from "react";

function GoogleLoginPage() {
  const navigate = useNavigate();
  const { setUserId, setCurrentUser, setAllUsers, allUsers, setProfilePhoto } =
    useEntries();
  const location = useLocation();
  const lastBack = useRef(0);

  useEffect(() => {
    const onBack = () => {
      const now = Date.now();

      if (location.pathname === "/") {
        if (now - lastBack.current < 2000) {
          // Allow browser to handle back naturally
          return;
        } else {
          lastBack.current = now;
          alert("Press back again to leave site");
          window.history.pushState(null, "", location.pathname);
        }
      }
    };

    window.history.pushState(null, "", location.pathname);
    window.addEventListener("popstate", onBack);

    return () => {
      window.removeEventListener("popstate", onBack);
    };
  }, [location.pathname]);

  const USER_API_URL =
    "https://68fa6509ef8b2e621e7fda19.mockapi.io/diary/users";

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // Fetch user info from Google API
      const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      });
      const user = await res.json();
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("profilePhoto", user.picture);

      const temp = allUsers.find((t) => t.email === user.email);
      if (temp) {
        const matchedUser = allUsers.find((u) => u.email === user.email);
        if (matchedUser) {
          setUserId(matchedUser.id);
          setCurrentUser(matchedUser);
          console.log(matchedUser);
          setProfilePhoto(user.picture);
          navigate("/home-page");
          return;
        }
      } else {
        const newUser = {
          name: user.family_name,
          email: user.email,
          password: user.given_name,
          picture: user.picture,
        };
        fetch(USER_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        })
          .then((res) => res.json())
          .then((data) => {
            setAllUsers((prev) => [...prev, data]);
            setUserId(data.id);
            setCurrentUser(data);
            setProfilePhoto(user.picture);
          });
        navigate("/home-page");
      }
    },
    onError: () => {
      console.log("Login Failed");
    },
  });

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bg})`,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => login()}
          style={{
            padding: "4%",
            width: "60%",
            backgroundColor: "rgb(83 100 203)",
            color: "rgb(255 251 251)",
            border: "none",
            fontWeight: "bold",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default GoogleLoginPage;
