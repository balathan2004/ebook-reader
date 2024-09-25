const fs = require("fs");
const path = require("path");
const gTTS = require("gtts");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobe = require("ffprobe-static").path;
const streamifier = require("streamifier");
const { Writable } = require('stream'); 


import { ref, uploadBytesResumable,uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/components/config";

export default async (req, res) => {
  if (req.method === "POST") {
    let { bookName } = req.body;

    if (req.cookies.EBookUserId && bookName) {
      try {
        const { EBookUserId } = req.cookies;
        const bookData = await getBook(EBookUserId, bookName);
        bookName = bookName.replace(".json", "");

        res.json({
          status: 200,
          message: "your file link will be sent to your email in 10 minutes",
        });

        const finalOutput = await AvoidMerger(EBookUserId, bookData, bookName);

        /**
         *    const audioOutputDir = await gttsProcessing(
          EBookUserId,
          bookData,
          bookName
        );
        await Converter(EBookUserId, bookName, audioOutputDir);
   
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
  const file = ref(storage, `/books/${username}/books/${url}`);
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
      if (content.trim() != "") {
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
      }
    });

    await Promise.all(promises);
    resolve("Converted parts successfully");
  });

  return filePath;
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

    const outputFilepath = path.join(outputDir, `${bookName}-${userid}.mp3`);

    await audioCombine(audioFiles, outputFilepath, (err) => {
      console.log(err);
    });

    const fileBuffer = fs.readFileSync(outputFilepath, (err) => {
      console.log(err);
    });

    await uploadAudioFile(fileBuffer, `${bookName}-${userid}.mp3`, userid);
  });
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

async function uploadAudioFile(fileBuffer, fileName, uid) {
  const storageRef = ref(storage, `books/${uid}/audio/${fileName}`);

  const metadata = {
    contentType: "audio/mpeg", // or whatever the MIME type is
  };

  const uploadTask = await uploadBytesResumable(storage, fileBuffer, metadata);
}

const AvoidMerger = async (userid, bookData, bookName) => {


  const allBuffers = await Promise.all(
    bookData.map(async (content) => {
      const gtts = new gTTS(content, "en");
      const streams = streamifier.createReadStream(gtts.stream());
      return streams;
    })
  );

  const metadata = {
    contentType: "audio/mpeg", // or whatever the MIME type is
  };
 // const storageRef = ref(storage, `books/${userid}/audio/${bookName}.mp3`);

  //const uploadTask = await uploadBytesResumable(storageRef, allBuffers, metadata);
};
