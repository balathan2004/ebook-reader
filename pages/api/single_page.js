import GetSingleBookData from "@/components/readFilePdf";
import { storage } from "@/components/config";
import { ref, getDownloadURL } from "firebase/storage";
export default async (req, res) => {
  const { EBookUserId } = req.cookies;
  const { url, pageNum } = JSON.parse(req.body);
  const file = ref(storage, `/books/${EBookUserId}/${url}`);
  var urlpath = await getDownloadURL(file);
  console.log(urlpath);
  var accVal = await GetSingleBookData(url, pageNum, EBookUserId);

  res.json({ page: accVal.pageData, totalPages: accVal.totalPage });
};
