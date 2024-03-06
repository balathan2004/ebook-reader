import { inngest } from "@/components/workLoad";
import { serve } from "inngest/next";
import { helloWorld } from "@/worker/saveFile";
import { bookToData } from "@/worker/bookToData";

/** 
await inngest.send({
  name: "mailer",
  id: "mailer",
  data: { username: "leo" },
});

*/
export default serve({
  client: inngest,
  functions: [helloWorld, bookToData],
});
