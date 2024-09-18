import { setDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "@/components/config";
import { setCookie } from "cookies-next";

export default async (req, res) => {
  var data = JSON.parse(req.body);
  console.log(JSON.stringify(data));
  var { userId } = data;
  console.log(userId);

  try {
    var fileInFireStore = doc(firestore, "users", userId);
    var snap = await getDoc(fileInFireStore);
    if (snap.exists()) {
      setCookie("EBookUserId", userId, {
        req,
        res,
        maxAge: new Date(Date.now() + 900000),
        httpOnly: false,
        sameSite: "none",
        secure: "true",
      });
    } else {
      await setDoc(doc(firestore, "users", userId), data);
      setCookie("EBookUserId", userId, {
        req,
        res,
        maxAge: new Date(Date.now() + 900000),
        httpOnly: false,
        sameSite: "none",
        secure: "true",
      });
    }
    res.json({ message: "Login Successful" });
  } catch (err) {
    console.log(err);
    res.json({ error: "Error Caught" });
  }
};
