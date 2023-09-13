import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
export default async (req, res) => {
  const auth = getAuth();
  var uid = "";
  var { username, password } = JSON.parse(req.body);
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
  });
  res.json({ message: "success" });
};
