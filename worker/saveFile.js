import { inngest } from "@/components/workLoad";
import GetSingleBookData from "@/build";
import fs from "fs";
import uploadFile from "@/components/uploadFile";
const ebookConverter = require("node-ebook-converter");

export const helloWorld = inngest.createFunction(
  { id: "book-Upload", name: "book-Upload" },

  { event: "book-Upload" },
  async ({ event }) => {
    const { url, fileName, uid } = event.data;
    console.log(event.data);
    const fileUrl = await convertFile(url, fileName, uid);

    return { event, body: "Mail sent" };
  }
);

async function convertFile(fileUrl, fileName, uid) {
  const data = await GetSingleBookData(fileUrl);
  const newFileName = `${fileName.replace(".pdf", "")}.json`;
  const fileNameWithPath = `public/${newFileName}`;
  const epubFile = fs.writeFileSync(fileNameWithPath, JSON.stringify(data));
  const jsonFile = fs.readFileSync(fileNameWithPath);
  const pdfUrl = await uploadFile(jsonFile, newFileName, uid, "books");
}

/** 
import { inngest } from "@/workLoad";
import { serve } from "inngest/next";
import { helloWorld } from "@/worker/saveFile";


await inngest.send({
  name: "mailer",
  id: "mailer",
  data: { username: "leo" },
});


export default serve({
  client: inngest,
  functions: [helloWorld],
});
*/
