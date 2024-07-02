const fs = require("fs");
const espeak = require("espeak");

export default function (req, res) {
  speak("Hello, this is an offline text to speech example.");
  res.json({ message: "Hello, this is an offline text to speech example " });
}

function speak(text) {
  espeak.speak(text, (err) => {
    if (err) {
      console.error(`Error: ${err.message}`);
    } else {
      console.log("Text spoken successfully.");
    }
  });
}

// Example usage
