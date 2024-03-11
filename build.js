export default async function GetSingleBookData(url) {
  const pdfJs = await import("pdfjs-dist");
  console.log(url);
  const values = pdfJs.getDocument(url).promise.then(async (pdfDoc) => {
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
