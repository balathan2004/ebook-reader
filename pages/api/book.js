import { IncomingForm } from "formidable";
//import uploadFile from "@/components/uploadFile";
import uploadFileString from "@/components/uploadFileString";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.min.mjs";
//await import("pdfjs-dist/build/pdf.worker.min.mjs");

pdfjs.GlobalWorkerOptions.workerSrc = "pdfjs-dist/build/pdf.worker.min.mjs";

const fs = require("fs");
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method == "POST") {
    console.clear();
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
      const uint8Array = new Uint8Array(fileBuffer);

      // var url = await uploadFile(fileBuffer, fileData.fileName, fileData.uid);

      // fileData.url = url;
      res.json({ message: "success" });

      convertFile(uint8Array, fileData.fileName, fileData.uid);
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

async function convertFile(fileUrl, fileName, uid) {
  const data = await GetSingleBookData(fileUrl);
  const newFileName = `${fileName.replace(".pdf", "")}.json`;
  //const fileNameWithPath = `public/${newFileName}`;
  //const epubFile = fs.writeFileSync(fileNameWithPath, JSON.stringify(data));
  //const jsonFile = fs.readFileSync(fileNameWithPath);
  //const pdfUrl = await uploadFile(jsonFile, newFileName, uid);
  const uploadFileStringData = await uploadFileString(data, newFileName, uid);
}

async function GetSingleBookData(url) {
  const values = pdfjs.getDocument(url).promise.then(async (pdfDoc) => {
    let textArray = { data: [] };
    const totalPage = pdfDoc.numPages;

    for (let i = 1; i <= totalPage; i++) {
      const page = await pdfDoc.getPage(i);

      const textContent = await page.getTextContent();
      var pageText = "";
      for (const textItem of textContent.items) {
        pageText += textItem.str + " ";
      }
      textArray.data[i] = pageText;
    }

    var finalData = { pageData: textArray, totalPage: totalPage };
    return finalData;
  });
  return values;
}
