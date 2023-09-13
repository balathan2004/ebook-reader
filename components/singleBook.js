import React, { Component, useEffect } from "react";
import styles from "/styles/home.module.css";

export default function SingleBook({ data }) {
  return (
    <a className={styles.book} href={`book/${data}`}>
      <div>
        <img src={"./pdf-icon.png"} />
        <p>{data}</p>
      </div>
    </a>
  );
}
