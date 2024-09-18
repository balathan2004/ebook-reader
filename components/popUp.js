import { signInWithPopup, getAuth, GoogleAuthProvider } from "firebase/auth";
import SendData from "./sendFunction";
import { firebase } from "./config";
export async function PopupMethods() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth(firebase);

  try {
    await signInWithPopup(auth, provider).then(async (x) => {
      var data = {
        fullName: x.user.displayName,
        email: x.user.email,
        userId: x.user.uid,
      };

      var res = await SendData(data, "googleLogin");
      console.log(res);
      var responseJson = await res;
      if (responseJson.message != "") {
        window.location.href = "/home";
      }
    });
  } catch (err) {
    console.log(err);
  }
}
