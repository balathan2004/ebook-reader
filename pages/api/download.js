const fs = require("fs");
const path = require("path");
const Say = require("say").Say;
const say = new Say("win32");
const gTTS = require("gtts");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobe = require("ffprobe-static").path;

import { storage } from "@/components/config";
import { ref, getDownloadURL } from "firebase/storage";

export default async (req, res) => {
  if (req.method === "POST") {
    let { bookName } = JSON.parse(req.body);

    if (req.cookies.EBookUserId && bookName) {
      console.log(req.cookies.EBookUserId, bookName);
      try {
        const { EBookUserId } = req.cookies;
        const bookData = await getBook(EBookUserId, bookName);
        bookName = bookName.replace(".json", "");
        res.json({ message: bookData });

        console.time("book timer");

        const audioOutputDir = await gttsProcessing(
          EBookUserId,
          bookData,
          bookName
        );
        console.log(audioOutputDir);

        await Converter(EBookUserId, bookName, audioOutputDir);
        console.timeEnd("book timer");
        /*
      

        );
*/
      } catch (err) {
        console.log(err);
      }
    } else {
      res.json({ message: "missing authentication try to login" });
    }
  } else {
    res.json({ message: "unauthorized access" });
  }
};

async function getBook(username, url) {
  const file = ref(storage, `/books/${username}/${url}`);
  var urlpath = await getDownloadURL(file);
  var accVal = await fetch(urlpath, { contentType: "application/json" });
  var bookData = await accVal.json();
  const text = bookData.pageData.data;
  return text;
}

async function gttsProcessing(userid, bookData, bookName) {
  const filePath = path.join(
    process.cwd(),
    `/public/audio/${userid}/${bookName}`
  );

  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(filePath, { recursive: true });
  }

  const PromisePath = await new Promise(async function (resolve, reject) {
    const promises = bookData.map(async (content, index) => {
      const gtts = new gTTS(content, "en");
      const indexNumber = index < 10 ? `0${index}` : index;

      return new Promise((resolve, reject) => {
        gtts.save(
          `./public/audio/${userid}/${bookName}/${bookName}${indexNumber}.mp3`,
          function (err, result) {
            if (err) {
              throw new Error(err);
              reject(err);
            } else {
              resolve("converted");
            }
          }
        );
      });
    });

    await Promise.all(promises);
    resolve("Converted parts successfully");
  });

  return filePath;
}

async function audioCombine(files, outputFile, callback) {
  ffmpeg.setFfmpegPath(ffmpegPath);
  ffmpeg.setFfprobePath(ffprobe);
  const command = ffmpeg();

  files.forEach((file) => {
    command.input(file);
  });

  command
    .on("end", () => {
      console.log("Audio files have been combined successfully.");
      callback(null);
    })
    .on("error", (err) => {
      console.error("Error combining audio files:", err);
      callback(err);
    })
    .mergeToFile(outputFile);
}

async function Converter(userid, bookName, filePath) {
  console.log("Converting to single file:");

  const outputDir = path.join(
    process.cwd(),
    `/public/audio/${userid}/combined`
  );

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.readdir(filePath, async (err, files) => {
    if (err) {
      console.log(err);
    }

    const audioFiles = files
      .filter((file) => file.endsWith(".mp3"))
      .map((file) => path.join(filePath, file));
    console.log(audioFiles);

    const outputFilepath = path.join(outputDir, `${bookName}.mp3`);

    await audioCombine(audioFiles, outputFilepath, (err) => {
      console.log(err);
    });
  });
}

async function SayProcess(text, name) {
  const newPath = path.join(process.cwd(), "/audio");
  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath);
  }

  say.export(text, null, 1, `${newPath}/${name}.mp3`, (err) => {
    if (err) {
      return console.error(err);
    }

    console.log("Text has been saved to hal.wav.");
  });
}

const lenghtFinder = async (array) => {
  var count = 0;

  array.map((page) => {
    if (page) {
      count += page.length;
    }
  });

  console.log(count);
};
