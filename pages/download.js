import React, { useState } from "react";
import { useRouter } from "next/router";
import SendData from "@/components/sendFunction";

export default function Download() {
  const router = useRouter();
  const { book } = router.query;

  const sendDownloadTask = async () => {
    const data = {
      bookName: book,
    };
    const response = await SendData(data, "download");

    console.log(response);
  };

  return (
    <div className="">
      <span>
        selected book name is <h4>{book}</h4>
        <button onClick={sendDownloadTask}>Download Now</button>
      </span>
    </div>
  );
}
