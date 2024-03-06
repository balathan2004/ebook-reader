import { IncomingForm } from "formidable";
import { inngest } from "@/components/workLoad";
import uploadFile from "@/components/uploadFile";
const fs = require("fs");
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    post(req, res);
  }
};

const post = async (req, res) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    var { EBookUserId } = req.cookies;
    var fileData = {
      file: files.file[0],
      fileName: files.file[0].originalFilename,
      uid: EBookUserId,
    };

    const fileBuffer = fs.readFileSync(fileData.file.filepath);

    var url = await uploadFile(fileBuffer, fileData.fileName, fileData.uid);
    delete fileData.file;
    fileData.url = url;
    console.log(fileData);
    inngest.send({
      name: "book-Upload",

      data: fileData,
    });

    res.json({ message: "success" });
  });
};
