import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export default async function uploadFile(file, filename, userId) {
  const storageRef = ref(storage, `books/${userId}/${filename}`);
  const uploadTask = await uploadBytesResumable(storageRef, file, {
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
}
