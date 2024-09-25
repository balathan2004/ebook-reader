import { storage } from "@/components/config";
import { ref, listAll } from "firebase/storage";

export default async (req, res) => {
  var uid = req.query.id;

  console.log("requeested", req.body);

  if (uid != "") {
    var storageRef = ref(storage, `${uid}/books/`);
    const result = await listAll(storageRef);

    // To get sub-directories (folders)
    const userFolders = result.prefixes;

    // To get the actual files
    const bookNames = result.items.map((ele) => ele.name);
    console.log("alls ", bookNames);

    res.json({ message: bookNames });
  } else {
    res.status(200).send({ error: "No Uid found" });
  }

  /*

  */
};
