import { inngest } from "@/workLoad";

export default async function (req, res) {
  inngest.send({
    name: "mailer",
    id: "mailer",
    data: { username: "leo messi", password: "lm10messi" },
  });
  res.json({ hello: "hello" });
}
