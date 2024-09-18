import styles from "../styles/forms.module.css";
import React, { Component, useState } from "react";
import SendData from "./sendFunction";

import { PopupMethods } from "./popUp";

export default function Login({ func, navigator, ErrorChanger }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function submit() {
    if (username != "" && password != "") {
      var data = { username: username, password: password };
      var res = await SendData(data, "login");
      if (res.message == "success") {
        setTimeout(() => {
          navigator.push("/home");
        }, 1000);
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
      <button onClick={submit}>Login</button>
      <button className={styles.google} onClick={PopupMethods}>
        Login With Google
      </button>
      <p>
        Not a member{" "}
        <a href="#" onClick={() => func(true)}>
          Signup now
        </a>
      </p>
    </div>
  );
}
