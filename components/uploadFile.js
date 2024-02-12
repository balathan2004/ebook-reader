import { ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../config";

export default async function uploadFile(file, filename, userId) {
  const storageRef = ref(storage, `books/${userId}/${filename}`);
  const uploadTask = uploadBytesResumable(storageRef, file, {
    contentType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
}
