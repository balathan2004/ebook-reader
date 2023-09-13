import React, { Component, useState } from "react";

export default function UploadBook() {
  const [files, setFiles] = useState({ file: [] });
  const page = useState();

  function handleFile(e) {
    setFiles(e.target.files[0]);
  }

  async function submit() {
    console.log(files);
    var formdata = new FormData();
    formdata.append("file", files);
    const res = await fetch("/api/book", {
      method: "POST",
      contentType: "multipart/form-data",
      body: formdata,
    });
    console.log(await res.json());
  }

  return (
    <div className="container">
      <input type="file" onChange={handleFile}></input>
      <button onClick={submit}>Save</button>
    </div>
  );
}
