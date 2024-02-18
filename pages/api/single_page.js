import GetSingleBookData from "@/components/singleBookData";
import { storage } from "@/components/config";
import { ref, getDownloadURL } from "firebase/storage";
export default async (req, res) => {
  try {
    const { EBookUserId } = req.cookies;
    const { url, pageNum } = JSON.parse(req.body);
    const file = ref(storage, `/books/${EBookUserId}/${url}`);
    var urlpath = await getDownloadURL(file);
    console.log(urlpath);
    //var accVal = await GetSingleBookData(url, pageNum, EBookUserId);

    res.json({
      page: "Non enim ullamco aute officia cupidatat sunt est laboris est nulla irure anim incididunt et. Qui laborum aute dolore labore esse velit ea proident excepteur enim. Adipisicing non aliqua mollit aute occaecat incididunt exercitation aliquip mollit laborum esse.",
      totalPages: 10,
    });
  } catch (e) {
    res.json({ error: e });
  }
};
