import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { downloadSpeech } from "@/components/speechs";

import SendData from "@/components/sendFunction";

export default function Download() {
  const router = useRouter();
  const { book } = router.query;
  const [bookData, setBookData] = useState();
  const [socket, setSocket] = useState();

  const sendDownloadTask = async () => {
    const data = {
      bookName: book,
    };
    const response = await SendData(data, "download");

    console.log(response);
    setBookData(response.message[0]);
  };

  function setDownload() {
    downloadSpeech("hello world this is light yagami");
  }


  return (
    <div className="">
      <span>
        selected book name is <h4>{book}</h4>
        <button onClick={sendDownloadTask}>Download Now</button>
        <button onClick={setDownload}>Now</button>
        <button onClick={listenSocket}>listen socket</button>
      </span>
    </div>
  );
}
