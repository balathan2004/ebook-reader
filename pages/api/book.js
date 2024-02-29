import { IncomingForm } from "formidable";
import { inngest } from "@/components/workLoad";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    post(req, res);
  }
};

const post = async (req, res) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    var { EBookUserId } = req.cookies;
    //  await saveFile(files.file[0], files.file[0].originalFilename, EBookUserId);

    await inngest.send({
      name: "mailer",
      id: "mailer",
      data: {
        file: files.file[0],
        fileName: files.file[0].originalFilename,
        uid: EBookUserId,
      },
    });

    res.json({ message: "success" });
  });
};
