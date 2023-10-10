import React, { Component, useState, useEffect } from "react";
import SingleBook from "@/components/singleBook";
import { useRouter } from "next/router";
import ErrorComponent from "@/components/error";
import styles from "@/styles/Home.module.css";
import LoadingComponent from "@/components/loadingComponent";
import Navbar from "@/components/nav";

export default function Home() {
  var navigate = useRouter();
  const [error, setError] = useState(false);
  const [book, setBook] = useState([]);
  const [loader, setLoader] = useState(true);

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
        setError("no File found , Navigating to Upload_files");
        setTimeout(() => {
          navigate.push("/upload-book");
        }, 3000);
      }
    } catch (e) {
      console.log(e);
      navigate.push("/upload-book");
    }
  });

  async function getData() {
    setBook(await data);
    setLoader(!loader);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="home-container">
      <Navbar />
      <ErrorComponent ErrorState={error} StateChanger={setError}>
        {" "}
      </ErrorComponent>
      {loader ? <LoadingComponent /> : ""}
      <div className={styles.container}>
        {book.length == 0
          ? null
          : book.map((x, index) => {
              return (
                <SingleBook
                  data={x}
                  key={index}
                  bookName={book}
                  bookFunction={setBook}
                />
              );
            })}
      </div>
    </div>
  );
}
