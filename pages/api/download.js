const fs = require("fs");
const path = require("path");
const ElevenLabs = require("elevenlabs");
const gTTS = require("gtts");

import { storage } from "@/components/config";
import { ref, getDownloadURL } from "firebase/storage";

export default async (req, res) => {
  if (req.method === "POST") {
    const { bookName } = JSON.parse(req.body);

    if (req.cookies.EBookUserId && bookName) {
      console.log(req.cookies.EBookUserId, bookName);
      try {
        const { EBookUserId } = req.cookies;

        const bookData = await getBook(EBookUserId, bookName);

        const audioOutput = await gttsProcessing(bookData, bookName);
      } catch (err) {
        console.log(err);
      }
      res.json({ message: "received" });
    } else {
      res.json({ message: "missing authentication try to login" });
    }
  } else {
    res.json({ message: "unauthorized access" });
  }
};

async function AudioProcessing(bookData, bookName) {
  const client = new ElevenLabs.ElevenLabsClient({
    apiKey: "c2d07cef28672bc4e58cba4c3883aa5b",
  });

  await bookData.map(async (text, index) => {
    setTimeout(async () => {
      const audioBuffer = await client.generate({
        text: text,
        voice: "Adam",
      });

      var filePath = path.join(
        process.cwd(),
        `/public/audio/${bookName}@${index}.mp3`
      );
      const writeStream = fs.WriteStream(filePath);
      audioBuffer.pipe(writeStream);
    }, 3000);
  });
}

async function getBook(username, url) {
  const file = ref(storage, `/books/${username}/${url}`);
  var urlpath = await getDownloadURL(file);
  var accVal = await fetch(urlpath, { contentType: "application/json" });
  var bookData = await accVal.json();
  const text = bookData.pageData.data;
  return text;
}

async function gttsProcessing(bookData, bookName) {
  const edittedName = bookName.replace(".json", "").trim();
  const stringBook = JSON.stringify(bookData.join(" "));

  const gtts = new gTTS(stringBook, "en");
  const filePath = path.join(process.cwd(), `/public/audio/${edittedName}`);

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath);
  }

  gtts.save(
    `./public/audio/${edittedName}/${edittedName}.mp3`,
    function (err, result) {
      if (err) {
        throw new Error(err);
      }
      console.log("Text to speech converted!");
    }
  );
}

/*

  bookData.map((page, index) => {
    if (page) {
      const gtts = new gTTS(page, "en");
      const filePath = path.join(process.cwd(), `/public/audio/${edittedName}`);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
      }

      gtts.save(
        `./public/audio/${edittedName}/${edittedName}.mp3`,
        function (err, result) {
          if (err) {
            throw new Error(err);
          }
          console.log("Text to speech converted!");
        }
      );
    }
  });


*/
