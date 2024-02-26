import "@/styles/globals.css";
import Navbar from "@/components/nav";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const navigate = useRouter();
  const isRootRoute = navigate.pathname === "/";

  return (
    <>
      {!isRootRoute && <Navbar />}
      <Component {...pageProps} />
    </>
  );
}
