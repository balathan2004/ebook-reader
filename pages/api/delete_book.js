import { storage } from "@/components/config";

import { ref, deleteObject } from "firebase/storage";

export default async (req, res) => {
  var uid = req.cookies.EBookUserId;
  var { bookName } = JSON.parse(req.body);
  console.log(bookName);

  const fileRef = ref(storage, `${uid}/books/${bookName}`);
  await deleteObject(fileRef)
    .then(console.log)
    .catch((err) => {
      console.log(err);
    });
  res.json({ message: "File Deleted Successfully" });
};
