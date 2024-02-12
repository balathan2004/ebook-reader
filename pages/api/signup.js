import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firestore } from "@/config";
import { setDoc, doc } from "firebase/firestore";
import { setCookie } from "cookies-next";
export default async (req, res) => {
  const auth = getAuth();
  var resData = [];
  var uid = "";
  var name = "";
  var { username, password } = JSON.parse(req.body);
  try {
    await createUserWithEmailAndPassword(auth, username, password).then(
      (userCred) => {
        console.log(userCred);
        name = userCred.user.email;
        uid = userCred.user.uid;
        resData.push(userCred);
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
    var data = { username: name, uid: uid };
    await setDoc(doc(firestore, "users", uid), data);
    res.json({ message: "success" });
  } catch (e) {
    res.json({ error: e.code });
  }
};
