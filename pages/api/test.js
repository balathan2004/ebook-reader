const fs = require("fs");
import speak from "offline-tts";

export default function (req, res) {
  speak("hello world");
  res.json({ message: "Hello, this is an offline text to speech example " });
}

// Example usage
