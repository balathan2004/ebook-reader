const pdfjs = require("pdfjs-dist");
const mammoth = require("mammoth");
import { storage } from "./config";
import { ref, getDownloadURL } from "firebase/storage";
export default async function GetSingleBookData(bookname, pageNum, userid) {
  const file = ref(storage, `/books/${userid}/${bookname}`);
  var urlpath = await getDownloadURL(file);

  const values = pdfjs.getDocument(urlpath).promise.then(async (pdfDoc) => {
    const page = await pdfDoc.getPage(pageNum);
    const totalPage = pdfDoc.numPages;

    const textContent = await page.getTextContent();
    var pageText = "";
    for (const textItem of textContent.items) {
      pageText += textItem.str + " ";
    }
    var finalData = { pageData: pageText, totalPage: totalPage };
    return finalData;
  });
  return values;
}
