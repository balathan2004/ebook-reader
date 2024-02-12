import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
import { firebase } from "@/config";

export default async (req, res) => {
  const auth = getAuth(firebase);
  var uid = "";
  var { username, password } = JSON.parse(req.body);
  try {
    await signInWithEmailAndPassword(auth, username, password).then(
      (userCred) => {
        uid = userCred.user.uid;
      }
    );
    setCookie("EBookUserId", uid, {
      req,
      res,
      maxAge: new Date(Date.now() + 900000),
      httpOnly: false,
      sameSite: "None",
      secure: "true",
    });
    res.json({ message: "success" });
  } catch (e) {
    res.json({ error: e.code });
  }
};
