import { inngest } from "@/components/workLoad";
import GetSingleBookData from "@/components/singleBookData";
import fs from "fs";
import uploadFile from "@/components/uploadFile";
const ebookConverter = require("node-ebook-converter");

export const helloWorld = inngest.createFunction(
  { id: "book-Upload", name: "book-Upload" },

  { event: "book-Upload" },
  async ({ event }) => {
    console.log(event);
    const { file, fileName, uid } = event.data;
    // const url = await saveFile(file, fileName, uid);
    const fileUrl = await convertFile(file, uid);
    const newData = {
      fileName: fileName,
      uid: uid,
      url: fileUrl,
    };
    console.log(newData);
    //   inngest.send({ name: "book-to-data", data: newData });
    return { event, body: "Mail sent" };
  }
);

/*

async function saveFile(file, fileName, userid) {
  // const data = fs.readFileSync(file.filepath);
  //const pdfUrl = await uploadFile(data, fileName, userid);
  return file.filepath;
}

*/

async function convertFile(file, uid) {
  const data = await GetSingleBookData(file.filepath);

  const fileName = `${file.originalFilename.replace(".pdf", "")}.json`;
  const fileNameWithPath = `public/${fileName}`;
  const epubFile = fs.writeFileSync(fileNameWithPath, JSON.stringify(data));
  const jsonFile = fs.readFileSync(fileNameWithPath);
  const pdfUrl = await uploadFile(jsonFile, fileName, uid);
  return file.filepath;
}
