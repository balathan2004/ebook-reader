import { Queue, Worker } from "bullmq";

const connection = {
  connection: {
    host: "localhost",
    port: 6379,
  },
};

const myQueue = new Queue("myQueue", connection);

const myWorker = new Worker(
  "myQueue",
  async(() => {
    console.log("hello world");
  }),
  connection
);
