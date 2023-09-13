import GetSingleBookData from "@/components/singleBookData";

export default async (req, res) => {
  var { EBookUserId } = req.cookies;
  const { url, pageNum } = JSON.parse(req.body);

  var data = new Promise(async (resolve, reject) => {
    var newData = await GetSingleBookData(url, pageNum, EBookUserId);
    if (newData) {
      resolve(newData);
    } else {
      console.log("Error");
    }
  });

  data.then((accVal) => {
    res.json({ page: accVal.pageData, totalPages: accVal.totalPage });
  });
};
