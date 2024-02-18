import Navbar from "@/components/nav";
import { getCookie, deleteCookie } from "cookies-next";
import React, { Component, useState, useEffect } from "react";

export default function About() {
  var [id, setId] = useState();

  const logout = () => {
    deleteCookie("EBookUserId");
  };

  useEffect(() => {
    setId(getCookie("EBookUserId"));
  }, []);

  return (
    <div className="app">
      <div className="home-container">
        <Navbar />
        <h1>Hello</h1>
        <h2>Id {id}</h2>
        <button onClick={""}>Click</button>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
}
