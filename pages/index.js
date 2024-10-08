import Head from "next/head";
import Image from "next/image";
import React, { Component, useEffect, useState } from "react";

import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Login from "@/components/login";
import SignUp from "@/components/signup";
import styles from "@/styles/index.module.css";
import ErrorComponent from "@/components/error";
import LoadingComponent from "@/components/loadingComponent";


export default function Home() {
  var navigate = useRouter();
  const [options, setOptions] = useState(false);
  const [error, setError] = useState(false);
  //const [loader, setLoader] = useState(true);
  async function checkCookie() {
    console.log("cookie",getCookie("EBookUserId"))
    if (getCookie("EBookUserId")) {

      setTimeout(() => {
        navigate.push("/home");
        setLoader(!loader);
      }, 3000);
    } else {
      setLoader(!loader);
    }
  }

  function changingOptions(options) {
    setOptions(options);
  }

  useEffect(() => {

  }, []);

 

  return (
    <div className="index_page">
      <ErrorComponent
        ErrorState={error}
        StateChanger={setError}
      ></ErrorComponent>
      <div className={styles.container}>
        <h2>Welcome To EBook Reader</h2>
        <div className={styles.content_container}>
          <h2>Get Started</h2>
          <div className={styles.selection}>
            <button
              className={!options ? styles.active : ""}
              onClick={() => changingOptions(false)}
            >
              Login
            </button>
            <button
              className={options ? styles.active : ""}
              onClick={() => changingOptions(true)}
            >
              SignUp
            </button>
          </div>
          {options ? (
            <SignUp navigator={navigate} ErrorChanger={setError} />
          ) : (
            <Login
              navigator={navigate}
              func={changingOptions}
              ErrorChanger={setError}
            />
          )}
        </div>
      </div>
    </div>
  );
}
