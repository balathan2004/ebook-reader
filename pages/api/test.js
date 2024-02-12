import pdfReaderFile from "@/components/readFilePdf";
const fs = require("fs");
export default function (req, res) {
  pdfReaderFile();

  res.json({ message: "hello" });
}
