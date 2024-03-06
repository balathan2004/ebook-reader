import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";
const fs = require("fs");

export default async function uploadFile(
  file,
  filename,
  userId,
  storagePath = "pdfs"
) {
  const storageRef = ref(storage, `${storagePath}/${userId}/${filename}`);
  const uploadTask = await uploadBytesResumable(storageRef, file, {
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
}
