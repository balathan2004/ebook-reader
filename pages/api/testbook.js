import { inngest } from "./inngest";

export const dynamic = "force-dynamic";

// Create a simple async Next.js API route handler
export default async function handler(req, res) {
  console.log("requested");
  // Send your event payload to Inngest
  await inngest.send({
    name: "test/hello.world",
    data: {
      email: "testFromNext@example.com",
    },
  });

  res.status(200).json({ name: "Hello Inngest from Next!" });
}

/**

export default async (req, res) => {
  var uid = "3mo3DlHdrAgNulzvvPCQpIEu5Ru1";

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
      res.status(200).send({ error: "You Dont have any books" });
    }
  } else {
    res.status(200).send({ error: "No Uid found" });
  }

  /*

  */
