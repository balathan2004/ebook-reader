import styles from "../styles/forms.module.css";
import SendData from "./sendFunction";
import { PopupMethods } from "./popUp";
import React, { Component, useState } from "react";

export default function SignUp({ navigator, ErrorChanger }) {
  const [email, setMail] = useState();
  const [password, setPassword] = useState();

  async function submit(event) {
    event.preventDefault();
    if (email != "" && password != "") {
      var data = { email: email, password: password };

      var res = await SendData(data, "signup");

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
    <form className={styles.forms} onSubmit={submit}>
      <input
        type="email"
        placeholder="Enter Address"
        className={styles.inputBox}
        autoCapitalize="none"
        required
        onChange={(e) => setMail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        className={styles.inputBox}
        autoCapitalize="none"
        required
        minLength={8}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>SignUp</button>
      <button className={styles.google} onClick={PopupMethods}>
        SignUp Using Google
      </button>
    </form>
  );
}
