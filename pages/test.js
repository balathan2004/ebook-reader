import React, { useState } from "react";



export default function Test() {
  const [value, setValue] = useState("");

  const handler = async () => {
   console.log(window.responsiveVoice.getVoices())
  };

  return (
    <div className="container">
      <h1>Hello world</h1>
      <input
        onChange={(event) => {
          setValue(event.target.value);
        }}
      ></input>
      <button onClick={handler}>Click</button>
    </div>
  );
}
