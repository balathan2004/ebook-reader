import { Queue } from "bullmq";

export default function (req, res) {
  const myQueue = new Queue("foo");

  myQueue.add("myQueue", { one: 1 });
  res.json({ message: "hello" });
}
