import Navbar from "@/components/nav";
import { getCookie } from "cookies-next";
import { firebase } from "@/config";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import React, { Component, useState, useEffect } from "react";

export default function About() {
  var [id, setId] = useState();

  useEffect(() => {
    setId(getCookie("EBookUserId"));
  });

  return (
    <div className="app">
      <div className="home-container">
        <Navbar />
        <h1>Hello</h1>
        <h2>Id {id}</h2>
        <button onClick={""}>Click</button>
      </div>
    </div>
  );
}
