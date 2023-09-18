import React, { Component, useState, useEffect } from "react";
import SingleBook from "@/components/singleBook";
import { useRouter } from "next/router";
import styles from "/styles/home.module.css";
import LoadingComponent from "@/components/loadingComponent";
import Navbar from "@/components/nav";

export default function Home() {
  var navigate = useRouter();
  const [book, setBook] = useState([]);
  const [loader, setLoader] = useState(true);

  const data = new Promise(async (resolve, reject) => {
    try {
      var res = await fetch("api/book-data", {
        method: "GET",
      });
      var returnValue = (await res.json()).message;
      if (returnValue != "No Books") {
        resolve(returnValue);
      } else {
        navigate.push("/upload-book");
      }
    } catch (e) {
      console.log(e);
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
      {loader ? <LoadingComponent /> : ""}
      <div className={styles.container}>
        {book.map((x, index) => {
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
