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
      await inngest.send({
        name: "book-Upload",
        data: fileData,
      });

      res.json({ message: "success" });
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};
