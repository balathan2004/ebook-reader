import GetSingleBookData from "@/components/singleBookData";
import { inngest } from "@/components/workLoad";
const fs = require("fs");

export const bookToData = inngest.createFunction(
  { id: "book-to-data", name: "book-to-data" },
  {
    event: "book-to-data",
  },
  async ({ event }) => {
    console.log(event.data);
    try {
      var accVal = await GetSingleBookData(event.data.url);
      fs.writeFileSync("index.txt", JSON.stringify(accVal));
    } catch (e) {
      console.log(e);
    }
  }
);
