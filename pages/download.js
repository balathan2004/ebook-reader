import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { downloadSpeech } from "@/components/speechs";

import SendData from "@/components/sendFunction";

export default function Download() {
  const router = useRouter();
  const { book } = router.query;
  const [bookData, setBookData] = useState();
  const [socket, setSocket] = useState();
  const audioRef=useRef(null)
  const [audioUrl,setAudioUrl]=useState("")
  const sendDownloadTask = async () => {
    const data = {
      bookName: book,
    };
    const response = await fetch("/api/download", {
      body: JSON.stringify(data),method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if(response.ok){
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    }

    console.log(response);
  };

  function setDownload() {
    downloadSpeech("hello world this is light yagami");
  }

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl; // Set the audio source
    }
  }, [audioUrl]);



  return (
    <div className="">
      <span>
        selected book name is <h4>{book}</h4>
        <button onClick={sendDownloadTask}>Download Now</button>
        <button onClick={setDownload}>Now</button>
        <button onClick={() => {}}>listen socket</button>
        <audio ref={audioRef} controls>
          <p>Your browser does not support the audio element.</p>
        </audio>
      </span>
    </div>
  );
}
