import { inngest } from "@/components/workLoad";
import fs from "fs";
import uploadFile from "@/components/uploadFile";

export const helloWorld = inngest.createFunction(
  { id: "book-Upload", name: "book-Upload" },

  { event: "book-Upload" },
  async ({ event }) => {
    console.log(event);
    const { file, fileName, uid } = event.data;
    await saveFile(file, fileName, uid);

    return { event, body: "Mail sent" };
  }
);

async function saveFile(file, fileName, userid) {
  const data = fs.readFileSync(file.filepath);
  const pdfUrl = await uploadFile(data, fileName, userid);
  console.log(pdfUrl);
}
