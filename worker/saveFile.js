import { inngest } from "@/components/workLoad";
import fs from "fs";
import uploadFile from "@/components/uploadFile";

export const helloWorld = inngest.createFunction(
  { id: "mailer", name: "mailer" },

  { event: "mailer" },
  async ({ event }) => {
    const { file, fileName, uid } = event.data;
    console.log(file, uid, fileName);
    await saveFile(file, fileName, uid);

    return { event, body: "Mail sent" };
  }
);

async function saveFile(file, fileName, userid) {
  const data = fs.readFileSync(file.filepath);
  uploadFile(data, fileName, userid);
}
