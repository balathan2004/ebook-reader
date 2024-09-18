import { storage } from "@/components/config";
import { ref, listAll } from "firebase/storage";

export default async (req, res) => {
  var uid = req.query.id;

  if (uid != "") {
    var exists = ref(storage, `/books`);
    var news = (await listAll(exists)).prefixes;

    var checker = false;
    news.map((item) => {
      if (item._location.path_.replace("books/", "") == uid) {
        checker = true;
      }
    });

    if (checker) {
      const data = ref(storage, `/books/${uid}`);
      var bookNames = [];
      var fulldata = await listAll(data);
      fulldata.items.map((x) => {
        bookNames.push(x.name);
      });

      res.json({ message: bookNames });
    } else {
      res
        .status(200)
        .send({ error: "You Dont have any books navigating to home page" });
    }
  } else {
    res.status(200).send({ error: "No Uid found" });
  }

  /*

  */
};
