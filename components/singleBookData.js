import * as pdfjs from "pdfjs-dist/legacy/build/pdf";
const fs = require("fs");
const dir = "node_modules/pdfjs-dist/es5/build/pdf.js";
const content = fs.readFileSync(dir, { encoding: "utf-8" });
fs.writeFileSync(
  dir,
  content.replace('"./pdf.worker.js";', `__dirname + "/pdf.worker.js";`)
);

export default async function GetSingleBookData(url) {
  console.log(url);
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
