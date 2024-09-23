import { useRouter } from "next/router";
import React, { useState, useEffect ,useRef} from "react";
import styles from "@/styles/Home.module.css";
import Navbar from "@/components/nav";
import Notify from "@/components/notify";

import LoadingComponent from "@/components/loadingComponent";


export default function Page() {
  const router = useRouter();

  const [pageNum, setPageNum] = useState(0);
  const [loader, setLoader] = useState(true);
  const [pageData, setPageData] = useState(null);
  const [VoiceNum, setVoiceNum] = useState(0);
  const [notification, setNotification] = useState(null);
  const [totalPage, setTotalPage] = useState(null);
  const [audioUrl,setAudioUrl]=useState("")
  const audioRef=useRef(null)

  const { id } = router.query;

  function setPages(value) {
    localStorage.setItem(id, value);
  }
  function getPagesnum() {
    var LocalPageNum = localStorage.getItem(id);
    console.log(LocalPageNum);
    if (LocalPageNum) {
      setPageNum(parseInt(LocalPageNum));
    } else {
      localStorage.setItem(id, 1);
    }
  }

  async function fetchData() {
    if (id) {
      const dataNeed = {
        pageNum: pageNum,
        url: id,
      };
      console.log("requested with ", dataNeed);
      try {
        const res = await fetch("/api/single_page", {
          method: "POST",
          body: JSON.stringify(dataNeed),
          contentType: "application/json",
        });
        const data = await res.json();
        if (data.error) {
          console.log(data.error, "here is error");
        } else {
          console.log(data);
          setPageData(data.page);
          setTotalPage(data.totalPages);
          setPageNum((prev) => prev + 1 - 1);
          if (pageNum == data.totalPages) {
            alert("You Finished The Book");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    setLoader(false);
  }

  function checker() {
    console.log(window.responsiveVoice.getVoices());
  }

  function NextPage() {
    setNotification("Moving to next page");
    setLoader(true);
    setPageNum((prev) => prev + 1);
    setPages(pageNum + 1);
  }

  function gotoPage() {
    var newPageNum = prompt("Enter Page Number");
    setLoader(true);
    setPages(parseInt(newPageNum));
  }

  function ChangeVoice() {
    setNotification("voice changed");
    StartOver();
    var value = VoiceNum;
    setVoiceNum(VoiceNum + 1);
    StartSpeech(pageData, value + 1);
  }

  useEffect(() => {
    fetchData();
  }, [pageNum]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (pageData) {
      reqAudio(pageData);
    }
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
      setAudioUrl(audioUrl)
   
      
    }
  };



  return (
    <>
      <Notify message={notification} messageFunction={setNotification} />
      <div className={styles.text_book}>
        {loader ? <LoadingComponent /> : null}
        <div className={styles.contentDetails}>
          <h1>{id}</h1>
          <span>
            Current Page {pageNum}/{totalPage}
          </span>
        </div>
        <p className={styles.para}>
          {pageData == null
            ? "Current Page is Empty ! Swipe To Next Page"
            : pageData}
        </p>
        <audio ref={audioRef} controls>
            <p>Your browser does not support the audio element.</p>
          </audio>
        <div className={styles.btn_container}>
          <button onClick={() => StartSpeech(pageData)}>Speak Now</button>
          <button>Pause</button>
          <button>Resume</button>
          <button>Change Voice</button>
          <button>Cancel</button>
          <button onClick={NextPage}>Next Page</button>
          <button>
            <a href={`/download?book=${id}`}> Download Audio book</a>{" "}
          </button>
          <button onClick={checker}>check</button>
        </div>
      </div>
    </>
  );
}
