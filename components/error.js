import React, { Component, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/index.module.css";
export default function ErrorComponent({ ErrorState, StateChanger }) {
  function changeState() {
    StateChanger(!ErrorState);
  }

  if (ErrorState) {
    return (
      <div className={styles.error_container}>
        <div className={styles.error_inner_container}>
          <div className={styles.error_head}>
            <FontAwesomeIcon icon={faX} onClick={changeState} />
          </div>
          <div className={styles.error_content}>
            <p>{ErrorState}</p>
          </div>
        </div>
      </div>
    );
  }
}
