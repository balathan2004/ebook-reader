import styles from "/styles/forms.module.css";
import React, { Component, useState } from "react";
import SendData from "./sendFunction";

export default function Login({ func, navigator }) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function submit() {
    if (username != "" && password != "") {
      var data = JSON.stringify({ username: username, password: password });
      var res = await SendData(data, "login");
      if (res.message == "success") {
        navigator.push("/home");
      }
    }
  }

  return (
    <div className={styles.forms}>
      <input
        type="text"
        placeholder="Enter Address"
        className={styles.inputBox}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        className={styles.inputBox}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={submit}>Login</button>
      <button className={styles.google}>Login With Google</button>
      <p>
        Not a member{" "}
        <a href="" onClick={() => func(true)}>
          Signup now
        </a>
      </p>
    </div>
  );
}
