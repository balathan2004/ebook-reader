import React, { useState, useEffect, useRef } from "react";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/nav";
import Notify from "@/components/notify";

import LoadingComponent from "@/components/loadingComponent";

export default function Page() {
  const [loader, setLoader] = useState(true);
  const [pageData, setPageData] = useState("");
  const [notification, setNotification] = useState(null);
  const wordLimit = 5000;
  const [wordRemaining, setWordRemaining] = useState(wordLimit);
  const [isAvailable, setIsAvailable] = useState(false);
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const audioRef = useRef(null);

  function startSpeech() {
    audioRef.current.play();
  }
  function pauseSpeech() {
    audioRef.current.pause();
  }

  function cancel() {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }

  function startOver() {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
  }

  const handleInput = (event) => {
    const value = event.target.value.trim();
    setIsAvailable(true);
    if (value.length <= wordLimit) {
      setPageData(value);
      setWordRemaining(wordLimit - value.length);
    } else {
      // Limit to the first 5000 characters
      setPageData(value.substring(0, wordLimit));
      setWordRemaining(0);
    }
  };

  const sendAudioRequest = async (event) => {
    event.preventDefault();

    if (pageData && isAvailable) {
      await reqAudio(pageData);
      setIsAvailable(false);
    } else {
      setNotification("Enter valid text for conversion");
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement("a");
      link.href = audioUrl;
      link.download = "ebook-reader-output.mp3";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    setLoader(false);
  }, []);

  useEffect(() => {
    // Reset the height to 'auto' to shrink the textarea
    textareaRef.current.style.height = "auto";
    // Set the height to scrollHeight to adjust based on content
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [pageData]);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl; // Set the audio source
    }
  }, [audioUrl]);

  const reqAudio = async (pageData) => {
    const response = await fetch("/api/request_voice", {
      body: JSON.stringify({ text: pageData }),
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("error conversion");
    } else {
      console.log("audio got");
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    }
  };

  return (
    <>
      <Notify message={notification} messageFunction={setNotification} />
      <div className={styles.text_book}>
        {loader ? <LoadingComponent /> : null}
        <div className={styles.reader}>
          <h1>Quick Convert</h1>
          <span></span>

          <form onSubmit={sendAudioRequest}>
            <textarea
              value={pageData}
              onChange={handleInput}
              placeholder="Enter the text to speech"
              ref={textareaRef}
            ></textarea>
            <span>
              {wordRemaining} characters remaining - {wordLimit} characters
              limit
            </span>
            {audioUrl ? (
              <>
                <audio ref={audioRef} controls>
                  <p>Your browser does not support the audio element.</p>
                </audio>
              </>
            ) : null}
            <div className={styles.btn_container}>
              <button>Convert </button>
              <button type="button" onClick={startSpeech}>
                Speak Now
              </button>
              <button type="button" onClick={pauseSpeech}>
                Pause
              </button>
              <button type="button" onClick={startSpeech}>
                Resume
              </button>
              <button type="button" onClick={startOver}>
                start over
              </button>
              <button type="button" onClick={cancel}>
                Cancel
              </button>
              <button onClick={handleDownload}>Download Audio</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
