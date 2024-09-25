import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export default async function uploadFileString(textContent, fileName, uid) {
  const storageRef = ref(storage, `/${uid}/books/${fileName}`);
  await uploadString(storageRef, JSON.stringify(textContent));
  console.log("success");
}
