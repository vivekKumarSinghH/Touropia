import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="996424289970-9b2r3hcojmeassaf51o1tphlteia8kjv.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
