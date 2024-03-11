import { IncomingForm } from "formidable";
//import { inngest } from "@/workLoad";
import uploadFile from "@/components/uploadFile";
import GetSingleBookData from "@/build";

const fs = require("fs");
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
  const pdfJs = await import("pdfjs-dist");
  try {
    const form = new IncomingForm({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      var { EBookUserId } = req.cookies;
      var fileData = {
        url: null,
        fileName: files.file[0].originalFilename,
        uid: EBookUserId,
      };

      const fileBuffer = fs.readFileSync(files.file[0].filepath);
      const uint8Array = new Uint8Array(fileBuffer);

      // var url = await uploadFile(fileBuffer, fileData.fileName, fileData.uid);

      // fileData.url = url;
      res.json({ message: "success" });

      convertFile(uint8Array, fileData.fileName, fileData.uid, pdfJs);
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

async function convertFile(fileUrl, fileName, uid, pdfJs) {
  const data = await GetSingleBookData(fileUrl, pdfJs);
  const newFileName = `${fileName.replace(".pdf", "")}.json`;
  const fileNameWithPath = `public/${newFileName}`;
  const epubFile = fs.writeFileSync(fileNameWithPath, JSON.stringify(data));
  const jsonFile = fs.readFileSync(fileNameWithPath);
  const pdfUrl = await uploadFile(jsonFile, newFileName, uid, "books");
}
