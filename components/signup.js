import styles from "../styles/forms.module.css";
import SendData from "./sendFunction";
import { PopupMethods } from "./popUp";
import React, { Component, useState } from "react";

export default function SignUp({ navigator, ErrorChanger }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function submit() {
    if (username != "" && password != "") {
      var data = JSON.stringify({ username: username, password: password });

      var res = await SendData(data, "signup");
      if (res.message == "success") {
        window.location.href = "/home";
      } else {
        ErrorChanger(res.error);
      }
    }
  }

  return (
    <div className={styles.forms}>
      <input
        type="text"
        placeholder="Enter Address"
        className={styles.inputBox}
        autoCapitalize="none"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        className={styles.inputBox}
        autoCapitalize="none"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>SignUp</button>
      <button className={styles.google} onClick={PopupMethods}>
        SignUp Using Google
      </button>
    </div>
  );
}
