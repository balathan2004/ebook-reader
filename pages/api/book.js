import { IncomingForm } from "formidable";
import fs from "fs";
import uploadFile from "@/components/uploadFile";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method == "POST") {
    post(req, res);
  }
};

const post = async (req, res) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    var { EBookUserId } = req.cookies;
    await saveFile(files.file[0], files.file[0].originalFilename, EBookUserId);

    res.json({ message: "success" });
  });
};

async function saveFile(file, fileName, userid) {
  const data = fs.readFileSync(file.filepath);
  uploadFile(data, fileName, userid);
}
