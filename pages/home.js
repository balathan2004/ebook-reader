import React, { Component, useState, useEffect } from "react";
import SingleBook from "@/components/singleBook";
import { useRouter } from "next/router";
import ErrorComponent from "@/components/error";
import styles from "@/styles/Home.module.css";

export default function Home({ data }) {
  const navigator = useRouter();
  const error = data.error ? data.error : "";
  const [books, setBooks] = useState(data.message ? data.message : []);

  if (error) {
    setTimeout(() => {
      navigator.push("/upload-book");
    }, 5000);
  }

  return (
    <div className="home-container">
      <ErrorComponent ErrorState={error}></ErrorComponent>

      <div className={styles.container}>
        {books.length > 0
          ? books.map((x, index) => {
              return (
                <SingleBook
                  data={x}
                  key={index}
                  bookName={books}
                  bookFunction={setBooks}
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
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
  } catch (err) {
    return {
      props: {
        data: { error: "static props error" },
      },
    };
  }
}
