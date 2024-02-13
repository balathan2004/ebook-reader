import GetSingleBookData from "@/components/singleBookData";
import sendMailToAdmin from "@/components/mailer";
import { storage } from "@/components/config";
import { ref, getDownloadURL } from "firebase/storage";
export default async (req, res) => {
  try {
    const { EBookUserId } = req.cookies;
    const { url, pageNum } = JSON.parse(req.body);
    const file = ref(storage, `/books/${EBookUserId}/${url}`);
    var urlpath = await getDownloadURL(file);
    console.log(urlpath);
    var accVal = await GetSingleBookData(url, pageNum, EBookUserId);
    await sendMailToAdmin(accVal, "no error");
    res.json({ page: accVal.pageData, totalPages: accVal.totalPage });
  } catch (e) {
    await sendMailToAdmin(e, "error on catch");
    res.json({ error: e });
  }
};
