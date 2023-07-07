import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";
import { store } from "./redux/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="98978859292-8ver762isock1hdddvkeu8ibmmn5908h.apps.googleusercontent.com">
        <Provider store={store}>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
