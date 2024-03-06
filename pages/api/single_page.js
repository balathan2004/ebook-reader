import { storage } from "@/components/config";
import { ref, getDownloadURL } from "firebase/storage";
export default async (req, res) => {
  console.log("requested");
  try {
    const { EBookUserId } = req.cookies;
    const { url, pageNum } = JSON.parse(req.body);
    const file = ref(storage, `/books/${EBookUserId}/${url}`);
    var urlpath = await getDownloadURL(file);
    var accVal = await fetch(urlpath, { contentType: "application/json" });
    var bookData = await accVal.json();
    res.json({
      page: bookData.pageData.data[pageNum],
      totalPages: bookData.totalPage,
    });
  } catch (e) {
    res.json({ error: e });
  }
};
