import React, { Component, useState, useEffect } from "react";
import SingleBook from "@/components/singleBook";
import { useRouter } from "next/router";
import ErrorComponent from "@/components/error";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/nav";

export default function Home({ data }) {
  const navigator = useRouter();
  const error = data.error ? data.error : "";
  const book = data.message ? data.message : [];

  if (error) {
    setTimeout(() => {
      navigator.push("upload-book");
    }, 5000);
  }

  return (
    <div className="home-container">
      <Navbar />

      <ErrorComponent ErrorState={error}></ErrorComponent>

      <div className={styles.container}>
        {book.length > 0
          ? book.map((x, index) => {
              return <SingleBook data={x} key={index} bookName={book} />;
            })
          : null}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.headers.cookie;

  var cookieArray = cookies.split(";");
  let uid = null;
  cookieArray.map((single_cookie) => {
    var [key, value] = single_cookie.trim().split("=");
    if (key == "EBookUserId") {
      uid = value;
    }
  });

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://nextjs-read.vercel.app/api/book-data?id=${uid}`
      : `http:localhost:3000/api/book-data?id=${uid}`;

  const response = await fetch(apiUrl, {
    method: "GET",
    contentType: "application/json",
  });
  const responseJson = await response.json();

  return {
    props: {
      data: responseJson,
    },
  };
}

/**\
 * 
 * 
 * 
 


///


  const data = new Promise(async (resolve, reject) => {
    try {
      var res = await fetch("api/book-data", {
        method: "GET",
      });
      var returnValue = await res.json();
      if (returnValue.message) {
        resolve(returnValue.message);
      } else {
        reject("New Error");
      }
    } catch (e) {
      setTimeout(() => {
        setError("no File found , Navigating to Upload_files");
      }, 3000);
    }
  });

  async function getData() {
    setBook(await data);
    setLoader(!loader);
  }

  useEffect(() => {
    getData();
  }, []);


 */
