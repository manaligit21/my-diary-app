import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

console.log("store", store);

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="1085681295249-hqqscrlk62mqbpqni8c1rsn9ge3apa5u.apps.googleusercontent.com">
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
