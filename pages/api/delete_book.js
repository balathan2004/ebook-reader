import { storage } from "@/components/config";

import { ref, deleteObject } from "firebase/storage";

export default async (req, res) => {
  var uid = req.cookies.EBookUserId;
  var filename = req.body;

  const fileRef = ref(storage, `books/${uid}/${filename}`);
  await deleteObject(fileRef)
    .then(console.log)
    .catch((err) => {
      console.log(err);
    });
  res.json({ message: "File Deleted Successfully" });
};
