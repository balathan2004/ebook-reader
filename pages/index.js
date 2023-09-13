import Head from "next/head";
import Image from "next/image";
import React, { Component, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Login from "@/components/login";
import SignUp from "@/components/signup";
import styles from "@/styles/index.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  var navigate = useRouter();
  const [options, setOptions] = useState(false);

  function checkCookie() {
    if (getCookie("EBookUserId")) {
      navigate.push("/home");
    }
  }

  function changingOptions(options) {
    setOptions(options);
  }

  useEffect(() => {
    checkCookie();
  }, []);

  return (
    <div className="app">
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
            <SignUp navigator={navigate} />
          ) : (
            <Login navigator={navigate} func={changingOptions} />
          )}
        </div>
      </div>
    </div>
  );
}
