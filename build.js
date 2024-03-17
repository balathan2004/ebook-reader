const fs = require("fs");
const dir = "node_modules/pdfjs-dist/legacy/build/pdf.min.mjs";
const content = fs.readFileSync(dir, { encoding: "utf-8" });
fs.writeFileSync(
  dir,
  content.replace('"./pdf.worker.js";', `__dirname + "/pdf.worker.js";`)
);
