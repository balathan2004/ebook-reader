import React, { Component, useState } from "react";
import styles from "@/styles/upload.module.css";
import Navbar from "@/components/nav";
import { useRouter } from "next/router";
export default function UploadBook() {
  const navigate = useRouter();
  const [files, setFiles] = useState({ file: [] });
  const page = useState();
  const [redirectMessage, setRedirectMessage] = useState();

  function handleFile(e) {
    setFiles(e.target.files[0]);
  }

  async function submit() {
    console.log(files);
    var formdata = new FormData();
    formdata.append("file", files);
    const res = await fetch("/api/book", {
      method: "POST",
      contentType: "application/pdf",
      body: formdata,
    });
    var response = await res.json();
    if (response.message == "success") {
      setTimeout(() => {
        setRedirectMessage("File Uploaded Success Redirecting");
        navigate.push("/home");
      }, 5000);
    }
  }

  return (
    <>
      <div className="uploader-container">
        <div className={styles.card}>
          <h2>{redirectMessage ? redirectMessage : ""}</h2>
          <h3>Upload Files</h3>
          <div className={styles.drop_box}>
            <header>
              <h4>Select File here</h4>
            </header>
            <p>Files Supported: PDF, TEXT</p>
            <input type="file" onChange={handleFile}></input>
            <button className={styles.btn} onClick={submit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
