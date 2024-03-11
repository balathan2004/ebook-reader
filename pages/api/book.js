import { IncomingForm } from "formidable";
//import { inngest } from "@/workLoad";
import uploadFile from "@/components/uploadFile";
import GetSingleBookData from "@/components/singleBookData";
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

      var url = await uploadFile(fileBuffer, fileData.fileName, fileData.uid);

      fileData.url = url;
      res.json({ message: "success" });

      convertFile(fileData.url, fileData.fileName, fileData.uid);
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

async function convertFile(fileUrl, fileName, uid) {
  const data = await GetSingleBookData(fileUrl);
  const newFileName = `${fileName.replace(".pdf", "")}.json`;
  const fileNameWithPath = `public/${newFileName}`;
  const epubFile = fs.writeFileSync(fileNameWithPath, JSON.stringify(data));
  const jsonFile = fs.readFileSync(fileNameWithPath);
  const pdfUrl = await uploadFile(jsonFile, newFileName, uid, "books");
}
