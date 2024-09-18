import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebase, firestore } from "@/components/config";
import { setDoc, doc } from "firebase/firestore";
import { setCookie } from "cookies-next";
export default async (req, res) => {
  const auth = getAuth(firebase);

  let uid = "";

  const { email, password } = JSON.parse(req.body);
  const parsed = JSON.parse(req.body);
  console.log(parsed);

  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (userCred) => {
        uid = userCred.user.uid;
      }
    );
    setCookie("EBookUserId", uid, {
      req,
      res,
      maxAge: new Date(Date.now() + 900000),
      httpOnly: false,
      sameSite: "none",
      secure: "true",
    });
    var data = { email: email, uid: uid };
    await setDoc(doc(firestore, "users", uid), data);
    res.json({ message: "success" });
  } catch (e) {
    res.json({ error: e.code });
  }
};
