import React, { Component, useState, useEffect } from "react";
import SingleBook from "@/components/singleBook";
import { useRouter } from "next/router";
import ErrorComponent from "@/components/error";
import styles from "@/styles/Home.module.css";

export default function Home({ data }) {
  console.log(data)
  const navigator = useRouter();
  const [error,setError] = useState(data.error ? data.error :null)
  const [books, setBooks] = useState(data.message ? data.message : []);

 

  useEffect(()=>{

    if(books.length==0){
     setError(true)
    }

  },[books])

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        navigator.push("/upload-book");
      }, 3000);
      
      // Clean up the timer on unmount
      return () => clearTimeout(timer);
    }
  }, [error, navigator]);


  return (
    <>
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
    </>
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
        ? `${HOSTING_URL}/api/get_book_names?id=${uid}`
        : `http://localhost:3000/api/get_book_names?id=${uid}`;

        console.log(apiUrl)

    const response = await fetch(apiUrl, {
      method: "GET",
      contentType: "application/json",
    });
    const responseJson = await response.json();
    console.log(responseJson)

    return {
      props: {
        data: responseJson,
      },
    };
  } catch (err) {
    console.log(err)
    return {
      props: {
        data: { error: "static props error" },
      },
    };
  }
}
